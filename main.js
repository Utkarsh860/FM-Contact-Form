document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const firstName = document.querySelector("#first-name");
  const lastName = document.querySelector("#last-name");
  const email = document.querySelector("#email");
  const queryTypes = document.querySelectorAll(".query");
  const message = document.querySelector("#message");
  const contact = document.querySelector("#contact");

  // Error Message Elements
  const firstError = document.querySelector("#firstError");
  const lastError = document.querySelector("#lastError");
  const emailError = document.querySelector("#emailError");
  const queryError = document.querySelector("#queryError");
  const messageError = document.querySelector("#messageError");
  const termsError = document.querySelector("#termsError");

  form.addEventListener("submit", (e) => {
    let isValid = true;

    // Reset error messages before checking
    hideError(firstError);
    hideError(lastError);
    hideError(emailError);
    hideError(queryError);
    hideError(messageError);
    hideError(termsError);

    // Validate First Name
    if (firstName.value.trim() === "") {
      showError(firstError);
      isValid = false;
    }

    // Validate Last Name
    if (lastName.value.trim() === "") {
      showError(lastError);
      isValid = false;
    }

    // Validate Email
    if (!validateEmail(email.value.trim())) {
      showError(emailError);
      isValid = false;
    }

    // Validate Message
    if (message.value.trim() === "") {
      showError(messageError);
      isValid = false;
    }

    // Validate Query Type (at least one must be selected)
    if (![...queryTypes].some((radio) => radio.checked)) {
      showError(queryError);
      isValid = false;
    }

    // Validate Checkbox
    if (!contact.checked) {
      showError(termsError);
      isValid = false;
    }

    // Prevent form submission if there are errors
    if (!isValid) {
      e.preventDefault();
      return; // Stop execution if invalid
    }

    //Show success alert only if the form is valid
    showSuccessAlert();

    // Reset the form after successful submission
    form.reset();

    e.preventDefault();
  });

  // Function to show an error message
  function showError(ele) {
    ele.classList.remove("hidden");
  }

  // Function to hide an error message
  function hideError(ele) {
    ele.classList.add("hidden");
  }

  // Function to validate Email format
  function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function showSuccessAlert() {
    const alertDiv = document.createElement("div");
    alertDiv.className =
      "fixed top-2 mx-4 sm:mx-auto bg-[var(--grey-dark)] text-[var(--white)] px-4 py-6 rounded-lg shadow-lg";
    alertDiv.innerHTML = `
    <img src="./assets/images/icon-success-check.svg" alt="icon-success-check" class="inline mr-2">
      Message Sent
      <div class="text-sm font-light text-[var(--green-light)] mt-2">Thanks for completing the form, We'll be in touch soon!</div>

    `;

    document.body.appendChild(alertDiv);

    gsap.fromTo(
      alertDiv,
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
    );

    // Remove after 3.5 seconds with smooth fade-out
    setTimeout(() => {
      gsap.to(alertDiv, {
        opacity: 0,
        y: -20,
        scale: 0.9,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          alertDiv.remove();
        },
      });
    }, 3000);
  }
});
