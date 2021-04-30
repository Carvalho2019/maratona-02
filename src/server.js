const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");
//usando template engine
server.set("view engine", "ejs");
// Mudando a localização da pasta views, dizer ao server onde está a views
server.set('views', path.join(__dirname, 'views'));
//habilitar o request.body
server.use(express.urlencoded());
//habilitar arquivos estáticos
server.use(express.static("public"));
//Routes
server.use(routes);
server.listen(3300, () => console.log('Server running'));
