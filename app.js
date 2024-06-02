const currentDate = moment();

function getWeekdaysNames() {
    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
}

function renderWeekdays() {
    const weekdays = getWeekdaysNames();
    const htmlElements = weekdays.map(function (weekday) {
        const li = document.createElement("li");
        li.innerText = weekday;
        return li;
    });

    const calendarWeekdaysContainer = document.querySelector(".calendar-weekdays");
    calendarWeekdaysContainer.innerHTML = "";
    calendarWeekdaysContainer.append(...htmlElements);
}

function renderCurrentDate() {
    const calendarCurrentDate = document.querySelector(".calendar-current-date");
    calendarCurrentDate.innerText = currentDate.format("MMMM YYYY");
    updateSeasonStyle();
}

function renderCurrentTime() {
    const calendarCurrentTime = document.querySelector(".time");
    calendarCurrentTime.innerText = currentDate.format("h:mm:ss");
}

function renderDays() {
    const daysInMonth = currentDate.daysInMonth();
    const calendarDatesContainer = document.querySelector(".calendar-dates");
    calendarDatesContainer.innerHTML = "";

    const firstDayInMonth = currentDate.set("date", 1);
    const skipDaysCount = (firstDayInMonth.weekday() + 6) % 7;

    for (let i = 0; i < skipDaysCount; i++) {
        const li = document.createElement("li");
        li.innerText = "";
        calendarDatesContainer.append(li);
    }

    const dateNow = moment();

    for (let i = 1; i <= daysInMonth; i++) {
        const li = document.createElement("li");
        li.innerText = i.toString();

        if (currentDate.format("MM-YYYY") === dateNow.format("MM-YYYY") && dateNow.date() === i) {
            li.className = "active";
        }

        // Highlight weekends
        const dayOfWeek = (currentDate.date(i).weekday() + 6) % 7;
        if (dayOfWeek === 5 || dayOfWeek === 6) { // Saturday and Sunday
            li.classList.add("weekend");
        }

        calendarDatesContainer.append(li);
    }
}

function renderCalendar() {
    renderCurrentDate();
    renderCurrentTime();
    renderWeekdays();
    renderDays();
}

function updateSeasonStyle() {
    const month = currentDate.month();
    const body = document.body;
    const calendarContainer = document.querySelector('.calendar-container');
    const calendarHeader = document.querySelector('.calendar-header');

    body.classList.remove('spring', 'summer', 'fall', 'winter');
    calendarContainer.classList.remove('spring', 'summer', 'fall', 'winter');
    calendarHeader.classList.remove('spring', 'summer', 'fall', 'winter');

    if (month >= 2 && month <= 4) { // March, April, May
        body.classList.add('spring');
        calendarContainer.classList.add('spring');
        calendarHeader.classList.add('spring');
    } else if (month >= 5 && month <= 7) { // June, July, August
        body.classList.add('summer');
        calendarContainer.classList.add('summer');
        calendarHeader.classList.add('summer');
    } else if (month >= 8 && month <= 10) { // September, October, November
        body.classList.add('fall');
        calendarContainer.classList.add('fall');
        calendarHeader.classList.add('fall');
    } else { // December, January, February
        body.classList.add('winter');
        calendarContainer.classList.add('winter');
        calendarHeader.classList.add('winter');
    }
}

const [prevBtn, nextBtn] = [...document.querySelectorAll(".calendar-navigation span")];

prevBtn.onclick = () => {
    currentDate.subtract(1, "month");
    renderCalendar();
};

nextBtn.onclick = () => {
    currentDate.add(1, "month");
    renderCalendar();
};

renderCalendar();
