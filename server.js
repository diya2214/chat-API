const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: false }))


const welcomeMessage = [{
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
},{
  id: 1,
  from: "Rosie",
  text: "When is the next class"
},{
  id:2,
  from: "Madi",
   text :"Hey do we have class this sunday"}]


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = welcomeMessage;


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});


app.get('/messages', function(request, response) {
  response.json(messages);
});


app.get('/messages/:id',function (request,response){
const inputId = request.params.id;
  
  response.json(messages.filter(msg=>msg.id == inputId))
})

app.get('/messages/search',function (request,response){
const text = request.query.text;
  console.log(text);
  
response.json(messages.filter(msg=>msg.text.includes(text)))})



app.post('/messages',function(request,response){
  const message = request.body;
if (message.from !="" && message.text !=""){
  message.id = messages.length;
  message.timeSent = new Date().getTime();
  messages.push(message);
  response.status(201).json(message);
} else{
         response.status(400).send('Invalid Data');
         }})


app.delete('/messages/:id',function(request,response){
  const msgId = request.params.id;
   messages = messages.filter(msg=>msg.id != msgId);
  response.status(204).send('Message Deleted')
})



app.listen(process.env.PORT);
