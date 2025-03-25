// Symptoms Checker JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const symptomsForm = document.getElementById('symptomsForm');
  const symptomsResults = document.getElementById('symptomsResults');
  
  // Handle form submission
  if (symptomsForm) {
      symptomsForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const petType = document.getElementById('petTypeSymptoms').value;
          const petAge = document.getElementById('petAgeSymptoms').value;
          const symptomsDuration = document.getElementById('symptomsDuration').value;
          const symptomsDescription = document.getElementById('symptomsDescription').value;
          
          // Get checked symptoms
          const checkedSymptoms = [];
          const checkboxes = document.querySelectorAll('input[name="symptoms[]"]:checked');
          checkboxes.forEach(checkbox => {
              checkedSymptoms.push(checkbox.value);
          });
          
          // Get location
          const location = document.getElementById('locationInput').value;
          
          // Analyze symptoms
          analyzeSymptoms(petType, petAge, symptomsDuration, symptomsDescription, checkedSymptoms, location);
          
          // Show results
          symptomsResults.style.display = 'block';
          
          // Scroll to results
          symptomsResults.scrollIntoView({ behavior: 'smooth' });
      });
  }
});

// Analyze symptoms and generate results
function analyzeSymptoms(petType, petAge, duration, description, checkedSymptoms, location) {
  // Determine urgency level based on symptoms and duration
  let urgencyLevel = determineUrgencyLevel(petType, checkedSymptoms, duration);
  
  // Set urgency badge
  const urgencyBadge = document.getElementById('urgencyLevel');
  urgencyBadge.textContent = urgencyLevel.text;
  urgencyBadge.className = `urgency-badge ${urgencyLevel.class}`;
  
  // Generate possible causes
  generatePossibleCauses(petType, checkedSymptoms, description);
  
  // Generate recommended steps
  generateRecommendedSteps(petType, urgencyLevel.level, checkedSymptoms);
  
  // Generate home care tips
  generateHomeCare(petType, checkedSymptoms);
  
  // Generate when to see vet advice
  generateWhenToSeeVet(urgencyLevel.level);
  
  // Generate nearby vets (simulated)
  if (location) {
      generateNearbyVets(location);
  } else {
      document.getElementById('nearbyVets').style.display = 'none';
  }
}

// Determine urgency level
function determineUrgencyLevel(petType, symptoms, duration) {
  // High urgency symptoms
  const highUrgencySymptoms = ['difficulty_breathing', 'collapse', 'seizure', 'bleeding', 'poisoning'];
  
  // Medium urgency symptoms
  const mediumUrgencySymptoms = ['vomiting', 'diarrhea', 'lethargy', 'loss_appetite'];
  
  // Check for high urgency symptoms in description
  const highUrgencyKeywords = ['breathing', 'collapse', 'seizure', 'bleeding', 'poison', 'hit by', 'accident', 'blood', 'can\'t walk'];
  
  // Check if any high urgency symptoms are present
  for (const symptom of symptoms) {
      if (highUrgencySymptoms.includes(symptom)) {
          return { level: 'high', text: 'High Concern - Seek Veterinary Care Immediately', class: 'high' };
      }
  }
  
  // Check if multiple medium urgency symptoms are present
  let mediumCount = 0;
  for (const symptom of symptoms) {
      if (mediumUrgencySymptoms.includes(symptom)) {
          mediumCount++;
      }
  }
  
  if (mediumCount >= 2) {
      return { level: 'medium', text: 'Moderate Concern - Veterinary Care Recommended', class: 'moderate' };
  }
  
  // Check duration
  if (duration === 'weeks' || duration === 'months') {
      return { level: 'medium', text: 'Moderate Concern - Veterinary Care Recommended', class: 'moderate' };
  }
  
  // Default to low urgency
  return { level: 'low', text: 'Low Concern - Monitor and Observe', class: 'low' };
}

