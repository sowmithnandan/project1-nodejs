library=require('./library/librarian.js');
yargs=require('yargs');

var titleOptions={
    describe:'Title of the Book',
    demand:true,
    alias:'t'
};
var bodyOptions={
    describe:'The data in the book',
    demand:true,
    alias:'b'
}
var cla = yargs.command('Get','To get books',{
    title:titleOptions
})
.command('Post','Upload your book',{
    title:titleOptions,
    body:bodyOptions
})
.command('Put','Update the book which is already uploaded',{
    titlePrevious:{
        describe:'Title of the Book which has to be updated',
        demand:true,
        alias:'p'
    },
    titleUpdated:{
        describe:'Title of the Updated Book',
        demand:true,
        alias:'u'
    },
    body:bodyOptions
})
.command('Delete','Delete a book which is already uploaded',{
    title:titleOptions
})
.help()
.alias('get','g')
.alias('Post','po')
.alias('Put','pu')
.alias('Delete','d')
.argv;

input =cla._[0];

if (input=='Get')
    {
    var Book=library.GetBook(cla.title);
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
    var test=library.UploadBook(cla.title,cla.body);  
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
    BookName:cla.titleUpdated,
    Body:cla.body
    }
    var test=library.UpdateBook(cla.titlePrevious,BookUpdated);
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
    var test=library.DeleteBook(cla.title);
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


