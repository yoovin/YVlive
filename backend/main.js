const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});


io.on('connection', socket=>{
    socket.on('message',({name,message}) => {
        io.emit('message',({name, message}))
        console.log(name, message)
    })
})

server.listen(3001, function(){
    console.log('listening on port 3001');
})