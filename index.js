const http = require("http");
const express =require("express")
const mongoose = require('mongoose');
const pug = require("pug");
const path = require("path");
const bodyParser = require("body-parser");
const port = 80;
const app = express();

app.use('/static',express.static('static'));
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))
app.use(
  bodyParser.urlencoded({
      extended: true
  })
);

app.get('/', (req, res) => {
    res.status(200).render('index.pug')
  })

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug')
})
app.get('/services',(req,res)=>{
  res.status(200).render('services.pug')
})
app.get('/about',(req,res)=>{
  res.status(200).render('about.pug')
})
app.get('/login',(req,res)=>{
  res.status(200).render('login.pug')
})
app.get('/register',(req,res)=>{
  res.status(200).render('register.pug')
})
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contact');
}
const contactSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  email:String,
  more:String
});
const loginSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email:String,
});
const registerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email:String,
});
const register = mongoose.model('register', registerSchema);
const login = mongoose.model('login', loginSchema);
const contact = mongoose.model('contact', contactSchema);
app.post('/register',(req,res)=>{
  var registerdata = new register(req.body);
  registerdata.save().then(()=>{
    res.send("Thanks for registering..")
  }).catch(()=>{
    res.status(400).send("Please enter valid details or try again later sorry for inconveniece..")
  })
})
app.post('/login',(req,res)=>{
  var logindata = new login(req.body);
  logindata.save().then(()=>{
    //res.send(alert("logging in.."))
    res.status(200).render("index.pug");
  }).catch(()=>{
    res.send(alert("Enter valid details sorry unable to login.."));
  })
})

app.post('/contact',(req,res)=>{
  var contactdata = new contact(req.body);
  contactdata.save().then(()=>{
    res.send("your contact details will be shared thanks for contacting us.")
  }).catch(()=>{
    res.status(400).send("your contact informaton will not be sended we are sorry for inconvenience.")
  })
})
app.listen(port,()=>{
    console.log(`the server is started successfully on port ${port}`);
})
