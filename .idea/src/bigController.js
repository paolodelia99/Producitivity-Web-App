const createEventDiv = document.getElementById('create-event')
const modal = document.getElementById('myModal')
const modalCloseSpan = document.getElementById('close-modal')
const createEventBtn = document.getElementById('create-event-btn')
let currentCalendarMonth = document.getElementById('calendar-month-year').innerText
let BST

//modal dom variable
let eventTitle = document.getElementById('event-title').innerText
const initialDateDiv = document.getElementById('initial-date')
const initialHourContainer = document.getElementById('initial-hour-container')
const endingHourContainer = document.getElementById('end-hour-container')
const startingHourDiv = document.getElementById('starting-hour')
const startingMinutesDiv = document.getElementById('starting-minutes')
const endingHourDiv = document.getElementById('ending-hour')
const endingMinutesDiv = document.getElementById('ending-minutes')
const finalLocation = document.getElementById('location').innerText
const categoryList = document.getElementById('lists-category')
let selectedCategory //seleziono il corrente elemento
const eventContent = document.getElementById('event-content').innerText


createEventDiv.addEventListener('click',initializeModal)
modalCloseSpan.onclick = closeModal
backwardBtn.addEventListener('click',updateCalendar)
fordward.addEventListener('click',updateCalendar)
window.onclick = (event)=> {
    if (event.target == modal) {
        closeModal()
    }
}
createEventBtn.addEventListener('click',createEvent)
calendarDates.addEventListener('click',checkTheRightTarget)

//You can also pass in the year, month, day, hours, minutes and seconds as separate arguments:
//var date = new Date(2016, 6, 27, 13, 30, 0);

class Event {
    constructor(title,location,startDate,endDate,reminder,content){
        this.title = title
        this.location = location
        this.startDate = startDate
        this.endDate = endDate
        this.reminder = reminder
        this.content = content
        this.monthsName = ['January','February','March','April','May','June','July','August','September','October','November','December']

        this.checkDateValidity()
    }

    getEventPreview(){
        const eventPreviewArray = [this.title,this.startDate,this.endDate]
        return eventPreviewArray
    }

    //var date = new Date(2016, 6, 27, 13, 30, 0);
    returnIdentifier(){
        let day = (this.startDate.getDate()).toString()
        let month = (this.startDate.getMonth()+1).toString()
        let year = (this.startDate.getFullYear()).toString()
        let hour = (this.startDate.getHours()).toString()
        let minutes = (this.startDate.getMinutes()).toString()
        let stringIdentifier
        let identifier

        month = Event.controlOneCipher(month)
        day = Event.controlOneCipher(day)
        hour = Event.controlOneCipher(hour)
        minutes = Event.controlOneCipher(minutes)

        stringIdentifier = year+month+day+hour+minutes
        identifier = parseInt(stringIdentifier,10)

        return identifier
    }

    checkDateValidity(){
      if(this.startDate.getMonth()>12)
        this.startDate = (this.startDate)%12;

      if(this.startDate.getDate()>32)
        this.startDate = (this.startDate)%30;
    }

    getMonthAndYear(){
        let monthName
        for(let i=0;i<this.monthsName.length;i++){
            if((this.startDate.getMonth())== i)
                monthName = this.monthsName[i]
        }

        return monthName+" "+(this.startDate.getFullYear()).toString()
    }

    getDayOfTheMonth(){
        return this.startDate.getDate()
    }

    getStartdDate(){
        return this.startDate
    }

    getEndDate(){
        return this.endDate
    }

    static controlOneCipher(date){
        if(date.length == 1)
            date = "0"+date

        return date
    }
}

class NodeEvent {
    constructor(event) {
        this.event = event
        this.eventPreview = event.getEventPreview()
        this.identifier = event.returnIdentifier()
        this.right = null
        this.left = null
    }

    getEvent(){
        return this.event
    }
}

class EventBinarySearchTree{

