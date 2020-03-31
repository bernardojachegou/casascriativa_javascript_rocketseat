// configuração do express para configurar meu servidor
const express = require('express');
const server = express();

server.use(express.static("public"));

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
            title: "Cursos de Programação",
                category: "Estudo",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit tempora",
                        url: "http://www.rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
            title: "Exercícios",
                category: "Saúde",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit tempora",
                        url: "http://www.rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
            title: "Meditação",
                category: "Saúde",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit tempora",
                        url: "http://www.rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
            title: "Karakokê",
                category: "Diversão",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit tempora",
                        url: "http://www.rocketseat.com.br"
    }
]



// configuração do nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

//Criação de Rota
server.get("/", function (request, response) {

    const reversedIdeas = [...ideas].reverse()
    
    const lastIdeas = []
    for (let idea of reversedIdeas) {
        if(lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    return response.render("index.html", { ideas: lastIdeas})
});

server.get("/ideas", function (request, response) {

    const reversedIdeas = [...ideas].reverse()

    return response.render("ideas.html", { ideas: reversedIdeas})
});

server.listen(3000);
