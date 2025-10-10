import axios from "axios"


const getCharactersProper = async (ids : number[]) =>{
    try {
        const Personajes = ids.map(async(n)=>{
            const personaje = await axios.get(`https://rickandmortyapi.com/api/character/ ${n}`).data
        })


        
    } catch (error) {
        
    }
}