const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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
   text :"Hey do we have class this sunday"},
  {
    from:"johny",
   text:"hello from me ",
   id:3,
   timeSent:"Thu May 23 2019"
  },
   { 
  id:4,
  from: "peter",
   text :"No its a bank holiday"}
                      
 ]


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = welcomeMessage;


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});


app.get('/messages', function(request, response) {
  response.json(messages);
});

app.get('/messages/latest', function(request, response) {
  response.json(messages.slice(messages.length-3));
});

app.get('/update', function(request, response) {
  
  // read id, from and text in from the query strings i.e request.query.id
  const msgId = request.query.id;
  const msgName = request.query.name;
  const msgText = request.query.text;
  
  
  // if from exists, update messages[i].from
  
response.json(messages.map(msg=>{
  if (msg.id.toString() === msgId) {
    const name = msgName || msg.from;
    const text = msgText || msg.text
    
    return ({...msg, from: name, text: text})
  } else {
    return msg
  }
}))
  // if text exists, update messages[i].text

  
});

app.get('/messages/search',function (request,response){
const text = request.query.text;
  console.log(text);
  
response.json(messages.filter(msg=>msg.text.includes(text)))

})

app.get('/messages/id/:id',function (request,response){
const inputId = request.params.id;
  
  response.json(messages.filter(msg=>msg.id == inputId))
})





app.post('/messages',function(request,response){
  const message = request.body;
  // test validation with null and empty string
if (message.from != null && message.text !=null){
  message.id = messages.length;
  message.timeSent = new Date().toDateString();
  messages.push(message);
  response.status(201).json(message);
} else{
         response.status(400).send('Invalid Data');
         }})


app.delete('/messages/:id',function(request,response){
  const msgId = request.params.id;
  // use splice notfilter
  // return 404 if id doesnt exist 
   messages = messages.filter(msg=>msg.id != msgId);
  response.status(204).send('Message Deleted')
})



app.listen(process.env.PORT);
