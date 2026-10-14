# Diabetes Prediction Model 


# Run Backend
```python
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

# Run Frontend
```bash
cd frontend
npm run dev
```
# Run k8s
```bash
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
```
