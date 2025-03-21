import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const apiCall = {

    async extractAadhar(formData: any): Promise<any> {
        try{
            const response = await axios.post(`${BACKEND_URL}/extractData`, formData);
            return response
        }catch(error:any){
            throw error
        }
    }
}

export default apiCall


