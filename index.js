document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const email = loginForm.querySelector("input[name='username']").value;
        const password = loginForm.querySelector("input[name='password']").value;

        // Retrieve user data from localStorage
        let userList = JSON.parse(localStorage.getItem('userList')) || [];
        
        // Find user with matching email
        const user = userList.find(user => user.email === email);

        if (user) {
            // Check if password matches
            if (user.password === password) {
                // Check if it's the admin account
                if (user.isAdmin) {
                    // Redirect to admin home page
                    window.location.href = "adminHomePage.html";
                } else {
                    // Redirect to user home page
                    window.location.href = "userHomePage.html";
                }
            } else {
                // Password doesn't match
                alert("Invalid password");
            }
        } else {
            // User not found
            alert("User not found");
        }
    });
});