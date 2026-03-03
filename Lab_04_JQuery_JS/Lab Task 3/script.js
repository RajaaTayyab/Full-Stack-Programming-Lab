
function validateName() {
    var name = document.getElementById("name").value;
    var input = document.getElementById("name");
    var error = document.getElementById("name-error");

    if (name.trim() == "") {
        input.className = "error";
        error.innerHTML = "Name cannot be empty.";
        return false;
    } else if (name.trim().length < 3) {
        input.className = "error";
        error.innerHTML = "Name must be at least 3 characters.";
        return false;
    } else {
        input.className = "valid";
        error.innerHTML = "";
        return true;
    }
}

function validateEmail() {
    var email = document.getElementById("email").value;
    var input = document.getElementById("email");
    var error = document.getElementById("email-error");

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() == "") {
        input.className = "error";
        error.innerHTML = "Email cannot be empty.";
        return false;
    } else if (!emailPattern.test(email)) {
        input.className = "error";
        error.innerHTML = "Please enter a valid email address.";
        return false;
    } else {
        input.className = "valid";
        error.innerHTML = "";
        return true;
    }
}

function validatePassword() {
    var password = document.getElementById("password").value;
    var input = document.getElementById("password");
    var error = document.getElementById("password-error");

    if (password == "") {
        input.className = "error";
        error.innerHTML = "Password cannot be empty.";
        return false;
    } else if (password.length < 6) {
        input.className = "error";
        error.innerHTML = "Password must be at least 6 characters.";
        return false;
    } else {
        input.className = "valid";
        error.innerHTML = "";
        return true;
    }
}

function validatePhone() {
    var phone = document.getElementById("phone").value;
    var input = document.getElementById("phone");
    var error = document.getElementById("phone-error");

    var phonePattern = /^[0-9]{10,13}$/;

    if (phone.trim() == "") {
        input.className = "error";
        error.innerHTML = "Phone number cannot be empty.";
        return false;
    } else if (!phonePattern.test(phone)) {
        input.className = "error";
        error.innerHTML = "Enter a valid phone number (10-13 digits).";
        return false;
    } else {
        input.className = "valid";
        error.innerHTML = "";
        return true;
    }
}

function submitForm() {
    var n = validateName();
    var e = validateEmail();
    var p = validatePassword();
    var ph = validatePhone();

    if (n && e && p && ph) {
        document.getElementById("success-msg").style.display = "block";
        document.getElementById("my-form").style.display = "none";
    }
}
