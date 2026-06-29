import api from "./api";


// get all users 
export const getUsers = async () => {
    const res = await api.get("/users");
    return res.data;
}
// get user through email
export const getUserByEmail = async (email) => {
    const res = await api.get(`/users/${email}`);
    return res.data;
}
// add user
export const addUsers = async (userData) => {
    const res = await api.post("/users", userData);
    return res.data;
}
