const addNewNoteDiv = document.getElementById('new-note-creator')
const insertNoteDiv = document.getElementById('insert-note-div')
const hiddenDiv = document.getElementById('note-creator')
const notesContainer = document.getElementById('notes-Container')
const createNoteBtn = document.getElementById('new-note-btn')
const closeNoteBtn = document.getElementById('close-note-btn')
const noteContainer = document.querySelector('note-container')
const createNoteBtnTodo = document.getElementById('new-note-btn2')
const closeNoteBtnTodo = document.getElementById('close-note-btn2')
const addTodoBtn = document.getElementById('add-todo-btn')
const newTodoLiContainer = document.getElementById('add-todo')
const todoRowContiner = document.getElementById('todo-row-container')
const defeaultNoteTitle = document.getElementById('new-note-title').textContent
const defeaultNoteContent = document.getElementById('new-note-content').textContent
const defeaultLiContent  = "Inset a todo"
let currentNote

insertNoteDiv.addEventListener("click",openNoteDivCreator)
createNoteBtn.addEventListener('click',addNewNote)
closeNoteBtn.addEventListener('click',closeNoteDivCreator)
notesContainer.addEventListener('dblclick',modifyEsistentNote)
addTodoBtn.addEventListener('click',openNewTodoDiv)
createNoteBtnTodo.addEventListener('click',addNewTodos)
closeNoteBtnTodo.addEventListener('click', closeTodoDivCreator)

function openNoteDivCreator(e){
  e.preventDefault()

  let createNoteContainer = document.getElementById('createNoteContainer')

  addNewNoteDiv.style.display = "none"
  /*addNewNoteDiv.style.height = "0"
  addNewNoteDiv.style.border= "none"*/

  //styling the hidden
  hiddenDiv.style.display ="flex"
  hiddenDiv.style.flexDirection = "column"
  hiddenDiv.style.justifyContent = "space-around"
  hiddenDiv.style.alignContent = "center"
  hiddenDiv.style.alignItems = "center"
  hiddenDiv.style.height = "300px"
  hiddenDiv.style.border = "1px solid #ecf0f1"
  hiddenDiv.style.borderRadius = "25px"

}

function openNewTodoDiv(e) {
    e.preventDefault()

    const ulTodo = document.getElementById('new-ul-todo-list')
    const addNewLiBtn = document.getElementById('add-new-li')

    addNewNoteDiv.style.display = "none"

    newTodoLiContainer.style.display = "flex"
    newTodoLiContainer.style.flexDirection = "column"
    newTodoLiContainer.style.justifyContent = "space-around"
    newTodoLiContainer.style.alignContent = "center"
    newTodoLiContainer.style.alignItems = "center"
    newTodoLiContainer.style.height = "300px"
    newTodoLiContainer.style.border = "1px solid #ecf0f1"
    newTodoLiContainer.style.borderRadius = "25px"

}

function addNewNote(e) {
  e.preventDefault()

  const newDiv = document.createElement('div')
  const noteTitleElement = document.getElementById('new-note-title')
  const noteContentElement = document.getElementById('new-note-content')
  const noteTitle = document.getElementById('new-note-title').textContent
  const noteContent = document.getElementById('new-note-content').textContent

  currentNote = new Note(noteTitle,noteContent)

  //rehide the new note div creator
  hiddenDiv.style.display ="none"
  //restablish the prescedent div
  addNewNoteDiv.style.display = "block"

  newDiv.className = "note-container text-note"
  newDiv.setAttribute('data-aos','zoom-in')
  newDiv.setAttribute('data-aos-duration','1200')
  const newNoteHeader = document.createElement('header')
  const newNoteH3Title = document.createElement('h3')
  const newNoteContent = document.createElement('p')

  newNoteH3Title.appendChild(document.createTextNode(currentNote.title))
  newNoteContent.appendChild(document.createTextNode(currentNote.content))
  newNoteHeader.appendChild(newNoteH3Title)

  newDiv.appendChild(newNoteHeader)
  newDiv.appendChild(newNoteContent)

  notesContainer.appendChild(newDiv)

  noteTitleElement.innerText = defeaultNoteTitle
  noteContentElement.innerText = defeaultNoteContent
}

