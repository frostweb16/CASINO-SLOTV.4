document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi data pengguna dari localStorage
    let currentBalance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 5000;
    let currentUser = localStorage.getItem('username') || 'Pengguna';
    let profilePicSrc = localStorage.getItem('profilePic') || 'https://via.placeholder.com/80?text=Avatar';

    // Perbarui UI
    if (document.getElementById('balance-amount')) {
        document.getElementById('balance-amount').textContent = currentBalance;
    }
    if (document.getElementById('balance-display')) {
        document.getElementById('balance-display').textContent = currentBalance;
    }
    if (document.getElementById('user-id')) {
        document.getElementById('user-id').textContent = currentUser;
    }
    if (document.getElementById('profile-pic-img')) {
        document.getElementById('profile-pic-img').src = profilePicSrc;
    }

    // Cek URL untuk menampilkan form daftar
    if (window.location.hash === '#register') {
        showRegister();
    }

    // Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            if (username.length >= 1 && password.length >= 1) {
                try {
                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    const data = await response.json();
                    if (data.success) {
                        localStorage.setItem('username', username);
                        localStorage.setItem('balance', data.balance);
                        window.location.href = '/games';
                    } else {
                        alert(data.message);
                    }
                } catch (error) {
                    alert('Error saat login. Coba lagi.');
                }
            } else {
                alert('Username dan Password harus minimal 1 karakter!');
            }
        });
    }

    // Register
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            if (username.length >= 1 && password.length >= 1) {
                try {
                    const response = await fetch('/api/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    const data = await response.json();
                    if (data.success) {
                        alert('Registrasi berhasil! Silakan login.');
                        showLogin();
                        window.location.hash = '';
                    } else {
                        alert(data.message);
                    }
                } catch (error) {
                    alert('Error saat registrasi. Coba lagi.');
                }
            } else {
                alert('Username dan Password harus minimal 1 karakter!');
            }
        });
    }

    // Deposit
    const depositForm = document.getElementById('deposit-form');
    if (depositForm) {
        depositForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const amount = parseInt(document.getElementById('deposit-amount').value);
            if (amount && !isNaN(amount) && amount > 0) {
                try {
                    const response = await fetch('/api/deposit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: localStorage.getItem('username'), amount })
                    });
                    const data = await response.json();
                    if (data.success) {
                        localStorage.setItem('balance', data.balance);
                        document.getElementById('balance-amount').textContent = data.balance;
                        alert(`Deposit sebesar Rp ${amount} berhasil!`);
                        window.location.href = '/balance';
                    } else {
                        alert(data.message);
                    }
                } catch (error) {
                    alert('Error saat deposit. Coba lagi.');
                }
            } else {
                alert('Masukkan jumlah deposit yang valid!');
            }
        });
    }

    // Game Card Click
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameName = this.querySelector('h3').textContent;
            alert(`Membuka game ${gameName}! (Simulasi 3D)`);
        });
    });
});

function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('form-title').textContent = 'Register';
}

function showLogin() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('form-title').textContent = 'Login';
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function showSettings() {
    document.getElementById('settings-modal').style.display = 'flex';
}

function saveSettings() {
    const phone = document.getElementById('phone-number').value;
    const newPassword = document.getElementById('new-password').value;
    const profilePic = document.getElementById('profile-pic').files[0];
    if (profilePic) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('profilePic', e.target.result);
            document.getElementById('profile-pic-img').src = e.target.result;
        };
        reader.readAsDataURL(profilePic);
    }
    if (phone || newPassword) {
        alert('Pengaturan disimpan!');
    }
    document.getElementById('settings-modal').style.display = 'none';
}

function topUp() {
    window.location.href = '/deposit';
}
