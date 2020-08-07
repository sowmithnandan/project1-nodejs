library=require('./library/librarian.js');
bodyParser=require('body-parser')
var express=require('express');

var hbs=require('hbs');
var app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
var port=process.env.PORT || 3000;
app.set('view engine','hbs');
app.get('/',(req,res)=>{
   
    res.render('inputPage.hbs',{
        CurrentYear: new Date().getFullYear()
    });
});
var input,UploadName,UploadBody,UpdateNameBefore,UpdateNameAfter, UpdateBodyAfter,DeleteName,SearchName;
app.post('/',(req,res)=>{
    UploadName=req.body.UploadName;
    UploadBody=req.body.UploadBody;
    UpdateNameBefore=req.body.UpdateNameBefore;
    UpdateNameAfter=req.body.UpdateNameAfter;
    UpdateBodyAfter=req.body.UpdateBodyAfter;
    DeleteName=req.body.DeleteName;
    SearchName=req.body.SearchName;
    console.log(req.body.UploadName);
    if(UploadName !=undefined && UploadBody==undefined)
        {
        input=Post;
        }
    if(DeleteName !=undefined )
        {
        input=Delete;
        }
    if(SearchName !=undefined )
        {
        input=Get;
        }
    if(UpdateNameBefore !=undefined && UpdateNameAfter==undefined &&  UpdateBodyAfter!=undefined)
        {
        input=Put;
        }    
    res.render('inputPage.hbs',{
        CurrentYear: new Date().getFullYear()
    });
});

if (input=='Get')
{
var Book=library.GetBook(SearchName);
if(Book.lenght==0)
    {
    console.log('Book not found');
    }
else    
    {
    console.log('Book  found');
    console.log(Book);
    }
}
else  if(input=='Post')
{
var test=library.UploadBook(UploadName, UploadBody);  
if (test==0)
    {
    console.log('Book already Present');
    }
else    
    {
    console.log('Book Uploaded');
    }
}
else if(input=='Put')
{
BookUpdated={
BookName:UpdateNameAfter,
Body: UpdateBodyAfter
}
var test=library.UpdateBook(UpdateNameBefore,BookUpdated);
if (test==0)
    {
    console.log('Book Not found');
    }
else    
    {
    console.log('Book Updated');
    }
}
else  if(input=='Delete')
{
var test=library.DeleteBook(DeleteName);
if (test==0)
    {
    console.log('Book Not found');
    }
else    
    {
    console.log('Book deleted');
    } 
}
else    
{
console.log('Option not defined ');
}

app.listen(port,()=>{
    console.log(`Open the port: ${port}`);
})