const config = {
"_myDate": new Date(),
"_currentMonth": myDate.getMonth(),
"_currentDay": myDate.getDate(),
"_currentYear": myDate.getFullYear(),
"tmpPreviousCalendarMonth": document.getElementById('previousCalendarMonth'),
"tmpNextCalendarMonth": document.getElementById('nextCalendarMonth'),
"tmpMain": document.getElementById('mainContent'),
"tmpCurrentCalendarMonth": document.getElementById('currentMonth'),
"_daysOfTheWeek": ( 
                    ["Sunday",
                    "Monday",
                    "Tuesday", 
                    "Wednesday", 
                    "Friday", 
                    "Thursday", 
                    "Saturday"
                ]),
                
"_monthsOfTheYear": (
                        ["January", 
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
                        "December"
                    ]),

"_calendarMonths": (
                    [
                    "jan",
                    "feb",
                    "mar",
                    "apr",
                    "may",
                    "jun",
                    "jul",
                    "aug",
                    "sep",
                    "oct",
                    "nov"
                ])
};

currentMonth = _currentMonth + 1;

    tmpPreviousCalendarMonth.addEventListener('click', function displayPreviousMonth()
{
    tmpMain.innerHTML += "<h1>" + _currentMonth + "</h1>";
});