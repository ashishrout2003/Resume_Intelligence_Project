import { getAllInterviewReports, generateInterviewReport, getInterviewReportById } from "../Services/interview.api";
import { useContext } from "react";
import { interviewContext } from "../interview.context";

export const useInterview = ()=>{
const context = useContext(interviewContext)
if(!context){
    throw new Error("useinterview must be used within an interviewProvider")
}
    const {loading, setLoading, report, setReport, reports, setReports} = context

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) =>{
        setLoading(true)
            let response = null
        try{
             response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReport)

        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
        return response.interviewReport

    }

    const getReportById = async (interviewId) =>{
        setLoading(true)
        let response = null
        try{
             response = await getInterviewReportById({interviewId})
            setReport(response.interviewReport)

        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
        return response.interviewReport
    }

    const getReports = async () =>{
        setLoading(true)
        let response = null
        try{
             response = await getAllInterviewReports({jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReports)

        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
        return response.interviewReports
    }

    return {loading, report, reports, generateReport, getReportById, getReports}

}