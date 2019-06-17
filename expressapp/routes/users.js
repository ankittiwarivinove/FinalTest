var express = require('express');
var router = express.Router();
var User = require('../models/user');
var { Employee } = require('../models/employee');
var passport = require('passport');
var ObjectId = require('mongoose').Types.ObjectId;
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var nodemailer = require('nodemailer');

router.post('/register', function (req, res, next) {
   addToDB(req, res);
  
});


async function addToDB(req, res) {

  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

router.get('/user',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}



// => localhost:3000/employees/
router.get('/', (req, res) => {
  console.log('hello')
  Employee.find((err, docs) => {
      if (!err) { 
        res.send(docs); 
        //console.log(docs);
      }
      else { res.send(err) }
  });
});

router.get('/:id', (req, res) => {console.log('hello')
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  Employee.findById(req.params.id, (err, doc) => {console.log('edit')
      if (!err) { res.send(doc);console.log(doc) }
      else { res.send(err)}
  });
});

router.post('/', (req, res) => {
  var emp = new Employee({
      name: req.body.name,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary,
  });
  emp.save((err, doc) => {
      if (!err) { res.send(doc); }
      else { res.send(err) }
  });
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  var emp = {
      name: req.body.name,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary,
  };
  Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
      if (!err) { res.send(doc); }
      else { res.send(err) }
  });
});


router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { res.send(err) }
  });
});


router.post('/sendMail',isValidUser,(req,res)=>{
   var email=req.body.email;
   var message=req.body.message;
   var subject =req.body.subject;
   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ankitcs0028@gmail.com',
      pass: 'Ankit@123'
    }
  });
  
  var mailOptions = {
    from: 'ankitcs0028@gmail.com',
    to: email,
    subject: subject,
    text: message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.send(err)
    } else {
      console.log('Email sent: ' + info.response);
      res.send(doc)
    }
  });


})

module.exports = router;
