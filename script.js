// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Mobile Navigation Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Pet Registration Form
const petRegistrationForm = document.getElementById('petRegistrationForm');
if (petRegistrationForm) {
    petRegistrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const pet = {
            name: document.getElementById('petName').value,
            type: document.getElementById('petType').value,
            breed: document.getElementById('petBreed').value,
            age: document.getElementById('petAge').value,
            weight: document.getElementById('petWeight').value,
            height: document.getElementById('petHeight').value,
            gender: document.getElementById('petGender').value,
            color: document.getElementById('petColor').value,
            notes: document.getElementById('petNotes').value,
            id: Date.now().toString()
        };
        
        // Save pet to localStorage
        savePet(pet);
        
        // Show success message
        alert('Pet registered successfully!');
        
        // Redirect to My Pet page
        window.location.href = 'my-pet.html';
    });
}

// Pet Profile Page
const petProfile = document.getElementById('petProfile');
const noPetMessage = document.getElementById('noPetMessage');
if (petProfile && noPetMessage) {
    const pet = getLatestPet();
    
    if (pet) {
        // Show pet profile and hide no pet message
        petProfile.style.display = 'block';
        noPetMessage.style.display = 'none';
        
        // Populate pet profile with data
        document.getElementById('profilePetName').textContent = pet.name;
        document.getElementById('profilePetBreed').textContent = pet.breed;
        document.getElementById('profilePetType').textContent = capitalizeFirstLetter(pet.type);
        document.getElementById('profilePetAge').textContent = pet.age;
        document.getElementById('profilePetGender').textContent = capitalizeFirstLetter(pet.gender);
        document.getElementById('profilePetColor').textContent = pet.color;
        document.getElementById('profilePetWeight').textContent = `${pet.weight} kg`;
        document.getElementById('profilePetHeight').textContent = `${pet.height} cm`;
        document.getElementById('profilePetNotes').textContent = pet.notes || 'No additional notes.';
        document.getElementById('petInitial').textContent = pet.name.charAt(0).toUpperCase();
        
        // Set up delete button
        const deletePetBtn = document.getElementById('deletePetBtn');
        if (deletePetBtn) {
            deletePetBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this pet?')) {
                    deletePet(pet.id);
                    window.location.reload();
                }
            });
        }
        
        // Set up edit button
        const editPetBtn = document.getElementById('editPetBtn');
        if (editPetBtn) {
            editPetBtn.addEventListener('click', function() {
                window.location.href = 'register-pet.html?edit=' + pet.id;
            });
        }
    } else {
        // Show no pet message and hide pet profile
        petProfile.style.display = 'none';
        noPetMessage.style.display = 'block';
    }
}

// Medical Records Page
const medicalRecordsContent = document.getElementById('medicalRecordsContent');
const noPetMedicalMessage = document.getElementById('noPetMedicalMessage');
const petSelector = document.getElementById('petSelector');

