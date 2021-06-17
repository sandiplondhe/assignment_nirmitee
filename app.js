const express=require('express');
const app=express();
const { PORT,DB } = require("./config");
const { connect } = require("mongoose");
const bodyparser=require('body-parser')
const cors=require('cors');
const passport=require('passport');
const { success, error } = require("consola");
var cookieSession = require('cookie-session')
require('./passport/passport-setup');

app.use('/uploads', express.static('uploads'));
app.use(passport.initialize());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

app.use(cookieSession({
  name: 'signAppSession ',
  keys: ['key1', 'key2']
}))

const isLoggedIn=(req,res,next)=>{
  if(req.user){
    next();
  }else{
    res.sendStatus(401)
  }
}
app.get('/',(req,res)=>{
    res.send("Home")
});
// Oauth Start 
app.get('/failed',(req,res)=>{
  res.send("Failed to Login")
});

app.get('/success',isLoggedIn,(req,res)=>{
  console.log(res);
  res.send(`Welcome ${req.user.displayName}!`)
});

app.use('/api/products',require('./routes/product'));
app.use('/api/users',require('./routes/users'));

app.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) { 
    // Successful authentication, redirect home.
    res.redirect('/success');
  });

  app.get('/logout',(req,res)=>{
    req.session=null;
    req.logout();
    res.redirect('/');
  })
// Oauth end
const startApp = async () => {
    try {
      await connect(DB, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
  
      success({
        message: `Successfully connected with the Database`,
        badge: true
      });
      app.listen(PORT, () =>
        success({ message: `Server started on PORT ${PORT}`, badge: true })
      );
    } catch (err) {
      error({
        message: `Unable to connect with Database \n${err}`,
        badge: true
      });
      startApp();
    }
  };
  
startApp();
