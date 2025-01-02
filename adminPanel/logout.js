function logout() {
    // remove user from local storage
    localStorage.removeItem('isLoggedIn');
    // redirect to login page
    window.location.href = 'login.html';
}