if (medicalRecordsContent && noPetMedicalMessage) {
    const pets = getAllPets();
    
    if (pets.length > 0) {
        // Show medical records content and hide no pet message
        medicalRecordsContent.style.display = 'block';
        noPetMedicalMessage.style.display = 'none';
        
        // Populate pet selector
        pets.forEach(pet => {
            const option = document.createElement('option');
            option.value = pet.id;
            option.textContent = pet.name;
            petSelector.appendChild(option);
        });
        
        // Set up tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
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
        
        // Set up vaccination form
        const addVaccinationBtn = document.getElementById('addVaccinationBtn');
        const vaccinationForm = document.getElementById('vaccinationForm');
        const cancelVaccinationBtn = document.getElementById('cancelVaccinationBtn');
        
        if (addVaccinationBtn && vaccinationForm && cancelVaccinationBtn) {
            addVaccinationBtn.addEventListener('click', function() {
                vaccinationForm.style.display = 'block';
            });
            
            cancelVaccinationBtn.addEventListener('click', function() {
                vaccinationForm.style.display = 'none';
            });
        }
        
        // Set up appointment form
        const addAppointmentBtn = document.getElementById('addAppointmentBtn');
        const appointmentForm = document.getElementById('appointmentForm');
        const cancelAppointmentBtn = document.getElementById('cancelAppointmentBtn');
        
        if (addAppointmentBtn && appointmentForm && cancelAppointmentBtn) {
            addAppointmentBtn.addEventListener('click', function() {
                appointmentForm.style.display = 'block';
            });
            
            cancelAppointmentBtn.addEventListener('click', function() {
                appointmentForm.style.display = 'none';
            });
        }
        
        // Set up visit form
        const addVisitBtn = document.getElementById('addVisitBtn');
        const visitForm = document.getElementById('visitForm');
        const cancelVisitBtn = document.getElementById('cancelVisitBtn');
        
        if (addVisitBtn && visitForm && cancelVisitBtn) {
            addVisitBtn.addEventListener('click', function() {
                visitForm.style.display = 'block';
            });
            
            cancelVisitBtn.addEventListener('click', function() {
                visitForm.style.display = 'none';
            });
        }
        
        // Handle form submissions
        const addVaccinationForm = document.getElementById('addVaccinationForm');
        if (addVaccinationForm) {
            addVaccinationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const petId = petSelector.value;
                if (!petId) {
                    alert('Please select a pet first.');
                    return;
                }
                
                const vaccination = {
                    id: Date.now().toString(),
                    name: document.getElementById('vaccineName').value,
                    date: document.getElementById('vaccineDate').value,
                    nextDate: document.getElementById('vaccineNextDate').value,
                    notes: document.getElementById('vaccineNotes').value
                };
                
                saveVaccination(petId, vaccination);
                
                alert('Vaccination record added successfully!');
                vaccinationForm.style.display = 'none';
                loadVaccinations(petId);
            });
        }
        
        const addAppointmentForm = document.getElementById('addAppointmentForm');
        if (addAppointmentForm) {
            addAppointmentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const petId = petSelector.value;
                if (!petId) {
                    alert('Please select a pet first.');
                    return;
                }
                
                const appointment = {
                    id: Date.now().toString(),
                    type: document.getElementById('appointmentType').value,
                    date: document.getElementById('appointmentDate').value,
                    time: document.getElementById('appointmentTime').value,
                    vet: document.getElementById('vetName').value,
                    notes: document.getElementById('appointmentNotes').value
                };
                
                saveAppointment(petId, appointment);
                
                alert('Appointment scheduled successfully!');
                appointmentForm.style.display = 'none';
                loadAppointments(petId);
            });
        }
        
        const addVisitForm = document.getElementById('addVisitForm');
        if (addVisitForm) {
            addVisitForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const petId = petSelector.value;
                if (!petId) {
                    alert('Please select a pet first.');
                    return;
                }
                
                const visit = {
                    id: Date.now().toString(),
                    date: document.getElementById('visitDate').value,
                    reason: document.getElementById('visitReason').value,
                    vet: document.getElementById('visitVet').value,
                    diagnosis: document.getElementById('visitDiagnosis').value,
                    treatment: document.getElementById('visitTreatment').value
                };
                
                saveVisit(petId, visit);
                
                alert('Vet visit record added successfully!');
                visitForm.style.display = 'none';
                loadVisits(petId);
            });
        }
        
        // Load records when pet is selected
        if (petSelector) {
            petSelector.addEventListener('change', function() {
                const petId = this.value;
                if (petId) {
                    loadVaccinations(petId);
                    loadAppointments(petId);
                    loadVisits(petId);
                }
            });
            
            // Load records for first pet by default
            if (pets.length > 0) {
                petSelector.value = pets[0].id;
                loadVaccinations(pets[0].id);
                loadAppointments(pets[0].id);
                loadVisits(pets[0].id);
            }
        }
    } else {
        // Show no pet message and hide medical records content
        medicalRecordsContent.style.display = 'none';
        noPetMedicalMessage.style.display = 'block';
    }
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send this data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Helper Functions
function savePet(pet) {
    let pets = getAllPets();
    
    // Check if editing an existing pet
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId) {
        // Update existing pet
        pets = pets.map(p => p.id === editId ? pet : p);
    } else {
        // Add new pet
        pets.push(pet);
    }
    
    localStorage.setItem('pets', JSON.stringify(pets));
}

