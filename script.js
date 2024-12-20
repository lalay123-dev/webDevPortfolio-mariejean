
function hamburg() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(0px)"; 
}

function cancel() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(-500px)";
}

function typeWriter() {
  if (characterIndex < texts[textIndex].length) {
    textElements.innerHTML += texts[textIndex].charAt(characterIndex); 
    characterIndex++;
    setTimeout(typeWriter, speed); // Continue typing
  } else {
    setTimeout(eraseText, 1000); // Wait for 1 second after typing before erasing
  }
}

function eraseText() {
  if (textElements.innerHTML.length > 0) {
    textElements.innerHTML = textElements.innerHTML.slice(0, -1); // Remove one character at a time
    setTimeout(eraseText, 50); // Continue erasing
  } else {
    textIndex = (textIndex + 1) % texts.length; // Move to next text
    characterIndex = 0;
    setTimeout(typeWriter, 500); // Wait for 0.5 seconds before starting typing again
  }
}

window.onload = typeWriter; // Start the typewriter effect on page load

// Form Validation and Email Sending
function sendMail(event) {
  event.preventDefault(); // Prevent form submission and page reload

  // Get form elements and notifications
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");
  const notificationClose = document.getElementById("notification-close");

  // Validate form inputs
  if (name === "" || email === "" || message === "") {
    notificationMessage.textContent = "All fields are required.";
    notification.classList.add("show");
    setTimeout(() => notification.classList.remove("show"), 3000);
    return;
  }

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    notificationMessage.textContent = "Please enter a valid email address.";
    notification.classList.add("show");
    setTimeout(() => notification.classList.remove("show"), 3000);
    return;
  }

  // Email.js parameters
  let parms = {
    name: name,
    email: email,
    message: message,
  };

  // Send email using Email.js
  emailjs
    .send("service_04in1t3", "template_r04f7br", parms)
    .then(() => {
      // Show success notification
      notificationMessage.textContent = "Message sent successfully!";
      notification.classList.add("show");
      setTimeout(() => notification.classList.remove("show"), 3000);

      // Clear form fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      // Show error notification
      notificationMessage.textContent = "Failed to send message. Please try again.";
      notification.classList.add("show");
      setTimeout(() => notification.classList.remove("show"), 3000);
      console.error("Error sending email: ", error);
    });

  // Close notification when the close button is clicked
  notificationClose.addEventListener("click", () => {
    notification.classList.remove("show");
  });
}

// Attach the sendMail function to the form submission
document.querySelector("form").addEventListener("submit", sendMail);

// Theme Toggle (Light/Dark Mode)
function toggleTheme() {
  const themeIcon = document.getElementById("theme-toggle-icon");
  const body = document.body;

  body.classList.toggle("light-mode"); // Toggle light-mode class

  if (body.classList.contains("light-mode")) {
    body.classList.remove("dark-mode"); // Remove dark mode class
    themeIcon.src = "myimages/sun.webp"; // Change icon to Sun for light mode
    themeIcon.alt = "Light Mode"; // Update alt text for light mode
  } else {
    body.classList.add("dark-mode"); // Add dark mode class
    themeIcon.src = "myimages/mode.png"; // Change icon to Moon for dark mode
    themeIcon.alt = "Dark Mode"; // Update alt text for dark mode
  }
}



// Flip the card when clicked: Adds flip effect to the card element
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", function () {
    this.classList.toggle("clicked"); // Toggle flip effect when card is clicked
  });
});