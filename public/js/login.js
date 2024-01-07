const API_VERSION = 'v1';

function submitForm() {
   var email = document.getElementById('email').value;

   // Basic email validation
   var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
      showAlert('Please enter a valid email address.', 'danger');
      return;
   }

   // Construct the request body
   var requestBody = {
      email: email,
   };

   // Send the data to the server using Fetch API
   fetch(`${API_VERSION}/auth/request-login`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
   })
      .then((response) => response.json())
      .then((data) => {
         // Handle the response from the server
         console.log(data);
         if (data.statusCode == 200) {
            showAlert(data.message, 'success');
         } else {
            showAlert(data.message, 'danger');
         }
      })
      .catch((error) => {
         console.error('Error:', error);
         showAlert('An error occurred. Please try again later.', 'danger');
      });
}

function showAlert(message, type) {
   var responseBox = document.getElementById('responseBox');
   responseBox.textContent = message;
   responseBox.className = 'response-box ' + type;
   responseBox.style.display = 'block';

   // Hide the message after a few seconds (adjust as needed)
   setTimeout(function () {
      responseBox.style.display = 'none';
   }, 3000);
}