// Generate possible causes
function generatePossibleCauses(petType, symptoms, description) {
  const causesUl = document.getElementById('possibleCauses');
  let causes = [];
  
  // Common causes based on symptoms
  if (symptoms.includes('vomiting') && symptoms.includes('diarrhea')) {
      causes.push('Gastrointestinal infection or inflammation');
      causes.push('Food intolerance or dietary indiscretion');
      causes.push('Parasites (such as worms or giardia)');
  }
  
  if (symptoms.includes('lethargy') && symptoms.includes('loss_appetite')) {
      causes.push('Infection or fever');
      causes.push('Pain or discomfort');
      causes.push('Metabolic or endocrine disorders');
  }
  
  if (symptoms.includes('coughing') && symptoms.includes('sneezing')) {
      causes.push('Upper respiratory infection');
      causes.push('Allergies');
      causes.push('Kennel cough (in dogs)');
  }
  
  if (symptoms.includes('itching')) {
      causes.push('Allergies (environmental, food, or flea)');
      causes.push('Parasites (fleas, mites, or ticks)');
      causes.push('Skin infection (bacterial or fungal)');
  }
  
  if (symptoms.includes('limping')) {
      causes.push('Injury or trauma');
      causes.push('Arthritis or joint pain');
      causes.push('Nail or paw pad injury');
  }
  
  // Add pet-specific causes
  if (petType === 'dog') {
      if (symptoms.includes('vomiting')) {
          causes.push('Ingestion of foreign object or toxic substance');
      }
      if (symptoms.includes('lethargy')) {
          causes.push('Parvovirus (in unvaccinated dogs)');
      }
  } else if (petType === 'cat') {
      if (symptoms.includes('loss_appetite')) {
          causes.push('Dental disease');
      }
      if (symptoms.includes('lethargy')) {
          causes.push('Urinary tract infection or blockage (especially in male cats)');
      }
  }
  
  // If no specific causes identified
  if (causes.length === 0) {
      causes.push('Based on the information provided, specific causes cannot be determined');
      causes.push('Consultation with a veterinarian is recommended for proper diagnosis');
  }
  
  // Generate HTML
  let html = '';
  causes.forEach(cause => {
      html += `<li>${cause}</li>`;
  });
  
  causesUl.innerHTML = html;
}

// Generate recommended steps
function generateRecommendedSteps(petType, urgencyLevel, symptoms) {
  const stepsDiv = document.getElementById('recommendedSteps');
  let html = '';
  
  if (urgencyLevel === 'high') {
      html = `
          <p class="urgent-advice">Based on the symptoms described, your pet needs immediate veterinary attention.</p>
          <ol>
              <li>Call your veterinarian or emergency animal hospital immediately</li>
              <li>Describe the symptoms to the veterinary staff</li>
              <li>Follow their instructions for immediate care</li>
              <li>Transport your pet safely to the veterinary facility</li>
          </ol>
      `;
  } else if (urgencyLevel === 'medium') {
      html = `
          <p>Based on the symptoms described, your pet should be seen by a veterinarian soon.</p>
          <ol>
              <li>Call your veterinarian to schedule an appointment within 24-48 hours</li>
              <li>Monitor your pet closely for any worsening of symptoms</li>
              <li>Follow the home care tips below until your appointment</li>
              <li>If symptoms worsen, seek immediate veterinary care</li>
          </ol>
      `;
  } else {
      html = `
          <p>Based on the symptoms described, you can monitor your pet at home for now.</p>
          <ol>
              <li>Monitor your pet's symptoms for 24-48 hours</li>
              <li>Keep track of eating, drinking, and bathroom habits</li>
              <li>Follow the home care tips below</li>
              <li>If symptoms persist beyond 48 hours or worsen, contact your veterinarian</li>
          </ol>
      `;
  }
  
  stepsDiv.innerHTML = html;
}

