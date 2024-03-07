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
        fullName: "admin",
        email: "admin",
        password: "admin"
    }
];

// Function to initialize localStorage with default data if it doesn't exist
function initializeDefaultData() {
    let userList = JSON.parse(localStorage.getItem('userList')) || [];
    // Check if admin user already exists in userList
    const adminExists = userList.some(user => user.email === "admin");
    if (!adminExists) {
        // Add admin user to userList if it doesn't exist
        userList.push(defaultUserList[0]);
        localStorage.setItem('userList', JSON.stringify(userList));
    }
}

// Call the initialization function
initializeDefaultData();