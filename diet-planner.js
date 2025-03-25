// Diet Planner JavaScript

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Mock functions for demonstration purposes.  In a real application, these would
// likely be replaced with calls to a backend API or data store.
function getPetById(id) {
  // Replace with actual data retrieval logic
  const pets = getAllPets();
  return pets.find(pet => pet.id === id);
}

function getAllPets() {
  // Replace with actual data retrieval logic
  return [
      { id: "1", name: "Buddy", type: "dog", age: 3, weight: 15, breed: "Labrador" },
      { id: "2", name: "Whiskers", type: "cat", age: 5, weight: 5, breed: "Siamese" },
      { id: "3", name: "Rocky", type: "dog", age: 8, weight: 30, breed: "German Shepherd" }
  ];
}


document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const dietPlannerForm = document.getElementById('dietPlannerForm');
  const dietPlanResults = document.getElementById('dietPlanResults');
  const petSelector = document.getElementById('petSelector');
  const printDietPlan = document.getElementById('printDietPlan');
  
  // Load user's pets into the selector
  loadPetsIntoSelector();
  
  // Handle pet selection
  if (petSelector) {
      petSelector.addEventListener('change', function() {
          const petId = this.value;
          if (petId) {
              const pet = getPetById(petId);
              if (pet) {
                  // Fill form with pet data
                  document.getElementById('petType').value = pet.type || '';
                  document.getElementById('petAge').value = pet.age || '';
                  document.getElementById('petWeight').value = pet.weight || '';
                  document.getElementById('petBreed').value = pet.breed || '';
              }
          }
      });
  }
  
  // Handle form submission
  if (dietPlannerForm) {
      dietPlannerForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const petData = {
              name: petSelector.options[petSelector.selectedIndex]?.text || 'Your Pet',
              type: document.getElementById('petType').value,
              breed: document.getElementById('petBreed').value,
              age: document.getElementById('petAge').value,
              weight: document.getElementById('petWeight').value,
              activityLevel: document.getElementById('activityLevel').value,
              healthIssues: document.getElementById('healthIssues').value
          };
          
          // Generate diet plan
          generateDietPlan(petData);
          
          // Show results
          dietPlanResults.style.display = 'block';
          
          // Scroll to results
          dietPlanResults.scrollIntoView({ behavior: 'smooth' });
      });
  }
  
  // Handle print button
  if (printDietPlan) {
      printDietPlan.addEventListener('click', function() {
          window.print();
      });
  }
});

// Load pets into selector
function loadPetsIntoSelector() {
  const petSelector = document.getElementById('petSelector');
  if (!petSelector) return;
  
  const pets = getAllPets();
  
  if (pets.length > 0) {
      pets.forEach(pet => {
          const option = document.createElement('option');
          option.value = pet.id;
          option.textContent = pet.name;
          petSelector.appendChild(option);
      });
  } else {
      const option = document.createElement('option');
      option.value = "";
      option.textContent = "No pets registered";
      petSelector.appendChild(option);
      petSelector.disabled = true;
  }
}