function addNewTodos(e) {
    e.preventDefault()

    const newDiv = document.createElement('div')
    const todoTitleElement = document.getElementById('new-todo-title')
    const todoUlElement = document.getElementById('new-ul-todo-list')
    const todoLiElements = document.getElementById('new-ul-todo-list').getElementsByTagName('li')
    const todoTitle = document.getElementById('new-todo-title').textContent
    const todoLi = document.getElementById('new-ul-todo-list').getElementsByTagName('li')
    const listItems = document.querySelectorAll('.todo-ul li')



    //rehide the new note div creator
    newTodoLiContainer.style.display ="none"
    //restablish the prescedent div
    addNewNoteDiv.style.display = "block"

    newDiv.className = "note-container li-note"
    const newTodoHeader = document.createElement('header')
    const newTodoH3 = document.createElement('h3')
    const newTodoUl = document.createElement('ul')

    newTodoH3.appendChild(document.createTextNode(todoTitle))

    listItems.forEach(function(todoItem){
        var li = document.createElement('li');
        newTodoUl.appendChild(li);
        li.innerHTML += todoItem.textContent;
    });

    newTodoHeader.appendChild(newTodoH3)

    newDiv.appendChild(newTodoHeader)
    newDiv.appendChild(newTodoUl)

    notesContainer.appendChild(newDiv)

    todoTitleElement.innerText = defeaultNoteTitle
    while(todoUlElement.firstChild) todoUlElement.removeChild(todoUlElement.firstChild);
    const newLi = document.createElement('li')
    newLi.textContent = "Insert a todo"
    todoUlElement.appendChild(newLi)
}

function closeNoteDivCreator(e) {
  e.preventDefault()

  const noteTitleElement = document.getElementById('new-note-title')
  const noteContentElement = document.getElementById('new-note-content')

  //rehide the new note div creator
  hiddenDiv.style.display ="none"
  //restablish the prescedent div
  addNewNoteDiv.style.display = "block"

  noteTitleElement.innerText = defeaultNoteTitle
  noteContentElement.innerText = defeaultNoteContent
}

function closeTodoDivCreator(e) {
    const todoTitleElement = document.getElementById('new-todo-title')
    const ulTodoElement = document.getElementById('new-ul-todo-list')
    const newLi = document.createElement('li')

    while(ulTodoElement.firstChild) ulTodoElement.removeChild(ulTodoElement.firstChild);
    newLi.className = "todo-li"
    newLi.innerHTML += defeaultLiContent
    todoTitleElement.innerText = defeaultNoteTitle
    ulTodoElement.className= 'todo-ul'

    ulTodoElement.appendChild(newLi)
    // newUlTodoContainer.appendChild(newUl)
    // todoRowContiner.appendChild(newUlTodoContainer)

    //rehide the new note div creator
    newTodoLiContainer.style.display ="none"
    //restablish the prescedent div
    addNewNoteDiv.style.display = "block"
}

function modifyEsistentNote(e) {
  let targetNote = null

  console.log(e.target)
  const allNotes = document.getElementsByClassName('note-container')
  if(e.target.className == "note-container"){
      targetNote = e.target
  }else if(e.target.parentNode.nodeName == "note-continer"){
      targetNote = e.target
  }

  //controllare se e.target ha come nome della classe "note-container"

  /*for(let i =0; i<allNotes.length; i++){
    if(allNotes[i] === e.target){
      targetNote = e.target
    }
  }*/

  let h3Note= e.target.getElementsByTagName('h3')
  let pNote = e.target.getElementsByTagName('p')

  e.target.contentEditable = "true"
  h3Note.contentEditable = "true"
  pNote.contentEditable = "true"
}

class Note{
  constructor(title,content){
    this.title = title
    this.content = content
    this.checkNoteValidity()
  }

  checkNoteValidity(){
      if(this.title == null | this.title == undefined){
        this.title = 'Titlo Nota'
      }
      if(this.content == null | this.content == undefined){
        this.title = 'Contenuto della nota'
      }
  }
}
