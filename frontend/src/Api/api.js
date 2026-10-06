import axios from 'axios'

const API_URL = "http://127.0.0.1:8000"

const api = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type": "application/json",
    },
})

let refreshPromise = null


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 && 
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/refresh")
        ){
            originalRequest._retry = true;

            try {
                if (!refreshPromise){
                    refreshPromise = (async () => {
                        const refreshToken = localStorage.getItem('refresh_token');

                        if (!refreshToken){
                            throw new Error("No refresh token found");
                        }

                        const response = await axios.post(`${API_URL}/auth/refresh`, {
                            refresh_token: refreshToken
                        });

                        const { access_token, refresh_token } = response.data
                        if(!access_token){
                            throw new Error("No access token returned")
                        }
                        localStorage.setItem('access_token', access_token);
                        if (refresh_token){
                            localStorage.setItem('refresh_token', refresh_token);
                        }

                        return access_token

                    })()

                }
                
                const newAccessToken = await refreshPromise;

                originalRequest.headers = originalRequest.headers || {}

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

                return api(originalRequest)

            } catch (refreshError) {
                console.log('refreshError: ', refreshError);
                console.log('Status: ', refreshError.response?.status);
                console.log('Data: ', refreshError.response?.data);
                console.log('Message: ', refreshError.message);
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                // console.log(refreshError)
                window.location.href = '/signin'
                return Promise.reject(refreshError)
            } finally {
                refreshPromise = null
            }
        }
        return Promise.reject(error)
    }
)

export default api