// Generate home care tips
function generateHomeCare(petType, symptoms) {
  const homeCareUl = document.getElementById('homeCare');
  let tips = [];
  
  // General tips
  tips.push('Ensure your pet has access to fresh water at all times');
  tips.push('Provide a quiet, comfortable place for your pet to rest');
  tips.push('Monitor food intake, stool consistency, and urination');
  
  // Symptom-specific tips
  if (symptoms.includes('vomiting') || symptoms.includes('diarrhea')) {
      tips.push('Withhold food for 12 hours (for adult pets only), but continue to provide water');
      tips.push('After 12 hours, offer small amounts of bland food (boiled chicken and rice)');
      tips.push('Gradually transition back to regular food over 2-3 days if symptoms improve');
  }
  
  if (symptoms.includes('lethargy') || symptoms.includes('loss_appetite')) {
      tips.push('Try offering favorite foods or warming food slightly to increase aroma');
      tips.push('Hand-feeding may encourage eating');
      tips.push('Ensure your pet is staying hydrated');
  }
  
  if (symptoms.includes('coughing') || symptoms.includes('sneezing')) {
      tips.push('Use a humidifier in the room where your pet spends most time');
      tips.push('Keep your pet in a well-ventilated area away from smoke or strong odors');
      tips.push('Clean bedding regularly to reduce allergens');
  }
  
  if (symptoms.includes('itching')) {
      tips.push('Avoid bathing too frequently as it can dry out skin');
      tips.push('Use pet-safe, hypoallergenic shampoos if bathing is necessary');
      tips.push('Check for fleas and ticks');
  }
  
  if (symptoms.includes('limping')) {
      tips.push('Restrict activity and prevent jumping or running');
      tips.push('Apply ice wrapped in a towel to the affected area for 10-15 minutes several times a day (if injury is recent)');
      tips.push('Ensure your pet has comfortable bedding');
  }
  
  // Generate HTML
  let html = '';
  tips.forEach(tip => {
      html += `<li>${tip}</li>`;
  });
  
  homeCareUl.innerHTML = html;
}

// Generate when to see vet advice
function generateWhenToSeeVet(urgencyLevel) {
  const vetAdviceDiv = document.getElementById('whenToSeeVet');
  let html = '';
  
  if (urgencyLevel === 'high') {
      html = `
          <p class="urgent-advice">Seek immediate veterinary care if your pet is experiencing any of the following:</p>
          <ul>
              <li>Difficulty breathing or rapid breathing</li>
              <li>Collapse or inability to stand</li>
              <li>Seizures</li>
              <li>Severe bleeding</li>
              <li>Suspected poisoning or toxin ingestion</li>
              <li>Trauma or injury</li>
              <li>Extreme pain or distress</li>
              <li>Inability to urinate</li>
          </ul>
      `;
  } else if (urgencyLevel === 'medium') {
      html = `
          <p>Contact your veterinarian within 24-48 hours if:</p>
          <ul>
              <li>Symptoms persist for more than 24 hours</li>
              <li>Your pet refuses to eat for more than 24 hours</li>
              <li>Vomiting or diarrhea continues for more than 24 hours</li>
              <li>Your pet seems lethargic or depressed</li>
              <li>There is any worsening of current symptoms</li>
              <li>New symptoms develop</li>
          </ul>
      `;
  } else {
      html = `
          <p>Contact your veterinarian if:</p>
          <ul>
              <li>Symptoms persist for more than 48 hours</li>
              <li>Symptoms worsen at any point</li>
              <li>Your pet's behavior changes significantly</li>
              <li>You notice any new symptoms</li>
              <li>You have any concerns about your pet's health</li>
          </ul>
      `;
  }
  
  vetAdviceDiv.innerHTML = html;
}

// Generate nearby vets (simulated)
function generateNearbyVets(location) {
  const vetsLoading = document.getElementById('vetsLoading');
  const vetsList = document.getElementById('vetsList');
  
  // Simulate loading
  setTimeout(() => {
      vetsLoading.style.display = 'none';
      
      // Generate simulated vet clinics based on location
      let html = '';
      
      // Simulated data
      const vets = [
          {
              name: 'City Animal Hospital',
              address: '123 Main St, ' + location,
              phone: '(555) 123-4567',
              distance: '1.2 miles'
          },
          {
              name: 'Caring Paws Veterinary Clinic',
              address: '456 Oak Ave, ' + location,
              phone: '(555) 987-6543',
              distance: '2.5 miles'
          },
          {
              name: '24/7 Emergency Pet Care',
              address: '789 Pine Rd, ' + location,
              phone: '(555) 456-7890',
              distance: '3.8 miles'
          }
      ];
      
      vets.forEach(vet => {
          html += `
              <div class="vet-card">
                  <div class="vet-name">${vet.name}</div>
                  <div class="vet-address">${vet.address}</div>
                  <div class="vet-phone">${vet.phone}</div>
                  <div class="vet-distance">${vet.distance}</div>
                  <a href="tel:${vet.phone.replace(/[^0-9]/g, '')}" class="btn btn-primary btn-sm">Call</a>
              </div>
          `;
      });
      
      vetsList.innerHTML = html;
  }, 1500);
}