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

apiKey: "AIzaSyBbZ9VXtX5MD2N9NjjlaE8NVKDsFTRn_0A",
authDomain: "team-work-dfbf1.firebaseapp.com",
projectId: "team-work-dfbf1",
storageBucket: "team-work-dfbf1.firebasestorage.app",
messagingSenderId: "962541650355",
appId: "1:962541650355:web:6da5dbbacb04fb1c4f4bc6",
measurementId: "G-8HR15K2842"

};


const app=initializeApp(firebaseConfig);
const db=getFirestore(app);



// ADD TASK
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



// LOAD TASKS
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
<button onclick="completeTask('${docSnap.id}')">Complete</button>
</td>

<td>
<button onclick="deleteTask('${docSnap.id}')">Delete</button>
</td>

`

tbody.appendChild(row)

})

}



// COMPLETE TASK
window.completeTask=async function(id){

await updateDoc(doc(db,"tasks",id),{

status:"Completed"

})

loadTasks()

}



// DELETE TASK
window.deleteTask=async function(id){

await deleteDoc(doc(db,"tasks",id))

loadTasks()

}



window.onload=loadTasks