    constructor() {
        this.root = null;
    }

    insert(event) {
        var newNode = new NodeEvent(event);

        if(this.root === null)
            this.root = newNode;
        else
            this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode){
        if(newNode.identifier < node.identifier) {
            if(node.left === null)
                node.left = newNode;
            else
                this.insertNode(node.left, newNode);
        }else{
            if(node.right === null)
                node.right = newNode;
            else
                this.insertNode(node.right,newNode);
        }
    }

    remove(identifier) {
        this.root = this.removeNode(this.root, identifier);
    }

    removeNode(node, key){
        if(node === null)
            return null;
        else if(key < node.identifier) {
            node.left = this.removeNode(node.left, key);
            return node;
        }else if(key > node.identifier) {
            node.right = this.removeNode(node.right, key);
            return node;
        }else{

            if(node.left === null && node.right === null) {
                node = null;
                return node;
            }

            if(node.left === null) {
                node = node.right;
                return node;
            }else if(node.right === null) {
                node = node.left;
                return node;
            }

            var aux = this.findMinNode(node.right);
            node.identifier = aux.identifier;

            node.right = this.removeNode(node.right, aux.identifier);
            return node;
        }
    }

    in_order(root, nodes) {
        if (root && root.left) {
            this.in_order(root.left, nodes);
        }
        nodes.push(root.identifier);
        if (root && root.right) {
            this.in_order(root.right, nodes);
        }
        return nodes;
    }

    preorder(node){
        if(node != null){
            console.log(node.identifier);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }

    postorder(node){
        if(node != null){
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.identifier);
        }
    }

    findMinNode(node){
        if(node.left === null)
            return node;
        else
            return this.findMinNode(node.left);
    }

    getRootNode() {
        return this.root;
    }

    search(node, identifier){
        if(node === null)
            return null;
        else if(identifier < node.identifier)
            return this.search(node.left, identifier);
        else if(identifier > node.identifier)
            return this.search(node.right, identifier);
        else
            return node;
    }

    in_orderNodeArray(root, nodes) {
        if (root && root.left) {
            this.in_orderNodeArray(root.left, nodes);
        }
        nodes.push(root);
        if (root && root.right) {
            this.in_orderNodeArray(root.right, nodes);
        }
        return nodes;
    }

}

BST = new EventBinarySearchTree()

function initializeModal(){
  let currentDate = new Date()

  let currentHour = currentDate.getHours()
  let currentYear = (currentDate.getFullYear()).toString()
  let currentMonth = (currentDate.getMonth() +1).toString()
  let currentDay = (currentDate.getDate()).toString()

  const selectStartingHour = createHoursOptions(currentHour)
  const selectedEndingHour = createHoursOptions(currentHour+1)
  const selectMinutes = createMinutesOptions(false)
  const selectMinutes1 = selectMinutes.cloneNode(true);
  let stringDate = document.createTextNode(currentDay +"/"+currentMonth+"/"+currentYear)

  selectStartingHour.className = "hour-list"
  selectedEndingHour.className = "hour-list"
  selectMinutes.className = "minutes-list"
  selectMinutes1.className = "minutes-list"

  initialDateDiv.appendChild(stringDate)
  startingHourDiv.appendChild(selectStartingHour)
  startingMinutesDiv.appendChild(selectMinutes)
  endingHourDiv.appendChild(selectedEndingHour)
  endingMinutesDiv.appendChild(selectMinutes1)

  modal.style.display = "block"
}

function closeModal(){

    removeAllTheChildren(startingHourDiv)
    removeAllTheChildren(startingMinutesDiv)
    removeAllTheChildren(endingHourDiv)
    removeAllTheChildren(endingMinutesDiv)
    removeAllTheChildren(initialDateDiv)

    createEventBtn.innerText = "Create Event"
    eventTitle.innerText = "Event Title"
    finalLocation.innerText = "Location"
    eventContent.innerText = "Insert content"

    modal.style.display = "none"
}

function removeAllTheChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

function appendEventToCalendar(nodeEvent) {
    let eventPreview = nodeEvent.eventPreview
    let event = nodeEvent.event
    const eventDiv = document.createElement('div')
    const eventDivTitle = document.createElement('h3')
    const eventDivTime = document.createElement('h4')

    eventDiv.className = "event-div"
    eventDivTitle.innerText = eventPreview[0]
    if(eventPreview[1].getMinutes() == 0 & eventPreview[2].getMinutes()==0)
        eventDivTime.innerText = eventPreview[1].getHours() + ":" + eventPreview[1].getMinutes()+"0" + " - " + eventPreview[2].getHours() + ":" + eventPreview[2].getMinutes()+"0"
    else if(eventPreview[1].getMinutes() == 0 & eventPreview[2].getMinutes()!=0)
        eventDivTime.innerText = eventPreview[1].getHours() + ":" + eventPreview[1].getMinutes()+"0" + " - " + eventPreview[2].getHours()+ ":" + eventPreview[2].getMinutes()
    else if(eventPreview[1].getMinutes() != 0 & eventPreview[2].getMinutes()==0)
        eventDivTime.innerText = eventPreview[1].getHours() + ":" + eventPreview[1].getMinutes() + " - " + eventPreview[2].getHours()+ ":" + eventPreview[2].getMinutes()+"0"
    else
        eventDivTime.innerText = eventPreview[1].getHours() + ":" + eventPreview[1].getMinutes() + " - " + eventPreview[2].getHours()+ ":" + eventPreview[2].getMinutes()

    eventDiv.appendChild(eventDivTitle)
    eventDiv.appendChild(eventDivTime)

    findTheRightPlaceToAppend(eventDiv,event.getDayOfTheMonth())
}

function createEvent(e) {
    e.preventDefault()

    const initialDate = document.getElementById('initial-date').innerText

    let initialDay = getDate(initialDate)
    let initialHour = getHour(initialHourContainer)
    let endingHour = getHour(endingHourContainer)
    const eventInitialDate = new Date(initialDay[0],(initialDay[1]-1),initialDay[2],initialHour[0],initialHour[1])
    const eventEndingDate = new Date(initialDay[0],(initialDay[1]-1),initialDay[2],initialHour[0],initialHour[1])
    eventTitle = document.getElementById('event-title').innerText

    let event = new Event(eventTitle,finalLocation,eventInitialDate,eventEndingDate,30,eventContent)

    BST.insert(event)
    console.log(BST.getRootNode())

    if(event.getMonthAndYear() == currentCalendarMonth){
        const eventDiv = document.createElement('div')
        const eventDivTitle = document.createElement('h3')
        const eventDivTime = document.createElement('h4')

        eventDiv.className = "event-div"
        eventDivTitle.innerText = eventTitle
        eventDivTime.innerText = initialHour[0] + ":" + initialHour[1]+"0" + " - " + endingHour[0] + ":" + endingHour[1]+"0"

        eventDiv.appendChild(eventDivTitle)
        eventDiv.appendChild(eventDivTime)

        findTheRightPlaceToAppend(eventDiv,event.getDayOfTheMonth())
    }

    //findrightPlaceToAppend

    closeModal()
}

function findTheRightPlaceToAppend(eventDiv,day){
    let table = calendarDates.firstElementChild

    for(let i=1;i<table.children.length;i++){
        let tr = table.children[i]

        for(let j=0;j<tr.children.length;j++){
            let td = tr.children[j]

            if(td.hasChildNodes()){
                let dateEventContainer = td.firstChild;
                let divDay
                let eventDivContainer

                for(let k=0;k<dateEventContainer.children.length;k++){
                    if(dateEventContainer.children[k].className == 'day-header')
                        divDay = parseInt(dateEventContainer.children[k].innerHTML)
                    else if(dateEventContainer.children[k].className == 'event-div-container')
                        eventDivContainer = dateEventContainer.children[k]
                }
                //check if the day header is the right day
                if (divDay == day)
                    eventDivContainer.appendChild(eventDiv)
            }
        }
    }
}

