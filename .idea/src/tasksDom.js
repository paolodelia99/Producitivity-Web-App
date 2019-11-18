const createNewTaskBtn = document.getElementById('create-new-task')
const listsChoiceBox = document.getElementById('lists-choicebox')
const tasksBigContainer = document.getElementById('tasks-container')
const numberDoneTasks = document.getElementById('number-of-done-tasks')
const completedTasksDiv = document.getElementById('completed-tasks-div')
const completedTaskContainer = document.getElementById('completed-tasks-container')
const noCompletedTasksContainer = document.getElementById('no-completed-tasks-container')
const taskCheckBox = document.getElementsByTagName('input')
const tasksDivArray = document.getElementsByClassName('task-div')
const taskCheckDivArray = document.getElementsByClassName('task-check')
const uncheckBoxesArray = document.getElementsByClassName('check-box')
const teskTextDivArray = document.getElementsByClassName('task-text')
const nonCompletedTextTask = document.getElementsByClassName('task-text')
const completedTextTask = document.getElementsByClassName('completed-task-text')
const checkedBoxesArray = document.getElementsByClassName('checked-completed-tasks')
const listChoichebox = document.getElementById('lists-choicebox')
const defeaultNewTaskContent = "Insert a new task"
const allNonCompletedTasks = new Array()
const allCompletedTasks = new Array()
let completedTasksArray = new Array()
let noCompletedTasksArray = new Array()


createNewTaskBtn.addEventListener('click',createNewTask)
tasksBigContainer.addEventListener('dblclick',editTask)
listChoichebox.addEventListener('change',displayListsTasks)
noCompletedTasksContainer.addEventListener('contextmenu', modifyTaskList)

//console.log(completedTaskContainer.children.length) Per Prova
//initial
/* FIXME:
  -set all the tasks in completed tasks-div as completed
  -binding the selected list with its own tasks
*/
numberDoneTasks.innerHTML = "Completed Tasks ("+completedTaskContainer.children.length+")"
//initialize
for(let i =0;i<nonCompletedTextTask.length;i++)
  allNonCompletedTasks.push(nonCompletedTextTask[i].innerText)

for(let i =0;i<completedTextTask.length;i++)
  allCompletedTasks.push(completedTextTask[i].innerText)

completedTasksArray = allCompletedTasks
noCompletedTasksArray = allNonCompletedTasks

console.log(completedTasksArray);
console.log(noCompletedTasksArray);

function createNewTask(e){
  e.preventDefault()

  const newTaskDiv = document.createElement('div')
  const taskCheckDiv = document.createElement('div')
  const newTextTaskDiv = document.createElement('div')
  const checkBoxForTask = document.createElement('input')
  const selectedList = listsChoiceBox.options[listsChoiceBox.selectedIndex].value

  newTaskDiv.className = "task-div"
  taskCheckDiv.className = "task-check"
  newTextTaskDiv.className = "task-text"
  checkBoxForTask.className = "check-box "+selectedList
  checkBoxForTask.type = "checkbox"
  checkBoxForTask.setAttribute('onclick','checkTaskCompleted()')
  newTextTaskDiv.contentEditable = "true"
  newTextTaskDiv.textContent = defeaultNewTaskContent

  taskCheckDiv.appendChild(checkBoxForTask)
  newTaskDiv.appendChild(taskCheckDiv)
  newTaskDiv.appendChild(newTextTaskDiv)

  noCompletedTasksContainer.appendChild(newTaskDiv)

   //fixme fare funzione che dopo aver creato il nuovo ne assagna come value il contenuto di task-text
}

function editTask(e){
  e.preventDefault()

  if(e.target.className == "task-text"){
    e.target.contentEditable = "true"
    modifyTaskList(e)
  }
}

function showCompletedTasks(e){
  e.preventDefault()


}

