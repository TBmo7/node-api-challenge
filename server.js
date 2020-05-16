const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const actionRouter = require('./actions/actionsRouter')
const projectRouter = require('./projects/projectsRouter')

const server = express();

server.use(express.json());
server.use(helmet())
server.use(morgan('dev'));

server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

server.get('/', (req,res)=>{
    res.send('<h2>API CHALLENGE PROJECT HERE</h>')
})


module.exports = server;