function getAllPets() {
    const petsJson = localStorage.getItem('pets');
    return petsJson ? JSON.parse(petsJson) : [];
}

function getLatestPet() {
    const pets = getAllPets();
    return pets.length > 0 ? pets[pets.length - 1] : null;
}

function getPetById(id) {
    const pets = getAllPets();
    return pets.find(pet => pet.id === id);
}

function deletePet(id) {
    let pets = getAllPets();
    pets = pets.filter(pet => pet.id !== id);
    localStorage.setItem('pets', JSON.stringify(pets));
    
    // Also delete related medical records
    deleteVaccinations(id);
    deleteAppointments(id);
    deleteVisits(id);
}

function saveVaccination(petId, vaccination) {
    let vaccinations = getVaccinations(petId);
    vaccinations.push(vaccination);
    localStorage.setItem(`vaccinations_${petId}`, JSON.stringify(vaccinations));
}

function getVaccinations(petId) {
    const vaccinationsJson = localStorage.getItem(`vaccinations_${petId}`);
    return vaccinationsJson ? JSON.parse(vaccinationsJson) : [];
}

function deleteVaccinations(petId) {
    localStorage.removeItem(`vaccinations_${petId}`);
}

function saveAppointment(petId, appointment) {
    let appointments = getAppointments(petId);
    appointments.push(appointment);
    localStorage.setItem(`appointments_${petId}`, JSON.stringify(appointments));
}

function getAppointments(petId) {
    const appointmentsJson = localStorage.getItem(`appointments_${petId}`);
    return appointmentsJson ? JSON.parse(appointmentsJson) : [];
}

function deleteAppointments(petId) {
    localStorage.removeItem(`appointments_${petId}`);
}

function saveVisit(petId, visit) {
    let visits = getVisits(petId);
    visits.push(visit);
    localStorage.setItem(`visits_${petId}`, JSON.stringify(visits));
}

function getVisits(petId) {
    const visitsJson = localStorage.getItem(`visits_${petId}`);
    return visitsJson ? JSON.parse(visitsJson) : [];
}

function deleteVisits(petId) {
    localStorage.removeItem(`visits_${petId}`);
}

function loadVaccinations(petId) {
    const vaccinationsList = document.getElementById('vaccinationsList');
    if (!vaccinationsList) return;
    
    const vaccinations = getVaccinations(petId);
    
    if (vaccinations.length === 0) {
        vaccinationsList.innerHTML = '<div class="empty-state"><p>No vaccination records yet.</p></div>';
        return;
    }
    
    let html = '';
    vaccinations.forEach(vaccination => {
        html += `
            <div class="record-card" data-id="${vaccination.id}">
                <div class="record-header">
                    <span class="record-title">${vaccination.name}</span>
                    <span class="record-date">Date: ${formatDate(vaccination.date)}</span>
                </div>
                <div class="record-details">
                    ${vaccination.nextDate ? `<p><strong>Next Due:</strong> ${formatDate(vaccination.nextDate)}</p>` : ''}
                    ${vaccination.notes ? `<p><strong>Notes:</strong> ${vaccination.notes}</p>` : ''}
                </div>
                <div class="record-actions">
                    <button class="record-btn delete" onclick="deleteVaccinationRecord('${petId}', '${vaccination.id}')">Delete</button>
                </div>
            </div>
        `;
    });
    
    vaccinationsList.innerHTML = html;
}