function checkTaskCompleted() {
  for(let i =0; i<uncheckBoxesArray.length;i++){
    let taskName = ""
    if(uncheckBoxesArray[i].checked == true){

      let parentNode1 = uncheckBoxesArray[i].parentNode

      let parentparentNode = parentNode1.parentNode

      for(let j=0; j<parentparentNode.childNodes.length;j++){
        if(parentparentNode.childNodes[j].className == "task-text")
          taskName = parentparentNode.childNodes[j].innerText
      }

      if(completedTasksArray.includes(taskName)){

      }else{
        completedTasksArray.push(taskName)
        if(noCompletedTasksArray.includes(taskName)){
            let index = noCompletedTasksArray.indexOf(taskName)
            noCompletedTasksArray.splice(index,1)
        }

        // console.log("the completed tasks is:" )
        // console.log(completedTasksArray)
        // console.log("the non completed tasks is: ")
        // console.log(noCompletedTasksArray)

        const newCompletedTaskDiv = document.createElement('div')
        const newCompletedTaskCheckDiv = document.createElement('div')
        const newCompletedCheckBox = document.createElement('input')
        const newCompletedTaskTextDiv = document.createElement('div')

        newCompletedTaskDiv.className = "completed-tasks-div"
        newCompletedCheckBox.className  = "checked-completed-tasks"
        newCompletedCheckBox.type = "checkbox"
        newCompletedCheckBox.setAttribute('checked','')
        newCompletedCheckBox.setAttribute('onclick','removeCheckTask()')
        newCompletedCheckBox.value = taskName
        newCompletedTaskCheckDiv.className = "completed-task-check"
        newCompletedTaskTextDiv.className = "completed-task-text"
        newCompletedTaskTextDiv.innerText = parentparentNode.innerText
        newCompletedTaskTextDiv.style.textDecoration = "line-through"

        newCompletedTaskCheckDiv.appendChild(newCompletedCheckBox)
        newCompletedTaskDiv.appendChild(newCompletedTaskCheckDiv)
        newCompletedTaskDiv.appendChild(newCompletedTaskTextDiv)

        completedTaskContainer.appendChild(newCompletedTaskDiv)

        parentparentNode.style.display = "none"
        parentparentNode.remove()

        numberDoneTasks.innerText = "Completed Tasks ("+completedTasksArray.length+")"
      }
    }

  }

  checkInputValue()
}

function removeCheckTask(){
    const selectedList = listsChoiceBox.options[listsChoiceBox.selectedIndex].value

    for(let i =0; i<checkedBoxesArray.length;i++){
    let taskName = ""
    if(checkedBoxesArray[i].checked == false){

      let parentNode1 = checkedBoxesArray[i].parentNode

      let parentparentNode = parentNode1.parentNode

      for(let j=0; j<parentparentNode.childNodes.length;j++){
        if(parentparentNode.childNodes[j].className == "completed-task-text")
          taskName = parentparentNode.childNodes[j].innerText
      }
      if(noCompletedTasksArray.includes(taskName)){

      }else{
        noCompletedTasksArray.push(taskName)
        if(completedTasksArray.includes(taskName)){
            let index = completedTasksArray.indexOf(taskName)
            completedTasksArray.splice(index,1)
        }

        console.log("the completed tasks is:" )
        console.log(completedTasksArray)
        console.log("the non completed tasks is: ")
        console.log(noCompletedTasksArray)

        const newNoCompletedTaskDiv = document.createElement('div')
        const newNoCompletedTaskCheckDiv = document.createElement('div')
        const newNoCompletedCheckBox = document.createElement('input')
        const newNoCompletedTaskTextDiv = document.createElement('div')

        newNoCompletedTaskDiv.className = "task-div"
        newNoCompletedCheckBox.className  = "check-box "+selectedList
        newNoCompletedCheckBox.type = "checkbox"
        newNoCompletedCheckBox.setAttribute('onclick','checkTaskCompleted()')
        newNoCompletedCheckBox.value = taskName
        newNoCompletedTaskCheckDiv.className = "task-check"
        newNoCompletedTaskTextDiv.className = "task-text"
        newNoCompletedTaskTextDiv.innerText = parentparentNode.innerText

        newNoCompletedTaskCheckDiv.appendChild(newNoCompletedCheckBox)
        newNoCompletedTaskDiv.appendChild(newNoCompletedTaskCheckDiv)
        newNoCompletedTaskDiv.appendChild(newNoCompletedTaskTextDiv)

        noCompletedTasksContainer.appendChild(newNoCompletedTaskDiv)

        parentparentNode.style.display = "none"
        parentparentNode.remove()

        numberDoneTasks.innerText = "Completed Tasks ("+completedTasksArray.length+")"
      }
    }
    console.log(noCompletedTasksArray)
  }

    checkInputValue()
}

