const express=require('express');
const app=express();
const port=3000;
const path=require('path');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.get('/trial',(req,res)=>{
    res.render('trial.ejs');
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});