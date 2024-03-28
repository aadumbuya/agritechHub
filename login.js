// Function to toggle between login and register forms
function toggleForm(formId) {
    const loginContainer = document.getElementById("loginContainer");
    const registerContainer = document.getElementById("registerContainer");

    if (formId === "registerContainer") {
        loginContainer.style.display = "none";
        registerContainer.style.display = "block";
    } else {
        loginContainer.style.display = "block";
        registerContainer.style.display = "none";
    }
}
