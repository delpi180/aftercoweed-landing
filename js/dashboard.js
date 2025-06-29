// Toggle menú hamburguesa
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-btn");
  const sidebar = document.querySelector(".sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
});

// Muestra alerta de dieta diaria
function verDieta(dia) {
  alert(`Aquí verás la dieta completa del día ${dia}.`);
}
