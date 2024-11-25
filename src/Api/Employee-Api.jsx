import axios from "axios";

const EmployeeApi = axios.create({
    baseURL:"https://employee-data-backend-31m1.onrender.com"
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

export async function employeeList(){
    try {
        const data = EmployeeApi.get("/employeeList");
        console.log(data,"data");
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function searchData(search) {
    try {
        const data = EmployeeApi.get(`/serachdata?searchData=${search}`)
        return data
    } catch (error) {
        console.log(error);        
    }
}
