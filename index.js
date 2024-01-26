//1
const Express = require('express');
const app = Express();
const bodyParser = require('body-parser');

//5
app.use(bodyParser.json())
//2


const fs = require('fs');

const readData = () => {

    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
        
    } catch (error) {
        console.log(error);
        
    }
   

}
const writeData = (data) => {

    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }

}

//1
app.get('/', (req, res)=> {
    res.send('welcome to my first api with node js');
})

//3
//obtener personajes
app.get("/personajes", (req, res ) => {
    console.log(req);
    const data = readData();
    res.json(data.personajes);
})
//4
//obtener un nuevo personaje
app.get('/personajes/:id', (req, res)=> {
    const data = readData();
    const id= parseInt(req.params.id);
    const personaje = data.personajes.find((personaje) => personaje.id === id);
    res.json(personaje);
})
//5
//crear nuevo enpoint 
app.post("/personajes", (req, res) => {
    const data = readData();
    //console.log(data.personajes);
    console.log(req);
    const body = req.body;
    //console.log(body)
    const newperson = {
        id: data.personajes.length + 1,
        ...body
    };
    //console.log(newperson);
    data.personajes.push(newperson);
    writeData(data);
    res.json(newperson);
})

//6 
//actualizar
app.put('/personajes/:id', (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const personIndex = data.personajes.findIndex((personaje) => personaje.id === id);
    data.personajes[personIndex] = {
        ...data.personajes[personIndex],
        ...body,
    }
    writeData(data);
    res.json({message: "personaje actualizado correctamente"});
});

//7
//borrar
app.delete('/personajes/:id', (req, res) => {

    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const personIndex = data.personajes.findIndex((personaje) => personaje.id === id);
    data.personajes.splice(personIndex, 1);
    writeData(data);
    res.json({message: "personaje borrado"});
})
//1
app.listen(3000, () => {
    console.log('servidor escuchando en el puerto 3000');
})