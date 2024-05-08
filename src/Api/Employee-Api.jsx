import axios from "axios";

const EmployeeApi = axios.create({
    baseURL:"http://localhost:3000"
})

export async function postEmployeeData(employee) {
    try {
        const data = EmployeeApi.post("/addData",employee);
        console.log(data,"data");
        return data;
    } catch (error) {
        console.log(error);
    }
    
}