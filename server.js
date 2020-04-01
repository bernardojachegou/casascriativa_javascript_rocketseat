// configuração do express para configurar meu servidor
const express = require('express');
const server = express();

// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//             title: "Cursos de Programação",
//                 category: "Estudo",
//                     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit tempora",
//                         url: "http://www.rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//             title: "Exercícios",
//                 category: "Saúde",
//                     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit tempora",
//                         url: "http://www.rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//             title: "Meditação",
//                 category: "Saúde",
//                     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit tempora",
//                         url: "http://www.rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//             title: "Karakokê",
//                 category: "Diversão",
//                     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit tempora",
//                         url: "http://www.rocketseat.com.br"
//     }
// ]


server.use(express.static("public"));

// configuração do nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure("views", {
    express: server,
    noCache: true,
})


//Rendeniza a página inicial
server.get("/", function (request, response) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) return console.log(err)

        console.log(rows)

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
        if (err) return console.log(err)

        const reversedIdeas = [...rows].reverse()
        return response.render("ideas.html", { ideas: reversedIdeas })

    })

});

server.listen(3000);