function loadAppointments(petId) {
    const appointmentsList = document.getElementById('appointmentsList');
    if (!appointmentsList) return;
    
    const appointments = getAppointments(petId);
    
    if (appointments.length === 0) {
        appointmentsList.innerHTML = '<div class="empty-state"><p>No upcoming appointments.</p></div>';
        return;
    }
    
    let html = '';
    appointments.forEach(appointment => {
        html += `
            <div class="record-card" data-id="${appointment.id}">
                <div class="record-header">
                    <span class="record-title">${capitalizeFirstLetter(appointment.type)} Appointment</span>
                    <span class="record-date">${formatDate(appointment.date)} at ${appointment.time}</span>
                </div>
                <div class="record-details">
                    ${appointment.vet ? `<p><strong>Veterinarian:</strong> ${appointment.vet}</p>` : ''}
                    ${appointment.notes ? `<p><strong>Notes:</strong> ${appointment.notes}</p>` : ''}
                </div>
                <div class="record-actions">
                    <button class="record-btn delete" onclick="deleteAppointmentRecord('${petId}', '${appointment.id}')">Delete</button>
                </div>
            </div>
        `;
    });
    
    appointmentsList.innerHTML = html;
}

function loadVisits(petId) {
    const visitsList = document.getElementById('visitsList');
    if (!visitsList) return;
    
    const visits = getVisits(petId);
    
    if (visits.length === 0) {
        visitsList.innerHTML = '<div class="empty-state"><p>No vet visit records yet.</p></div>';
        return;
    }
    
    let html = '';
    visits.forEach(visit => {
        html += `
            <div class="record-card" data-id="${visit.id}">
                <div class="record-header">
                    <span class="record-title">${visit.reason}</span>
                    <span class="record-date">${formatDate(visit.date)}</span>
                </div>
                <div class="record-details">
                    ${visit.vet ? `<p><strong>Veterinarian:</strong> ${visit.vet}</p>` : ''}
                    ${visit.diagnosis ? `<p><strong>Diagnosis:</strong> ${visit.diagnosis}</p>` : ''}
                    ${visit.treatment ? `<p><strong>Treatment:</strong> ${visit.treatment}</p>` : ''}
                </div>
                <div class="record-actions">
                    <button class="record-btn delete" onclick="deleteVisitRecord('${petId}', '${visit.id}')">Delete</button>
                </div>
            </div>
        `;
    });
    
    visitsList.innerHTML = html;
}

// Global functions for record deletion
window.deleteVaccinationRecord = function(petId, id) {
    if (confirm('Are you sure you want to delete this vaccination record?')) {
        let vaccinations = getVaccinations(petId);
        vaccinations = vaccinations.filter(v => v.id !== id);
        localStorage.setItem(`vaccinations_${petId}`, JSON.stringify(vaccinations));
        loadVaccinations(petId);
    }
};

window.deleteAppointmentRecord = function(petId, id) {
    if (confirm('Are you sure you want to delete this appointment?')) {
        let appointments = getAppointments(petId);
        appointments = appointments.filter(a => a.id !== id);
        localStorage.setItem(`appointments_${petId}`, JSON.stringify(appointments));
        loadAppointments(petId);
    }
};

window.deleteVisitRecord = function(petId, id) {
    if (confirm('Are you sure you want to delete this visit record?')) {
        let visits = getVisits(petId);
        visits = visits.filter(v => v.id !== id);
        localStorage.setItem(`visits_${petId}`, JSON.stringify(visits));
        loadVisits(petId);
    }
};

// Utility functions
function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

// Check for edit mode on page load
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId && petRegistrationForm) {
        const pet = getPetById(editId);
        if (pet) {
            // Fill form with pet data
            document.getElementById('petName').value = pet.name;
            document.getElementById('petType').value = pet.type;
            document.getElementById('petBreed').value = pet.breed;
            document.getElementById('petAge').value = pet.age;
            document.getElementById('petWeight').value = pet.weight;
            document.getElementById('petHeight').value = pet.height;
            document.getElementById('petGender').value = pet.gender;
            document.getElementById('petColor').value = pet.color;
            document.getElementById('petNotes').value = pet.notes || '';
            
            // Change form title and button text
            const pageHeader = document.querySelector('.page-header h1');
            if (pageHeader) {
                pageHeader.textContent = 'Edit Pet Information';
            }
            
            const submitButton = petRegistrationForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Update Pet Data';
            }
        }
    }
});