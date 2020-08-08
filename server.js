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
   
    res.render('LoginPage.hbs',{
        CurrentYear: new Date().getFullYear()
    });
});

app.get('/Main',(req,res)=>{
   
    res.render('inputPage.hbs',{
        CurrentYear: new Date().getFullYear()
    });
});
var UploadName,UploadBody,UpdateNameBefore,UpdateNameAfter, UpdateBodyAfter,DeleteName,SearchName, message,UserName,Password;
var NewUser={
    UserName:'Sowmith',
    Password:'pygame'
}
var NewUserArray=[];
NewUserArray.push(NewUser);
fs.writeFileSync('Users.json',JSON.stringify(NewUserArray));
app.post('/',(req,res)=>{
    var Users,array,value;
    UserName=req.body.UserName;
    Password=req.body.Password;
    // console.log(req.body.Login);
    // console.log(req.body.Signin);
    if(req.body.Login==undefined)
        {
        value=1;
        }
    if(req.body.Signin==undefined)
        {
        value=2;
        }
    console.log(value);
    if(value==2)
        {
        try {
            Users=JSON.parse(fs.readFileSync('Users.json'));
            array=Users.filter((value,index)=>{
                if(value.UserName==UserName && value.Password==Password)
                    {
                    return 1;
                    }
                return 0;
            });    
            if(array.length==1)
                {
                res.render('inputPage.hbs')
                }
            else    
                {
                res.render('NotregisteredUser.hbs')
                }
        }
        catch(e)
            {
            console.log('In catch loop');
            console.log(e);
            res.render('NotregisteredUser.hbs')
            }    
        }
    else    
        {
        try{
        NewUser={
            UserName:UserName,
            Password:Password
            }
        var NewUserArray;
        NewUserArray=JSON.parse(fs.readFileSync('Users.json'));
        NewUserArray.push(NewUser);
        console.log(NewUserArray);
        fs.writeFileSync('Users.json',JSON.stringify(NewUserArray));
        res.render('SignInComplete.hbs');
        }
        catch(e)
            {
            console.log(e);
            res.render('SignInIncomplete.hbs');
            }
        }
});
app.post('/Main',(req,res)=>{
    UploadName=req.body.UploadName;
    UploadBody=req.body.UploadBody;
    UpdateNameBefore=req.body.UpdateNameBefore;
    UpdateNameAfter=req.body.UpdateNameAfter;
    UpdateBodyAfter=req.body.UpdateBodyAfter;
    DeleteName=req.body.DeleteName;
    SearchName=req.body.SearchName;
    // console.log(req.body.UploadName);
    if(UploadName !=undefined && UploadBody!=undefined)
        {
        var test=library.UploadBook(UploadName, UploadBody);  
        console.log(UploadName);
        console.log(UploadBody);
        if (test==0)
            {
            console.log('Book already Present');
            message='Book already Present';
            }
        else    
            {
            console.log('Book Uploaded');
            message='Book Uploaded';;
            }
        }
    else if(DeleteName !=undefined )
        {
        var test=library.DeleteBook(DeleteName);
        if (test==0)
            {
            console.log('Book Not found');
            message='Book Not found';
            }
        else    
            {
            console.log('Book deleted');
            message='Book deleted';
            } 
        }
    else if(SearchName !=undefined )
        {
        var Book=library.GetBook(SearchName);
        if(Book.lenght==0)
            {
            console.log('Book not found');
            message='Book not found';
            }
        else    
            {
            console.log('Book  found');
            console.log(Book);
            message='Book  found';
            }

        }
    else if(UpdateNameBefore !=undefined && UpdateNameAfter!=undefined &&  UpdateBodyAfter!=undefined)
        {
        BookUpdated={
            BookName:UpdateNameAfter,
            Body: UpdateBodyAfter
            }
        var test=library.UpdateBook(UpdateNameBefore,BookUpdated);
        if (test==0)
            {
            console.log('Book Not found');
            message='Book Not found';
            }
        else    
            {
            console.log('Book Updated');
            message='Book Updated';
            }
        }   
    else 
        {
        console.log('Option not defined ');
        message='Option not defined ';
        }
    res.render('response.hbs',{
        CurrentYear: new Date().getFullYear(),
        FlagValue:message,
        Message:message
    });
});

// input ='Get';
// console.log(input);
// if (input=='Get')
// {

// }
// else  if(input=='Post')
// {

// }
// else if(input=='Put')
// {

// }
// else  if(input=='Delete')
// {

// }
// else    
// {

// }

app.listen(port,()=>{
    console.log(`Open the port: ${port}`);
})