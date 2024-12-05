
const express=require('express');
const app=express()
const hbs=require('hbs')

const session=require('express-session')
const nocache = require('nocache');


app.use(express.static('public'));
app.set('view engine','hbs')
const username='abhiram'
const password='abhiram@123'

app.use(express.urlencoded({extended:true}))
app.use(express.json())

    app.use(session({
        secret: 'abhiram',
        resave: false,
        saveUninitialized:true
    }))
    app.use(nocache())

    

    app.get('/',(req,res)=>{
        if(req.session.user){
            // res.render('home',)
            res.redirect('/home')
        }else{
            res.render('login')
        }
    })

    

    app.post('/verify',(req,res)=>{
        console.log(req.body);

        if(req.body.username===username&&req.body.password===password){
            console.log("Login SucsesFully");
            req.session.user=req.body.username
            res.redirect('/home')
        }else{
            console.log('Login Failed');
            req.session.passwordwrong=true
            res.render('login' ,{ message: 'Invalid username or password' })
        }
        
     
    })
    app.get('/home',(req,res)=>{

        if(req.session.user){
            // console.log(req.session)
            res.render('home',{username:req.session.user})
        }else{
            if(req.session.passwordwrong){
                // res.render('login' ,{ message: 'Invalid username or password' })
             return   res.redirect('/')
            }else{
                res.render('login')
            }
           
        }
    })

    app.get('/logout',(req,res)=>{ 
        req.session.destroy()
        // res.render('login',{msg:"Logged Out"})
        res.redirect('/')
        
    })
    app.get('*', (req, res) => {
        res.render('error', { errorMessage: '404 Error: Page Not Found' });
    });

app.listen(3000,()=>console.log("Server Runing On Port 3000"));
