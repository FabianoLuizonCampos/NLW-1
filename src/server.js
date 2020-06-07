//utiliza o framework Express
const express = require("express");
const server = express();

// pegar o banco de dados /  não necessita o .js
const db = require("./database/db.js");

// utilizando o template engine
const nunjucks = require("nunjucks");

// confifurando o template - Servidor express é o server configurado acima e o noCache para não devolver coisas antigas que ficaram no cache da página
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});


// configurar pasta publica
server.use(express.static("public"));

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended:true}));

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

    //Interação com o BD
    //req.query: Query Strings da nossa url
    // Teste: console.log(req.query) para os dados do formulario

    // Teste da pagina modal: return res.render("create-point.html", { saved: true});
    return res.render("create-point.html");
})

// Função acrescentada para realizar post para não apresentar dados no frontend, alterando a rota para o backend
server.post("/save-point", (req,res) => {
    
    //inserir dados no BD
    const query = `
        INSERT INTO places (
            image,
            name,            
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
        `;

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    
    function afterInsertData(err) {
        if(err) {
            console.log(err);

            return res.send("Erro no cadastro!!!");
        }

        // Retirar linhas para não apresentar dados no frontend somente para teste
        //console.log("Cadastro com sucesso");
        //console.log(this);

        //return res.send("ok");
        return res.render("create-point.html", { saved: true}  );
    }

    db.run(query, values, afterInsertData);    
})

server.get("/search", (req,res) => {
    // Banco de dados - Funcionalidades
    //Pegar os dados do banco de dados

    const search = req.query.search;

    if(search == "")
    {
        // pesquisa vazia
        return res.render( "search-results.html", { total: 0 });

    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        
        if(err) {
            return console.log(err);
        }
        
        const total = rows.length;

        //mostrar a página html com os dados do BD
        return res.render( "search-results.html", { places: rows, total: total });
    });
    
})

//server.get("/search-results", (req,res) => {
//    res.sendFile(__dirname + "/views/search-results.html");
//})

//ligar o servidor local na porta 3300 - localhost:3300
server.listen(3300);



