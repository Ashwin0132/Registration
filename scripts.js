// public/scripts.js
document.addEventListener('DOMContentLoaded', function () {
    function openRegistrationForm() {
        var registrationForm = document.getElementById('registration-form');
        if (registrationForm) {
            registrationForm.style.display = 'block';
        } else {
            console.error('Element with ID "registration-form" not found.');
        }
    }

    async function registerUser(event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone })
            });

            if (response.ok) {
                console.log('User registered successfully!');
                // Optionally, you can redirect or show a success message here
            } else {
                console.error('Failed to register user.');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }

    var registerButton = document.getElementById('registerButton');
    if (registerButton) {
        registerButton.addEventListener('click', openRegistrationForm);
    } else {
        console.error('Button with ID "registerButton" not found.');
    }
});
