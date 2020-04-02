// configuração do express para configurar meu servidor
const express = require('express');
const server = express();

const db = require('./db');

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }))

// configuração do nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

//Rendeniza a página inicial
server.get("/", function (request, response) {
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return response.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return response.render("index.html", { ideas: lastIdeas })
    })
})

//Rendeniza a página de ideias
server.get("/ideas", function (request, response) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return response.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()
        return response.render("ideas.html", { ideas: reversedIdeas })
    })
});

server.post("/", function (request, response) {
    const query = `
    INSERT INTO ideas(
        image,
        title, 
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `

    const values = [
        request.body.image,
        request.body.title,
        request.body.category,
        request.body.description,
        request.body.link,
    ]

    //INSERIR DADOS NA TABELA
    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return response.send("Erro no banco de dados!")
        }

        return response.redirect("/ideas")
    });
});

server.listen(3000);