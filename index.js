const express = require("express")
const app = express()

app.get("/", (req,res)=>{
    res.send("olá mundo")
})

app.listen(3000, ()=>{
    console.log("servidor está rodando na porta 3000!")
})

