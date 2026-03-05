const users={
"Prajwal":"1234",
"Parikshith":"1234",
"Manjunath":"1234",
"Member4":"1234",
"Member5":"1234",
"Member6":"1234"
}

function login(){

let u=document.getElementById("username").value.trim()
let p=document.getElementById("password").value.trim()

if(users[u]===p){

localStorage.setItem("user",u)
window.location="dashboard.html"

}
else{

alert("Invalid Login")

}

}
