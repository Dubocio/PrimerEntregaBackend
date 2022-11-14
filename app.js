const express = require('express');
require('dotenv').config();
const {json, urlencoded} = express;
const logger = require('morgan'); 
const {Server: HttpServer} =require('http');
const {Server: IoServer} = require('socket.io');
const app = express();
const http = new HttpServer(app);
const io = new IoServer(http);
const routerProducts = require("./src/routes/products");
const routerCart = require("./src/routes/cart");
app.use(json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger('dev'));
app.get('/health', async (_req, res) =>{
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || 'undefined',
        health: 'Up!'
    })
}) 
app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);
//app.get('*', (_req, res)=>{
//    res.sendFile('index.html', {root: __dirname});
//})

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => console.info(`Server Up and running on port ${PORT}`))

io.on('connection', socket => {
    console.log("Nuevo cliente conectado", socket.id);
    socket.emit('CONNECTION_SUCCESS', {message: `Bienvenido, tu id es: ${socket.id}`})
})