  // Reference to the database
  var database = firebase.database();

        

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
              var teacherName = teacher.name;

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

  // Function to show the Appointment Booking section
  function showAppointmentBooking() {
      const appointmentSection = document.getElementById("appointment-booking");
      appointmentSection.style.display = "block";
  }

  // Function to show the Message Sending section
  function showMessageSending() {
      const messageSection = document.getElementById("message-sending");
      messageSection.style.display = "block";
  }



  // Function to handle teacher search
  function searchTeacher() {
      const teacherDropdown = document.getElementById("teacher-dropdown");
      const selectedTeacher = teacherDropdown.value;

      // Show the Appointment Booking section
      showAppointmentBooking();

      // Display appointment information
      document.getElementById("teacher-info-name").textContent = selectedTeacher;
  }

  // Function to handle appointment booking
  function bookAppointment() {
      const appointmentDate = document.getElementById("appointment-date").value;
      const studentName = document.getElementById("student-name").value;
      const selectedTeacher = document.getElementById("teacher-dropdown").value;

      // Reference to the 'appointments' node in your database
      var appointmentsRef = database.ref('appointments');

      // Push the appointment data to the database with respect to the selected teacher
      appointmentsRef.push({
          teacher: selectedTeacher,
          date: appointmentDate,
          student: studentName,
          status: "Pending" 
      });
      alert('appointment booked successfully.')
      // Show the Message Sending section
      showMessageSending();
     
  }

  


  // Function to handle sending a message
  function sendMessage() {
      const messageContent = document.getElementById("message").value;
      const studentName = document.getElementById("student-name-msg").value;
      const selectedTeacher = document.getElementById("teacher-dropdown").value;

      // Reference to the 'messages' node in your database
      var messagesRef = database.ref('messages');

      // Push the message data to the database with respect to the selected teacher
      messagesRef.push({
          teacher: selectedTeacher,
          content: messageContent,
          student: studentName
      });

      // Show a success message or perform any necessary actions
      alert("Message sent successfully!");

      // Clear the input fields if needed
      document.getElementById("message").value = "";
      document.getElementById("student-name-msg").value = "";
  }
 
  function logout(){
window.location.href = "../index.html";
}
