// DOM Elements
const petModal = document.getElementById('pet-modal');
const petForm = document.getElementById('pet-form');
const petsList = document.getElementById('pets-list');
const appointmentsList = document.getElementById('appointments-list');

// API Base URL
const API_BASE = '/api';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadPets();
    loadAppointments();
    setupEventListeners();
    setupSmoothScrolling();
    handleURLRouting();
});

// Setup event listeners
function setupEventListeners() {
    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === petModal) {
            closeModal();
        }
    });

    // Pet form submission
    petForm.addEventListener('submit', handlePetSubmit);

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target.startsWith('#')) {
                document.querySelector(target).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle URL routing
function handleURLRouting() {
    const currentPath = window.location.pathname;
    
    if (currentPath === '/appointments/') {
        // Scroll to appointments section
        setTimeout(() => {
            document.getElementById('appointments').scrollIntoView({
                behavior: 'smooth'
            });
        }, 100);
    } else if (currentPath === '/pets/') {
        // Scroll to pets section
        setTimeout(() => {
            document.getElementById('pets').scrollIntoView({
                behavior: 'smooth'
            });
        }, 100);
    }
}

// Show pets section
function showPets() {
    document.getElementById('pets').scrollIntoView({
        behavior: 'smooth'
    });
}

// Show appointments section
function showAppointments() {
    document.getElementById('appointments').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add pet modal
function addPet() {
    petModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    petModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    petForm.reset();
}

// Book appointment
function bookAppointment() {
    showMessage('Appointment booking feature coming soon!', 'info');
}

// Handle pet form submission
async function handlePetSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(petForm);
    const petData = {
        name: formData.get('name'),
        species: formData.get('species'),
        breed: formData.get('breed'),
        age: parseInt(formData.get('age')),
        owner_name: formData.get('owner_name'),
        owner_phone: formData.get('owner_phone')
    };

    try {
        const response = await fetch(`${API_BASE}/pets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(petData)
        });

        if (response.ok) {
            showMessage('Pet added successfully!', 'success');
            closeModal();
            loadPets();
        } else {
            throw new Error('Failed to add pet');
        }
    } catch (error) {
        showMessage('Error adding pet. Please try again.', 'error');
        console.error('Error:', error);
    }
}

// Load pets from API
async function loadPets() {
    try {
        const response = await fetch(`${API_BASE}/pets/`);
        const pets = await response.json();
        
        if (pets.length === 0) {
            petsList.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-paw"></i>
                    <h3>No pets registered yet</h3>
                    <p>Add your first pet to get started!</p>
                </div>
            `;
            return;
        }

        petsList.innerHTML = pets.map(pet => `
            <div class="pet-card">
                <div class="pet-header">
                    <h3>${pet.name}</h3>
                    <span class="pet-species">${pet.species}</span>
                </div>
                <div class="pet-details">
                    <p><strong>Breed:</strong> ${pet.breed || 'Not specified'}</p>
                    <p><strong>Age:</strong> ${pet.age} years old</p>
                    <p><strong>Owner:</strong> ${pet.owner_name}</p>
                    <p><strong>Phone:</strong> ${pet.owner_phone}</p>
                </div>
                <div class="pet-actions">
                    <button class="btn btn-primary" onclick="editPet(${pet.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-secondary" onclick="deletePet(${pet.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading pets:', error);
        petsList.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error loading pets</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Load appointments from API
async function loadAppointments() {
    try {
        const response = await fetch(`${API_BASE}/appointments/`);
        const appointments = await response.json();
        
        if (appointments.length === 0) {
            appointmentsList.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-calendar"></i>
                    <h3>No appointments scheduled</h3>
                    <p>Book your first appointment!</p>
                </div>
            `;
            return;
        }

        appointmentsList.innerHTML = appointments.map(appointment => `
            <div class="appointment-card">
                <div class="appointment-header">
                    <h3>${appointment.pet_name}</h3>
                    <span class="appointment-status ${appointment.status}">${appointment.status}</span>
                </div>
                <div class="appointment-details">
                    <p><strong>Date:</strong> ${new Date(appointment.appointment_date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${new Date(appointment.appointment_date).toLocaleTimeString()}</p>
                    <p><strong>Reason:</strong> ${appointment.reason}</p>
                    ${appointment.notes ? `<p><strong>Notes:</strong> ${appointment.notes}</p>` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading appointments:', error);
        appointmentsList.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error loading appointments</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Edit pet (placeholder)
function editPet(petId) {
    showMessage('Edit functionality coming soon!', 'info');
}

// Delete pet
async function deletePet(petId) {
    if (!confirm('Are you sure you want to delete this pet?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/pets/${petId}/`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showMessage('Pet deleted successfully!', 'success');
            loadPets();
        } else {
            throw new Error('Failed to delete pet');
        }
    } catch (error) {
        showMessage('Error deleting pet. Please try again.', 'error');
        console.error('Error:', error);
    }
}

// Show message
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the page
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Add some sample data for demo
function addSampleData() {
    const samplePets = [
        {
            name: 'Buddy',
            species: 'Dog',
            breed: 'Golden Retriever',
            age: 3,
            owner_name: 'John Doe',
            owner_phone: '555-0123'
        },
        {
            name: 'Whiskers',
            species: 'Cat',
            breed: 'Persian',
            age: 2,
            owner_name: 'Jane Smith',
            owner_phone: '555-0456'
        }
    ];

    samplePets.forEach(async (pet) => {
        try {
            await fetch(`${API_BASE}/pets/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pet)
            });
        } catch (error) {
            console.error('Error adding sample pet:', error);
        }
    });
}

// Add sample data button (for demo purposes)
document.addEventListener('DOMContentLoaded', function() {
    // Add sample data button to pets section
    const petsHeader = document.querySelector('.pets-header');
    if (petsHeader) {
        const sampleButton = document.createElement('button');
        sampleButton.className = 'btn btn-secondary';
        sampleButton.innerHTML = '<i class="fas fa-plus"></i> Add Sample Data';
        sampleButton.onclick = function() {
            addSampleData();
            setTimeout(() => {
                loadPets();
                showMessage('Sample data added!', 'success');
            }, 1000);
        };
        petsHeader.appendChild(sampleButton);
    }
});

// Add CSS for new elements
const additionalCSS = `
.no-data, .error-message {
    text-align: center;
    padding: 40px;
    color: rgba(255, 255, 255, 0.8);
}

.no-data i, .error-message i {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #4ecdc4;
}

.pet-header, .appointment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.pet-species, .appointment-status {
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.pet-species {
    background: rgba(78, 205, 196, 0.2);
    color: #4ecdc4;
}

.appointment-status {
    background: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
}

.appointment-status.completed {
    background: rgba(76, 175, 80, 0.2);
    color: #4caf50;
}

.pet-details, .appointment-details {
    margin-bottom: 20px;
}

.pet-details p, .appointment-details p {
    margin-bottom: 8px;
}

.pet-actions {
    display: flex;
    gap: 10px;
}

.pet-actions .btn {
    padding: 8px 15px;
    font-size: 0.9rem;
}

.message {
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 3000;
    max-width: 300px;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
