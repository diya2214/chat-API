const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: false }))


const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage,{"from":"madi","text":"hey do we have class this sunday","id":1}]


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});


app.get('/messages', function(request, response) {
  response.json(messages);
});


app.get('/messages/:id',function (request,response){
const inputId = request.params.id;
  console.log(inputId)
 
  response.json(messages.filter(msg=>{msg.id == inputId}))
})

app.post('/messages',function(request,response){
  const message = request.body;
  message.id = messages.length;
  messages.push(message);
  response.status(201).json(message);
})


app.delete('/messages/:id',function(request,response){
  const msgId = request.params.id;
  const messages = messages.filter(msg=>{msg.id != msgId});
  response.status(204).send('Message Deleted')
})



app.listen(process.env.PORT);
