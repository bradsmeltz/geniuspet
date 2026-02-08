/**
 * Profile Builder JavaScript
 * Handles form state, LocalStorage persistence, and navigation
 */

(function() {
  'use strict';

  // Profile data object
  const profileData = {
    petName: '',
    petPhoto: null,
    breed: '',
    age: ''
  };

  // DOM Elements
  const petNameInput = document.getElementById('pet-name');
  const breedInput = document.getElementById('breed');
  const ageInput = document.getElementById('age');
  const ctaButton = document.getElementById('activate-cta');
  const photoInput = document.getElementById('pet-photo');
  const photoPreview = document.getElementById('photo-preview');
  const photoPlaceholder = document.getElementById('photo-placeholder');

  /**
   * Load existing profile data from LocalStorage
   */
  function loadSavedData() {
    const saved = localStorage.getItem('pif_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        profileData.petName = parsed.petName || '';
        profileData.petPhoto = parsed.petPhoto || null;
        profileData.breed = parsed.breed || '';
        profileData.age = parsed.age || '';

        // Populate form fields
        if (petNameInput) petNameInput.value = profileData.petName;
        if (breedInput) breedInput.value = profileData.breed;
        if (ageInput) ageInput.value = profileData.age;

        // Show photo if exists
        if (profileData.petPhoto && photoPreview) {
          photoPreview.src = profileData.petPhoto;
          photoPreview.style.display = 'block';
          if (photoPlaceholder) photoPlaceholder.style.display = 'none';
        }

        // Update button state
        updateButtonState();
      } catch (e) {
        console.warn('Could not parse saved profile data');
      }
    }
  }

  /**
   * Save profile data to LocalStorage
   */
  function saveData() {
    localStorage.setItem('pif_profile', JSON.stringify(profileData));
  }

  /**
   * Update the CTA button enabled/disabled state
   */
  function updateButtonState() {
    if (!ctaButton) return;

    if (profileData.petName.trim().length > 0) {
      ctaButton.disabled = false;
      ctaButton.classList.remove('btn-disabled');
    } else {
      ctaButton.disabled = true;
      ctaButton.classList.add('btn-disabled');
    }
  }

  /**
   * Handle pet name input changes
   */
  function handlePetNameChange(e) {
    profileData.petName = e.target.value;
    updateButtonState();
    saveData();
  }

  /**
   * Handle optional field changes
   */
  function handleOptionalFieldChange(field, value) {
    profileData[field] = value;
    saveData();
  }

  /**
   * Handle photo upload
   */
  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = function(event) {
        if (photoPreview && photoPlaceholder) {
          photoPreview.src = event.target.result;
          photoPreview.style.display = 'block';
          photoPlaceholder.style.display = 'none';
          profileData.petPhoto = event.target.result;
          saveData();
        }
      };
      reader.onerror = function() {
        alert('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Handle CTA button click - navigate to checkout
   */
  function handleActivateClick() {
    if (profileData.petName.trim().length === 0) {
      return;
    }
    window.location.href = `checkout.html?name=${encodeURIComponent(profileData.petName.trim())}`;
  }

  /**
   * Initialize event listeners
   */
  function init() {
    // Load any saved data
    loadSavedData();

    // Pet name input - real-time updates
    if (petNameInput) {
      petNameInput.addEventListener('input', handlePetNameChange);
    }

    // Breed input - save on blur
    if (breedInput) {
      breedInput.addEventListener('blur', function(e) {
        handleOptionalFieldChange('breed', e.target.value);
      });
    }

    // Age input - save on blur
    if (ageInput) {
      ageInput.addEventListener('blur', function(e) {
        handleOptionalFieldChange('age', e.target.value);
      });
    }

    // Photo upload
    if (photoInput) {
      photoInput.addEventListener('change', handlePhotoUpload);
    }

    // CTA button click
    if (ctaButton) {
      ctaButton.addEventListener('click', handleActivateClick);
    }

    // Initial button state
    updateButtonState();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