function getDate(date){
    let dateArray = new Array()
    let tmpNumber = ""
    for(let i=0;i<date.length;i++){
        if(date.charAt(i) == '/'){
            let number = parseInt(tmpNumber,10)
            dateArray.push(number)
            tmpNumber = ""
        }else
            tmpNumber += date.charAt(i)
    }

    dateArray.push(tmpNumber)

    dateArray = dateArray.reverse()
    return dateArray
}

function getHour(hourDiv) {
    let hourArray = new Array()
    let selectHourList
    let selectedMinutesList
    let hour
    let minutes

    //get The selectHourList
    for(let i=0;i<hourDiv.children.length;i++){
      if(hourDiv.children[i].className == 'hour-container'){
        let hourContainer = hourDiv.children[i]
        for(let j=0;j<hourContainer.children.length;j++){
            if(hourContainer.children[i].className == 'hour-list'){
              selectHourList = hourContainer.children[i]
              break
            }
        }
      }
    }

    hour = selectHourList.options[selectHourList.selectedIndex].value

    for(let i=0;i<hourDiv.children.length;i++){
      if(hourDiv.children[i].className == 'minutes-container'){
        let minutesContainer = hourDiv.children[i]
        selectedMinutesList = minutesContainer.firstChild
      }
    }

    minutes = selectedMinutesList.options[selectedMinutesList.selectedIndex].value

    hourArray.push(hour)
    hourArray.push(minutes)
    return hourArray
}

function createHoursOptions(currentHour){
  let selectList = document.createElement('select')
  for (var i = 0; i <= 23; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = i;
    if(i == currentHour)
      option.selected = 'selected'
    selectList.appendChild(option);
  }
  return selectList
}

function createMinutesOptions(noDefeault,whichMinute){
  let selectList = document.createElement('select')
  let minutesArray = ['00','15','30','45']
  for (var i = 0; i < minutesArray.length; i++) {
    let option = document.createElement("option");
    if(i==0){
        option.value = 0
    }else
        option.value = minutesArray[i];

    option.text = minutesArray[i];

    if(noDefeault){
        if(minutesArray[i] == whichMinute)
            option.selected = 'selected'
    } else if(minutesArray[i] == '00'){
        option.selected = 'selected'
    }

    selectList.appendChild(option);
  }
  return selectList
}

function getMonthNumber() {
    let stringMonthNumber
    let monthsName = ['January','February','March','April','May','June','July','August','September','October','November','December']
    let tmpStringArray
    currentCalendarMonth = document.getElementById('calendar-month-year').innerText
    tmpStringArray = currentCalendarMonth.split(" ")
    tmpStringArray.reverse()

    //get The month number
    for (let i = 0; i < monthsName.length; i++) {
        if (tmpStringArray[1] == monthsName[i]) {
            stringMonthNumber = "" + (i + 1)
            break
        }
    }

    Event.controlOneCipher(stringMonthNumber)
    stringMonthNumber = tmpStringArray[0] + stringMonthNumber
    return stringMonthNumber;
}

function updateCalendar() {
    let root = BST.getRootNode()
    let eventIdentificatorArray
    let stringMonthNumber = getMonthNumber();

    if(root != null || root != undefined){
        eventIdentificatorArray = BST.in_order(root,[])

        //check if the current calendar contains some events
        for(let i=0;i<eventIdentificatorArray.length;i++){
            let stringEventIdetificator = eventIdentificatorArray[i].toString()
            let yearMonthIdetificator = stringEventIdetificator.substring(0,6)

            if(stringMonthNumber == yearMonthIdetificator){
                let nodeArray = BST.in_orderNodeArray(root,[])

                for(let j=0;j<nodeArray.length;j++){
                    if(eventIdentificatorArray[i] == nodeArray[j].identifier)
                        appendEventToCalendar(nodeArray[i])
                }
            }
        }
    }
}

