// Lost & Found Pets JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Tab functionality
  tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const tabId = this.dataset.tab;
          
          // Remove active class from all tabs
          tabBtns.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Add active class to current tab
          this.classList.add('active');
          document.getElementById(tabId).classList.add('active');
      });
  });
  
  // Report buttons
  const reportLostPetBtn = document.getElementById('reportLostPetBtn');
  const reportFoundPetBtn = document.getElementById('reportFoundPetBtn');
  const reportLostOption = document.getElementById('reportLostOption');
  const reportFoundOption = document.getElementById('reportFoundOption');
  
  if (reportLostPetBtn) {
      reportLostPetBtn.addEventListener('click', function() {
          // Switch to report tab
          document.querySelector('[data-tab="report-pet"]').click();
          // Show lost pet form
          showLostPetForm();
      });
  }
  
  if (reportFoundPetBtn) {
      reportFoundPetBtn.addEventListener('click', function() {
          // Switch to report tab
          document.querySelector('[data-tab="report-pet"]').click();
          // Show found pet form
          showFoundPetForm();
      });
  }
  
  if (reportLostOption) {
      reportLostOption.querySelector('.report-btn').addEventListener('click', showLostPetForm);
  }
  
  if (reportFoundOption) {
      reportFoundOption.querySelector('.report-btn').addEventListener('click', showFoundPetForm);
  }
  
  // Cancel form buttons
  const cancelButtons = document.querySelectorAll('.cancel-form');
  cancelButtons.forEach(button => {
      button.addEventListener('click', function() {
          document.getElementById('lostPetForm').style.display = 'none';
          document.getElementById('foundPetForm').style.display = 'none';
      });
  });
  
  // Form submissions
  const reportLostForm = document.getElementById('reportLostForm');
  const reportFoundForm = document.getElementById('reportFoundForm');
  
  if (reportLostForm) {
      reportLostForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form data
          const lostPet = {
              id: Date.now().toString(),
              type: 'lost',
              name: document.getElementById('lostPetName').value,
              petType: document.getElementById('lostPetType').value,
              breed: document.getElementById('lostPetBreed').value,
              gender: document.getElementById('lostPetGender').value,
              age: document.getElementById('lostPetAge').value,
              description: document.getElementById('lostPetDescription').value,
              location: document.getElementById('lostLocation').value,
              date: document.getElementById('lostDate').value,
              contact: document.getElementById('ownerContact').value,
              email: document.getElementById('ownerEmail').value,
              additionalInfo: document.getElementById('additionalInfo').value,
              imageUrl: '',
              dateReported: new Date().toISOString()
          };
          
          // Handle image upload (simulated)
          const imageFile = document.getElementById('lostPetImage').files[0];
          if (imageFile) {
              // In a real application, you would upload the image to a server
              // For this example, we'll simulate it with a placeholder
              lostPet.imageUrl = 'https://placeholder.svg?height=300&width=300';
          }
          
          // Save to localStorage
          saveLostPet(lostPet);
          
          // Show success message
          alert('Your lost pet report has been submitted successfully.');
          
          // Reset form
          reportLostForm.reset();
          
          // Hide form
          document.getElementById('lostPetForm').style.display = 'none';
          
          // Switch to lost pets tab and refresh list
          document.querySelector('[data-tab="lost-pets"]').click();
          loadLostPets();
      });
  }
  
  if (reportFoundForm) {
      reportFoundForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form data
          const foundPet = {
              id: Date.now().toString(),
              type: 'found',
              petType: document.getElementById('foundPetType').value,
              breed: document.getElementById('foundPetBreed').value || 'Unknown',
              gender: document.getElementById('foundPetGender').value || 'Unknown',
              age: document.getElementById('foundPetAge').value || 'Unknown',
              description: document.getElementById('foundPetDescription').value,
              location: document.getElementById('foundLocation').value,
              date: document.getElementById('foundDate').value,
              contact: document.getElementById('finderContact').value,
              email: document.getElementById('finderEmail').value,
              status: document.getElementById('currentStatus').value,
              additionalInfo: document.getElementById('additionalInfoFound').value || '',
              imageUrl: '',
              dateReported: new Date().toISOString()
          };
          
          // Handle image upload (simulated)
          const imageFile = document.getElementById('foundPetImage').files[0];
          if (imageFile) {
              // In a real application, you would upload the image to a server
              // For this example, we'll simulate it with a placeholder
              foundPet.imageUrl = 'https://placeholder.svg?height=300&width=300';
          }
          
          // Save to localStorage
          saveFoundPet(foundPet);
          
          // Show success message
          alert('Your found pet report has been submitted successfully.');
          
          // Reset form
          reportFoundForm.reset();
          
          // Hide form
          document.getElementById('foundPetForm').style.display = 'none';
          
          // Switch to found pets tab and refresh list
          document.querySelector('[data-tab="found-pets"]').click();
          loadFoundPets();
      });
  }
  
  // Pet filters
  const lostPetFilter = document.getElementById('lostPetFilter');
  const foundPetFilter = document.getElementById('foundPetFilter');
  
  if (lostPetFilter) {
      lostPetFilter.addEventListener('change', function() {
          loadLostPets(this.value);
      });
  }
  
  if (foundPetFilter) {
      foundPetFilter.addEventListener('change', function() {
          loadFoundPets(this.value);
      });
  }
  
  // Load pets on page load
  loadLostPets();
  loadFoundPets();
});

