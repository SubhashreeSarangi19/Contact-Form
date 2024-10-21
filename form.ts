interface ContactFormData {
    name: string;
    email: string;
    contactNumber: string;
    subject: string;
    message: string;
}

function validateForm(data: ContactFormData): boolean {
    if (!data.name || !data.email || !data.contactNumber || !data.subject || !data.message) {
        alert("All fields are required!");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address!");
        return false;
    }

    return true;
}

function handleFormSubmit(event: Event): void {
    event.preventDefault();

    const form = document.getElementById("contactForm") as HTMLFormElement;
    const formData = new FormData(form);

    const data: ContactFormData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        contactNumber: formData.get("contactNumber") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
    };

    if (validateForm(data)) {
        const mockApiUrl = 'https://67167ab03fcb11b265d29748.mockapi.io/users';

        fetch(mockApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.ok) {
                alert("Form submitted successfully!");
                form.reset();
            } else {
                alert("There was an error submitting the form.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
    }
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
}
