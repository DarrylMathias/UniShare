function navigateTo(section) {
    switch (section) {
        case 'list-item':
            alert('List New Item Page');
            break;
        case 'browse':
            alert('Browse Items Page');
            break;
        case 'my-requests':
            alert('My Requests & Transactions Page');
            break;
        default:
            console.log('Navigation to:', section);
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        console.log('Logout');
        window.location.href = '/login.html'
    }
}