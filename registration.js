var database = firebase.database();
var registrationForm = document.getElementById('registrationForm');

// Reference to the success message element
var successMessage = document.getElementById('successMessage');

// Handle form submission
registrationForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Get user input
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Reference to the 'students' node in your database
    var studentsRef = database.ref('students');

    // Push the student registration data to the database
    studentsRef.push({
        username: username,
        password: password
        // Add more student-specific fields here (if needed)
    });

    // Clear the form fields after registration
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    // Display a success message
    successMessage.textContent = 'User registered successfully';
});