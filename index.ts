import axios from "axios";

const laPromesa1 = axios.get("https://rickandmortyapi.com/api/character/1");
const laPromesa2 = axios.get("https://rickandmortyapi.com/api/character/2");
const laPromesa3 = axios.get("https://rickandmortyapi.com/api/character/3");
const laPromesa4 = axios.get("https://rickandmortyapi.com/api/character/4");

type Resultado = {
    nombres: String[];
};

const valorInicial : Resultado = {
    nombres: []
};

laPromesa1.then((res1)=>{

    //console.log(res.data.name);
    laPromesa2.then((res2)=>{

    
        laPromesa3.then((res3)=>{

            laPromesa4.then((res4)=>{

                const miArray : any[] = [res1,res2,res3,res4];
                const arrayResultado = miArray.reduce((acc: Resultado, n)=>{

                    return{
                        nombres : [...acc.nombres, n.data.name]
                    }

                },valorInicial)

                console.log(arrayResultado);

            })
        })
    })
}).catch((err) =>{

    console.error("Error con el character ", err.message);

})