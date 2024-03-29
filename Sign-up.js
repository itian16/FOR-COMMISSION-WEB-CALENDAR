document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signup-form");

    // Add event listener for form submission
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const fullName = signupForm.querySelector("input[name='Fullname']").value;
        const studentID = signupForm.querySelector("input[name='StudentID']").value;
        const email = signupForm.querySelector("input[name='Email']").value;
        const password = signupForm.querySelector("input[name='password']").value;

        // Validate email format
        if (!isValidEmail(email)) {
            // Display error message
            alert('Please enter a valid email address.');
            // Clear email field
            signupForm.querySelector("input[name='Email']").value = '';
            return; // Exit function if email is invalid
        }

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

        // Reset the email field
        signupForm.querySelector("input[name='Email']").value = '';

        // Show success message
        const successMessage = document.getElementById("success-message");
        successMessage.style.display = "block";

        // Optionally, you can redirect the user after a delay
        setTimeout(function() {
            window.location.href = "index.html"; // Redirect to admin home page
        }, 2000); // Redirect after 2 seconds (2000 milliseconds)
    });
});

// Function to validate email format using regular expression
function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}