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