// Show lost pet form
function showLostPetForm() {
  document.getElementById('lostPetForm').style.display = 'block';
  document.getElementById('foundPetForm').style.display = 'none';
}

// Show found pet form
function showFoundPetForm() {
  document.getElementById('foundPetForm').style.display = 'block';
  document.getElementById('lostPetForm').style.display = 'none';
}

// Save lost pet to localStorage
function saveLostPet(pet) {
  let lostPets = getLostPets();
  lostPets.push(pet);
  localStorage.setItem('lostPets', JSON.stringify(lostPets));
}

// Get lost pets from localStorage
function getLostPets() {
  const lostPetsJson = localStorage.getItem('lostPets');
  return lostPetsJson ? JSON.parse(lostPetsJson) : [];
}

// Save found pet to localStorage
function saveFoundPet(pet) {
  let foundPets = getFoundPets();
  foundPets.push(pet);
  localStorage.setItem('foundPets', JSON.stringify(foundPets));
}

// Get found pets from localStorage
function getFoundPets() {
  const foundPetsJson = localStorage.getItem('foundPets');
  return foundPetsJson ? JSON.parse(foundPetsJson) : [];
}

// Load lost pets
function loadLostPets(filter = 'all') {
  const lostPetsList = document.getElementById('lostPetsList');
  if (!lostPetsList) return;
  
  const lostPets = getLostPets();
  
  if (lostPets.length === 0) {
      lostPetsList.innerHTML = `
          <div class="empty-state">
              <p>No lost pets reported in your area.</p>
              <button id="reportLostPetBtn" class="btn btn-primary">Report a Lost Pet</button>
          </div>
      `;
      
      // Re-attach event listener
      const reportLostPetBtn = document.getElementById('reportLostPetBtn');
      if (reportLostPetBtn) {
          reportLostPetBtn.addEventListener('click', function() {
              document.querySelector('[data-tab="report-pet"]').click();
              showLostPetForm();
          });
      }
      
      return;
  }
  
  // Filter pets
  let filteredPets = lostPets;
  if (filter !== 'all') {
      filteredPets = lostPets.filter(pet => pet.petType === filter);
  }
  
  if (filteredPets.length === 0) {
      lostPetsList.innerHTML = `
          <div class="empty-state">
              <p>No ${filter} pets reported as lost.</p>
          </div>
      `;
      return;
  }
  
  // Sort by date (most recent first)
  filteredPets.sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported));
  
  // Generate HTML
  let html = '';
  filteredPets.forEach(pet => {
      html += `
          <div class="pet-card">
              ${pet.imageUrl ? 
                  `<img src="${pet.imageUrl}" alt="${pet.name}" class="pet-image">` : 
                  `<div class="pet-image-placeholder">No Image</div>`
              }
              <div class="pet-details">
                  <h3 class="pet-name">${pet.name}</h3>
                  <span class="pet-status lost">Lost</span>
                  <div class="pet-info">
                      <p><strong>Type:</strong> ${capitalizeFirstLetter(pet.petType)}</p>
                      <p><strong>Breed:</strong> ${pet.breed}</p>
                      <p><strong>Last Seen:</strong> ${formatDate(pet.date)}</p>
                      <p><strong>Location:</strong> ${pet.location}</p>
                  </div>
                  <div class="pet-actions">
                      <button class="btn btn-primary view-details" data-id="${pet.id}" data-type="lost">View Details</button>
                  </div>
              </div>
          </div>
      `;
  });
  
  lostPetsList.innerHTML = html;
  
  // Attach event listeners to view details buttons
  const viewDetailsButtons = document.querySelectorAll('.view-details');
  viewDetailsButtons.forEach(button => {
      button.addEventListener('click', function() {
          const petId = this.dataset.id;
          const petType = this.dataset.type;
          
          if (petType === 'lost') {
              const pet = lostPets.find(p => p.id === petId);
              if (pet) {
                  showPetDetails(pet);
              }
          }
      });
  });
}

