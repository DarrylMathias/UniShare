const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

const validDomains = [
    '@tsecedu.org'
];

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

function validateEmail(email) {
    return validDomains.some(domain => email.toLowerCase().endsWith(domain.toLowerCase()));
}

function simulateLogin(email, password) {
    console.log('Signed up');
    window.location.href = '/dashboard.html'
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMessages();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!validateEmail(email)) {
        showError('Please use a valid university email address');
        return;
    }

    const submitButton = loginForm.querySelector('.login-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Signing In...';
    submitButton.disabled = true;

    try {
        const result = await simulateLogin(email, password);
        showSuccess('Login successful! Redirecting to dashboard...');

    } catch (error) {
        showError(error.message);
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

function showForgotPassword() {
    console.log('Forgot password');
}

emailInput.addEventListener('input', hideMessages);
passwordInput.addEventListener('input', hideMessages);