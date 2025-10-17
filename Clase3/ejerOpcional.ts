import axios from "axios"


console.log(await(axios.get(`http://localhost:3000/personas`)))