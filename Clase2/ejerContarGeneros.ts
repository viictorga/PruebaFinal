import axios from "axios"


// paso el id de un episodio y con ello me dices la cantidad de hombre, mujeres y "otros" que haya
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

type Resultado = {
    Masculino: number,
    Femenino: number,
    Others: number
}

const getGeneros = async(idEpi: number):Promise<Resultado> =>{
    const episodio : Episode = (await (axios.get(`https://rickandmortyapi.com/api/episode/${idEpi}`))).data

    const misPersonajes = episodio.characters.map(async(n) =>{
        return (await(axios.get(n))).data.gender


    })
    const arrayGeneros = await Promise.allSettled(misPersonajes)

   const resultado : Resultado = {
                Masculino: 0,
                Femenino: 0,
                Others: 0

            }

    arrayGeneros.map((j)=>{
        
        if(j.status === "fulfilled"){
            if(j.value === "Male"){
                resultado.Masculino += 1;
            }
            else if(j.value === "Female"){
                resultado.Femenino += 1;
            }
            else {
                resultado.Others +=1;
            }
            
        }
        

    })
    return resultado;
    

    

}


console.log(await getGeneros(1))