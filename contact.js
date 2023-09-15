 
   const contactForm = document.getElementById('contactForm');
   const database = firebase.database(); // Initialize Realtime Database

   contactForm.addEventListener('submit', (e) => {
       e.preventDefault();

       const name = contactForm.name.value;
       const email = contactForm.email.value;
       const phone = contactForm.phone.value;
       const address = contactForm.address.value;

       // Create a unique key for each contact
       const contactKey = database.ref().child('contacts').push().key;

       // Create a contact object
       const contactData = {
           name: name,
           email: email,
           phone: phone,
           address: address,
       };

       // Store the contact data in the Realtime Database
       const updates = {};
       updates['/contacts/' + contactKey] = contactData;

       database.ref().update(updates)
           .then(() => {
               alert('Data submitted successfully! We will contact you in 24 hours.');
               contactForm.reset(); // Clear the form
           })
           .catch((error) => {
               console.error('Error adding data to the database: ', error);
           });
   });