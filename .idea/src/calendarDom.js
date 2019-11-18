const calendarContainer = document.getElementById('calendar-container')
const calendarDates = document.getElementById('calendar-dates')
const backwardBtn = document.getElementById('backward')
const fordwardBtn = document.getElementById('fordward')
let date = new Date()
let previousDate
let nextDate
let plusMinusMoths = -1
let yearCounter = 0

window.onload = appendCalendar(date.getMonth(),date.getFullYear())
backwardBtn.addEventListener('click',previousMonth)
fordwardBtn.addEventListener('click',nextMonth)

function appendCalendar(desireMonth, desireYear) {
    let d = new Date()
    let month_name = ['January','February','March','April','May','June','July','August','September','October','November','December']
    let month = desireMonth
    let year = desireYear
    let first_date = month_name[month] + " " + 1 + " " + year
    let tmp = new Date(first_date).toDateString()
    let first_day = tmp.substring(0,3)
    let day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    let day_no = day_name.indexOf(first_day)
    let days = new Date(year,month+1, 0).getDate()

    let calendar = getCalendar(day_no,days)
    document.getElementById('calendar-month-year').innerHTML = month_name[month] + " "+year
    calendarDates.appendChild(calendar)
}

function getCalendar(day_no, days) {
    let table = document.createElement('table')
    let tr = document.createElement('tr')

    //day row
    for(let i=0;i<=6; i++){
        let td = document.createElement('td')
        td.className = "days-of-week"

        td.innerHTML = "SMTWTFS"[i]
        tr.appendChild(td)
    }
    table.appendChild(tr)

    tr = document.createElement('tr')
    let j
    for(j =0;j<=6;j++){
        if(j == day_no)
            break

        let td = document.createElement('td')
        td.className = "calendar-tds"
        td.innerHTML = ""
        tr.appendChild(td)
    }

    let count = 1
    for(;j<=6; j++){
        let td = document.createElement('td')
        let dateEventContainer = document.createElement('div')
        let dayHeaderDiv = document.createElement('div')
        let eventDiv = document.createElement('div')

        td.className = "calendar-tds"
        dateEventContainer.className = "date-event-container"
        dayHeaderDiv.className = "day-header"
        eventDiv.className = "event-div-container"

        dayHeaderDiv.innerText = count
        dateEventContainer.appendChild(dayHeaderDiv)
        dateEventContainer.appendChild(eventDiv)
        td.appendChild(dateEventContainer)

        count++
        tr.appendChild(td)
    }
    table.appendChild(tr)

    //rest of the days
    for(let i=3;i<=6;i++){
        tr = document.createElement('tr')
        for(let k =0; k<=6;k++){
            if(count > days){
                table.appendChild(tr)
                return table
            }
            let td = document.createElement('td')
            let dateEventContainer = document.createElement('div')
            let dayHeaderDiv = document.createElement('div')
            let eventDiv = document.createElement('div')

            td.className = "calendar-tds"
            dateEventContainer.className = "date-event-container"
            dayHeaderDiv.className = "day-header"
            eventDiv.className = "event-div-container"

            dayHeaderDiv.innerText = count
            dateEventContainer.appendChild(dayHeaderDiv)
            dateEventContainer.appendChild(eventDiv)
            td.appendChild(dateEventContainer)

            count++
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    return table
}

function previousMonth() {
    plusMinusMoths --
    previousDate = (new Date().getMonth()+1)%12 + plusMinusMoths
    if(previousDate == -1){
        yearCounter--
        plusMinusMoths = 0
        previousDate = (new Date().getMonth()+1)%12 + plusMinusMoths
    }
    while(calendarDates.firstChild)
        calendarDates.removeChild(calendarDates.firstChild)
    appendCalendar(previousDate,date.getFullYear()+yearCounter)
}

function nextMonth() {
    plusMinusMoths ++
    nextDate = (new Date().getMonth()+1)%12 +plusMinusMoths
    if(nextDate == 12) {
        yearCounter++
        plusMinusMoths = -11
        nextDate = (new Date().getMonth()+1)%12 +plusMinusMoths
    }
    while(calendarDates.firstChild)
        calendarDates.removeChild(calendarDates.firstChild)
    appendCalendar(nextDate,date.getFullYear()+yearCounter)
}
