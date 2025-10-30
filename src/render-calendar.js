        let _currentDate = new Date();
        let _currentDay = _currentDate.getDate();
        let _currentMonth = _currentDate.getMonth();
        let _currentYear = _currentDate.getFullYear();
        let _timeOfDay = _currentDate.getHours();
        const _todaysDate = new Date();
        const _buttonPreviousMonth = document.getElementById('prev');
        const _buttonNextMonth = document.getElementById('next');
        const _buttonThisMonth = document.getElementById('current');
        const _agendaRenderContainer = document.getElementById('agendaDisplay');
        const _calendarRenderContainer = document.getElementById('mainContent');
        const _daysOfTheWeek = ( 
                    ["Sun",
                    "Mon",
                    "Tue", 
                    "Wed", 
                    "Thu",
                    "Fri", 
                    "Sat"
                    ]);
        const _monthsOfTheYear = (
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
                    ]);
                
        
        // calculates the number of days in a given month of a year
        function daysInCalendarMonth(pYear, pMonth)
		{
			return new Date(pYear, pMonth + 1, 0).getDate();
		}

        // generates calendar
        function generateCalendar(pCurrentYear, pCurrentMonth)
        {
            let tmpTable = '<table class="calendar-table">';
            tmpTable += '<tr>';
            for ( i = 0; i < 7; i++)
            {
                tmpTable += '<th class="day">' + _daysOfTheWeek[i] + '</th>';
            }
            tmpTable += '</tr>';
            // get the number of weeks in the current month 
            let tmpNumberOfDaysInTheMonth = daysInCalendarMonth(pCurrentYear, pCurrentMonth);
            let tmpNumberOfDaysInLastMonth = daysInCalendarMonth(pCurrentYear, pCurrentMonth - 1)
            let tmpNumberOfWeeksInCurrentMonth = Math.ceil(tmpNumberOfDaysInTheMonth / 7);
            let tmpNumberOfDaysToRender = tmpNumberOfWeeksInCurrentMonth * 7;
            let tmpFirstDayOfTheCurrentMonth = new Date(pCurrentYear, pCurrentMonth, 1);
            let tmpWeekDayIndexOfTheFirstDayOfTheCurrentMonth = tmpFirstDayOfTheCurrentMonth.getDay();
            let tmpCurrentlyRenderingDayOfThisMonth = 1;
            let tmpCurrentlyRenderingDayOfNextMonth = 1;
            let tmpCurrentlyRenderingDayOfLastMonth = tmpNumberOfDaysInLastMonth - tmpWeekDayIndexOfTheFirstDayOfTheCurrentMonth + 1;

            if ( tmpWeekDayIndexOfTheFirstDayOfTheCurrentMonth > 4)
            {
                tmpNumberOfDaysToRender += 7;
            }
            for ( i = 0; i < tmpNumberOfDaysToRender; i++)
            {
                // this is which week of the month we are on starting at 0
                let tmpWeekIndex = Math.floor(i / 7);
                // this is whether it's day 0 to day 6 as displayed on the calendar
                let tmpWeekDayIndex = i % 7;

                if ( tmpWeekDayIndex == 0)
                {
                    tmpTable += '<tr>';
                }
                // first week of the month
                if ( tmpWeekIndex == 0)
                {
                    // if it's before the first day of this month
                    if ( tmpWeekDayIndex < tmpWeekDayIndexOfTheFirstDayOfTheCurrentMonth)
                    {
                        tmpTable += '<td><div id="day" class="lastMonth monthDay" data-i-day="' + tmpCurrentlyRenderingDayOfLastMonth + '" data-i-month="' + pCurrentMonth +'" data-i-year="' + pCurrentYear + '">' + tmpCurrentlyRenderingDayOfLastMonth + '</div></td>';
                        tmpCurrentlyRenderingDayOfLastMonth++;
                    }
                    else
                    {
                        tmpTable += '<td><div id="day" class="thisMonth monthDay" data-i-day="' + tmpCurrentlyRenderingDayOfThisMonth + '" data-i-month="' + pCurrentMonth +'" data-i-year="' + pCurrentYear + '">' + tmpCurrentlyRenderingDayOfThisMonth + '</div></td>';
                        tmpCurrentlyRenderingDayOfThisMonth++;
                    }
                }
                // any other week of the month
                else
                {
                    if ( tmpCurrentlyRenderingDayOfThisMonth <= tmpNumberOfDaysInTheMonth)
                    {
                        tmpTable += '<td><div id="day" class="thisMonth monthDay" data-i-day="' + tmpCurrentlyRenderingDayOfThisMonth + '" data-i-month="' + pCurrentMonth +'" data-i-year="' + pCurrentYear + '">' + tmpCurrentlyRenderingDayOfThisMonth + '</div></td>';
                        tmpCurrentlyRenderingDayOfThisMonth++;
                    }
                    else
                    {
                        tmpTable += '<td><div id="day" class="nextMonth monthDay" data-i-day="' + tmpCurrentlyRenderingDayOfNextMonth + '" data-i-month="' + pCurrentMonth +'" data-i-year="' + pCurrentYear + '">' + tmpCurrentlyRenderingDayOfNextMonth + '</div></td>';
                        tmpCurrentlyRenderingDayOfNextMonth++;
                    }
                }
                // if it's the last rendered day of the week
                if ( tmpWeekDayIndex == 6)
                {
                    tmpTable += '</tr>';
                }
            }
                tmpTable += '</table>';
                _calendarRenderContainer.innerHTML = tmpTable;
                document.getElementById("calendarHeader").innerHTML = '<h1 class="dateHeader">' + _monthsOfTheYear[pCurrentMonth] + ' ' + pCurrentYear + '</h1>';
                // getting the day month and year of day divs on click
                const tmpDayDivs = document.getElementsByClassName("monthDay");
                // for each div
                for (let tmpDiv of tmpDayDivs)
                {
                    let tmpYear = Number(tmpDiv.dataset.iYear);
                    let tmpMonth = Number(tmpDiv.dataset.iMonth);
                    let tmpDay = Number(tmpDiv.dataset.iDay);
                    // if it's the month before -1
                    if (tmpDiv.classList.contains("lastMonth"))
                    {
                        tmpMonth--
                    }
                    // if it's the month after +1
                    else if (tmpDiv.classList.contains("nextMonth"))
                    {
                        tmpMonth++
                    }
                    // if the month is below 0 then set it to 11 and increment year by -1
                    if (tmpMonth < 0)
                    {
                        tmpMonth = 11
                        tmpYear--;
                    }
                    // if the month is greater than 11 then set it to 0 and increment year by 1
                    else if (tmpMonth > 11)
                    {
                        tmpMonth = 0;
                        tmpYear++; 
                    }
                    // making it run the agenda on click of the div
                    tmpDiv.addEventListener("click", function()
                        {
                            generateAgenda(tmpYear, tmpMonth, tmpDay);
                        });
                }
        }

        // function to generate agenda for the day selected
        function generateAgenda(pCurrentYear, pCurrentMonth, pCurrentDay)
        {
            let tmpAgendaHeader = '<h1 class="agendaHeader">' + _monthsOfTheYear[pCurrentMonth] + ' ' + pCurrentDay + ', ' + pCurrentYear + '</h1>';
            // creating categories and events columns
            let tmpAgenda = '<table class="agenda"><tr class="categories"><td>Time</td><td>Event</td></tr>';
            let tmpAgendaTime = _timeOfDay;
            let tmpAgendaRowIndex = 10;
            
            // generates table with 10 rows, 2 columns and an input to put data into
            for (i = 0; i < tmpAgendaRowIndex; i++)
            {
                // if it's past 12 the time is set to 1 not using military time 
                if ( tmpAgendaTime > 12 )
                {
                    tmpAgendaTime = 1;
                }
                
                // adds rows with incrementing times as well as text boxes next to them
                tmpAgenda += '<tr>' + '<td>' + tmpAgendaTime + ':00' + '</td>' + '<td>' + '<input type="text"id="event"></input>' + '</td>' + '</tr>';
                tmpAgendaTime++;
            }
            tmpEvent = document.getElementById("event");
            _agendaRenderContainer.innerHTML = "";
            _agendaRenderContainer.innerHTML += tmpAgendaHeader;
            _agendaRenderContainer.innerHTML += tmpAgenda;  
        }

        // setting buttons to call toPreviousMonth and toNextMonth respectively on click
        _buttonPreviousMonth.addEventListener('click', toPreviousMonth);
        _buttonNextMonth.addEventListener('click', toNextMonth);
        _buttonThisMonth.addEventListener('click', toCurrentMonth);

        // renders previous month
        function toPreviousMonth()
        {
                if (_currentMonth == 0)
                {
                    _currentYear--;
                    _currentMonth = 11;
                }
                else
                {
                    _currentMonth--;
                }
                generateCalendar(_currentYear, _currentMonth);
                return true;
        }

        // renders next month
        function toNextMonth()
        {
                if (_currentMonth == 11)
                {
                    _currentYear++;
                    _currentMonth = 0;
                }
                else
                {
                    _currentMonth++;
                }
                generateCalendar(_currentYear, _currentMonth);
                return true;
        }

        // renders current month
        function toCurrentMonth()
        {

            generateCalendar(_todaysDate.getFullYear(), _todaysDate.getMonth());
            return true;
        }

        generateCalendar(_currentYear, _currentMonth);