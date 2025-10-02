import axios from "axios";

const laPromesa = axios.get("https://rickandmortyapi.com/api/character");

laPromesa.then((res)=>{

    console.log(res.data);

}).catch((err) =>{

    console.error("Error con el character ", err.message);

}).finally(()=>{

    console.log("Ya esta enviado lo necesario a la API")

})