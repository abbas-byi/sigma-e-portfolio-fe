import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useViewResumeWithId = () => {
    const { resumeId } = useParams();
    const [resumeDetails, setResumeDetails] = useState()

    const getResumeDetails = () => {
        axios({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}resume/${resumeId}`,
        }).then((res) => {
          setResumeDetails(res.data);
          console.log('this is e-resume response', res.data)
        }).catch((e) => {
          console.log('this is error', e)
        })
      }
    
      useEffect(() => {
        getResumeDetails()
      }, [])

    return {
        resumeDetails,
    }
}