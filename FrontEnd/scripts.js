/*--slides show--*/
let count = 1;
document.getElementById("radio1").checked = true;

setInterval( function(){
    nextImage();
}, 7000)

function nextImage(){
    count++;
    if(count>4){
        count = 1;
    }
    document.getElementById("radio"+count).checked = true;

}
/*-- FIM slides show--*/

/*--SIDEBAR--*/
    let btn = document.querySelector('#btn');
    let slidebar = document.querySelector('.sidebar');

    btn.onclick = function() {
        slidebar.classList.toggle('active');
        if(filtro.classList.contains('activeFiltro')){
            filtro.classList.toggle('activeFiltro');
        }
    };
    /*--FIM  SIDEBAR--*/   
/*--FILTRO--*/
let btnFiltro = document.querySelector('#btnFiltro');
let filtro = document.querySelector('.filtro');

btnFiltro.onclick = function() {
    if(slidebar.classList.contains('active')){
    filtro.classList.toggle('activeFiltro');
    } else {
        slidebar.classList.toggle('active');
        setTimeout(function(){
            filtro.classList.toggle('activeFiltro');
        }, 300);
 
    }
};
/*--FIM  FILTRO--*/   

    /*--INICIO MODAL--*/
    function abrirModalS1() {
        document.getElementById('modalS1').style.display = 'block';
    }
    function abrirModalS2() {
        document.getElementById('modalS2').style.display = 'block';
    }
    function abrirModalS3() {
        document.getElementById('modalS3').style.display = 'block';
    }
    function abrirModalS4() {
        document.getElementById('modalS4').style.display = 'block';
    }
    function abrirModal1() {
        document.getElementById('modal1').style.display = 'block';
    }
    function abrirModal2() {
        document.getElementById('modal2').style.display = 'block';
    }
    function abrirModal3() {
        document.getElementById('modal3').style.display = 'block';
    }
    function abrirModal4() {
        document.getElementById('modal4').style.display = 'block';
    }
    function abrirModal5() {
        document.getElementById('modal5').style.display = 'block';
    }
    function abrirModal6() {
        document.getElementById('modal6').style.display = 'block';
    }
    function abrirModal7() {
        document.getElementById('modal7').style.display = 'block';
    }
    function abrirModal8() {
        document.getElementById('modal8').style.display = 'block';
    }
    
    
    function fecharModalS1() {
        document.getElementById('modalS1').style.display = 'none';
    }
    function fecharModalS2() {
        document.getElementById('modalS2').style.display = 'none';
    }
    function fecharModalS3() {
        document.getElementById('modalS3').style.display = 'none';
    }
    function fecharModalS4() {
        document.getElementById('modalS4').style.display = 'none';
    }
    function fecharModal1() {
        document.getElementById('modal1').style.display = 'none';
    }
    function fecharModal2() {
        document.getElementById('modal2').style.display = 'none';
    }
    function fecharModal3() {
        document.getElementById('modal3').style.display = 'none';
    }
    function fecharModal4() {
        document.getElementById('modal4').style.display = 'none';
    }
    function fecharModal5() {
        document.getElementById('modal5').style.display = 'none';
    }
    function fecharModal6() {
        document.getElementById('modal6').style.display = 'none';
    }
    function fecharModal7() {
        document.getElementById('modal7').style.display = 'none';
    }
    function fecharModal8() {
        document.getElementById('modal8').style.display = 'none';
    }

    function abrirModalS1() {
        document.getElementById('modalS1').classList.add('modal-aberto');
        document.getElementById('overlayS1').classList.add('overlay-aberto');
    }
    function abrirModalS2() {
        document.getElementById('modalS2').classList.add('modal-aberto');
        document.getElementById('overlayS2').classList.add('overlay-aberto');
    }
    function abrirModalS3() {
        document.getElementById('modalS3').classList.add('modal-aberto');
        document.getElementById('overlayS3').classList.add('overlay-aberto');
    }
    function abrirModalS4() {
        document.getElementById('modalS4').classList.add('modal-aberto');
        document.getElementById('overlayS4').classList.add('overlay-aberto');
    }
    function abrirModal1() {
        document.getElementById('modal1').classList.add('modal-aberto');
        document.getElementById('overlay1').classList.add('overlay-aberto');
    }
    function abrirModal2() {
        document.getElementById('modal2').classList.add('modal-aberto');
        document.getElementById('overlay2').classList.add('overlay-aberto');
    }
    function abrirModal3() {
        document.getElementById('modal3').classList.add('modal-aberto');
        document.getElementById('overlay3').classList.add('overlay-aberto');
    }
    function abrirModal4() {
        document.getElementById('modal4').classList.add('modal-aberto');
        document.getElementById('overlay4').classList.add('overlay-aberto');
    }
    function abrirModal5() {
        document.getElementById('modal5').classList.add('modal-aberto');
        document.getElementById('overlay5').classList.add('overlay-aberto');
    }
    function abrirModal6() {
        document.getElementById('modal6').classList.add('modal-aberto');
        document.getElementById('overlay6').classList.add('overlay-aberto');
    }
    function abrirModal7() {
        document.getElementById('modal7').classList.add('modal-aberto');
        document.getElementById('overlay7').classList.add('overlay-aberto');
    }
    function abrirModal8() {
        document.getElementById('modal8').classList.add('modal-aberto');
        document.getElementById('overlay8').classList.add('overlay-aberto');
    }
    
    function fecharModalS1() {
        document.getElementById('modalS1').classList.remove('modal-aberto');
        document.getElementById('overlayS1').classList.remove('overlay-aberto');
    }
    function fecharModalS2() {
        document.getElementById('modalS2').classList.remove('modal-aberto');
        document.getElementById('overlayS2').classList.remove('overlay-aberto');
    }
    function fecharModalS3() {
        document.getElementById('modalS3').classList.remove('modal-aberto');
        document.getElementById('overlayS3').classList.remove('overlay-aberto');
    }
    function fecharModalS4() {
        document.getElementById('modalS4').classList.remove('modal-aberto');
        document.getElementById('overlayS4').classList.remove('overlay-aberto');
    }
    function fecharModal1() {
        document.getElementById('modal1').classList.remove('modal-aberto');
        document.getElementById('overlay1').classList.remove('overlay-aberto');
    }
    function fecharModal2() {
        document.getElementById('modal2').classList.remove('modal-aberto');
        document.getElementById('overlay2').classList.remove('overlay-aberto');
    }
    function fecharModal3() {
        document.getElementById('modal3').classList.remove('modal-aberto');
        document.getElementById('overlay3').classList.remove('overlay-aberto');
    }
    function fecharModal4() {
        document.getElementById('modal4').classList.remove('modal-aberto');
        document.getElementById('overlay4').classList.remove('overlay-aberto');
    }
    function fecharModal5() {
        document.getElementById('modal5').classList.remove('modal-aberto');
        document.getElementById('overlay5').classList.remove('overlay-aberto');
    }
    function fecharModal6() {
        document.getElementById('modal6').classList.remove('modal-aberto');
        document.getElementById('overlay6').classList.remove('overlay-aberto');
    }
    function fecharModal7() {
        document.getElementById('modal7').classList.remove('modal-aberto');
        document.getElementById('overlay7').classList.remove('overlay-aberto');
    }
    function fecharModal8() {
        document.getElementById('modal8').classList.remove('modal-aberto');
        document.getElementById('overlay8').classList.remove('overlay-aberto');
    }
    /*--FIM MODAL--*/

    /*-- BOTAO HOME --*/
    function homeFunction() {
        window.location.href = '/Frontend/'; // Redirect to homepage URL
    }

    /*-- FIM BOTAO HOME--*/

    /*== JS LOGIN E CADASTRO ==*/
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        // Validar campos de login aqui
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            alert("Por favor, preencha todos os campos do formulário de login.");
            event.preventDefault(); // Impede o envio do formulário
        }
    });

    document.getElementById("signupForm").addEventListener("submit", function(event) {
        // Validar campos de cadastro aqui
        var name = document.getElementById("signupName").value;
        var email = document.getElementById("signupEmail").value;
        var password = document.getElementById("signupPassword").value;

        if (!name || !email || !password) {
            alert("Por favor, preencha todos os campos do formulário de cadastro.");
            event.preventDefault(); // Impede o envio do formulário
        }
    });

    /*-- CALENDARIO --*/
    const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventBtn = document.querySelector(".add-event"),
    addEventWrapper = document.querySelector(".add-event-wrapper "),
    addEventCloseBtn = document.querySelector(".close "),
    addEventTitle = document.querySelector(".event-name "),
    addEventFrom = document.querySelector(".event-time-from "),
    addEventTo = document.querySelector(".event-time-to "),
    addEventSubmit = document.querySelector(".add-event-btn ");
  
  let today = new Date();
  let activeDay;
  let month = today.getMonth();
  let year = today.getFullYear();
  
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  
  const eventsArr = [];
  getEvents();
  console.log(eventsArr);
  
  //function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
  function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;
  
    date.innerHTML = months[month] + " " + year;
  
    let days = "";
  
    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }
  
    for (let i = 1; i <= lastDate; i++) {
      //check if event is present on that day
      let event = false;
      eventsArr.forEach((eventObj) => {
        if (
          eventObj.day === i &&
          eventObj.month === month + 1 &&
          eventObj.year === year
        ) {
          event = true;
        }
      });
      if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
      ) {
        activeDay = i;
        getActiveDay(i);
        updateEvents(i);
        if (event) {
          days += `<div class="day today active event">${i}</div>`;
        } else {
          days += `<div class="day today active">${i}</div>`;
        }
      } else {
        if (event) {
          days += `<div class="day event">${i}</div>`;
        } else {
          days += `<div class="day ">${i}</div>`;
        }
      }
    }
  
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListner();
  }
  
  //function to add month and year on prev and next button
  function prevMonth() {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    initCalendar();
  }
  
  function nextMonth() {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    initCalendar();
  }
  
  prev.addEventListener("click", prevMonth);
  next.addEventListener("click", nextMonth);
  
  initCalendar();
  
  //function to add active on day
  function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      day.addEventListener("click", (e) => {
        getActiveDay(e.target.innerHTML);
        updateEvents(Number(e.target.innerHTML));
        activeDay = Number(e.target.innerHTML);
        //remove active
        days.forEach((day) => {
          day.classList.remove("active");
        });
        //if clicked prev-date or next-date switch to that month
        if (e.target.classList.contains("prev-date")) {
          prevMonth();
          //add active to clicked day afte month is change
          setTimeout(() => {
            //add active where no prev-date or next-date
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (
                !day.classList.contains("prev-date") &&
                day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else if (e.target.classList.contains("next-date")) {
          nextMonth();
          //add active to clicked day afte month is changed
          setTimeout(() => {
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (
                !day.classList.contains("next-date") &&
                day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else {
          e.target.classList.add("active");
        }
      });
    });
  }
  
  todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
  });
  
  dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
      dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
      dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward") {
      if (dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 2);
      }
    }
  });
  
  gotoBtn.addEventListener("click", gotoDate);
  
  function gotoDate() {
    console.log("here");
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
      if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
        month = dateArr[0] - 1;
        year = dateArr[1];
        initCalendar();
        return;
      }
    }
    alert("Invalid Date");
  }
  
  //function get active day day name and date and update eventday eventdate
  function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
  }
  
  //function update events when a day is active
  function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
      if (
        date === event.day &&
        month + 1 === event.month &&
        year === event.year
      ) {
        event.events.forEach((event) => {
          events += `<div class="event">
              <div class="title">
                <i class="fas fa-circle"></i>
                <h3 class="event-title">${event.title}</h3>
              </div>
              <div class="event-time">
                <span class="event-time">${event.time}</span>
              </div>
          </div>`;
        });
      }
    });
    if (events === "") {
      events = `<div class="no-event">
              <h3>No Events</h3>
          </div>`;
    }
    eventsContainer.innerHTML = events;
    saveEvents();
  }
  
  //function to add event
  addEventBtn.addEventListener("click", () => {
    addEventWrapper.classList.toggle("active");
  });
  
  addEventCloseBtn.addEventListener("click", () => {
    addEventWrapper.classList.remove("active");
  });
  
  document.addEventListener("click", (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
      addEventWrapper.classList.remove("active");
    }
  });
  
  //allow 50 chars in eventtitle
  addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
  });
  
  function defineProperty() {
    var osccred = document.createElement("div");
    osccred.innerHTML =
      "A Project By <a href='https://www.youtube.com/channel/UCiUtBDVaSmMGKxg1HYeK-BQ' target=_blank>Open Source Coding</a>";
    osccred.style.position = "absolute";
    osccred.style.bottom = "0";
    osccred.style.right = "0";
    osccred.style.fontSize = "10px";
    osccred.style.color = "#ccc";
    osccred.style.fontFamily = "sans-serif";
    osccred.style.padding = "5px";
    osccred.style.background = "#fff";
    osccred.style.borderTopLeftRadius = "5px";
    osccred.style.borderBottomRightRadius = "5px";
    osccred.style.boxShadow = "0 0 5px #ccc";
    document.body.appendChild(osccred);
  }
  
  defineProperty();
  
  //allow only time in eventtime from and to
  addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length === 2) {
      addEventFrom.value += ":";
    }
    if (addEventFrom.value.length > 5) {
      addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
  });
  
  addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length === 2) {
      addEventTo.value += ":";
    }
    if (addEventTo.value.length > 5) {
      addEventTo.value = addEventTo.value.slice(0, 5);
    }
  });
  
  //function to add event to eventsArr
  addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;
    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
      alert("Please fill all the fields");
      return;
    }
  
    //check correct time format 24 hour
    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");
    if (
      timeFromArr.length !== 2 ||
      timeToArr.length !== 2 ||
      timeFromArr[0] > 23 ||
      timeFromArr[1] > 59 ||
      timeToArr[0] > 23 ||
      timeToArr[1] > 59
    ) {
      alert("Invalid Time Format");
      return;
    }
  
    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);
  
    //check if event is already added
    let eventExist = false;
    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        event.events.forEach((event) => {
          if (event.title === eventTitle) {
            eventExist = true;
          }
        });
      }
    });
    if (eventExist) {
      alert("Event already added");
      return;
    }
    const newEvent = {
      title: eventTitle,
      time: timeFrom + " - " + timeTo,
    };
    console.log(newEvent);
    console.log(activeDay);
    let eventAdded = false;
    if (eventsArr.length > 0) {
      eventsArr.forEach((item) => {
        if (
          item.day === activeDay &&
          item.month === month + 1 &&
          item.year === year
        ) {
          item.events.push(newEvent);
          eventAdded = true;
        }
      });
    }
  
    if (!eventAdded) {
      eventsArr.push({
        day: activeDay,
        month: month + 1,
        year: year,
        events: [newEvent],
      });
    }
  
    console.log(eventsArr);
    addEventWrapper.classList.remove("active");
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";
    updateEvents(activeDay);
    //select active day and add event class if not added
    const activeDayEl = document.querySelector(".day.active");
    if (!activeDayEl.classList.contains("event")) {
      activeDayEl.classList.add("event");
    }
  });
  
  //function to delete event when clicked on event
  eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
      if (confirm("Are you sure you want to delete this event?")) {
        const eventTitle = e.target.children[0].children[1].innerHTML;
        eventsArr.forEach((event) => {
          if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
          ) {
            event.events.forEach((item, index) => {
              if (item.title === eventTitle) {
                event.events.splice(index, 1);
              }
            });
            //if no events left in a day then remove that day from eventsArr
            if (event.events.length === 0) {
              eventsArr.splice(eventsArr.indexOf(event), 1);
              //remove event class from day
              const activeDayEl = document.querySelector(".day.active");
              if (activeDayEl.classList.contains("event")) {
                activeDayEl.classList.remove("event");
              }
            }
          }
        });
        updateEvents(activeDay);
      }
    }
  });
  
  //function to save events in local storage
  function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
  }
  
  //function to get events from local storage
  function getEvents() {
    //check if events are already saved in local storage then return event else nothing
    if (localStorage.getItem("events") === null) {
      return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
  }
  
  function convertTime(time) {
    //convert time to 24 hour format
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
  }
    /*-- FIM CALENDARIO --*/