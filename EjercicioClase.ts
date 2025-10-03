import axios from "axios";

type Cositas = {
    query: string ,
    value: string | undefined 
}


const getCharacter = (name?: string , status?: string , gender?: string) =>{
        let url : string = `https://rickandmortyapi.com/api/character/?`;
        
        const miArray : Array<Cositas> = [{query: "name", value: name},{query: "status", value: status}, {query: "gender", value: gender} ];

       
           
        
        let cont : number = 0;
        const url2 = miArray.reduce((acc,n)=>{
            

            if(n.value)
                if(cont == 0){
                    cont++;
                    return acc + n.query + '=' + n.value;
                    
                    
                    
                }
                else {
                    return acc + "&" + n.query + '=' + n.value;
                }
            else{
                return acc;
            }

        }, url)
    

        console.log(url2);
        const Promesa1 = axios.get(url2);

        Promesa1.then((res)=>{
            console.log(res.data.results[0].name);
        })  
        .catch((err)=>{
            console.log("la has cagado");
        })
    }
    

    getCharacter("rick");



        
        

        

    





