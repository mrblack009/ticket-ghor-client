import axios from "axios";



const api = axios.create({
    baseURL: 'https://ticket-ghor-server.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default api;