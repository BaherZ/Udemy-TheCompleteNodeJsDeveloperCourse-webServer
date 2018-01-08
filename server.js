var express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs')
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
})


app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log',log+"\n",(err)=>{
		console.log(err);
	})
	next();
});
app.use((req,res,next)=>{
	res.render('maintainence.hbs');
})
app.use(express.static(__dirname+'/public'));


app.get('/',(req,res)=>{
	res.render('home.hbs',{pageTitle:'Home Page',welcomeMessage:'Welcome to my WebSite'});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{pageTitle:'About Page'});
});

app.listen(port,()=>{
	console.log(`server is up on port ${port}`);
});