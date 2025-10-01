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






