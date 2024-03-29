// Function to load events from local storage
function loadEventsFromLocalStorage() {
    let storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
    }
}

// Function to save events to local storage
function saveEventsToLocalStorage() {
    localStorage.setItem('events', JSON.stringify(events));
}

// Load events from local storage when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadEventsFromLocalStorage();
    showCalendar(currentMonth, currentYear);
});

// Function to add events
function addEvent() {
    let date = eventDateInput.value;
    let title = eventTitleInput.value;
    let description = eventDescriptionInput.value;
    if (date && title) {
        // Create a unique event ID
        let eventId = eventIdCounter++;
        events.push({
            id: eventId,
            date: date,
            title: title,
            description: description
        });
        // Save events to local storage
        saveEventsToLocalStorage();
        // Update calendar and clear input fields
        showCalendar(currentMonth, currentYear);
        eventDateInput.value = "";
        eventTitleInput.value = "";
        eventDescriptionInput.value = "";
        displayReminders();
    }
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
        // Save events to local storage
        saveEventsToLocalStorage();
    }
}

// Scroll Spy
$(document).ready(function(){
    $('.scrollspy').scrollSpy();
});

// Side Navigation
document.addEventListener('DOMContentLoaded', function () {
    var elemsSidenav = document.querySelectorAll('.sidenav');
    var optionsSidenav = {
        edge: 'right'
    };
    var instancesSidenav = M.Sidenav.init(elemsSidenav, optionsSidenav);
});

// Update notification bar
function updateNotificationBar() {
    let storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        let events = JSON.parse(storedEvents);
        const currentDate = new Date();

        let notificationBar = document.getElementById('notificationBar');
        let newEventsDisplayed = false;

        events.forEach(event => {
            const eventDate = new Date(event.date);
            // Get the current date without the time component
            const currentDateWithoutTime = new Date();
            currentDateWithoutTime.setHours(0, 0, 0, 0);

            if (eventDate.getTime() >= currentDateWithoutTime.getTime()) {
                // Add event title and date to the notification bar
                notificationBar.innerHTML += `<p><b>New event added:</b> ${event.title} - ${event.date}</p>`;
                // Add the date when the event is added at the bottom of the event
                notificationBar.innerHTML += `<p style="font-size: 12px; color: gray; margin-bottom: 5px; margin-top: -13px;">Added on: ${new Date().toLocaleDateString()}</p>`;
                newEventsDisplayed = true;
            }
        });

        let notificationLink = document.getElementById('notificationLink');
        if (newEventsDisplayed) {
            notificationLink.innerHTML += '<span class="notification-indicator"></span>';
        }

        notificationLink.addEventListener('click', function() {
            let notificationIndicator = document.querySelector('.notification-indicator');
            if (notificationIndicator) {
                notificationIndicator.remove();
            }

            let viewedEvents = JSON.parse(localStorage.getItem('viewedEvents')) || [];
            events.forEach(event => {
                if (new Date(event.date) > currentDate && !viewedEvents.includes(event.id.toString())) {
                    viewedEvents.push(event.id.toString());
                }
            });
            localStorage.setItem('viewedEvents', JSON.stringify(viewedEvents));
        });

        // Add event listener to remove red indicator when notification modal is hidden
        let notificationModal = document.getElementById('notificationModal');
        $(notificationModal).on('hidden.bs.modal', function () {
            let notificationIndicator = document.querySelector('.notification-indicator');
            if (notificationIndicator) {
                notificationIndicator.remove();
            }
        });
    }
}


// Call the function to update the notification bar when the page loads
document.addEventListener('DOMContentLoaded', function () {
    updateNotificationBar();
});

// Display user profile
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        // Populate My Profile tab with user's full name
        const profileTab = document.querySelector('.modal-trigger');
        profileTab.innerHTML = `<i class="fa-regular fa-user"></i>${currentUser.fullName}`;

        // Display user's information in the modal
        const profileModal = document.getElementById('profileModal');
        const profileName = document.getElementById('profileName');
        const profileStudentID = document.getElementById('profileStudentID');
        const profileEmail = document.getElementById('profileEmail');

        profileName.textContent = `Name: ${currentUser.fullName}`;
        profileStudentID.textContent = `Student ID: ${currentUser.studentID}`;
        profileEmail.textContent = `Email: ${currentUser.email}`;

        // Adjust font size based on name length
        if (currentUser.fullName.length > 15) {
            profileName.style.fontSize = '30px'; // Set font size smaller for longer names
        }
    }
});