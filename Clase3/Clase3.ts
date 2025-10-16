import express from "express";
import cors from "cors";



const app = express();
const port = 3000;



type Person = {
    id:number,
    name:string,
    lastName:string,
    
}

let miArray : Person[] = [{id:1, name: "juan", lastName: "jose"}, {id:2, name: "jose", lastName: "perez"}]


app.use(cors())


app.get("/personas", (req, res) =>{
    res.json(miArray);
})


app.get("/personas/:id", (req, res) =>{
    const idParams = Number(req.params.id )// idParams es un string, cuidado
    const buscao = miArray.find((elem)=> elem.id === idParams)

    buscao ? res.json(buscao) : res.status(404).json({
        error: "La has cagado chaval, esa persona no existe"
    });
})




app.get("/", (req, res)=>{

    res.json({
        message: "Estas conectado capi"
    })


})



app.post("/personas/", (req, res) => {

const ultimoId = miArray.at(-1)?.id 
const nuevoId = ultimoId ? ultimoId +1 : 0;
const nuevoName = req.body.name;
const nuevolastName = req.body.lastName;
    const newPerson: Person = {
        id : nuevoId,
        name: nuevoName,
        lastName: nuevolastName
    }


    if(nuevoName && nuevolastName && typeof(nuevoName) == "string" && typeof(nuevolastName) == "string"){
        miArray.push(newPerson);

    // miArray.push(req.body)
        res.status(201).json(newPerson)
    }
    else{
        res.status(404).json({
            error: "La has cagado creando la nueva persona chaval"
        })
    }
    

});


app.put("/persons/:id", (req, res) => {
    
    const idParams = Number(req.params.id);
    miArray = miArray.map((elem) => idParams == elem.id ? {...elem, ...req.body}: elem)
    res.status(202).send("Personaje Modificado")

})
app.delete("/persons/:id", (req, res) =>{
    miArray = miArray.filter((elem) => elem.id !== Number(req.body.id))
    res.status(201).send("Personaje eliminado");
})




app.listen(port, ()=>{console.log("esto funciona y esta en el puerto 3000")})