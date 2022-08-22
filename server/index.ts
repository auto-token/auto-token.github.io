import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import WebSocketServerModel from './server'
const app = express();

app.use(cors({
    methods:['GET','POST'],
    origin: true,
    // credentials
}))

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));

app.get('/', function (req, res) {
    res.send('Websocket Server root endpoindddt');
});

const httpServer = http.createServer(app);
export const wss: WebSocketServerModel = new WebSocketServerModel({
    server: httpServer,
});


httpServer.listen(8888, async function (){
    console.log('Websocket Server On')
})


// import {Server} from './server'


// const server = new Server();

// server.start(9999)