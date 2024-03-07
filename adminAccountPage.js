function displayData() {
    let userList = JSON.parse(localStorage.getItem('userList')) || []; // Retrieve users from localStorage
    const userListTable = document.getElementById("user-list");
    userListTable.innerHTML = ""; // Clear existing content

    // Loop through localStorage users
    for (let userData of userList) {
        // Create a table row for each user
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${userData.studentID}</td>
            <td>${userData.fullName}</td>
            <td>${userData.email}</td>
            <td>${userData.password}</td>
            <td><button onclick="deleteUser('${userData.email}')">Delete</button></td>
        `;
        userListTable.appendChild(row);
    }
}

function deleteUser(email) {
    let userList = JSON.parse(localStorage.getItem('userList')) || [];
    userList = userList.filter(user => user.email !== email); // Remove user with matching email
    localStorage.setItem('userList', JSON.stringify(userList));
    displayData(); // Repopulate the user list after deletion
}

// Default or dummy data for admin
const defaultUserList = [
    {
        studentID: "0",
        fullName: "admins",
        email: "admin",
        password: "admin"
    }
];

// Function to initialize localStorage with default data if it doesn't exist
function initializeDefaultData() {
    if (!localStorage.getItem('userList')) {
        localStorage.setItem('userList', JSON.stringify(defaultUserList));
    }
}

// Call the initialization function
initializeDefaultData();