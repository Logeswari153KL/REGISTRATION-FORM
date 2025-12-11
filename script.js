// Inputs
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const repasswordField = document.getElementById("repassword");

// Error Texts
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");
const repassError = document.getElementById("repassError");

// Password Dots
const dot1 = document.getElementById("dot1");
const dot2 = document.getElementById("dot2");
const dot3 = document.getElementById("dot3");

// Submit Button
const submitBtn = document.getElementById("submitBtn");


const togglePassword = document.getElementById("togglePassword");
togglePassword.addEventListener("click", () => {
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});

const toggleRePassword = document.getElementById("toggleRePassword");
toggleRePassword.addEventListener("click", () => {
    const type = repasswordField.type === "password" ? "text" : "password";
    repasswordField.type = type;
    toggleRePassword.classList.toggle("fa-eye");
    toggleRePassword.classList.toggle("fa-eye-slash");
});


function validateName() {
    if (nameField.value.trim() === "") {
        nameError.textContent = "Name cannot be empty";
        return false;
    }
    nameError.textContent = "";
    return true;
}


function validateEmail() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(emailField.value.trim())) {
        emailError.textContent = "Invalid email address";
        return false;
    }
    emailError.textContent = "";
    return true;
}


function validatePassword() {
    const pw = passwordField.value;
    let score = 0;

    if (pw.length >= 6) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    dot1.style.background = score >= 2 ? "red" : "#ccc";
    dot2.style.background = score >= 3 ? "orange" : "#ccc";
    dot3.style.background = score >= 4 ? "green" : "#ccc";

    if (pw.length < 6) {
        passError.textContent = "Password must be at least 6 characters";
        return false;
    }

    passError.textContent = "";
    return true;
}


function validateRePassword() {
    if (repasswordField.value !== passwordField.value) {
        repassError.textContent = "Passwords do not match";
        return false;
    }
    repassError.textContent = "";
    return true;
}


function updateSubmitState() {
    if (validateName() && validateEmail() && validatePassword() && validateRePassword()) {
        submitBtn.classList.add("enabled");
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove("enabled");
        submitBtn.disabled = true;
    }
}

nameField.addEventListener("input", updateSubmitState);
emailField.addEventListener("input", updateSubmitState);
passwordField.addEventListener("input", updateSubmitState);
repasswordField.addEventListener("input", updateSubmitState);


document.getElementById("regForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (submitBtn.disabled) return;

    window.location.href = "success.html";
});
