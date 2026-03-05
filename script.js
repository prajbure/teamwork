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

const firebaseConfig={
apiKey:"AIzaSyBbZ9VXtX5MD2N9NjjlaE8NVKDsFTRn_0A",
authDomain:"team-work-dfbf1.firebaseapp.com",
projectId:"team-work-dfbf1",
storageBucket:"team-work-dfbf1.firebasestorage.app",
messagingSenderId:"962541650355",
appId:"1:962541650355:web:6da5dbbacb04fb1c4f4bc6"
};

const app=initializeApp(firebaseConfig);
const db=getFirestore(app);

const members=[
"Prajwal",
"Parikshith",
"Manjunath",
"Chandana Hublikar",
"Hemalatha",
"Chandana G"
];

let tasks=[]
let currentTask=null

window.onload=function(){

let user=localStorage.getItem("user")

document.getElementById("welcomeUser").innerText="Logged in as: "+user

populateMembers()

loadTasks()

}

function populateMembers(){

let user=localStorage.getItem("user")

let dropdown=document.getElementById("member")

dropdown.innerHTML=""

members.forEach(m=>{

if(m!==user){

let option=document.createElement("option")
option.value=m
option.text=m
dropdown.appendChild(option)

}

})

}

window.logout=function(){

localStorage.removeItem("user")

window.location="index.html"

}

window.addTask=async function(){

let member=document.getElementById("member").value
let task=document.getElementById("task").value
let date=new Date().toLocaleDateString()
let creator=localStorage.getItem("user")

await addDoc(collection(db,"tasks"),{

date,
member,
task,
creator,
status:"Pending",
due:"",
note:""

})

loadTasks()

}

async function loadTasks(){

const snapshot=await getDocs(collection(db,"tasks"))

tasks=[]

snapshot.forEach(docSnap=>{
let t=docSnap.data()
t.id=docSnap.id
tasks.push(t)
})

renderTasks(tasks)

}

function renderTasks(list){

let tbody=document.querySelector("#taskTable tbody")
tbody.innerHTML=""

let user=localStorage.getItem("user")

list.forEach(t=>{

let row=document.createElement("tr")

row.className=t.status==="Pending"?"pending":"completed"

let button="🔒"

if(t.creator===user){
button=`<button onclick="openModal('${t.id}')">Options</button>`
}

row.innerHTML=`

<td>${t.date}</td>
<td>${t.member}</td>
<td>${t.task}</td>
<td>${t.status}</td>
<td>${t.due || "-"}</td>
<td>${t.note || "-"}</td>
<td>${button}</td>

`

tbody.appendChild(row)

})

}

window.filterTasks=function(){

let selected=document.getElementById("filterMember").value

if(selected==="all"){

renderTasks(tasks)

}else{

let filtered=tasks.filter(t=>t.member===selected)

renderTasks(filtered)

}

}

window.openModal=function(id){

currentTask=id

document.getElementById("taskModal").style.display="flex"

}

window.closeModal=function(){

document.getElementById("taskModal").style.display="none"

}

document.getElementById("completeBtn").onclick=async function(){

await updateDoc(doc(db,"tasks",currentTask),{
status:"Completed"
})

loadTasks()
closeModal()

}

document.getElementById("transferBtn").onclick=async function(){

let newMember=document.getElementById("transferMember").value

await updateDoc(doc(db,"tasks",currentTask),{
member:newMember
})

loadTasks()
closeModal()

}

document.getElementById("setDateBtn").onclick=async function(){

let date=document.getElementById("dueDate").value

await updateDoc(doc(db,"tasks",currentTask),{
due:date
})

loadTasks()
closeModal()

}

document.getElementById("saveNote").onclick=async function(){

let note=document.getElementById("noteBox").value

await updateDoc(doc(db,"tasks",currentTask),{
note:note
})

loadTasks()
closeModal()

}

document.getElementById("deleteTask").onclick=async function(){

await deleteDoc(doc(db,"tasks",currentTask))

loadTasks()
closeModal()

}
