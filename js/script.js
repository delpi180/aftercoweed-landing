// Scroll suave para enlaces del navbar
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    if (targetId.startsWith('#')) {
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      window.location.href = targetId;
    }
  });
});

// Botón flotante para ir al inicio
const floatingBtn = document.createElement('div');
floatingBtn.className = 'floating-btn';
floatingBtn.innerHTML = '↑';
floatingBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
document.body.appendChild(floatingBtn);

// Mostrar/ocultar botón flotante al hacer scroll
window.addEventListener('scroll', () => {
  floatingBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

// Efecto de carga inicial
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
});

// Simulación Nutricional - Código corregido
document.getElementById('nutrition-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Obtener valores del formulario
  const gender = document.getElementById('gender').value;
  const age = parseInt(document.getElementById('age').value);
  const height = parseInt(document.getElementById('height').value);
  const weight = parseInt(document.getElementById('weight').value);
  const activity = parseFloat(document.getElementById('activity').value);
  
  // Validar que todos los campos estén completos
  if (!gender || isNaN(age) || isNaN(height) || isNaN(weight) || isNaN(activity)) {
    alert('Por favor completa todos los campos correctamente');
    return;
  }

  // Calcular peso ideal (fórmula de Devine)
  let idealWeight;
  if (gender === 'male') {
    idealWeight = 50 + 0.9 * (height - 152);
  } else {
    idealWeight = 45.5 + 0.9 * (height - 152);
  }
  
  // Calcular IMC
  const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
  let bmiCategory = '';
  
  if (bmi < 18.5) {
    bmiCategory = 'Bajo peso';
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory = 'Peso normal';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Sobrepeso';
  } else {
    bmiCategory = 'Obesidad';
  }
  
  // Calcular calorías diarias (Harris-Benedict)
  let bmr;
  if (gender === 'male') {
    bmr = 66.5 + (13.75 * weight) + (5 * height) - (6.75 * age);
  } else {
    bmr = 655 + (9.56 * weight) + (1.85 * height) - (4.68 * age);
  }
  
  const dailyCalories = Math.round(bmr * activity);
  
  // Mostrar resultados
  document.getElementById('ideal-weight').textContent = `${idealWeight.toFixed(1)} kg`;
  document.getElementById('bmi').textContent = bmi;
  document.getElementById('bmi-category').textContent = bmiCategory;
  document.getElementById('bmi-category').className = `result-category ${getBmiClass(bmi)}`;
  document.getElementById('daily-calories').textContent = `${dailyCalories} kcal`;
  
  document.getElementById('results').style.display = 'block';
  
  // Generar recomendaciones de comida
  generateFoodRecommendations(dailyCalories);
  document.getElementById('food-recommendations').style.display = 'block';
  
  // Desplazarse suavemente a los resultados
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

function getBmiClass(bmi) {
  if (bmi < 18.5) return 'underweight';
  if (bmi >= 18.5 && bmi < 25) return 'normal';
  if (bmi >= 25 && bmi < 30) return 'overweight';
  return 'obese';
}

// Función para generar recomendaciones de comida
function generateFoodRecommendations(calories) {
  const foodCardsContainer = document.querySelector('.food-cards');
  
  // Limpiar contenedor solo si tiene elementos
  if (foodCardsContainer.children.length > 0) {
    foodCardsContainer.innerHTML = '';
  }

  // Base de datos de comidas saludables con imágenes de placeholder por defecto
  const healthyFoods = [
    {
      name: 'Ensalada de Quinoa',
      image: 'assets/quinua.jpeg',
      calories: 350,
      description: 'Quinoa con aguacate, tomate cherry, pepino y aderezo de limón.',
      recipe: '1. Cocinar quinoa según instrucciones del paquete.\n2. Picar aguacate, tomate cherry y pepino en cubos.\n3. Mezclar todos los ingredientes y añadir aderezo de limón y aceite de oliva.'
    },
    {
      name: 'Salmón al Horno',
      image: 'assets/salmon.jpg',
      calories: 400,
      description: 'Salmón con espárragos y batata asada.',
      recipe: '1. Precalentar horno a 180°C.\n2. Sazonar el salmón con sal, pimienta y limón.\n3. Colocar en una bandeja con espárragos y batata en cubos.\n4. Hornear por 20 minutos.'
    },
    {
      name: 'Bowl de Desayuno',
      image: 'assets/bowl.jpg',
      calories: 300,
      description: 'Avena con frutas frescas y semillas de chía.',
      recipe: '1. Preparar avena con leche o agua.\n2. Añadir frutas de temporada picadas.\n3. Espolvorear semillas de chía y un poco de miel.'
    },
    {
      name: 'Wrap de Vegetales',
      image: 'assets/wrap.jpeg',
      calories: 280,
      description: 'Tortilla integral con hummus y vegetales frescos.',
      recipe: '1. Untar hummus en una tortilla integral.\n2. Añadir lechuga, tomate, pepino y zanahoria rallada.\n3. Enrollar firmemente y cortar por la mitad.'
    },
    {
      name: 'Pollo a la Parrilla',
      image: 'assets/polloP.jpg',
      calories: 450,
      description: 'Pechuga de pollo con arroz integral y brócoli al vapor.',
      recipe: '1. Marinar el pollo con especias por 30 min.\n2. Asar a la parrilla 6-8 min por lado.\n3. Servir con arroz integral y brócoli al vapor.'
    },
    {
      name: 'Smoothie Verde',
      image: 'assets/smootihe.jpg',
      calories: 250,
      description: 'Espinaca, plátano, manzana y leche de almendras.',
      recipe: '1. Lavar bien las espinacas.\n2. Licuar con plátano, manzana y leche de almendras.\n3. Servir frío inmediatamente.'
    }
  ];

  // Calcular calorías por comida (dividir las calorías diarias en 3 comidas)
  const targetCaloriesPerMeal = calories / 3;
  
  // Filtrar comidas que estén dentro de un rango aceptable
  const filteredFoods = healthyFoods.filter(food => {
    return food.calories >= targetCaloriesPerMeal * 0.7 && 
           food.calories <= targetCaloriesPerMeal * 1.3;
  });

  // Si no hay suficientes coincidencias, mostrar las más cercanas
  const finalRecommendations = filteredFoods.length >= 3 ? 
    filteredFoods.slice(0, 4) : 
    healthyFoods
      .sort((a, b) => Math.abs(a.calories - targetCaloriesPerMeal) - Math.abs(b.calories - targetCaloriesPerMeal))
      .slice(0, 4);

  // Mostrar las recomendaciones
  finalRecommendations.forEach(food => {
    const foodCard = document.createElement('div');
    foodCard.className = 'food-card';
    
    // Manejo de imágenes faltantes
    const imageHtml = `
      <div class="food-image-container">
        <img src="${food.image}" alt="${food.name}" 
             onerror="this.src='assets/food-placeholder.jpg'; this.onerror=null;"
             class="food-image">
        <span class="calories-badge">${food.calories} kcal</span>
      </div>
    `;
    
    foodCard.innerHTML = `
      ${imageHtml}
      <div class="food-card-content">
        <h4>${food.name}</h4>
        <p>${food.description}</p>
        <button class="recipe-btn" 
                onclick="showRecipe('${food.name.replace(/'/g, "\\'")}', '${food.recipe.replace(/'/g, "\\'")}')">
          Ver Receta
        </button>
      </div>
    `;
    
    foodCardsContainer.appendChild(foodCard);
  });

  // Mostrar la sección de recomendaciones con transición suave
  const foodRecSection = document.getElementById('food-recommendations');
  foodRecSection.style.display = 'block';
  setTimeout(() => {
    foodRecSection.style.opacity = '1';
  }, 10);
}

// Función para mostrar recetas en modal
function showRecipe(name, recipe) {
  // Crear elemento modal
  const modal = document.createElement('div');
  modal.className = 'recipe-modal';
  modal.style.opacity = '0';
  
  // Contenido del modal
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h3>${name}</h3>
      <div class="recipe-steps">
        ${recipe.split('\n').map(step => `<p>${step}</p>`).join('')}
      </div>
    </div>
  `;
  

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  const fadeInTargets = document.querySelectorAll(".fade-in");
  fadeInTargets.forEach(el => observer.observe(el));
});



  // Añadir al documento
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden'; // Deshabilitar scroll
  
  // Animación de entrada
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
  
  // Cerrar modal al hacer clic en la X
  modal.querySelector('.close-modal').addEventListener('click', closeRecipeModal);
  
  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeRecipeModal();
    }
  });
  
  // Función para cerrar el modal
  function closeRecipeModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(modal);
      document.body.style.overflow = 'auto'; // Restaurar scroll
    }, 300);
  }


document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carousel");
  if (!track) return;

  let currentScroll = 0;
  const step = 260;
  const scrollDelay = 3000;

  function scrollNext() {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft + step >= maxScrollLeft) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: step, behavior: "smooth" });
    }
  }

  setInterval(scrollNext, scrollDelay);
});
 }


 


const ctx = document.getElementById('statsChart').getContext('2d');
const statsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        datasets: [{
            label: 'Calorías consumidas',
            data: [1800, 2000, 1950, 2100, 2050],
            borderColor: '#57e389',
            backgroundColor: 'rgba(87, 227, 137, 0.2)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
 