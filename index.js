import express from "express"

const app=express()     //1. Creating Express application (that handles all http requests)
const port=3000         //2. Define port for server

app.use(express.json())     //Using middleware: Any data that comes in json format from frontend will be accepted

let teaData=[]
let nextId=1

//Creating different routes to perform CRUD operations in data of server (add a tea into tea-data, get number of teas at any instant, update and delete teas)

//Type of http method used by route depends on what route does to data of server
//If u want to create data at server,use POST method. If you want to just get data of server, use get method. Update-PUT Replace-PATCH Delete-DELETE
//Route to insert new teaData
app.post('/teas',(req,res)=>{   
    const {name,price}=req.body
    const newTea={id:nextId++,name,price}
    teaData.push(newTea)
    res
    .status(200)
    .send(newTea)
})

//Route to get current teaData
app.get('/teas',(req,res)=>{
    res
    .status(200)
    .send(teaData)
})

//Route to get teaData by id
app.get('/teas/:teaId',(req,res)=>{
    const teaId=parseInt(req.params.teaId)             //Getting teaId from parameter of request
    const requestedTea=teaData.find(t=>t.id===teaId)        //Using find method of array to find element
    if(!requestedTea){
        res.status(404).send('Tea not found')
    }
    else{
        res
        .status(200)
        .send(requestedTea)
    }
})

//Route to update teaData by id
app.put('/teas/:teaId',(req,res)=>{
    const teaId=parseInt(req.params.teaId)
    const updatedTea=teaData.find(t=>t.id===teaId)
    if(!updatedTea){
        res.status(404).send('Tea not found')
    }

    const {name,price}=req.body
    for (let i = 0; i < teaData.length; i++) {  //Using for loop to search and update element
    if (teaData[i].id === teaId) {
    teaData[i].name = name;
    teaData[i].price = price;
    break; // stop once found
  }
}

    res
    .status(200)
    .send(updatedTea)
})

//Route to DELETE tea by id
app.delete('/teas/:teaId',(req,res)=>{
    const teaId=parseInt(req.params.teaId)
    const deletedTea=teaData.find(t=>t.id===teaId)
    if(!deletedTea)
        return res.status(404).send('Tea not Found')

    teaData=teaData.filter(tea => tea.id !== teaId);        //Using filter() function of array (that should return boolean value)
    res
    .status(200)
    .send(deletedTea)
})


app.listen(port,()=>{       //3. Server can listen on port with callback
    console.log(`Server is running at port: ${port}...`)
})