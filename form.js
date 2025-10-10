class CustomDropdown {
    constructor(element) {
        this.dropdown = element;
        this.toggle = element.querySelector('.dropdown-toggle');
        this.menu = element.querySelector('.dropdown-menu');
        this.items = element.querySelectorAll('.dropdown-item');
        this.hiddenInput = element.querySelector('input[type="hidden"]');
        this.text = element.querySelector('.dropdown-text');
        this.originalParent = this.menu.parentElement;
        this.init();
    }

    init() {
        // Toggle dropdown

        this.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // console.log('Toggle clicked'); // Debug
            this.toggleMenu();
        });

        // Select item
        this.items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectItem(item);
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.dropdown.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        const isActive = this.menu.classList.contains('active');
        // console.log('Menu active state:', isActive); // Debug

        if (isActive) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {

        const rect = this.dropdown.getBoundingClientRect();

        // move menu to body to escape stacking context
        document.body.appendChild(this.menu);
        this.menu.style.position = 'absolute';
        this.menu.style.top = `${rect.bottom + window.scrollY}px`;
        this.menu.style.left = `${rect.left + window.scrollX}px`;
        this.menu.style.width = `${rect.width}px`;
        this.menu.style.zIndex = 99999;

        this.menu.classList.add('active');
        this.toggle.classList.add('active');
    }

    closeMenu() {
        // console.log('Closing menu'); // Debug
        this.menu.classList.remove('active');
        this.toggle.classList.remove('active');

        if (this.originalParent !== this.menu.parentElement) {
            this.originalParent.appendChild(this.menu);
        }
    }

    selectItem(item) {
        const value = item.dataset.value;
        const text = item.textContent;

        // Update display
        this.text.textContent = text;
        this.toggle.classList.add('has-value');

        // Update hidden input
        if (this.hiddenInput) {
            this.hiddenInput.value = value;
            this.hiddenInput.dispatchEvent(new Event('change'));
        }

        // Update selected state
        this.items.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');

        // Close menu
        this.closeMenu();
    }
}

// Initialize all custom dropdowns
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        new CustomDropdown(dropdown);
    });
});


// placeholder visiblity

const placeholderDiv = document.querySelectorAll('.placeholder-div');


placeholderDiv.forEach(div => {
    const input = div.querySelector('input')
    const placeholder = div.querySelector('.placeholder');

    if (!input || !placeholder) return;

    const togglePlaceholder = () => {
        if (input.value.trim() !== '') {
            placeholder.classList.add('hidden');
        } else {
            placeholder.classList.remove('hidden');
        }
    };

    // Check initial state (for pre-filled inputs)
    togglePlaceholder();

    // Listen to input changes
    input.addEventListener('input', togglePlaceholder);

})


// form validation

// Layer 1 - Immediate Error Response


const validators = {
    name: (value) => {
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be atleast 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Name can only contain letters and spaces";
        return null;
    },

    phone: (value) => {
        if (!value.trim()) return "Phone number is required";
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length < 10) return "Phone number must be at least 10 digits";
        if (cleaned.length > 15) return "Phone number is too long";
        return null;
    },

    email: (value) => {
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return null;
    },

    linkedin: (value) => {
        if (!value.trim()) return null; // Optional field
        const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
        if (!linkedinRegex.test(value)) return "Please enter a valid LinkedIn profile URL";
        return null;
    },

    skills: (value) => {
        if (!value || value.trim() === '') return "Please select a skill";
        return null;
    },

    experience: (value) => {
        if (!value || value.trim() === '') return "Please select your experience level";
        return null;
    }
}

function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const error = document.getElementById(`${fieldName}Error`);
    const success = document.getElementById(`${fieldName}Success`);

    const errorMessage = validators[fieldName](field.value);

    if (errorMessage) {
        field.classList.add('error-response');
        field.classList.remove('success-response');
        error.textContent = errorMessage;
        error.classList.add('show');
        success.classList.remove('show');
        return false;
    } else if (field.value.trim() !== '') {
        field.classList.remove('error-response');
        field.classList.add('success-response');
        error.classList.remove('show');
        return true;
    } else {
        field.classList.remove('error-response', 'success-response');
        error.classList.remove('show');
        success.classList.remove('show');
        return false;
    }
}

['name', 'phone', 'email', 'linkedin'].forEach(fieldName => {
    const field = document.getElementById(fieldName);

    field.addEventListener('blur', () => validateField(fieldName));
    field.addEventListener('input', () => {
        if (field.classList.contains('error-response')) {
            validateField(fieldName);
        }
    });
});

const dropdowns = document.querySelectorAll('.custom-dropdown');

dropdowns.forEach(item => {
  const toggle = item.querySelector('.dropdown-toggle');
  const menu = item.querySelector('.dropdown-menu');
  const field = item.querySelector('input');
  const menuItems = item.querySelectorAll('.dropdown-item');

  toggle.addEventListener('click', () => {
    // Check if dropdown is CURRENTLY OPEN (before toggle happens)
    const wasOpen = menu.classList.contains('active');
    
    // If it WAS open and now closing, validate

    if(wasOpen && !field.value) {
      validateField(field.id);
    }

  });

    document.addEventListener('click', (e) => {
    // If click is outside this dropdown and menu is open
    if (!item.contains(e.target) && menu.classList.contains('active')) {
      menu.classList.remove('active');
      
      // Validate when closing
      if (!field.value) {
        validateField(field.id);
      }
    }
  });

  menuItems.forEach(menu => {
    menu.addEventListener('click', () => {
        const value = menu.getAttribute('data-value');
        field.value = value;

        validateField(field.id);
    })
  })

});






