// Validación de Login
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Inicio de sesión exitoso! Redirigiendo...');
    window.location.href = "dashboard.html"; // Redirige al home tras login
  });
}

// Validación de Registro
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Cuenta creada! Ahora puedes iniciar sesión.');
    window.location.href = "login.html";
  });
}