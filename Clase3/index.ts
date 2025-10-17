import axios from "axios"
import express from "express"
import cors from "cors"


const app = express()
const port = 3000;

app.use(cors())
app.use(express.json())

type Team = {

 id: number

 name: string

 city: string

 titles: number

}
let teams: Team[] = [

 { id: 1, name: "Lakers", city: "Los Angeles", titles: 17 },

 { id: 2, name: "Celtics", city: "Boston", titles: 17 },

];

app.get("/teams", (req,res) =>{
    res.json(teams)
})

app.get("/teams/:id", (req,res)=>{
    const idParams = Number(req.params.id)
    const resultado  = teams.filter((n)=> idParams === n.id)

   resultado ? res.json(resultado) : res.status(404).json({
    message: "Equipo no encontrado"
   })
})

app.post("/teams", (req, res)=>{
    const newId = Date.now()
    const newName = req.body.name
    const newCity = req.body.city
    const newTitles = Number(req.body.titles)
    const nuevoTeam : Team= {
        id: newId,
        name: newName,
        city:newCity,
        titles: newTitles

    }
    if(typeof(newId) == "number" && typeof(newName) == "string" && typeof(newCity) == "string" && typeof(newTitles) == "number"){
        teams.push(nuevoTeam)
        res.status(201).json(teams);
    }
    else{
        res.status(404).send("La has cagado chaval")
    }

})

app.delete("/teams/:id", (req, res)=>{
    const idParams = Number(req.params.id)

    const seguir = teams.some((elem) => elem.id === idParams)

    if(!seguir){
        res.status(404).send("No puedo elimiar ese equipo porque ese id no existe")
    }
    teams = teams.filter((elem)=> elem.id !== idParams)

    res.status(201).send("Eliminado correctamente")
})

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));




const testApi = async() =>{
    
    
    const todoslosEquipos = (await(axios.get("http://localhost:3000/teams"))).data
    console.log(todoslosEquipos)


    const crear : Team = {
        id: 1, name: "Bulls", city: "Chicago", titles: 6
    }
    axios.post("http://localhost:3000/teams", crear)

    const todoslosEquipos2 = (await(axios.get<Team[]>("http://localhost:3000/teams"))).data
    console.log(todoslosEquipos2)

    const miTeam : Team | undefined= todoslosEquipos2.find((n : Team)=>{
        return n.name === "Bulls"
    })
    
    const miID : number | undefined = miTeam?.id
    if(miID){
        axios.delete(`http://localhost:3000/teams/${miID}`)
    }

   
    
    const todoslosEquipos3=  (await(axios.get("http://localhost:3000/teams"))).data
    console.log(todoslosEquipos3)

    return todoslosEquipos
}

setTimeout(()=>{testApi()}, 1000)



//console.log(await(testApi()))