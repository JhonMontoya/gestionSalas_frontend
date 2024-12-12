import axios from "axios";
const path = "http://localhost:3000";

export async function getHalls() {
    try {
        const response = await axios.get(path + "/salas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las salas: ", error)
    }
    
}