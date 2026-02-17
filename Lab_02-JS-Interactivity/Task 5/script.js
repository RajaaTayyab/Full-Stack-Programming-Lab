function validateForm() {

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var password = document.getElementById("password").value;

    var valid = true;

    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("ageError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("successMessage").innerHTML = "";

    if (name === "") {
        document.getElementById("nameError").innerHTML = "Name cannot be empty";
        valid = false;
    }

    if (!email.includes("@")) {
        document.getElementById("emailError").innerHTML = "Email must contain @";
        valid = false;
    }

    if (age < 18 || age > 60) {
        document.getElementById("ageError").innerHTML = "Age must be between 18 and 60";
        valid = false;
    }

    // Password validation
    if (password.length < 6) {
        document.getElementById("passwordError").innerHTML = "Password must be at least 6 characters";
        valid = false;
    }

    if (valid) {
        // BONUS: confirm() before submission
        if (confirm("Are you sure you want to submit the form?")) {

            document.getElementById("successMessage").innerHTML = "Registration Successful!";

            alert("Welcome " + name + "! Your form has been submitted successfully.");


        }
    }
}