// Generate diet plan based on pet data
function generateDietPlan(petData) {
  // Update pet summary
  document.getElementById('summaryName').textContent = petData.name;
  document.getElementById('summaryType').textContent = capitalizeFirstLetter(petData.type);
  document.getElementById('summaryBreed').textContent = petData.breed;
  document.getElementById('summaryAge').textContent = `${petData.age} years`;
  document.getElementById('summaryWeight').textContent = `${petData.weight} kg`;
  document.getElementById('summaryActivity').textContent = capitalizeFirstLetter(petData.activityLevel);
  
  // Calculate caloric needs (simplified formula)
  let calorieBase = 0;
  const weight = parseFloat(petData.weight);
  const age = parseFloat(petData.age);
  
  if (petData.type === 'dog') {
      // Basic formula for dogs: 30 * weight(kg) + 70
      calorieBase = 30 * weight + 70;
  } else if (petData.type === 'cat') {
      // Basic formula for cats: 40 * weight(kg)
      calorieBase = 40 * weight;
  } else {
      // Generic formula for other pets
      calorieBase = 35 * weight + 50;
  }
  
  // Adjust for age
  if (age < 1) {
      calorieBase *= 1.8; // Puppies/kittens need more calories
  } else if (age > 7) {
      calorieBase *= 0.8; // Senior pets need fewer calories
  }
  
  // Adjust for activity level
  if (petData.activityLevel === 'low') {
      calorieBase *= 0.8;
  } else if (petData.activityLevel === 'high') {
      calorieBase *= 1.2;
  }
  
  // Round to nearest 50
  const caloriesLow = Math.round((calorieBase * 0.9) / 50) * 50;
  const caloriesHigh = Math.round((calorieBase * 1.1) / 50) * 50;
  
  document.getElementById('calorieNeeds').textContent = `${caloriesLow} - ${caloriesHigh} calories per day`;
  
  // Set nutrition percentages based on pet type
  let protein, fats, carbs, fiber;
  
  if (petData.type === 'dog') {
      protein = 30;
      fats = 20;
      carbs = 45;
      fiber = 5;
  } else if (petData.type === 'cat') {
      protein = 40;
      fats = 30;
      carbs = 25;
      fiber = 5;
  } else {
      protein = 35;
      fats = 25;
      carbs = 35;
      fiber = 5;
  }
  
  // Update nutrition chart
  document.getElementById('proteinBar').style.width = `${protein}%`;
  document.getElementById('proteinPercent').textContent = `${protein}%`;
  document.getElementById('fatsBar').style.width = `${fats}%`;
  document.getElementById('fatsPercent').textContent = `${fats}%`;
  document.getElementById('carbsBar').style.width = `${carbs}%`;
  document.getElementById('carbsPercent').textContent = `${carbs}%`;
  document.getElementById('fiberBar').style.width = `${fiber}%`;
  document.getElementById('fiberPercent').textContent = `${fiber}%`;
  
  // Generate diet recommendations
  generateDietRecommendations(petData, calorieBase);
  
  // Generate feeding schedule
  generateFeedingSchedule(petData);
  
  // Generate diet notes
  generateDietNotes(petData);
}

// Generate diet recommendations
function generateDietRecommendations(petData, calories) {
  const recommendationsDiv = document.getElementById('dietRecommendations');
  let html = '';
  
  if (petData.type === 'dog') {
      html = `
          <p>Based on your dog's profile, we recommend the following daily diet:</p>
          <ul>
              <li><strong>High-quality commercial dog food:</strong> ${Math.round(calories / 350 * 100) / 100} cups per day of premium dog food appropriate for ${petData.breed} dogs</li>
              <li><strong>Protein sources:</strong> Lean meats like chicken, turkey, or fish (cooked, no bones)</li>
              <li><strong>Vegetables:</strong> Carrots, green beans, peas (steamed or raw)</li>
              <li><strong>Healthy fats:</strong> Fish oil supplement (1 teaspoon per 20 pounds of body weight)</li>
              <li><strong>Water:</strong> Fresh water available at all times</li>
          </ul>
          <p><strong>Treats:</strong> Limit treats to 10% of daily caloric intake</p>
      `;
  } else if (petData.type === 'cat') {
      html = `
          <p>Based on your cat's profile, we recommend the following daily diet:</p>
          <ul>
              <li><strong>High-quality commercial cat food:</strong> ${Math.round(calories / 250 * 100) / 100} cups of premium cat food</li>
              <li><strong>Protein sources:</strong> Cooked chicken, turkey, or fish (no bones)</li>
              <li><strong>Wet food:</strong> Include wet food in the diet to increase water intake</li>
              <li><strong>Healthy fats:</strong> Fish oil supplement (¼ teaspoon per day)</li>
              <li><strong>Water:</strong> Fresh water available at all times</li>
          </ul>
          <p><strong>Treats:</strong> Limit treats to 10% of daily caloric intake</p>
      `;
  } else {
      html = `
          <p>Based on your pet's profile, we recommend consulting with a veterinarian for a specialized diet plan.</p>
          <p>General recommendations:</p>
          <ul>
              <li><strong>Species-appropriate commercial food:</strong> Follow package guidelines for your pet's weight</li>
              <li><strong>Fresh water:</strong> Always available</li>
              <li><strong>Supplements:</strong> As recommended by your veterinarian</li>
          </ul>
      `;
  }
  
  recommendationsDiv.innerHTML = html;
}

