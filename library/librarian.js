fs=require('fs');
module.exports={
    GetBook,
    DeleteBook,
    UploadBook,
    UpdateBook
}

 CheckBookInLibrary=(BookName)=>{
    var updated_index=-1;
    var library=fetchLibrary();
    var new_library=library.filter((value,index)=>{
    if(value.BookName==BookName)
        {
        updated_index=index;
        return 1;
        }
        return 0;
        });
    var ans={
        BookPresent:0,
        update_index:updated_index
    }
    if(new_library.length==1)
        {
        ans.BookPresent=1;
        }
    return ans;
}

 fetchLibrary=()=>
    {
    try
        {
        var BookArray=JSON.parse(fs.readFileSync('library.json'));
        return BookArray;
        }
    catch(e)
        {   
        return [];
        }
    }

function GetBook(BookName)
    {
    var ans=CheckBookInLibrary(BookName);
    if(ans.BookPresent==1)
        {
        var library=fetchLibrary();
        return library[ans.update_index];
        }
    return [];
    }

function  DeleteBook(BookName)
    {
    var ans=CheckBookInLibrary(BookName);
    if(ans.BookPresent==1)
        {
        var library=fetchLibrary();
        library.pop(ans.update_index);
        fs.writeFileSync('library.json',JSON.stringify(library));
        return 1;
        }
    return 0;
    }

function UpdateBook(BookNamePrevious,BookUpdated)
    {
    var ans=CheckBookInLibrary(BookNamePrevious);
    if(ans.BookPresent==1)
        {
        var  library=fetchLibrary();
        library[ans.update_index].BookName=BookUpdated.BookName;
        library[ans.update_index].Body=BookUpdated.Body;
        return 1;
        }
    var library=fetchLibrary();
    library.push(BookUpdated);
    fs.writeFileSync('library.json',JSON.stringify(library));
    return 0;
    }

function UploadBook(BookName,Body)
    {
    var ans=CheckBookInLibrary(BookName)
    if(ans.BookPresent==1)
        {
        return 0;
        }
    Book={
        BookName,
        Body
    }
    var library=fetchLibrary(); 
    library.push(Book);
    fs.writeFileSync('library.json',JSON.stringify(library)); 
    return 1;
    }