import axios from "axios"


const getCharactersProper = async (ids : number[]) =>{
    
    const Personajes = ids.map(async(n)=>{
        const personaje = (await axios.get(`https://rickandmortyapi.com/api/character/ ${n}`)).data           
        return personaje;
    })

    const resultado = await Promise.allSettled(Personajes)
    

    const devuelta =  resultado.forEach((n, index)=>{
        if(n.status === "fulfilled"){
            return n.value.at(index)
        }
        else{
            console.error(`El personaje en la posicion ${index} da el siguiente error`)
        }
    })
    return devuelta;
        
    
}