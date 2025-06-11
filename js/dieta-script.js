document.addEventListener('DOMContentLoaded', function() {
  // Obtener elementos del DOM
  const generateBtn = document.getElementById('generate-diet-btn');
  const dietResults = document.getElementById('diet-results');
  
  // Ejemplo de base de datos de comidas
  const mealDatabase = {
    breakfast: [
      { name: "Avena con frutas", calories: 350, protein: 12, carbs: 60, fat: 5 },
      { name: "Tostadas integrales con aguacate", calories: 300, protein: 8, carbs: 35, fat: 15 },
      { name: "Batido de proteína con espinacas", calories: 280, protein: 25, carbs: 20, fat: 8 }
    ],
    lunch: [
      { name: "Pollo a la plancha con quinoa", calories: 450, protein: 35, carbs: 40, fat: 12 },
      { name: "Salmón con arroz integral", calories: 500, protein: 30, carbs: 45, fat: 20 },
      { name: "Ensalada de garbanzos y vegetales", calories: 400, protein: 18, carbs: 50, fat: 15 }
    ],
    dinner: [
      { name: "Merluza al horno con espárragos", calories: 350, protein: 30, carbs: 10, fat: 12 },
      { name: "Tortilla de claras con champiñones", calories: 300, protein: 25, carbs: 15, fat: 10 },
      { name: "Crema de calabaza con semillas", calories: 280, protein: 8, carbs: 30, fat: 12 }
    ],
    snack: [
      { name: "Yogur griego con nueces", calories: 200, protein: 15, carbs: 10, fat: 12 },
      { name: "Fruta con almendras", calories: 180, protein: 5, carbs: 25, fat: 8 },
      { name: "Huevo duro con aguacate", calories: 220, protein: 12, carbs: 5, fat: 18 }
    ]
  };
  
  // Función para calcular necesidades nutricionales
  function calculateNutrition(gender, age, height, weight, activity, goal) {
    // Calcular TMB (Tasa Metabólica Basal) - Fórmula de Harris-Benedict
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // Calcular calorías según actividad
    let calories = Math.round(bmr * activity);
    
    // Ajustar según objetivo
    if (goal === 'loss') {
      calories = Math.round(calories * 0.85);
    } else if (goal === 'gain') {
      calories = Math.round(calories * 1.15);
    }
    
    // Calcular macronutrientes
    const protein = Math.round((goal === 'gain' ? 2.2 : 1.8) * weight);
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
    
    return {
      calories,
      protein,
      carbs,
      fat
    };
  }
  
  // Función para generar plan de comidas
  function generateMealPlan(nutrition, mealsPerDay) {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    let planHTML = '';
    
    days.forEach(day => {
      planHTML += `
        <div class="diet-day">
          <h3 class="diet-day-title">${day}</h3>
          <div class="diet-meal">
            <h4 class="diet-meal-title">Desayuno</h4>
            <ul class="diet-meal-items">
              <li>${getRandomMeal('breakfast').name}</li>
              <li>Té verde o café sin azúcar</li>
            </ul>
          </div>
      `;
      
      if (mealsPerDay >= 5) {
        planHTML += `
          <div class="diet-meal">
            <h4 class="diet-meal-title">Media Mañana</h4>
            <ul class="diet-meal-items">
              <li>${getRandomMeal('snack').name}</li>
            </ul>
          </div>
        `;
      }
      
      planHTML += `
          <div class="diet-meal">
            <h4 class="diet-meal-title">Almuerzo</h4>
            <ul class="diet-meal-items">
              <li>${getRandomMeal('lunch').name}</li>
              <li>Ensalada verde variada</li>
            </ul>
          </div>
      `;
      
      if (mealsPerDay >= 5) {
        planHTML += `
          <div class="diet-meal">
            <h4 class="diet-meal-title">Merienda</h4>
            <ul class="diet-meal-items">
              <li>${getRandomMeal('snack').name}</li>
            </ul>
          </div>
        `;
      }
      
      if (mealsPerDay >= 6) {
        planHTML += `
          <div class="diet-meal">
            <h4 class="diet-meal-title">Snack Tarde</h4>
            <ul class="diet-meal-items">
              <li>Fruta fresca de temporada</li>
              <li>Puñado de frutos secos</li>
            </ul>
          </div>
        `;
      }
      
      planHTML += `
          <div class="diet-meal">
            <h4 class="diet-meal-title">Cena</h4>
            <ul class="diet-meal-items">
              <li>${getRandomMeal('dinner').name}</li>
              <li>Vegetales al vapor</li>
            </ul>
          </div>
        </div>
      `;
    });
    
    return planHTML;
  }
  
  // Función auxiliar para obtener comidas aleatorias
  function getRandomMeal(type) {
    const meals = mealDatabase[type];
    return meals[Math.floor(Math.random() * meals.length)];
  }
  
  // Manejador del botón Generar
  generateBtn.addEventListener('click', function() {
    // Obtener valores del formulario
    const gender = document.getElementById('diet-gender').value;
    const age = parseInt(document.getElementById('diet-age').value);
    const height = parseInt(document.getElementById('diet-height').value);
    const weight = parseInt(document.getElementById('diet-weight').value);
    const activity = parseFloat(document.getElementById('diet-activity').value);
    const goal = document.getElementById('diet-goal').value;
    const mealsPerDay = parseInt(document.getElementById('diet-meals').value);
    
    // Validar campos
    if (!gender || isNaN(age) || isNaN(height) || isNaN(weight) || isNaN(activity) || !goal) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    // Calcular nutrición
    const nutrition = calculateNutrition(gender, age, height, weight, activity, goal);
    
    // Actualizar resumen
    document.getElementById('summary-calories').textContent = nutrition.calories;
    document.getElementById('summary-protein').textContent = `${nutrition.protein}g`;
    document.getElementById('summary-carbs').textContent = `${nutrition.carbs}g`;
    document.getElementById('summary-fat').textContent = `${nutrition.fat}g`;
    
    // Generar plan de comidas
    document.getElementById('diet-plan-content').innerHTML = generateMealPlan(nutrition, mealsPerDay);
    
    // Mostrar resultados
    dietResults.style.display = 'block';
    
    // Desplazarse a los resultados
    dietResults.scrollIntoView({ behavior: 'smooth' });
  });
});