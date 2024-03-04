document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const fullName = signupForm.querySelector("input[name='Fullname']").value;
        const studentID = signupForm.querySelector("input[name='StudentID']").value;
        const email = signupForm.querySelector("input[name='Email']").value;
        const password = signupForm.querySelector("input[name='password']").value;

        // Check if the email is the admin's email
        const isAdmin = (email === "admin@example.com");

        // Create user object
        const user = {
            fullName: fullName,
            studentID: studentID,
            email: email,
            password: password,
            isAdmin: isAdmin // Set isAdmin flag
        };

        // Save user to localStorage
        let userList = JSON.parse(localStorage.getItem('userList')) || [];
        userList.push(user);
        localStorage.setItem('userList', JSON.stringify(userList));

        // Optionally, you can redirect the user to another page after signup
        window.location.href = "index.html"; // Redirect to admin home page
    });
});