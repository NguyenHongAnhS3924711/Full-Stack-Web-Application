// CONTACT FORM
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let formValid = true;

    // Validate Name
    const name = document.getElementById('name').value;
    if (name.length < 3) {
        alert("Name must be at least 3 characters long.");
        formValid = false;
    }

    // Validate Email
    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        formValid = false;
    }

    // Validate Phone (if selected)
    const phone = document.getElementById('phone').value;
    const preferredContactMethod = document.querySelector('input[name="preferredContact"]:checked').value;
    if (preferredContactMethod === 'phone') {
        if (!phone) {
            alert("If phone is selected, the number must be entered.");
            formValid = false;
        } else {
            try {
                // Use libphonenumber-js to parse and validate the phone number
                const phoneNumber = libphonenumber.parsePhoneNumberFromString(phone, 'VN'); // 'VN' for Vietnam or your country code
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
    const checkedDays = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedDays.length === 0) {
        alert("Please select at least one contact day.");
        formValid = false;
    }

    // Validate Message
    const message = document.getElementById('message').value;
    if (message.length < 50 || message.length > 500) {
        alert("Message must be between 50 and 500 characters.");
        formValid = false;
    }

    if (formValid) {
        // Submit the form if all validations pass
        alert('Form submitted successfully!');
        // Replace the next line with actual form submission logic, e.g., AJAX call
        this.submit();
    }
});

// FOOTER
// Pop up dialogue for Terms of Service and Privacy Policy
document.addEventListener("DOMContentLoaded", function() {
    // Get modal elements
    var termsModal = document.getElementById("termsModal");
    var privacyModal = document.getElementById("privacyModal");

    // Get link elements
    var termsLink = document.getElementById("termsLink");
    var privacyLink = document.getElementById("privacyLink");

    // Get close button elements
    var closeBtns = document.querySelectorAll(".close-btn");

    // Get agree button elements
    var agreeButtons = document.querySelectorAll(".modal-content button");

    // Function to open a modal
    function openModal(modal) {
        modal.style.display = "block";
    }

    // Function to close a modal
    function closeModal(modal) {
        modal.style.display = "none";
    }

    // When the user clicks the Terms of Service link, open the Terms modal
    if (termsLink) {
        termsLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            openModal(termsModal);
        });
    }

    // When the user clicks the Privacy Policy link, open the Privacy modal
    if (privacyLink) {
        privacyLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            openModal(privacyModal);
        });
    }

    // When the user clicks on any close button, close the corresponding modal
    closeBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            var modal = btn.closest(".modal");
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // When the user clicks the Agree button, close the corresponding modal
    agreeButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            var modal = btn.closest(".modal");
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // When the user clicks anywhere outside of the modals, close them
    window.addEventListener("click", function(event) {
        if (event.target === termsModal) {
            closeModal(termsModal);
        } else if (event.target === privacyModal) {
            closeModal(privacyModal);
        }
    });
});