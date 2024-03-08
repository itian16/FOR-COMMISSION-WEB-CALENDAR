// Define an array to store events, initialize it with events from local storage if available
let events = JSON.parse(localStorage.getItem('events')) || [];
 
// letiables to store event input fields and reminder list
let eventDateInput =
    document.getElementById("eventDate");
let eventTimeInput =
    document.getElementById("eventTime");
let eventTitleInput =
    document.getElementById("eventTitle");
let eventDescriptionInput =
    document.getElementById("eventDescription");
let reminderList =
    document.getElementById("reminderList");
 
// Counter to generate unique event IDs
let eventIdCounter = 1;
 
// Function to add default events
function addDefaultEvents() {
    // Define default events
    const defaultEvents = [
        { date: '2024-02-26', time: '08:00 AM', title: 'Art Exhibit', description: 'This is the first Senior High School Event that enhances the creativity and art appreciation of Grade 11 and 12 students.' },
        { date: '2024-02-27', time: '07:00 AM', title: 'Foundation Day', description: 'The Foundation Day for Grade 11 and 12 SHS students at the University of Cabuyao is an annual celebration marking the university establishment. It includes academic competitions, sports events, cultural presentations, and social gatherings to foster unity and pride among students.' },
        { date: '2024-02-27', time: '08:00 AM', title: 'Color Parade', description: 'The Color Parade is a vibrant part of the Foundation Day celebration for Grade 11 and 12 SHS students at the University of Cabuyao. It involves students showcasing their creativity and school spirit by dressing up in their school colors or themed costumes and parading around the campus. This lively event adds excitement and energy to the festivities, fostering a sense of unity and pride among the students.' },
        { date: '2023-04-16', time: '05:00 AM', title: 'Bubble Run', description: 'The Bubble Run is a fun and colorful activity incorporated into the Foundation Day celebration for Grade 11 and 12 SHS students at the University of Cabuyao. Participants run or walk through a course filled with foam bubbles, creating a lively and exhilarating atmosphere. This event promotes physical fitness, teamwork, and camaraderie among students, while adding an element of excitement and joy to the festivities.' },
        { date: '2023-10-23', time: '08:00 AM', title: 'Sportsfest', description: 'The Sports Fest for both Senior High School (SHS) and college students at the University of Cabuyao is a thrilling event that promotes sportsmanship, teamwork, and healthy competition. It features various sports competitions such as basketball, volleyball, football, and track and field, among others. Students from both SHS and college divisions compete against each other, showcasing their athletic skills and school pride. The Sports Fest fosters camaraderie and unity among students across different academic levels, creating a vibrant and lively atmosphere on campus.' }
    ];

    // Check if default events are already added
    const defaultEventsAdded = defaultEvents.every(defaultEvent => {
        return events.some(event => {
            return event.date === defaultEvent.date &&
                   event.title === defaultEvent.title;
        });
    });

    // Add default events only if they are not already added
    if (!defaultEventsAdded) {
        defaultEvents.forEach(event => {
            events.push({
                id: eventIdCounter++,
                date: event.date,
                time: event.time,
                title: event.title,
                description: event.description
            });
        });

        // Update the display
        showCalendar(currentMonth, currentYear);
        displayReminders();
    }
}

// Call the addDefaultEvents function after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    addDefaultEvents();
});

// Function to add events
function addEvent() {
    let date = eventDateInput.value;
    let time = eventTimeInput.value;
    let title = eventTitleInput.value;
    let description = eventDescriptionInput.value;
 
    if (date && title) {
        // Create a unique event ID
        let eventId = eventIdCounter++;
 
        events.push(
            {
                id: eventId, 
                date: date,
                time: time,
                title: title,
                description: description
            }
        );
        showCalendar(currentMonth, currentYear);
        eventDateInput.value = "";
        eventTimeInput.value = "";
        eventTitleInput.value = "";
        eventDescriptionInput.value = "";
        displayReminders();

        // Dispatch custom event to notify user page about new event
        const newEventAddedEvent = new Event('newEventAdded');
        document.dispatchEvent(newEventAddedEvent);
        
        // Store new events in localStorage
        localStorage.setItem('events', JSON.stringify(events));

        // Display a notification about the new event
        displayNotification(title);

        
    }
}

// Function to display a notification about the newly added event
function displayNotification(eventTitle, eventId) {
    // Add the event title to the notification bar
    let notificationBar = document.getElementById('notificationBar');
    let newEventNotification = document.createElement('p');
    newEventNotification.textContent = `New event added: ${eventTitle}`;

    // Check if the event ID is present in localStorage
    let viewedEvents = JSON.parse(localStorage.getItem('viewedEvents')) || [];
    if (!viewedEvents.includes(eventId.toString())) {
        newEventNotification.style.backgroundColor = '#f8f9fa'; // Set background color if it's the first time viewing
        viewedEvents.push(eventId.toString()); // Add event ID to viewed events list
        localStorage.setItem('viewedEvents', JSON.stringify(viewedEvents)); // Update localStorage
    }
    else {
        newEventNotification.style.backgroundColor = 'transparent'; // Set background color to transparent if already viewed
    }
    
    notificationBar.appendChild(newEventNotification);
}

// Function to clear viewed events from localStorage
function clearViewedEvents() {
    localStorage.removeItem('viewedEvents');
}

