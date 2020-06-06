//utiliza o framework Express
const express = require("express");
const server = express();

// utilizando o template engine
const nunjucks = require("nunjucks");

// confifurando o template - Servidor express é o server configurado acima e o noCache para não devolver coisas antigas que ficaram no cache da página
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});


// configurar pasta publica
server.use(express.static("public"));

// configura caminhos da minha aplicação
// página inicial

// req: Requisição
// res: Resposta

// Alterando a rota após o nunjucks
//server.get("/", (req,res) => {
    //res.send("Cheguei Aqui");

//    res.sendFile(__dirname + "/views/index.html");
//})

server.get("/", (req,res) => {
    return res.render("index.html");
})

server.get("/create-point", (req,res) => {
    return res.render("create-point.html");
})

server.get("/search", (req,res) => {
    return res.render("search-results.html");
})

//server.get("/search-results", (req,res) => {
//    res.sendFile(__dirname + "/views/search-results.html");
//})

//ligar o servidor local na porta 3300 - localhost:3300
server.listen(3300);



