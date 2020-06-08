
var loadButton = document.querySelector('.load-data');
// requested data 
var requestdata = document.querySelector('.requested-data');
// inserted button
var insertButton = document.querySelector('.insert-data');
// inserted Data
var insertedData = document.querySelector('.inserted-data');
// fields;
var titleField = document.querySelector('#second').value;
var authorField = document.querySelector('#third').value;
// delete button

var deleteButton = document.querySelector('.delete-data')


var clicks = 0;
loadButton.addEventListener('click',(e)=>{
e.preventDefault();
    requestData('http://localhost:3000/posts');
    // getIDNUmber('http://localhost:3000/posts')
});




var myData ="";

insertButton.addEventListener('click',(e)=>
{
e.preventDefault();
getDataFromField(myData);
console.log(myData);
insertData('http://localhost:3000/posts',myData). 
then(data=>{console.log(data)});
});


// delete

deleteButton.addEventListener('click',(e)=>{
e.preventDefault();
SelectData('http://localhost:3000/posts');
getIDNUmber('http://localhost:3000/posts');
deleteData('http://localhost:3000/posts');
});





function representInsertedData(a,b)
{
    insertedData.innerHTML += `<span>The Title : ${a}</span>
    <br>
    <span> The Author : ${b} </span>
    `
}



function getDataFromField(data)
{
    var titleField = document.querySelector('#second').value;
var authorField = document.querySelector('#third').value;
   data = {
       title : titleField,
       author : authorField
   }
   myData = data;
   representInsertedData(titleField,authorField);
   return myData;

}
  // requestdata.innerHTML += `<p class="text">${x.id} : ${x.title}<p>
                // `;
                // break;


async function insertData(url,data)
{
    const insert = await fetch(url,{
        method: 'POST',
        headers: {
        'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
    return insert.json();
}



var AllData = "";
 function SelectData(url)
{
    fetch(url)
    .then(x=>{
        return x.json();
    })
    .then(dataIn =>{
     for (var i = 0 ; i < dataIn.length; i++)
     {
       AllData = dataIn;
     }}).catch(error=>console.log(error));
   return AllData;
}

// function clearData(url)
// {
//     return fetch(url,
//     {
//         method: 'DELETE'
//     })
//     .then(x=>{ x.json();
//     }).catch(error=>console.log(error));
// }

function deleteData(url) {
    var id = getIDNUmber(url);
    console.log(id);
    for(var i = 1 ; i <= id ; i++)
    {
        fetch(`${url}/${i}`, {
            method: 'DELETE'
           }
           ).catch(error=>console.log('error while making request',error));
    }
          console.log("all data deleted successfully")
    }
    

function getIDNUmber(url)
{
   var a =  SelectData(url);
   for (var i = 0 ; i < a.length ; i++)
   {
       console.log(a[a.length-1].id);
       if(a.length===0)
       {
           return 0;
       }
       else 
       {
       return a[a.length-1].id;
       }
   }
}

function requestData(url)
{
   
    fetch(url)
    .then(x=>{
        return x.json();
    })
    .then(dataIn =>{
     for (var i = 0 ; i < dataIn.length; i++)
     {
         if(getIDNUmber(url) === 0)
         {
            requestdata.innerHTML = `No Data Available`;
            break;
         }
         else
         {
             if(getIDNUmber(url) === dataIn.length)
             {
                 break;
             }
            requestdata.innerHTML += `<p class="text">${dataIn[i].id} : ${dataIn[i].title}<p>`;
            
         }
     }}).catch(error=>console.log(error))

}