function checkTheRightTarget(e){
    e.preventDefault()

    let eventDiv

    console.log(e.target)
    if(e.target.className == "event-div"){
        eventDiv = e.target
        openEventModal(eventDiv)
    }else if(e.target.parentElement.className == "event-div"){
        eventDiv = e.target.parentNode
        openEventModal(eventDiv)
    }else
        return
}

function openEventModal(eventDiv) {
    function getTheDesiredEvent() {
        let initialHour
        let initialMinute
        let hourString
        let date
        let stringIdentifier
        let identifier
        const root = BST.getRootNode()
        let nodeEvent
        let seekedEvent
        let dadNode = eventDiv.parentNode
        let grandDadNode = dadNode.parentNode

        //get end & start hour
        for (let i = 0; i < eventDiv.children.length; i++) {
            if (eventDiv.children[i].tagName = 'h4') {
                hourString = eventDiv.children[i].innerHTML
            }
        }

        //extrapolate hour and minutes for the hourString
        let tmpString = hourString.split("-")
        let initialHourMinute = tmpString[0]
        let realTmpString = initialHourMinute.split(":")
        initialHour = realTmpString[0]
        initialMinute = realTmpString[1].substring(0, 2)

        //get the date
        for (let i = 0; i < grandDadNode.children.length; i++) {
            if (grandDadNode.children[i].className == "day-header")
                date = grandDadNode.children[i].innerHTML
        }

        //get month and year
        let monthYearString = getMonthNumber()

        //composition of string identifier and identifier
        stringIdentifier = monthYearString + date + initialHour + initialMinute
        identifier = parseInt(stringIdentifier)

        nodeEvent = BST.search(root, identifier)

        return nodeEvent
    }

    let seekedNodeEvent = getTheDesiredEvent();
    let seekedEvent = seekedNodeEvent.getEvent()
    let seekedEventStartDate = seekedEvent.getStartdDate()
    let seekedEventEndDate = seekedEvent.getEndDate()

    let seekedEventStartingMinutes = (seekedEventStartDate.getMinutes()).toString
    let seekedEventStartingHour = seekedEventStartDate.getHours()
    let seekedEventEndingMinutes = (seekedEventEndDate.getMinutes()).toString
    let seekedEventEndingHour = seekedEventEndDate.getHours()  //qui c'è un bug
    let seekedEventYear = (seekedEventStartDate.getFullYear()).toString()
    let seekedEventMonth = (seekedEventStartDate.getMonth() +1).toString()
    let seekedEventDay = (seekedEventStartDate.getDate()).toString()

    const selectStartingHour = createHoursOptions(seekedEventStartingHour)
    const selectedEndingHour = createHoursOptions(seekedEventEndingHour+1)
    const selectMinutes = createMinutesOptions(true,seekedEventStartingMinutes)
    const selectMinutes1 = createMinutesOptions(true,seekedEventEndingMinutes)
    let stringDate = document.createTextNode(seekedEventDay +"/"+seekedEventMonth+"/"+seekedEventYear)

    selectStartingHour.className = "hour-list"
    selectedEndingHour.className = "hour-list"
    selectMinutes.className = "minutes-list"

    eventTitle.innerText = seekedEvent.title
    finalLocation.innerText = seekedEvent.location
    eventContent.innerText = seekedEvent.content
    createEventBtn.innerText = "Modify Event"

    initialDateDiv.appendChild(stringDate)
    startingHourDiv.appendChild(selectStartingHour)
    startingMinutesDiv.appendChild(selectMinutes)
    endingHourDiv.appendChild(selectedEndingHour)
    endingMinutesDiv.appendChild(selectMinutes1)

    modal.style.display = "block"
}
/*TODO:
    - modal evento quando questo e aperto
*/
