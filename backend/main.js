const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});

let userCounter= 0
let rooms = []

io.on('connection', socket=>{
    userCounter++
    rooms.push({roomId: new Date().getTime().toString(36), member:[]})

    // 3초마다 현재 이용자 수를 보내줌
    setInterval(() => {
        io.emit("userCounter", userCounter.toString())
    }, 3000)

    // 방에 들어갈 경우
    socket.on("joinRoom", () => {
        // 사람이 모자란 방이 있는지 확인
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i].member.length < 3){
                socket.join(rooms[i].roomId)
                rooms[i].member.push(socket.id)
                socket.emit("roomId", rooms[i].roomId)
                console.log(rooms[i].roomId)
                break
            }
        }
    })

    // 방에서 나올 경우
    socket.on("leaveRoom", (roomId) => {
        //그 방에 있는 인원 스스로 나감
        socket.leave(roomId)
    })

    socket.on("leaveAll", (roomId) => {
        //그 방에 있는 인원 모두 내보내는 시그널을 보냄
        io.to(roomId).emit('message', {name:"notion", message:"연결이 끊겼습니다."})
        io.to(roomId).emit("signal", "leaveRoom")
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i].roomId == roomId){
                rooms[i].member = []
            }
        }
    })

    // 메세지 받음
    socket.on('message',({name, message, roomId}) => {
        io.to(roomId).emit('message',({name, message}))
        console.log(name, message, roomId)
    })
})

server.listen(3001, function(){
    console.log('listening on port 3001');
})