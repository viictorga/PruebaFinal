import axios from "axios"


const miPromesa = axios.get("https://rickandmortyapi.com/api/character/2")
.then((respuesta) =>{

    console.log(respuesta.data)
}).catch((err)=>{
    console.error("la has liado chaval" + err.message)
})





const getCharacter = async (id: number) =>{
    const res = await axios.get("https://rickandmortyapi.com/api/character/2")
    return res.data;
}



const getCharacterClassic = (id : number) =>{
    return axios.get("https://rickandmortyapi.com/api/character/2").then((res) =>{
            return res.data;
    })
   
}


const getCharacterProper = async (ids:number[])=>{
    try{
        const chars = ids.map(async(n)=>{
            return (await axios.get(`https://rickandmortyapi.com/api/character/ ${n}`)).data
            
        })
        return await Promise.all(chars);
        
    }

    catch(err){

       if(axios.isAxiosError(err)){
            console.log("Error en la peticion: " + err.message)
       }
       else{
            console.log("Error general: " + err)
       }

    }
}




console.log(await getCharacter(1))
console.log(await getCharacter(2))
console.log(await getCharacter(3))
console.log(await getCharacter(4))
console.log(await getCharacter(5))