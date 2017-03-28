import env from './env'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { defaultErrorHandler, corsOptions } from './handlers'
import api from '../models'
import session from '../authentication/sessions'
import Auth from '../authentication/auth'

// ENABLE ROUTES IF USING app SIDE ROUTING
// import routes from './routes'

let app = express()
let server = require('http').createServer(app);

function Validate(req, res, next) {
    // ONLY ALLOW GET METHOD IF NOT LOGGED IN 
    if (req.method !== 'GET' && !req.session.uid) {
        return res.send({ error: 'Please Login or Register to continue' })
    }
    return next()
}

function logger(req, res, next) {
	console.log('INCOMING REQUEST', req.url)
	next()
}

// REGISTER MIDDLEWARE
app.use(session)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('*', logger)
app.use('*', cors(corsOptions))
app.use(Auth)

// LOCKS API TO REQUIRE USER AUTH
app.use(Validate)
app.use('/api', api)
app.use('/', defaultErrorHandler)

// USING SOCKETS
let io = require('socket.io')(server, {
    origins: '*:*'
})

io.on('connection', function(socket){
	socket.emit('CONNECTED', {
		socket: socket.id,
		message: 'Welcome to the Jungle'
	})

    socket.on('update', function(data){
        console.log(data)
    })

    // socket.join('Kanban', function(){
    //     io.to('Kanban').emit('message', 'A new user has joined the channel.');
    // });
    // socket.on('message', function(data){
    //     // if(data.text){
    //         // data.text = data.text.replace(/[<>]/g, '');
    //     io.to('Kanban').emit('message', data);
    // });
});

export default server