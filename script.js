let currentBalance = 5000;
let currentUser = "Pengguna";
let profilePicSrc = "https://via.placeholder.com/80?text=Avatar";

function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi saldo dan ID pengguna di semua halaman
    if (document.getElementById('balance-amount')) {
        document.getElementById('balance-amount').textContent = currentBalance;
    }
    if (document.getElementById('balance-display')) {
        document.getElementById('balance-display').textContent = currentBalance;
    }
    if (document.getElementById('user-id')) {
        document.getElementById('user-id').textContent = currentUser;
    }
    if (document.querySelector('.sidebar .profile img')) {
        document.querySelector('.sidebar .profile img').src = profilePicSrc;
    }

    // Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            if (username.length >= 1 && password.length >= 1) {
                currentUser = username;
                window.location.href = '/games.html';
            } else {
                alert('Username dan Password harus minimal 1 karakter!');
            }
        });
    }

    // Register
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            if (username.length >= 1 && password.length >= 1) {
                alert('Registrasi berhasil! Silakan login.');
                showLogin();
            } else {
                alert('Username dan Password harus minimal 1 karakter!');
            }
        });
    }

    // Deposit
    const depositForm = document.getElementById('deposit-form');
    if (depositForm) {
        depositForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = parseInt(document.getElementById('deposit-amount').value);
            if (amount && !isNaN(amount) && amount > 0) {
                currentBalance += amount;
                document.getElementById('balance-amount').textContent = currentBalance;
                alert(`Deposit sebesar Rp ${amount} berhasil!`);
                window.location.href = '/balance.html';
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
            profilePicSrc = e.target.result;
            document.querySelector('.sidebar .profile img').src = profilePicSrc;
        };
        reader.readAsDataURL(profilePic);
    }
    alert('Pengaturan disimpan!');
    document.getElementById('settings-modal').style.display = 'none';
}

function topUp() {
    window.location.href = '/deposit.html';
}
