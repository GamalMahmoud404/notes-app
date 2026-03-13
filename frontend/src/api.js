import axios from "axios";

// الاتصال بالباك اند
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export default API;