// LOGIN
// $(document).ready(function(){
//     $('.login-info-box').fadeOut();
//     $('.login-show').addClass('show-log-panel');
// });

// $('.login-reg-panel input[type="radio"]').on('change', function() {
//     if($('#log-login-show').is(':checked')) {
//         $('.register-info-box').fadeOut();
//         $('.login-info-box').fadeIn();

//         $('.white-panel').addClass('right-log');
//         $('.register-show').addClass('show-log-panel');
//         $('.login-show').removeClass('show-log-panel');

//     }
//     else if($('#log-reg-show').is(':checked')) {
//         $('.register-info-box').fadeIn();
//         $('.login-info-box').fadeOut();

//         $('.white-panel').removeClass('right-log');

//         $('.login-show').addClass('show-log-panel');
//         $('.register-show').removeClass('show-log-panel');
//     }
// });

// Modal for ToS and Privacy Policy
document.addEventListener("DOMContentLoaded", function () {
  var termsModal = document.getElementById("termsModal");
  var privacyModal = document.getElementById("privacyModal");
  var termsLink = document.getElementById("termsLink");
  var privacyLink = document.getElementById("privacyLink");
  var closeBtns = document.querySelectorAll(".close-btn");
  var agreeButtons = document.querySelectorAll(".modal-content button");

  function openModal(modal) {
    modal.style.display = "block";
  }

  function closeModal(modal) {
    modal.style.display = "none";
  }

  if (termsLink) {
    termsLink.addEventListener("click", function (event) {
      event.preventDefault();
      openModal(termsModal);
    });
  }

  if (privacyLink) {
    privacyLink.addEventListener("click", function (event) {
      event.preventDefault();
      openModal(privacyModal);
    });
  }

  closeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var modal = btn.closest(".modal");
      if (modal) {
        closeModal(modal);
      }
    });
  });

  agreeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var modal = btn.closest(".modal");
      if (modal) {
        closeModal(modal);
      }
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target === termsModal) {
      closeModal(termsModal);
    } else if (event.target === privacyModal) {
      closeModal(privacyModal);
    }
  });
});

//   MODEL FOR DETAILED
document.addEventListener("DOMContentLoaded", function () {
  // Function to open a modal
  function openModal(modalId) {
    const modal = document.querySelector(modalId);
    if (modal) {
      modal.style.display = "block";
    }
  }

  // Function to close a modal
  function closeModal(modal) {
    if (modal) {
      modal.style.display = "none";
    }
  }

  // Add event listeners to images to open modals
  document.querySelectorAll(".cnt-block img").forEach(function (img) {
    img.addEventListener("click", function () {
      const modalId = `#${this.getAttribute("data-target")}`;
      openModal(modalId);
    });
  });

  // Add event listeners to close buttons
  document.querySelectorAll(".close-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const modalId = this.getAttribute("data-target");
      const modal = document.querySelector(modalId);
      closeModal(modal);
    });
  });

  // Add event listener to close modals when clicking outside of them
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target);
    }
  });
});

// Contact form validation code
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let formValid = true;

    // Validate Name
    const name = document.getElementById("name").value;
    if (name.length < 3) {
      alert("Name must be at least 3 characters long.");
      formValid = false;
    }

    // Validate Email
    const email = document.getElementById("email").value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      formValid = false;
    }

    // Validate Phone (if selected)
    const phone = document.getElementById("phone").value;
    const preferredContactMethod = document.querySelector(
      'input[name="preferredContact"]:checked'
    ).value;
    if (preferredContactMethod === "phone") {
      if (!phone) {
        alert("If phone is selected, the number must be entered.");
        formValid = false;
      } else {
        try {
          // Use libphonenumber-js to parse and validate the phone number
          const phoneNumber = libphonenumber.parsePhoneNumberFromString(
            phone,
            "VN"
          );
          if (!phoneNumber || !phoneNumber.isValid()) {
            alert("Please enter a valid phone number.");
            formValid = false;
          }
        } catch (e) {
          alert("Please enter a valid phone number.");
          formValid = false;
        }
      }
    }

    // Validate Contact Days
    const checkedDays = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    if (checkedDays.length === 0) {
      alert("Please select at least one contact day.");
      formValid = false;
    }

    // Validate Message
    const message = document.getElementById("message").value;
    if (message.length < 50 || message.length > 500) {
      alert("Message must be between 50 and 500 characters.");
      formValid = false;
    }

    if (formValid) {
      alert("Form submitted successfully!");
      this.submit();
    }
  });
