  // Reference to the database
  var database = firebase.database();
  function yoyo() {
var selectedTeacher = document.getElementById("teacher-dropdown").value;

if (!selectedTeacher) {
alert("Please select a teacher first.");
return;
}

var appointmentsRef = database.ref('appointments');
var appointmentList = document.getElementById("manage-appointments");

// Clear existing appointment elements
appointmentList.innerHTML = "";

appointmentsRef.orderByChild('teacher').equalTo(selectedTeacher).on('value', function (appointmentSnapshot) {
appointmentSnapshot.forEach(function (appointmentChildSnapshot) {
var appointment = appointmentChildSnapshot.val();
var studentName = appointment.student;
var appointmentDate = appointment.date;
var appointmentStatus = appointment.status;
var appointmentTime = appointment.time;

// Create an appointment element
var appointmentElement = document.createElement("div");
appointmentElement.innerHTML = `
  <p><strong>${selectedTeacher} (Teacher)</strong> - Appointment with ${studentName} (Student) on ${appointmentDate}</p>
  <button onclick="manageAppointment('${appointmentChildSnapshot.key}', 'approve')">Approve</button>
  <button onclick="manageAppointment('${appointmentChildSnapshot.key}', 'cancel')">Cancel</button>
  <span>Status: ${appointmentStatus}</span>
`;

appointmentList.appendChild(appointmentElement);
});
});
}
function manageAppointment(appointmentKey, action) {
var appointmentsRef = database.ref('appointments/' + appointmentKey);
var updateData = {}; // Initialize an empty object for data updates

// Check if the action is 'approve'
if (action === 'approve') {
// Prompt the user for the date and time
var appointmentDate = prompt("Enter the date for the appointment (Format should be DD:MM:YYYY):");
var appointmentTime = prompt("Enter the time for the appointment (Format should be HH:MM PM/AM):");

if (!appointmentDate || !appointmentTime) {
alert("Appointment date or time cannot be empty.");
return;
}

// Update the status, date, and time in Firebase
updateData.status = 'Approved';
updateData.date = appointmentDate;
updateData.time = appointmentTime;


alert("Appointment has been approved and scheduled for " + appointmentDate + " at " + appointmentTime);
document.getElementById("datetime").innerHTML ='<h4> The date for appointment is: '+appointmentDate + ' ,The Timing for appointment is: '+appointmentTime+'  </b></h4>' ;
} else if (action === 'cancel') {
// Update the status to 'Canceled' if the action is 'cancel'
updateData.status = 'Canceled';
updateData.date = null; // Clear date and time
updateData.time = null;

alert("Appointment has been canceled.");
} else {
alert("Invalid action.");
return;
}

// Update the Firebase data
appointmentsRef.update(updateData);
}



  // Function to populate the dropdown with teacher names
  function populateTeacherDropdown() {
      var teacherDropdown = document.getElementById("teacher-dropdown");
  
      // Reference to the 'teachers' node in your database
      var teachersRef = database.ref('teachers');

      // Listen for changes in the 'teachers' data
      teachersRef.on('value', function (snapshot) {
          teacherDropdown.innerHTML = ""; // Clear existing options
          
          snapshot.forEach(function (childSnapshot) {
              var teacher = childSnapshot.val();
              var teacherName =teacher.name;

              // Create an option element for each teacher
              var option = document.createElement("option");
              option.value = teacherName;
              option.text = teacherName;

              // Append the option to the dropdown
              teacherDropdown.appendChild(option);
          });
      });
  }

  // Call the populateTeacherDropdown function to populate the dropdown with teacher names
  populateTeacherDropdown();

  // Function to display appointments and messages for the selected teacher
  function displayTeacherInfo() {
      document.getElementById("datetime").innerHTML ='';
      var teacherDropdown = document.getElementById("teacher-dropdown");
      var selectedTeacher = teacherDropdown.value;
      var teacherInfo = document.getElementById("teacher-info");

      // Clear existing content
      teacherInfo.innerHTML = "";

      // Reference to the 'messages' node in your database
      var messagesRef = database.ref('messages');
      var appointmentsRef = database.ref('appointments');

      // Display messages for the selected teacher
      var messagesTitle = document.createElement("h2");
      messagesTitle.innerText = "Messages and Appointment requests:";
      teacherInfo.appendChild(messagesTitle);

      messagesRef.orderByChild('teacher').equalTo(selectedTeacher).on('value', function (messageSnapshot) {
          messageSnapshot.forEach(function (messageChildSnapshot) {
              var message = messageChildSnapshot.val();
              var studentName = message.student;
              var messageContent = message.content;

              // Create a message element
              var messageElement = document.createElement("div");
              messageElement.innerHTML = `<p><strong>${selectedTeacher} (Teacher)</strong> from ${studentName} (Student):</p><p>${messageContent}</p>`;

              teacherInfo.appendChild(messageElement);
          });
      });



      appointmentsRef.orderByChild('teacher').equalTo(selectedTeacher).on('value', function (appointmentSnapshot) {
          appointmentSnapshot.forEach(function (appointmentChildSnapshot) {
              var appointment = appointmentChildSnapshot.val();
              var studentName = appointment.student;
              var appointmentDate = appointment.date;

              // Create an appointment element
              var appointmentElement = document.createElement("div");
              appointmentElement.innerHTML = `<p><strong>${selectedTeacher} (Teacher)</strong> - Appointment with ${studentName} (Student) on ${appointmentDate}</p>`;

              teacherInfo.appendChild(appointmentElement);
          });
      });
      
  }
  function logout(){
window.location.href = "../index.html";
}