function displayListsTasks(e) {
    e.preventDefault()

    const valueOfOption = e.target.value

    if (valueOfOption == "all-tasks") {
        for (let i = 0; i < tasksDivArray.length; i++) {
            tasksDivArray[i].style.display = "flex"
        }
    }else{
        for(let i=0;i<uncheckBoxesArray.length;i++){
            console.log(uncheckBoxesArray[i].className)
            let dadNode = uncheckBoxesArray[i].parentNode
            let grandadNode = dadNode.parentNode

            if(!(uncheckBoxesArray[i].className.includes(valueOfOption)))
                grandadNode.style.display = "none"
            else
                grandadNode.style.display = "flex"
        }
    }

}

function checkInputValue(){
    for(let i=0;i<uncheckBoxesArray.length;i++){
        if(uncheckBoxesArray[i].value == nonCompletedTextTask[i].innerText || uncheckBoxesArray[i].value.includes(nonCompletedTextTask[i].innerText))
            continue
        else
            uncheckBoxesArray[i].value == nonCompletedTextTask[i].innerText
    }
}

function modifyTaskList(e) {
    e.preventDefault()

    let eventParent = e.target.parentNode

    const modifyListDiv = document.createElement('div')
    const tasksList = listChoichebox.cloneNode(true)
    const changeListBtn = document.createElement('button')
    const cancelBtn = document.createElement('button')

    modifyListDiv.className = "modify-list-div"
    tasksList.className = "type-of-task-list"
    changeListBtn.className = "change-list-btn"
    cancelBtn.className = "cancel-btn"

    changeListBtn.onclick = (e)=>{
        let dadNode = e.target.parentNode
        let granDadNode = dadNode.parentNode
        let taskCheckDiv
        let checkBox
        const selectedElement = tasksList.options[tasksList.selectedIndex].value

        for(let i=0; i<granDadNode.children.length;i++)
            if(granDadNode.children[i].className == 'task-check'){
                taskCheckDiv = granDadNode.children[i]
                break
            }

        for(let i=0; i<taskCheckDiv.children.length;i++)
            if(taskCheckDiv.children[i].className.includes('check-box')){
                checkBox = taskCheckDiv.children[i]
                break
            }

        if(selectedElement == undefined || selectedElement == null)
            return

        checkBox.className = ""
        checkBox.className = "check-box "+selectedElement

        removeModifyChildDiv(granDadNode)
    }
    changeListBtn.innerText = "Change"

    cancelBtn.onclick = (e)=>{
        let dadNode = e.target.parentNode
        let granDadNode = dadNode.parentNode

        modifyListDiv.style.display = "none"

        removeModifyChildDiv(granDadNode)
    }
    cancelBtn.innerText = "Cancel"

    modifyListDiv.style.display = "flex"

    modifyListDiv.appendChild(tasksList)
    modifyListDiv.appendChild(changeListBtn)
    modifyListDiv.appendChild(cancelBtn)

    eventParent.appendChild(modifyListDiv)
}

function removeModifyChildDiv(granDadNode) {
    let modifyListDiv

    for(let i=0;i<granDadNode.children.length;i++)
        if(granDadNode.children[i].className == "modify-list-div")
            modifyListDiv = granDadNode.children[i]

    modifyListDiv.style.display = "none"
    granDadNode.removeChild(modifyListDiv)
}