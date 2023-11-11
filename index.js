const express = require("express")
const app = express()

app.get("/", (req,res)=>{
    res.render('home')
})

app.listen(3000, ()=>{
    console.log("servidor está rodando na porta 3000!")
})

// --Configurando o Handlebars 
// -Para baixar o Handlebars: npm i express-handlebars
const exphbs=require("express-handlebars")
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// --Definindo uma pasta de arquivos estáticos 
app.use(express.static('public'))




