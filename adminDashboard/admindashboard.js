var database = firebase.database();
    
            // Handle form submission
            addteacherform.addEventListener('submit', function (e) {
                e.preventDefault(); // Prevent the form from submitting normally
    
                // Get user input
                var teacherName = document.getElementById("teacher-name").value;
                var teacherDepartment = document.getElementById("teacher-department").value;
                var teacherSubject = document.getElementById("teacher-subject").value;
    
                // Reference to the 'students' node in your database
                var teachersRef = database.ref('teachers');
    
                // Push the student registration data to the database
                teachersRef.push({
                    name: teacherName,
                    department: teacherDepartment,
                    subject: teacherSubject
                });
    
                // Clear the form fields after registration
                document.getElementById("teacher-name").value = "";
                document.getElementById("teacher-department").value = "";
                document.getElementById("teacher-subject").value = "";
    
                alert("Teacher added successfully!");
            });

    // Function to display teachers' data from Firebase
    function displayTeachers() {
        var teachersRef = database.ref('teachers');

        // Attach a listener to retrieve data
        teachersRef.on('value', function (snapshot) {
            var teachersTable = document.getElementById("teachers-table");
            teachersTable.innerHTML = ""; // Clear the table

            snapshot.forEach(function (childSnapshot) {
                var teacher = childSnapshot.val();
                var teacherKey = childSnapshot.key;

                // Create a table row for each teacher
                var row = teachersTable.insertRow();
                var nameCell = row.insertCell(0);
                var departmentCell = row.insertCell(1);
                var subjectCell = row.insertCell(2);
                var passwordCell = row.insertCell(3);
                var actionsCell = row.insertCell(4);

                // Populate the table cells with teacher data
                nameCell.innerHTML = teacher.name;
                departmentCell.innerHTML = teacher.department;
                subjectCell.innerHTML = teacher.subject;
                passwordCell.innerHTML = teacher.password || 'Not Set'; // Display password or "Not Set"

                // Add set password button
                actionsCell.innerHTML = `
                    <button onclick="setPassword('${teacherKey}')">Set Password</button>
                `;
            });
        });
    }

    // Function to set a password for a teacher and store it in Firebase
    function setPassword(teacherKey) {
        var newPassword = prompt("Enter a new password for this teacher:");

        if (newPassword) {
            var teachersRef = database.ref('teachers/' + teacherKey);
            teachersRef.update({
                password: newPassword
            });

            alert("Password updated successfully!");
        }
    }

    // Call the displayTeachers function to populate the table
    displayTeachers();
    function fetchStudents() {
        var studentsRef = database.ref('students');

        // Attach a listener to retrieve data
        studentsRef.on('value', function (snapshot) {
            var studentsTable = document.getElementById("students-table");
            studentsTable.innerHTML = ""; // Clear the table

            snapshot.forEach(function (childSnapshot) {
                var student = childSnapshot.val();
                var studentKey = childSnapshot.key;

                // Create a table row for each student
                var row = studentsTable.insertRow();
                var nameCell = row.insertCell(0);
                var departmentCell = row.insertCell(1);
                var statusCell = row.insertCell(2);
                var actionsCell = row.insertCell(3);

                // Populate the table cells with student data
                nameCell.innerHTML = student.username;
                departmentCell.innerHTML = student.password;
                statusCell.innerHTML = student.status;

                // Add approve and reject buttons
                actionsCell.innerHTML = `
                    <button onclick="approveRegistration('${studentKey}')">Approve</button>
                    <button onclick="rejectRegistration('${studentKey}')">Reject</button>
                `;
            });
        });
    }

    // Function to approve a student registration
    function approveRegistration(studentKey) {
        var studentsRef = database.ref('students/' + studentKey);
        studentsRef.update({
            status: "Approved"
        });
    }

    // Function to reject a student registration
    function rejectRegistration(studentKey) {
        var studentsRef = database.ref('students/' + studentKey);
        studentsRef.update({
            status: "Rejected"
        });
    }

    // Call the displayTeachers and fetchStudents functions to populate the tables
    
    fetchStudents();

 function logout(){
    window.location.href = "../index.html";
 }