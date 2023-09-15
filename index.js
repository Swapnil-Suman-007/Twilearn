var database = firebase.database();
document.getElementById("loginForm").addEventListener("submit", function (event) {
event.preventDefault();

var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
var role = document.getElementById("role").value;
var ErrorMessage = document.getElementById('errorMessage');

// Check the role and validate credentials
if (role === "admin" && username === "root" && password === "root") {
   // Admin login success, redirect or perform actions
   window.location.href = "./adminDashboard/admindashboard.html"
   // Redirect to the admin dashboard or perform actions


} else if (role === "teacher") {
   // For teachers, retrieve the stored password from Firebase
   var teachersRef = database.ref('teachers');
   teachersRef.once('value', function (snapshot) {
       snapshot.forEach(function (childSnapshot) {
           var teacher = childSnapshot.val();
           if (teacher.name === username && teacher.password === password) {
               // Teacher login success, redirect or perform actions
               window.location.href = "./teacherDashboard/teacherdashboard.html"
               // Redirect to the teacher dashboard or perform actions
           }
           else{
            
            ErrorMessage.textContent = 'Invalid Credentials!';
                        }
           
       });
   });

} 

else if (role === "student") {
   // For students, check if their credentials exist and are approved in Firebase
   var studentsRef = database.ref('students');
   studentsRef.once('value', function (snapshot) {
       snapshot.forEach(function (childSnapshot) {
           var student = childSnapshot.val();
           if (student.username === username && student.password === password && student.status === "Approved") {
               // Student login success, redirect or perform actions
               window.location.href = "./studentSection/student.html"
               // Redirect to the student dashboard or perform actions
           }
           else{
            
ErrorMessage.textContent = 'Invalid Credentials!';
           }
           
       });
   });
} 
else{
  
ErrorMessage.textContent = 'Invalid Credentials!';
}


});