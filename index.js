const express = require("express")
const app = express()
const mysql = require("mysql2")

app.get("/", (req,res)=>{
    const sql = 'SELECT * FROM tarefas'

    conexao.query(sql,(erro,dados)=>{
        if (erro) {
            return console.log(erro)
        }

        const tarefas = dados.map((dado)=>{
            // Convertendo cada um dos itens da lista em um objeto que tem true ou false
            return{
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0 ? false : true
            }
        })

        const tarefasAtivas = tarefas.filter((tarefa)=>{
           return tarefa.completa === false && tarefa
        })

        const quantidadeTarefasAtivas = tarefasAtivas.length

        res.render('home',{ tarefas, quantidadeTarefasAtivas })

    })
})

app.get('/ativas', (req,res)=>{
    const sql = `
        SELECT * FROM tarefas
        WHERE completa = 0
    `

    conexao.query(sql, (erro,dados)=>{
        if (erro){
            return console.log(erro)
        }

        const tarefas = dados.map((dado)=>{
            return{
                id: dado.id,
                descricao: dado.descricao,
                completa: false
            }
        })

        const quantidadeTarefas = tarefas.length

        res.render('ativas', { tarefas, quantidadeTarefas})
    })
})


app.get('/completas', (req,res)=>{
    const sql = `
        SELECT * FROM tarefas
        WHERE completa = 1
    `

    conexao.query(sql, (erro,dados)=>{
        if (erro){
            return console.log(erro)
        }

        const tarefas = dados.map((dado)=>{
            return{
                id: dado.id,
                descricao: dado.descricao,
                completa: true
            }
        })

        const quantidadeTarefas = tarefas.length
        res.render('completas', { tarefas, quantidadeTarefas})
    })
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
        return console.log(erro)
    } 
    
    console.log("conectado ao mysql")

    app.listen(3000, ()=>{
        console.log("Servidor rodando na porta 3000")
    })
})

// Convertendo a informação do HTML para que o js entenda

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

// ROTAS para realizar o CRUD

app.post("/criar", (req,res)=>{
    const descricao= req.body.descricao 
    const completa = 0

    const sql = `
        INSERT INTO tarefas(descricao, completa)
        VALUES ('${descricao}', '${completa}')
    `

    conexao.query(sql, (erro)=>{
        if (erro){
            return console.log(erro)
        }

        res.redirect('/')
    })
})

app.post('/completar', (req,res)=>{
    const id = req.body.id

    const sql = `
        UPDATE tarefas
        SET completa = '1'
        WHERE id = ${id}
    `

    conexao.query(sql, (erro)=>{
        if (erro) {
            return console.log(erro)
        }

        res.redirect('/')
    })
})

app.post('/descompletar',(req,res)=>{
    const id = req.body.id

    const sql = `
        UPDATE tarefas
        SET completa = '0'
        WHERE id = ${id}
    `

    conexao.query(sql, (erro)=>{
        if (erro) {
            return console.log(erro)
        }

        res.redirect('/')
    })
})

app.post('/excluir', (req,res)=>{
    const id = req.body.id

    const sql = `
        DELETE FROM tarefas
        WHERE id = ${id} 
    `

    conexao.query(sql, (erro)=>{
        if(erro) {
            return console.log(erro)
        }

        res.redirect('/')
    })
})

app.get('/limparTarefas', (req,res)=>{
    const sql = `
        DELETE FROM tarefas
    `
    conexao.query(sql, (erro)=>{
        if (erro){
            console.log(erro)
        }

        res.redirect('/')
    })
})
