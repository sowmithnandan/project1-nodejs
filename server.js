library=require('./library/librarian.js');
var express=require('express');
var hbs=require('hbs');
var app=express();

var port=process.env.PORT || 3000;
app.set('view engine','hbs');
app.get('/',(req,res)=>{
    console.log(req.body.UploadName);
    res.render('inputPage.hbs',{
        CurrentYear: new Date().getFullYear()
    });
});

// if (input=='Get')
// {
// var Book=library.GetBook(cla.title);
// if(Book.lenght==0)
//     {
//     console.log('Book not found');
//     }
// else    
//     {
//     console.log('Book  found');
//     console.log(Book);
//     }
// }
// else  if(input=='Post')
// {
// var test=library.UploadBook(cla.title,cla.body);  
// if (test==0)
//     {
//     console.log('Book already Present');
//     }
// else    
//     {
//     console.log('Book Uploaded');
//     }
// }
// else if(input=='Put')
// {
// BookUpdated={
// BookName:cla.titleUpdated,
// Body:cla.body
// }
// var test=library.UpdateBook(cla.titlePrevious,BookUpdated);
// if (test==0)
//     {
//     console.log('Book Not found');
//     }
// else    
//     {
//     console.log('Book Updated');
//     }
// }
// else  if(input=='Delete')
// {
// var test=library.DeleteBook(cla.title);
// if (test==0)
//     {
//     console.log('Book Not found');
//     }
// else    
//     {
//     console.log('Book deleted');
//     } 
// }
// else    
// {
// console.log('Option not defined ');
// }

app.listen(port,()=>{
    console.log(`Open the port: ${port}`);
})