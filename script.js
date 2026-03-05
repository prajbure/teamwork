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
appId: "1:962541650355:web:6da5dbbacb04fb1c4f4bc6"

};


const app=initializeApp(firebaseConfig);
const db=getFirestore(app);

let allTasks=[];



window.addTask=async function(){

let member=document.getElementById("member").value
let task=document.getElementById("task").value
let date=new Date().toLocaleDateString()

await addDoc(collection(db,"tasks"),{

date,
member,
task,
status:"Pending"

})

loadTasks()

}



async function loadTasks(){

const querySnapshot=await getDocs(collection(db,"tasks"))

allTasks=[]

querySnapshot.forEach((docSnap)=>{

let t=docSnap.data()

t.id=docSnap.id

allTasks.push(t)

})

renderTasks(allTasks)

}



function renderTasks(tasks){

let tbody=document.querySelector("#taskTable tbody")

tbody.innerHTML=""

tasks.forEach((t)=>{

let row=document.createElement("tr")

row.innerHTML=`

<td>${t.date}</td>
<td>${t.member}</td>
<td>${t.task}</td>
<td>${t.status}</td>

<td>
<button onclick="completeTask('${t.id}')">Complete</button>
</td>

<td>
<button onclick="deleteTask('${t.id}')">Delete</button>
</td>

`

tbody.appendChild(row)

})

}



window.filterTasks=function(){

let selected=document.getElementById("filterMember").value

if(selected==="all"){

renderTasks(allTasks)

}
else{

let filtered=allTasks.filter(t=>t.member===selected)

renderTasks(filtered)

}

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
