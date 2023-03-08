const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');
const postagem = require('./models/Post.js');


//Configurar passagem do metro post pelo proprio express
// não estou utilizando o body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Configurar o handlebars
// Template engine
layoutsDir: __dirname + '/views/layouts',
    //Abaixo foi dada permissão de acesso ao handlebars para visualizar dados do banco de daddos

    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }));

app.get("/formulario", function (req, res) {
    res.render('layouts/formulario');
});

app.get("/editar", function (req, res) {
    res.render('layouts/editar');
});

app.post("/atualizar", function (req, res) {
id=  req.body.id;
//res.send("valor: " + req.body.id+ req.body.titulo+ req.body.conteudo);

const idPost = req.body.id;
     postagem.update({

         titulo: req.body.titulo,
         conteudo: req.body.conteudo
        
        
        } , {where : {id :idPost}}).then(function (){
            res.send('Atualizado com sucesso <p><a href="/editar"> clique aqui para voltar<a><p>');
        }).catch(function (erro){
            res.send('Arquivo não atualizado <p><a href="/editar"> clique aqui para voltar<a><p>, ' + erro);
        });
});



app.post("/excluir", function (req, res) {
    id=  req.body.id;
    //res.send("valor: " + req.body.id+ req.body.titulo+ req.body.conteudo);
    
    const idPost = req.body.id;
         postagem.destroy(


             {where : {id : idPost}}).then(function (){
                res.send('Excluido com sucesso <p><a href="/deletar"> clique aqui para voltar<a><p>');
            }).catch(function (erro){
                res.send('Arquivo não atualizado <p><a href="/formulario"> clique aqui para voltar<a><p>, ' + erro);
            });
      
    
    });
app.get("/deletar", function (req, res) {
        res.render('layouts/deletar');
    });
    

app.get("/listar", function (req, res) {
    postagem.allowMethods
    postagem.findAll().then(function (posts) {
        res.render('layouts/listar', { p: posts });
    });
});

app.post("/salvar", function (req, res) {
    postagem.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        res.send('Criado com sucesso <p><a href="/formulario"> clique aqui para voltar<a><p>');
    }).catch(function (erro) {
        res.send('houve um erro: ' + erro);
    })
});


app.set('view engine', 'handlebars');

app.listen(8081, function () {
    console.log("servidor rodando na porta 8081");
});

