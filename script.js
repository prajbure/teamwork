const users={
"Prajwal":"1234",
"Parikshith":"1234",
"Manjunath":"1234",
"Member4":"1234",
"Member5":"1234",
"Member6":"1234"
}

function login(){

let u=document.getElementById("username").value
let p=document.getElementById("password").value

if(users[u]===p){

localStorage.setItem("user",u)

window.location="dashboard.html"

}

else{

alert("Invalid Login")

}

}


let tasks=JSON.parse(localStorage.getItem("tasks"))||[]

function addTask(){

let member=document.getElementById("member").value
let task=document.getElementById("task").value

let date=new Date().toLocaleDateString()

tasks.push({

date,
member,
task,
status:"Pending"

})

localStorage.setItem("tasks",JSON.stringify(tasks))

renderTable()

}


function renderTable(){

let tbody=document.querySelector("#taskTable tbody")

if(!tbody) return

tbody.innerHTML=""

tasks.forEach((t,i)=>{

let cls=t.status==="Completed"?"completed":"pending"

let buttonHTML=""

if(t.status==="Pending"){

buttonHTML=`<button class="completeBtn" onclick="completeTask(${i})">Complete</button>`

}
else{

buttonHTML=`<button class="completeBtn disabled">Completed</button>`

}

tbody.innerHTML+=`

<tr class="${cls}">

<td>${t.date}</td>

<td>${t.member}</td>

<td>${t.task}</td>

<td>${t.status}</td>

<td>${buttonHTML}</td>

<td>

<button class="deleteBtn"
onclick="deleteTask(${i})">

Delete

</button>

</td>

</tr>

`

})

}


function completeTask(i){

tasks[i].status="Completed"

localStorage.setItem("tasks",JSON.stringify(tasks))

renderTable()

}


function deleteTask(i){

tasks.splice(i,1)

localStorage.setItem("tasks",JSON.stringify(tasks))

renderTable()

}


function filterTasks(){

let selected=document.getElementById("filterMember").value

let rows=document.querySelectorAll("#taskTable tbody tr")

rows.forEach(row=>{

let member=row.children[1].innerText

if(selected==="all"){

row.style.display=""

}
else{

row.style.display=member===selected?"":"none"

}

})

}


renderTable()