//fetching faq from JSON
const faqSection = document.querySelector(".faq__section");

const loadFaq = () => {

fetch("faq.JSON")
.then(response => {
    if(!response.ok){
        throw new Error("Network response was not okay");
    }
    return response.json();
})
.then(faqData => {
    const faqItems = document.querySelector('.faq__items');
    
    faqData.forEach(item => {
        // card 

        const faqCard = document.createElement("div");
        faqCard.classList.add("faq__card");

        // faq Pair - heading , btn, image
        const faqPair = document.createElement("div");
        faqPair.classList.add("faq__pair");

        const heading = document.createElement("h4");
        heading.textContent = item.question;

        const btn = document.createElement("button");
        btn.classList.add("faq-icon")

        const image = document.createElement("img");
        image.src = "assets/illustrations/faq_section/chevron_down.svg"

        // faq Answer
        const faqAnswer = document.createElement("div");
        faqAnswer.classList.add("faq__answer");

        const text = document.createElement("p");
        text.textContent = item.answer;

        //append 

        btn.append(image);
        faqPair.append(heading);
        faqPair.append(btn);

        faqAnswer.append(text);

        faqCard.append(faqPair);
        faqCard.append(faqAnswer);

        faqItems.append(faqCard);
})

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

})
.catch(error => {
    console.error("Error loading FAQ", error);
})

}

const faqObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            loadFaq();
            observer.disconnect
        }
    })
}, {})

faqObserver.observe(faqSection);