// Faq

document.querySelectorAll(".faq__card").forEach((item) => {
    item.addEventListener("click", function(e){
        const faqAnswer = item.querySelector(".faq__answer");
        const faqIcon = item.querySelector(".faq-icon");

        const activeFaqAnswer = document.querySelector(".faq__answer.active");
        const rotateFaqIcon = document.querySelector(".faq-icon.rotate");

        if(activeFaqAnswer === faqAnswer){
            activeFaqAnswer.classList.remove("active");
            rotateFaqIcon.classList.remove("rotate");
            return;
        }

        if(activeFaqAnswer && rotateFaqIcon){
            activeFaqAnswer.classList.remove("active");
            rotateFaqIcon.classList.remove("rotate");
        }

        faqAnswer.classList.toggle("active");
        faqIcon.classList.toggle("rotate")
    })
})

// Navbar

// const header = document.querySelector(".navbar");

// window.addEventListener("scroll", function(){
//     if(window.scrollY > 1){
//         header.classList.add("sticky");
//     }else{
//         header.classList.remove("sticky");
//     }
// })

// Hamburger Menu


const hamburger = document.querySelector(".navbar__hamburger");
const mobileNavbar = document.querySelector(".navbar__mobile");
const listItems = mobileNavbar.querySelectorAll("ul li");
const overlay = document.querySelector(".navbar__overlay");
const body = document.body;

hamburger.addEventListener("click", function(e){
    mobileNavbar.classList.toggle("appear");
    overlay.classList.toggle("hidden");
    body.classList.toggle("navbar__modal-open");
})

listItems.forEach(item =>{
    item.addEventListener("click", function(e){
        body.classList.remove("navbar__modal-open");
        overlay.classList.add("hidden");
        mobileNavbar.classList.remove("appear");
    }) })



// Animation, intersection observer effects


// Hero section

const illustrations = document.querySelectorAll(".hero__illustration");
const heading = document.querySelector(".hero__content");

const observer = new IntersectionObserver((entries)=> {
    entries.forEach(entry => {
            entry.target.classList.toggle("visible")
    })
}, {
    threshold : 0.2,
})

illustrations.forEach(e => {
    observer.observe(e);
})

observer.observe(heading)



// Achievements items

const achievementStat = document.querySelectorAll('.achievement__item');

const statsObserver = new IntersectionObserver((entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible')
        }
    })
}),{
    threshold: 0.3
})

achievementStat.forEach(stat=> {
    statsObserver.observe(stat);
})

// tech firms

const companyLogos = document.querySelectorAll('.company__logo');
const companiesSection = document.querySelector('.tech-firms__logo');

const companiesObersver = new IntersectionObserver((entries) =>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            companyLogos.forEach(logo => {
                logo.classList.add('visible');
            });

            companiesObersver.unobserve(entry.target);
        }
    })
},{
    threshold : 0.2
})

companiesObersver.observe(companiesSection);


// Cohort Modules

const moduleCards = document.querySelectorAll('.cohort-modules__stack-item');
const moduleSection = document.querySelectorAll('.cohort-modules__stack');

const modulesObserver = new IntersectionObserver((entries)=> {
    entries.forEach(entry =>{
       if(entry.isIntersecting){
        moduleCards.forEach(card => {
            card.classList.add("visible")
        })
        modulesObserver.unobserve(entry.target)
    }
    });

},{
    threshold: 0.1
})

moduleSection.forEach(section => {
    modulesObserver.observe(section);
})


// enrollment-offer

const offerSection = document.querySelector('.enrollment-offer-section');
const benefits = document.querySelectorAll('.benefit__card');

const benefitsObserver = new IntersectionObserver((entries) =>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            setTimeout(()=>{
        benefits.forEach(benefit =>{
            benefit.classList.add('visible');
        })
    }, 100)
    benefitsObserver.unobserve(entry.target);
        }
    })

},{
    threshold: 0.2
})

benefitsObserver.observe(offerSection);

// mentor Cards

const mentorCards = document.querySelectorAll('.mentors__profile');
const mentorSection = document.querySelector('.mentors-list');

const mentorsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            mentorCards.forEach(card => {
                card.classList.add('visible')
            });
            mentorsObserver.unobserve(entry.target);
        }
    })
},{
    threshold:0.1,
    rootMargin: '0px 0px -100px 0px'
})

mentorsObserver.observe(mentorSection);

// Learning cards

const learningCards = document.querySelectorAll('.learning__card');
const learningOutcomes = document.querySelector('.learning__weekly-learnings')

const learningCardObserver = new IntersectionObserver((entries) =>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            learningCards.forEach(card => {
                card.classList.add('visible');
            })

            learningCardObserver.unobserve(entry.target);
        }
    })
} ,{
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
})


learningCardObserver.observe(learningOutcomes);

// gradient

document.querySelectorAll('.gradient-container').forEach(container => {
    const originalBackground = window.getComputedStyle(container).background;
    
    // Add transition for smooth effect
    container.style.transition = 'background 0.3s ease';
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        container.style.background = `
            radial-gradient(circle at ${x}% ${y}%, 
            rgba(255, 150, 50, 0.4) 0%, 
            rgba(255, 131, 74, 0.2) 30%,
            transparent 60%),
            ${originalBackground}
        `;
    });
    
    container.addEventListener('mouseleave', () => {
        container.style.background = originalBackground;
    });
});

