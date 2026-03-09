const startBtn = document.getElementById("startBtn")
const quizBox = document.getElementById("quizBox")
const questionEl = document.getElementById("question")
const options = document.querySelectorAll(".option")
const paletteBox = document.getElementById("paletteBox")
const timeEl = document.getElementById("time")

const nextBtn = document.getElementById("nextBtn")
const prevBtn = document.getElementById("prevBtn")
const reviewBtn = document.getElementById("reviewBtn")

let current = 0
let answers = []
let review = []

let time = 300
let timer

startBtn.onclick = () => {

quizBox.classList.remove("hidden")
startBtn.style.display="none"

createPalette()
startTimer()
loadQuestion()

}

function startTimer(){

timer = setInterval(()=>{

time--

let minutes = Math.floor(time/60)
let seconds = time%60

if(seconds<10){
seconds="0"+seconds
}

timeEl.innerText = minutes + ":" + seconds

if(time<=0){
clearInterval(timer)
alert("Exam Finished")
}

},1000)

}

function loadQuestion(){

let q = questions[current]

questionEl.innerText = q.question

options.forEach((btn,index)=>{

btn.innerText = q.options[index]

btn.style.background="#334155"

btn.onclick=()=>{

answers[current]=btn.innerText

options.forEach(b=>b.style.background="#334155")

btn.style.background="#22c55e"

updatePalette()

}

})

updatePalette()

}

function createPalette(){

paletteBox.innerHTML=""

questions.forEach((q,i)=>{

let btn=document.createElement("button")

btn.innerText=i+1

btn.classList.add("palette-btn")

btn.onclick=()=>{

current=i
loadQuestion()

}

paletteBox.appendChild(btn)

})

}

function updatePalette(){

let buttons=document.querySelectorAll(".palette-btn")

buttons.forEach((btn,i)=>{

btn.classList.remove("active","answered","review")

if(answers[i]){
btn.classList.add("answered")
}

if(review[i]){
btn.classList.add("review")
}

if(i===current){
btn.classList.add("active")
}

})

}

nextBtn.onclick=()=>{

current++

if(current<questions.length){
loadQuestion()
}
else{
    submitQuiz()
}

}

prevBtn.onclick=()=>{

if(current>0){
current--
loadQuestion()
}

}

reviewBtn.onclick=()=>{

review[current]=true

updatePalette()

}

function saveScore(username,score){

let board = JSON.parse(localStorage.getItem("leaderboard")) || []

board.push({name:username, score:score})

board.sort((a,b)=>b.score-a.score)

localStorage.setItem("leaderboard",JSON.stringify(board))

showLeaderboard()

}

function showLeaderboard(){

let board = JSON.parse(localStorage.getItem("leaderboard")) || []

let list = document.getElementById("leaderboardList")

list.innerHTML=""

board.slice(0,10).forEach((player,i)=>{

let row = `
<tr>
<td>${i+1}</td>
<td>${player.name}</td>
<td>${player.score}</td>
</tr>
`

list.innerHTML += row

})

}

function submitQuiz(){

clearInterval(timer)

let score = 0

questions.forEach((q,i)=>{
if(answers[i] === q.answer){
score++
}
})

let username = prompt("Enter your name")

saveScore(username,score)

alert("Exam Finished! Your Score: " + score + "/" + questions.length)

}


