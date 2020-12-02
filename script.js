if(localStorage.length==0){
    localStorage.setItem("index",0)
}
document.querySelector("#clear").addEventListener("click",()=>{
    if(confirm("Are you sure?")){
        localStorage.clear();
        localStorage.setItem("index",0);
        display();
    }
});
function display(){
    let container=document.querySelector("#todos");
    container.innerHTML="";
    let index=localStorage.getItem("index");
    for(let i=1;i<=index;i++){
        container.innerHTML+=`<div class="todo m-2 p-2">${localStorage.getItem(i)}</div>`
    }
}
document.querySelector("#save").addEventListener("click",()=>{
    let message=document.getElementById("message");
    localStorage.setItem(parseInt(localStorage.getItem("index"))+1,message.value);
    localStorage.setItem("index",parseInt(localStorage.getItem("index"))+1);
    message.value="";
    display();
});
if(localStorage.length>1){
    display();
}
document.getElementById("search").addEventListener("keyup",()=>{
    let searchKey=document.getElementById("search").value.toLowerCase();
    let todos=document.getElementsByClassName("todo");
    for(let i=0;i<todos.length;i++){
        let msg=todos[i].innerText.toLowerCase();
        if(msg.indexOf(searchKey)>=0){
            todos[i].style.display="inherit";
        }
        else{
            todos[i].style.display="none";
        }
    }
})