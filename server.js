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

app.get('/update', function(request, response) {
  
  // read id, from and text in from the query strings i.e request.query.id
  const msgId = request.query.id;
  const msgName = request.query.name;
  const msgText = request.query.text;
  
  
  // if from exists, update messages[i].from
  
response.json(messages.map(msg=>{
  if (msg.id === msgId && msgName){
    return ({...msg, from: msgText})
  }
}))
  // if text exists, update messages[i].text

  
});

app.get('/messages/search',function (request,response){
const text = request.query.text;
  console.log(text);
  
response.json(messages.filter(msg=>msg.text.includes(text)))})

app.get('/messages/id/:id',function (request,response){
const inputId = request.params.id;
  
  response.json(messages.filter(msg=>msg.id == inputId))
})





app.post('/messages',function(request,response){
  const message = request.body;
if (message.from !="" && message.text !=""){
  message.id = messages.length;
  message.timeSent = new Date().toDateString();
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
