const users={
"Prajwal":"1234",
"Parikshith":"1234",
"Manjunath":"1234",
"Chandana Hublikar":"1234",
"Hemalatha":"1234",
"Chandana G":"1234"
}

window.onload=function(){

let savedUser=localStorage.getItem("rememberUser")

if(savedUser){

document.getElementById("username").value=savedUser
document.getElementById("remember").checked=true

}

}

function login(){

let username=document.getElementById("username").value.trim()
let password=document.getElementById("password").value.trim()
let remember=document.getElementById("remember").checked

if(users[username]===password){

localStorage.setItem("user",username)

if(remember){
localStorage.setItem("rememberUser",username)
}else{
localStorage.removeItem("rememberUser")
}

window.location="dashboard.html"

}else{

alert("Invalid Username or Password")

}

}