// Generate feeding schedule
function generateFeedingSchedule(petData) {
  const scheduleDiv = document.getElementById('feedingSchedule');
  let html = '';
  
  if (petData.type === 'dog') {
      if (parseFloat(petData.age) < 1) {
          html = `
              <p>For puppies under 1 year:</p>
              <ul>
                  <li><strong>Morning (7-8 AM):</strong> ⅓ of daily food amount</li>
                  <li><strong>Midday (12-1 PM):</strong> ⅓ of daily food amount</li>
                  <li><strong>Evening (5-6 PM):</strong> ⅓ of daily food amount</li>
              </ul>
          `;
      } else {
          html = `
              <p>For adult dogs:</p>
              <ul>
                  <li><strong>Morning (7-8 AM):</strong> ½ of daily food amount</li>
                  <li><strong>Evening (5-6 PM):</strong> ½ of daily food amount</li>
              </ul>
          `;
      }
  } else if (petData.type === 'cat') {
      html = `
          <p>For cats:</p>
          <ul>
              <li><strong>Morning (7-8 AM):</strong> ⅓ of daily food amount</li>
              <li><strong>Afternoon (2-3 PM):</strong> ⅓ of daily food amount</li>
              <li><strong>Evening (8-9 PM):</strong> ⅓ of daily food amount</li>
          </ul>
          <p>Note: Some cats prefer to graze throughout the day. If your cat is a grazer, you may leave dry food out during the day, but monitor total consumption.</p>
      `;
  } else {
      html = `
          <p>Feeding schedule varies by species. Please consult with a veterinarian for specific feeding times for your pet.</p>
      `;
  }
  
  scheduleDiv.innerHTML = html;
}

// Generate diet notes
function generateDietNotes(petData) {
  const notesUl = document.getElementById('dietNotes');
  let notes = [];
  
  // Common notes for all pets
  notes.push('Always introduce new foods gradually to avoid digestive upset.');
  notes.push('Monitor your pet\'s weight and adjust portions as needed.');
  notes.push('Consult with your veterinarian before making significant changes to your pet\'s diet.');
  
  // Pet-specific notes
  if (petData.type === 'dog') {
      notes.push('Avoid feeding chocolate, grapes, raisins, onions, garlic, and xylitol, as these are toxic to dogs.');
      notes.push('Provide appropriate chew toys to satisfy natural chewing instincts.');
      
      if (petData.breed.toLowerCase().includes('large') || parseFloat(petData.weight) > 25) {
          notes.push('Large breed dogs may benefit from food specifically formulated for large breeds to support joint health.');
      }
      
      if (parseFloat(petData.age) > 7) {
          notes.push('Senior dogs may benefit from supplements like glucosamine and chondroitin for joint health.');
      }
  } else if (petData.type === 'cat') {
      notes.push('Cats are obligate carnivores and require a diet high in animal protein.');
      notes.push('Avoid feeding onions, garlic, chocolate, and raw eggs, as these are toxic to cats.');
      notes.push('Ensure adequate water intake, especially if feeding primarily dry food.');
      
      if (parseFloat(petData.age) > 7) {
          notes.push('Senior cats may benefit from food with higher protein content and added taurine.');
      }
  }
  
  // Health issues notes
  if (petData.healthIssues) {
      notes.push(`Note regarding health issues: ${petData.healthIssues} - Please consult with your veterinarian for dietary adjustments specific to these conditions.`);
  }
  
  // Generate HTML
  let html = '';
  notes.forEach(note => {
      html += `<li>${note}</li>`;
  });
  
  notesUl.innerHTML = html;
}