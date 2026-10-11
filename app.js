 
const signupForm = document.getElementById("signupForm");
const message = document.getElementById("message");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        showMessage("Passwords do not match.", "error");
        return;
    }

    let users = [];

    try {
        users = JSON.parse(localStorage.getItem("demoUsers")) || [];

        if (!Array.isArray(users)) {
            users = [];
        }
    } catch {
        showMessage("Could not read saved accounts.", "error");
        return;
    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        showMessage("This email is already registered. Please use another email.", "error");
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    try {
        localStorage.setItem("demoUsers", JSON.stringify(users));
        
        localStorage.setItem("currentQuizUser", email);

        localStorage.setItem("quizAccess", "allowed");

    } catch {
        showMessage("Could not save the account in this browser.", "error");
        return;
    }

    showMessage("Signup successful! Redirecting to quiz...", "success");

    signupForm.reset();

    setTimeout(function () {
        window.location.href = "./quizapp.html";
    }, 1200);
});

function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
}
