const express = require("express")
const app = express()
const mysql = require("mysql2")

app.get("/", (req,res)=>{
    res.render('home')
})



// --Configurando o Handlebars 
// -Para baixar o Handlebars: npm i express-handlebars
const exphbs=require("express-handlebars")
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// --Definindo uma pasta de arquivos estáticos 
app.use(express.static('public'))

// criando uma conexão com o MYSQL:
const conexao = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database:"todo.app",
    // Caso o banco de dados esteja rodando na porta 3307 é necessario mudar a port a baixo para port: 3307
    port: 3306
})

conexao.connect((erro)=>{
    if (erro){
        console.log(erro)
    } 
    
    console.log("conectado ao mysql")

    app.listen(3000, ()=>{
        console.log("Servidor rodando na porta 3000")
    })
})
