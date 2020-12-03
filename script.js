if(localStorage.length==0){
    localStorage.setItem("index",0);
    localStorage.setItem("todos","");
    localStorage.setItem("mailId",prompt("Enter your Mail-Id for future purposes : "));
}
document.querySelector("#clear").addEventListener("click",()=>{
    if(confirm("Are you sure?")){
        localStorage.setItem("index",0);
        localStorage.setItem("todos","");
        display();
    }
});
function sendMail(e){
    while(localStorage.getItem("mailId")==="null" || localStorage.getItem("mailId")===""){
        localStorage.setItem("mailId",prompt("Enter your Mail-Id : "));
    }
    let msg=e.parentNode.innerText.replace(e.innerText,"");
    Email.send({
        Host: "Smtp.gmail.com",
        Username: "sender@email_address.com",
        Password: "Enter your password",
        To: localStorage.getItem("mailId"),
        From: "sender@email_address.com",
        Subject: "Your Todo",
        Body: msg,
    }).then(function(message){
        confirm("Sent..");
    })
}
function display(){
    let container=document.querySelector("#todos");
    container.innerHTML="";
    let index=localStorage.getItem("index");
    for(let i=1;i<=index;i++){
        container.innerHTML+=`<div class="todo m-2 p-2">${localStorage.getItem("todos").split("@$")[i]}<button onclick="sendMail(this)" name="mail" class="btn btn-default float-right btn-sm p-0" title="Mail Todo">Share</button></div>`
    }
}
document.querySelector("#save").addEventListener("click",()=>{
    let message=document.getElementById("message");
    localStorage.setItem("todos",localStorage.getItem("todos")+"@$"+message.value);
    localStorage.setItem("index",parseInt(localStorage.getItem("index"))+1);
    message.value="";
    display();
});
if(localStorage.getItem("todos").length>1){
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