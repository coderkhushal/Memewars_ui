
const express = require('express');
const { createServer } = require('node:http');
const cors = require("cors")
var bodyParser = require('body-parser')

const { Server } = require('socket.io');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const server = createServer(app);
const io = new Server(server, {
  cors: {
    allowedHeaders: ["*"],
    origin: "*"
  }
})

// sample rooms object
// {
// room_id: { user1: { score : }, user2:{ score: } } ,
// room_id: { user1: { score : }, user2:{ score: } }
// }
let rooms = {
  "abc": { user1: { score: 50 }, user2: { score: 50 }, timer: false, time: 10, topic: "cats" },
  "abcd": { user1: { score: 40 }, user2: { score: 60 }, timer: false, time: 0, topic: "dogs" },
}
app.get("/:id", (req, res) => {
  if (rooms[req.params.id]) {

    res.json({ ...rooms[req.params.id], success: true })
  }
  else {
    res.json({ "Success": false })
  }
})
io.on("connection", async (socket) => {
  //varible for timer
  let t;

  //join the room
  socket.on("joinroom", (data) => {
    socket.join(data)
  })

  // vote a user by public
  socket.on("vote", (data) => {
    let { user, roomid } = data
    // increase one score and decrease other's
    rooms[roomid][user].score++;
    if (user == "user1") { rooms[roomid]["user2"].score-- }
    else { rooms[roomid]["user1"].score-- }

    io.emit("voting", rooms[roomid])
  })
  // admin routes for starting the room
  socket.on("startroom", (data) => {
    let { roomid } = data

    //if room exists and timer is not started yet then start timer
    if (rooms[roomid] && rooms[roomid].timer == false) {
      // set timer to true and set time to 120 seconds
      rooms[roomid].timer = true;
      rooms[roomid].time = 12
      //decrement time after each 1 seconds
      t = setInterval(() => {
        rooms[roomid].time -= 1

        io.to(roomid).emit("timer", { time: rooms[roomid].time, timer: rooms[roomid].timer })
      }, 1000);
      //stop timer after maxtime seconds
      setTimeout(() => {
        clearInterval(t)
        rooms[roomid].time = 0;
        rooms[roomid].timer = false
        io.to(roomid).emit("timer", { time: rooms[roomid].time, timer: rooms[roomid].timer })
      }, rooms[roomid].time * 1000 + 2);
    }
  })

  // stop timer 
  socket.on("stoproom",(data)=>{
    let {roomid}= data
    clearInterval(t)
    if(rooms[roomid] && rooms[roomid].timer==true){
      rooms[roomid].timer= false;
      rooms[roomid].time=0;
      io.to(roomid).emit("timer", { time: rooms[roomid].time, timer: rooms[roomid].timer })
    }
  })
  
});
server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});