// Function to delete an event by ID
function deleteEvent(eventId) {
    // Find the index of the event with the given ID
    let eventIndex = events.findIndex((event) => event.id === eventId);
 
    if (eventIndex !== -1) {
        // Remove the event from the events array
        events.splice(eventIndex, 1);
        // Update the reminders section
        displayReminders();
        // Update the event display panel
        displayEvents(events); // Re-display all events in the event display panel
    }
    
    // Dispatch custom event to notify user page about event deletion
    const eventDeletedEvent = new Event('eventDeleted');
    document.dispatchEvent(eventDeletedEvent);
    
    localStorage.setItem('events', JSON.stringify(events));
}
 
// Function to display reminders sorted from nearest date to furthest
function displayReminders() {
    reminderList.innerHTML = "";

    // Sort events by date
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let eventDate = new Date(event.date);
        if (eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear) {
            let listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${event.title}</strong> - ${event.description} - ${event.time} on ${eventDate.toLocaleDateString()}`;
 
            // Add a delete button for each reminder item
            let deleteButton = document.createElement("button");
            deleteButton.className = "delete-event";
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function () {
                deleteEvent(event.id);
            };
 
            listItem.appendChild(deleteButton);
            reminderList.appendChild(listItem);
        }
    }
    localStorage.setItem('events', JSON.stringify(events));
}
 
// Function to generate a range of 
// years for the year select input
function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}
 
// Initialize date-related letiables
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
 
createYear = generate_year_range(2023, 2040);
 
document.getElementById("year").innerHTML = createYear;
 
let calendar = document.getElementById("calendar");
 
let months = [
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
    "December"
];
let days = [
    "Sun", "Mon", "Tue", "Wed",
    "Thu", "Fri", "Sat"];
 
$dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";
 
document.getElementById("thead-month").innerHTML = $dataHead;
 
monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);
 
// Function to navigate to the next month
function next() {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}
 
// Function to navigate to the previous month
function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}
 
// Function to jump to a specific month and year
function jump() {
    let selectedMonth = parseInt(selectMonth.value);
    let selectedYear = parseInt(selectYear.value);
    showCalendar(selectedMonth, selectedYear);
}
 
// Function to display the calendar
function showCalendar(month, year) {
    let firstDay = new Date(year, month, 1).getDay();
    tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
 
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span";
 
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.className = "date-picker selected";
                }
 
                // Check if there are events on this date
                if (hasEventOnDate(date, month, year)) {
                    cell.classList.add("event-marker");
                }
 
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
 
    // Reattach event listeners to all date cells
    const dateCells = document.querySelectorAll('.date-picker');
    dateCells.forEach(cell => {
        cell.addEventListener('click', handleDayClick);
    });

    // Call displayReminders to update the event display panel
    displayReminders();
    localStorage.setItem('events', JSON.stringify(events));
}
 
// Function to create an event tooltip
function createEventTooltip(date, month, year) {
    let tooltip = document.createElement("div");
    tooltip.className = "event-tooltip";
    let eventsOnDate = getEventsOnDate(date, month, year);
    for (let i = 0; i < eventsOnDate.length; i++) {
        let event = eventsOnDate[i];
        let eventDate = new Date(event.date);
        let eventText = `<strong>${event.title}</strong> - ${event.description} on ${eventDate.toLocaleDateString()}`;
        let eventElement = document.createElement("p");
        eventElement.innerHTML = eventText;
        tooltip.appendChild(eventElement);
    }
    return tooltip;
}
 
// Function to get events on a specific date
function getEventsOnDate(date, month, year) {
    return events.filter(function (event) {
        let eventDate = new Date(event.date);
        return (eventDate.getDate() === date && eventDate.getMonth() === month && eventDate.getFullYear() === year);
    });
}
 
// Function to check if there are events on a specific date
function hasEventOnDate(date, month, year) {
    return getEventsOnDate(date, month, year).length > 0;
}
 
// Function to get the number of days in a month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
 
// Call the showCalendar function initially to display the calendar
showCalendar(currentMonth, currentYear);

// Add event listeners to all date cells
const dateCells = document.querySelectorAll('.date-picker');
dateCells.forEach(cell => {
    cell.addEventListener('click', handleDayClick);
});

// Function to handle click event on each day in the calendar
function handleDayClick(event) {
    // Get the clicked day, month, and year
    const selectedDay = parseInt(event.target.innerText);
    const selectedMonth = parseInt(event.target.getAttribute('data-month')) - 1;
    const selectedYear = parseInt(event.target.getAttribute('data-year'));

    // Filter events for the selected date
    const eventsForSelectedDate = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === selectedDay &&
               eventDate.getMonth() === selectedMonth &&
               eventDate.getFullYear() === selectedYear;
    });

    // Display events for the selected date
    displayEvents(eventsForSelectedDate);
}

// Function to display events for the selected date in the event display panel
function displayEvents(events) {
    const eventDisplayPanel = document.getElementById('event-display-panel');

    // Clear previous events displayed
    eventDisplayPanel.innerHTML = '';

    // Check if there are events for the selected date
    if (events.length === 0) {
        eventDisplayPanel.innerHTML = '<p>No events for this day</p>';
    } else {
        // Create a card or list item for each event and display it in the event display panel
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <h3>${event.title}</h3> 
                <p><b>Date:</b> ${event.date}</p>
                <p><b>Time:</b> ${event.time}</p>
                <p><b>Description:</b> ${event.description}</p>`;
            eventDisplayPanel.appendChild(eventCard);
        });
    }
}