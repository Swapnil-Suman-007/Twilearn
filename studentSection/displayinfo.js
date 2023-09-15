var db = firebase.database();
    function getStudentData() {
    const studentName = document.getElementById("studentName").value;

    // Reference to the "appointments" node in the database
    const appointmentsRef = db.ref("appointments");

    appointmentsRef.orderByChild("student").equalTo(studentName).once("value")
        .then((snapshot) => {
            if (snapshot.exists()) {
                const appointmentId = Object.keys(snapshot.val())[0];
                const studentInfo = snapshot.val()[appointmentId];
                displayStudentInfo(studentInfo);
            } else {
                document.getElementById("studentInfo").innerText = "Student not found.";
            }
        })
        .catch((error) => {
            console.error("Error retrieving data: ", error);
        });
}



function displayStudentInfo(studentInfo) {
    const studentInfoDiv = document.getElementById("studentInfo");
    studentInfoDiv.innerHTML = `
        <h2>Student Appointment Information</h2>
        <p><strong>Name:</strong> ${studentInfo.student}</p>
        <p><strong>Teacher booked appointment with:</strong> ${studentInfo.teacher}</p>
        <p><strong>status: </strong> ${studentInfo.status}</p>
        <p><strong>date: </strong> ${studentInfo.date}</p>
        <p><strong>Time: </strong> ${studentInfo.time}</p>
    `;
}

function logout(){
    window.location.href = "../index.html";
 }  