// Load found pets
function loadFoundPets(filter = 'all') {
  const foundPetsList = document.getElementById('foundPetsList');
  if (!foundPetsList) return;
  
  const foundPets = getFoundPets();
  
  if (foundPets.length === 0) {
      foundPetsList.innerHTML = `
          <div class="empty-state">
              <p>No found pets reported in your area.</p>
              <button id="reportFoundPetBtn" class="btn btn-primary">Report a Found Pet</button>
          </div>
      `;
      
      // Re-attach event listener
      const reportFoundPetBtn = document.getElementById('reportFoundPetBtn');
      if (reportFoundPetBtn) {
          reportFoundPetBtn.addEventListener('click', function() {
              document.querySelector('[data-tab="report-pet"]').click();
              showFoundPetForm();
          });
      }
      
      return;
  }
  
  // Filter pets
  let filteredPets = foundPets;
  if (filter !== 'all') {
      filteredPets = foundPets.filter(pet => pet.petType === filter);
  }
  
  if (filteredPets.length === 0) {
      foundPetsList.innerHTML = `
          <div class="empty-state">
              <p>No ${filter} pets reported as found.</p>
          </div>
      `;
      return;
  }
  
  // Sort by date (most recent first)
  filteredPets.sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported));
  
  // Generate HTML
  let html = '';
  filteredPets.forEach(pet => {
      html += `
          <div class="pet-card">
              ${pet.imageUrl ? 
                  `<img src="${pet.imageUrl}" alt="Found ${pet.petType}" class="pet-image">` : 
                  `<div class="pet-image-placeholder">No Image</div>`
              }
              <div class="pet-details">
                  <h3 class="pet-name">Found ${capitalizeFirstLetter(pet.petType)}</h3>
                  <span class="pet-status found">Found</span>
                  <div class="pet-info">
                      <p><strong>Type:</strong> ${capitalizeFirstLetter(pet.petType)}</p>
                      <p><strong>Breed:</strong> ${pet.breed}</p>
                      <p><strong>Found On:</strong> ${formatDate(pet.date)}</p>
                      <p><strong>Location:</strong> ${pet.location}</p>
                  </div>
                  <div class="pet-actions">
                      <button class="btn btn-primary view-details" data-id="${pet.id}" data-type="found">View Details</button>
                  </div>
              </div>
          </div>
      `;
  });
  
  foundPetsList.innerHTML = html;
  
  // Attach event listeners to view details buttons
  const viewDetailsButtons = document.querySelectorAll('.view-details');
  viewDetailsButtons.forEach(button => {
      button.addEventListener('click', function() {
          const petId = this.dataset.id;
          const petType = this.dataset.type;
          
          if (petType === 'found') {
              const pet = foundPets.find(p => p.id === petId);
              if (pet) {
                  showPetDetails(pet);
              }
          }
      });
  });
}

// Show pet details in a modal (simulated)
function showPetDetails(pet) {
  // In a real application, you would show a modal with pet details
  // For this example, we'll use an alert
  let details = '';
  
  if (pet.type === 'lost') {
      details = `
          Lost Pet Details:
          
          Name: ${pet.name}
          Type: ${capitalizeFirstLetter(pet.petType)}
          Breed: ${pet.breed}
          Gender: ${capitalizeFirstLetter(pet.gender)}
          Age: ${pet.age}
          
          Description: ${pet.description}
          
          Last Seen: ${formatDate(pet.date)}
          Location: ${pet.location}
          
          Contact: ${pet.contact}
          Email: ${pet.email}
          
          Additional Info: ${pet.additionalInfo || 'None provided'}
      `;
  } else {
      details = `
          Found Pet Details:
          
          Type: ${capitalizeFirstLetter(pet.petType)}
          Breed: ${pet.breed}
          Gender: ${capitalizeFirstLetter(pet.gender)}
          Approximate Age: ${pet.age}
          
          Description: ${pet.description}
          
          Found On: ${formatDate(pet.date)}
          Location: ${pet.location}
          Current Status: ${getStatusText(pet.status)}
          
          Finder's Contact: ${pet.contact}
          Finder's Email: ${pet.email}
          
          Additional Info: ${pet.additionalInfo || 'None provided'}
      `;
  }
  
  alert(details);
}

// Get status text
function getStatusText(status) {
  switch (status) {
      case 'with_me':
          return 'With finder';
      case 'shelter':
          return 'Taken to a shelter';
      case 'vet':
          return 'Taken to a vet';
      case 'spotted':
          return 'Spotted but not captured';
      default:
          return status;
  }
}

// Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// Capitalize first letter
function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}