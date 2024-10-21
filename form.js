function validateForm(data) {
    if (!data.name || !data.email || !data.contactNumber || !data.subject || !data.message) {
        alert("All fields are required!");
        return false;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address!");
        return false;
    }
    return true;
}
function handleFormSubmit(event) {
    event.preventDefault();
    var form = document.getElementById("contactForm");
    var formData = new FormData(form);
    var data = {
        name: formData.get("name"),
        email: formData.get("email"),
        contactNumber: formData.get("contactNumber"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    };
    if (validateForm(data)) {
        var mockApiUrl = 'https://67167ab03fcb11b265d29748.mockapi.io/users';
        fetch(mockApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(function (response) {
            if (response.ok) {
                alert("Form submitted successfully!");
                form.reset();
            }
            else {
                alert("There was an error submitting the form.");
            }
        })
            .catch(function (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
    }
}
var contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
}
