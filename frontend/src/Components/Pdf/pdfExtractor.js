import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url"

// pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.mjs",
//     import.meta.url
// ).toString();

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

export const extractPDFText = async (file) => {
    const arrayBuffer = await file.arrayBuffer()

    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
    }).promise

    let fullText = ""

    for (let pageNo= 1; pageNo <= pdf.numPages; pageNo++) {
        const page = await pdf.getPage(pageNo)

        const textContent = await page.getTextContent()

        const pageText = textContent.items
            .map((item) => item.str)
            .join(", ")

        fullText += pageText + "\n"
    }

    return fullText
}

export const extractedFields = (text) => {

    const normalizedText = text.replace(/\s+/g, " ").trim()

    const result = {
        name: "",
        pregnancies: "",
        glucose: "",
        blood_pressure: "",
        bmi: "",
        age: "",
    }

    const nameMatch = normalizedText.match(
        /(?:patient\s*name|patient|name)\s*[:\-]?\s*(.*?)(?=,|$)/i
    )

    if (nameMatch){
        result.name = nameMatch[1].trim()
    }

    const pregnanciesMatch = normalizedText.match(
        /(?:pregnancies|number\s*of\s*pregnancies|no\.?\s*of\s*pregnancies)\s*[:\-]?\s*(\d+)/i
    )

    if (pregnanciesMatch){
        result.pregnancies = Number(pregnanciesMatch[1])
    }

    const glucoseMatch = normalizedText.match(
        /(?:glucose|glucose\s*level|blood\s*glucose)\s*[:\-]?\s*(\d+(?:\.\d+)?)/i
    )

    if (glucoseMatch){
        result.glucose = Number(glucoseMatch[1])
    }

    const bloodPressureMatch = normalizedText.match(
        /(?:blood\s*pressure|bp)\s*[:\-]?\s*(\d+(?:\.\d+)?)/i
    )

    if(bloodPressureMatch) {
        result.blood_pressure = Number(bloodPressureMatch[1])
    }

    const bmiMatch = normalizedText.match(
        /(?:bmi|body\s*mass\s*index)\s*[:\-]?\s*(\d+(?:\.\d+)?)/i
    )

    if (bmiMatch){
        result.bmi = Number(bmiMatch[1])
    }
    
    const ageMatch = normalizedText.match(
        /(?:age)\s*[:\-]?\s*(\d+)/i
    )

    if (ageMatch){
        result.age = Number(ageMatch[1])
    }


    // const getValue = (label) => {
    //     const regex = new RegExp(
    //         `${label}\\s*(\\d+(?:\\.\\d+)?)`,
    //         "i"
    //     )

    //     const match = text.match(regex)

    //     return match ? Number(match[1]) : ""
    // }

    // return {
    //     name: getValue("Name"),
    //     pregnancies: getValue("Pregnancies"),
    //     glucose: getValue("Glucose"),
    //     blood_pressure: getValue("Blood Pressure"),
    //     bmi: getValue("BMI"),
    //     age: getValue("Age")
    // }

    return result
}