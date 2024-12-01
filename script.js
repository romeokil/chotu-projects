let globalid=1;
let button=document.getElementById("btn");
let title=document.getElementById("title");
let description=document.getElementById("description");
let list=document.getElementById("list");
function showalltodos(){
    // console.log("show all todos function reached!")
    let storedtodos=JSON.parse(localStorage.getItem("todos")) || [];
    // if(!Array.isArray(storedtodos)){
    //     storedtodos=[];
    // }
    if(storedtodos){
        // console.log(storedtodos.length);
        list.innerHTML="";
        storedtodos.forEach(function(todos){
        let {id,title,description}=todos;
        id=todos.id;
        title=todos.title;
        description=todos.description;
        let templatechild=createElementfunc(title,description,id);
        list.appendChild(templatechild);
    })
    }
}
window.onload=showalltodos();
button.addEventListener("click", function () {
// console.log("clicked!!");
let titlevalue = title.value;
let descvalue = description.value;
title.value = "";
description.value = "";

// Create the object with id, title, and description in correct order
let obj = {
    id: globalid,
    title: titlevalue,
    description: descvalue
};

globalid++;

// Get all todos from localStorage or an empty array if none exists
let getalltodos = JSON.parse(localStorage.getItem("todos")) || [];

// Push the new todo object to the array
getalltodos.push(obj);

// Store the updated todos array back to localStorage
localStorage.setItem("todos", JSON.stringify(getalltodos));

// Show the updated todos list
showalltodos();
});

function deletethisbutton(buttonid){
    console.log(buttonid);
    let deletebutton=document.getElementById(buttonid);
    console.log(deletebutton)
    let getalltodos=JSON.parse(localStorage.getItem("todos"));
    let updatedtodos=getalltodos.filter((todos)=>todos.id!=buttonid);
    localStorage.setItem("todos",JSON.stringify(updatedtodos));
    showalltodos();
}
function editthisbutton(buttonid){
    // console.log(buttonid);
    let getalltodos=JSON.parse(localStorage.getItem("todos"))|| [];
    // console.log("sara todos",getalltodos);
    let edittodo=getalltodos.find((todos)=>todos.id==buttonid);
    // console.log("jisko edit krna hai",edittodo);
    let newtitle=prompt("Enter your new title ",edittodo.title);
    let newdescription=prompt("Enter your description",edittodo.description);
    edittodo.title=newtitle;
    edittodo.description=newdescription;
    localStorage.setItem("todos",JSON.stringify(getalltodos));
    showalltodos();
}
function createElementfunc(titlevalue,descvalue,globalid){
    let parentdiv=document.createElement("div");
    parentdiv.setAttribute("id",`${globalid}`);
    parentdiv.classList.add("flexclass")

    let iddiv=document.createElement("div");
    iddiv.innerHTML=`${globalid}`;

    let titlediv=document.createElement("div");
    titlediv.innerHTML=`${titlevalue}`;

    let descdiv=document.createElement("div");
    descdiv.innerHTML=`${descvalue}`;

    let editbutton=document.createElement("button");
    editbutton.innerHTML="Edit";
    editbutton.classList.add("editbtn");
    editbutton.setAttribute("onclick",`editthisbutton(${globalid})`)

    let deletebutton=document.createElement("button");
    deletebutton.innerHTML="Delete";
    deletebutton.classList.add("deletebtn");
    deletebutton.setAttribute("onclick",`deletethisbutton(${globalid})`)

    parentdiv.appendChild(iddiv);
    parentdiv.appendChild(titlediv);
    parentdiv.appendChild(descdiv);
    parentdiv.appendChild(editbutton);
    parentdiv.appendChild(deletebutton);
    return parentdiv;
}