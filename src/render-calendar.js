        let _currentDate = new Date();
        let _currentDay = _currentDate.getDate();
        let _currentMonth = _currentDate.getMonth();
        let _currentYear = _currentDate.getFullYear();
        let _timeOfDay = _currentDate.getHours();
        const _todaysDate = new Date();
        const _buttonPreviousMonth = document.getElementById('prev');
        const _buttonNextMonth = document.getElementById('next');
        const _buttonThisMonth = document.getElementById('current');
        const _buttonPreviousDay = document.getElementById('agendaPrev');
        const _buttonNextDay = document.getElementById('agendaNext');
        const _buttonPreviousYear = document.getElementById('prevYear');
        const _buttonnextYear = document.getElementById('nextYear');
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
            let tmpCurrentYearAsInt = parseInt(pCurrentYear, 10);
            let tmpCurrentMonthAsInt = parseInt(pCurrentMonth, 10);
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
                        if ( tmpCurrentMonthAsInt == 0)
                        {
                            tmpTable += `<td><div id="day" class="lastMonth monthDay" data-i-day="${tmpCurrentlyRenderingDayOfLastMonth}" data-i-month="11" data-i-year="${pCurrentYear - 1}">${tmpCurrentlyRenderingDayOfLastMonth}</div></td>`;
                        }
                        else
                        {
                            tmpTable += `<td><div id="day" class="lastMonth monthDay" data-i-day="${tmpCurrentlyRenderingDayOfLastMonth}" data-i-month="${tmpCurrentMonthAsInt - 1}" data-i-year="${pCurrentYear}">${tmpCurrentlyRenderingDayOfLastMonth}</div></td>`;
                        }
                        tmpCurrentlyRenderingDayOfLastMonth++;
                    }
                    else
                    {
                        tmpTable += `<td><div id="day" class="thisMonth monthDay" data-i-day="${tmpCurrentlyRenderingDayOfThisMonth}" data-i-month="${tmpCurrentMonthAsInt}" data-i-year="${pCurrentYear}">${tmpCurrentlyRenderingDayOfThisMonth}</div></td>`;
                        tmpCurrentlyRenderingDayOfThisMonth++;
                    }
                }
                // any other week of the month
                else
                {
                    if ( tmpCurrentlyRenderingDayOfThisMonth <= tmpNumberOfDaysInTheMonth)
                    {
                        tmpTable += `<td><div id="day" class="thisMonth monthDay" data-i-day="${tmpCurrentlyRenderingDayOfThisMonth}" data-i-month="${tmpCurrentMonthAsInt}" data-i-year="${pCurrentYear}">${tmpCurrentlyRenderingDayOfThisMonth}</div></td>`;
                        tmpCurrentlyRenderingDayOfThisMonth++;
                    }
                    else
                    {
                        tmpTable += `<td><div id="day" class="nextMonth monthDay" data-i-day="${tmpCurrentlyRenderingDayOfNextMonth}" data-i-month="`;
                        if ( tmpCurrentMonthAsInt == 11)
                        {
                            tmpTable += 0;
                            tmpTable += `" data-i-year="${tmpCurrentYearAsInt + 1}">${tmpCurrentlyRenderingDayOfNextMonth}</div></td>`;
                        }
                        else
                        {
                            tmpTable += (tmpCurrentMonthAsInt + 1);
                            tmpTable += `" data-i-year="${pCurrentYear}">${tmpCurrentlyRenderingDayOfNextMonth}</div></td>`;
                        }
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
                document.getElementById("calendarHeader").innerHTML = `<h1 class="dateHeader"><b>${_monthsOfTheYear[pCurrentMonth]}</b> ${pCurrentYear}</h1>`;
                // getting the day month and year of day divs on click
                const tmpDayDivs = document.getElementsByClassName("monthDay");
                // for each div
                for (let tmpDiv of tmpDayDivs)
                {
                    // making it run the agenda on click of the div
                    tmpDiv.addEventListener("click", function ()
                    {  
                        setCurrentDay(tmpDiv.getAttribute("data-i-year"), tmpDiv.getAttribute("data-i-month"), tmpDiv.getAttribute("data-i-day"));
                    });
            }
        }

        // function to generate agenda for the day selected
        function generateAgenda(pCurrentYear, pCurrentMonth, pCurrentDay)
        {
            let tmpAgendaHeader = `<h1 class="agendaHeader">${_monthsOfTheYear[pCurrentMonth]} ${pCurrentDay}, ${pCurrentYear}</h1>`;
            // creating categories and events columns
            let tmpAgenda = '<table class="agenda"><tr class="categories"><td>Time</td><td>Event</td></tr>';
            let tmpAgendaHeaderContainer = document.getElementById("agendaHeader");
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
            tmpAgendaHeaderContainer.innerHTML = tmpAgendaHeader;
            _agendaRenderContainer.innerHTML += tmpAgenda;  
        }

        function setCurrentDay(pYear, pMonth, pDay)
        {
            _currentYear = pYear;
            _currentMonth = pMonth;
            _currentDay = pDay;
            console.log(`The current date is: ${(pMonth + 1)}/${pDay}/${pYear}`);
            generateCalendar(pYear, pMonth);
            generateAgenda(pYear, pMonth, pDay);
        }

        // setting buttons to call toPreviousMonth and toNextMonth respectively on click
        _buttonPreviousMonth.addEventListener('click', toPreviousMonth);
        _buttonNextMonth.addEventListener('click', toNextMonth);
        _buttonThisMonth.addEventListener('click', toCurrentMonth);
        _buttonNextDay.addEventListener('click', toNextAgendaDay);
        _buttonPreviousDay.addEventListener('click', toPreviousAgendaDay);
        _buttonPreviousYear.addEventListener('click', toPreviousYear);
        _buttonnextYear.addEventListener('click', toNextYear);

        // renders previous year
        function toPreviousYear()
        {
            _currentYear--;
            setCurrentDay(_currentYear, _currentMonth, _currentDay);
        }

        // renders next year
        function toNextYear()
        {
            _currentYear++;
            setCurrentDay(_currentYear, _currentMonth, _currentDay);
        }

        // renders previous month
        function toPreviousMonth()
        {
            if ( _currentMonth == 0)
            {
                _currentMonth = 11;
                _currentYear--;
            }
            else
            {
                _currentMonth--;
            }
            setCurrentDay(_currentYear, _currentMonth, _currentDay);
        }

        // renders next month
        function toNextMonth()
        {
            if ( _currentMonth == 11)
            {
                _currentMonth = 0;
                _currentYear++;
            }
            else
            {
                _currentMonth++;
            }
            setCurrentDay(_currentYear, _currentMonth, _currentDay);
        }

        // renders current month
        function toCurrentMonth()
        {
            setCurrentDay(_todaysDate.getFullYear(), _todaysDate.getMonth(), _todaysDate.getDate());
        }

        function toNextAgendaDay()
        {
            console.log(`Agenda day is: ${_currentDay}`);
            if ( _currentDay >= daysInCalendarMonth(_currentYear, _currentMonth))
            {
                _currentDay = 1;
                toNextMonth();
            }
            else
            {
                _currentDay++; 
                setCurrentDay(_currentYear, _currentMonth, _currentDay);
            }
            console.log(`Agenda day changed to: ${_currentDay}`);
        }

        function toPreviousAgendaDay()
        {
            console.log(`Agenda day is: ${_currentDay}`);
            if ( _currentDay == 1)
            {
                _currentDay = daysInCalendarMonth(_currentYear, _currentMonth - 1);
                toPreviousMonth();
            }
            else
            {
                _currentDay--;
                setCurrentDay(_currentYear, _currentMonth, _currentDay);
            }
            console.log(`Agenda day changed to: ${_currentDay}`);
        }
        setCurrentDay(_currentYear, _currentMonth, _currentDay);