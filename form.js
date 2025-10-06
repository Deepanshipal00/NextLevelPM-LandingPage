class CustomDropdown {
    constructor(element) {
        this.dropdown = element;
        this.toggle = element.querySelector('.dropdown-toggle');
        this.menu = element.querySelector('.dropdown-menu');
        this.items = element.querySelectorAll('.dropdown-item');
        this.hiddenInput = element.querySelector('input[type="hidden"]');
        this.text = element.querySelector('.dropdown-text');
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
        // console.log('Opening menu'); // Debug
        this.menu.classList.add('active');
        this.toggle.classList.add('active');
    }
    
    closeMenu() {
        // console.log('Closing menu'); // Debug
        this.menu.classList.remove('active');
        this.toggle.classList.remove('active');
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

    if(!input || !placeholder) return;

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


