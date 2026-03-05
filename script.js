import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
updateDoc,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


const firebaseConfig = {

apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT.firebaseapp.com",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_PROJECT.appspot.com",
messagingSenderId: "XXXX",
appId: "XXXX"

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const users={
"Prajwal":"1234",
"Parikshith":"1234",
"Manjunath":"1234",
"Member4":"1234",
"Member5":"1234",
"Member6":"1234"
}



window.login=function(){

let u=document.getElementById("username")?.value.trim()
let p=document.getElementById("password")?.value.trim()

if(users[u]===p){

localStorage.setItem("user",u)

window.location="dashboard.html"

}
else{

alert("Invalid Login")

}

}



window.addTask=async function(){

let member=document.getElementById("member").value
let task=document.getElementById("task").value
let date=new Date().toLocaleDateString()

await addDoc(collection(db,"tasks"),{

date:date,
member:member,
task:task,
status:"Pending"

})

loadTasks()

}



async function loadTasks(){

let tbody=document.querySelector("#taskTable tbody")

if(!tbody) return

tbody.innerHTML=""

const querySnapshot=await getDocs(collection(db,"tasks"))

querySnapshot.forEach((docSnap)=>{

let t=docSnap.data()

let row=document.createElement("tr")

row.innerHTML=`

<td>${t.date}</td>
<td>${t.member}</td>
<td>${t.task}</td>
<td>${t.status}</td>

<td>
<button class="completeBtn" onclick="completeTask('${docSnap.id}')">
Complete
</button>
</td>

<td>
<button class="deleteBtn" onclick="deleteTask('${docSnap.id}')">
Delete
</button>
</td>

`

tbody.appendChild(row)

})

}



window.completeTask=async function(id){

await updateDoc(doc(db,"tasks",id),{

status:"Completed"

})

loadTasks()

}



window.deleteTask=async function(id){

await deleteDoc(doc(db,"tasks",id))

loadTasks()

}



window.onload=loadTasks
