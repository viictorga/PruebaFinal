import axios from "axios"
type Character = {
    id: number,
    name: string;
    status: 'Alive' | 'Dead' | 'unknown',
    species: string,
    type: string,
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown',
    origin: {
      name: string,
      url: string,
    };
    location: {
      name: string,
      url: string,
    };
    image: string,
    episode: string[],
    url: string,
    created: string,
  
};
type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; 
  url: string;
  created: string;
};



// const getCharactersProper = async (ids : number[]) =>{
//     try{
//         const arrayDePromesas = ids.map(async (n)=>{
//         const personaje : Character = (await axios.get(`https://rickandmortyapi.com/api/character/${n}`)).data           
//         return personaje; // pero devuelve una promesa a un personaje, formando un array de promesas a personajes
//     })

//     return await Promise.allSettled(arrayDePromesas)

//     }
//     catch(error){
//         if(axios.isAxiosError(error)){
//             console.log("Error en la peticion" + error.message)
//         }
//         else{
//             console.log("Error general" + error)
//         }

//     }
    
//     }
   
    

    const getCharacterWithEpisodes = async (id: number) => {
        const promesa : Character =(await axios.get(`https://rickandmortyapi.com/api/character/${id}`)).data 


        const nuevo_arrayEpisodios = promesa.episode.map(async(n)=>{
            
            //console.log(n)
            return (await axios.get(n)).data;

        })


        const arrayPORFIN = await Promise.allSettled(nuevo_arrayEpisodios)

        
        const array2 = arrayPORFIN.map((h) =>{
            if(h.status === "fulfilled"){
                return h.value
            }
        })

        return {
            ...promesa,
            episode: array2
        }

        
    }

    
        
    const miPersonaje = await getCharacterWithEpisodes(2)
    console.log(miPersonaje)





