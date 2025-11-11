const body = document.querySelector('body');
const root = document.createElement('div');
root.id = 'testimonial-root';
body.appendChild(root);
let allData = [];
let currentIndex = 0;
let intervalId;
let lineBar;

async function fetchData(){
   const url = 'http://localhost:3000/testimonials';
   try{
      const res = await fetch(url);
      const data = await res.json();
      allData = data;
      renderCard(allData, currentIndex);
      startRotation();
   }
   catch(err){
      console.log(err.message)
   }
}
fetchData();

async function renderCard(data, currentIndex){
   const randomImage = Math.floor(Math.random() * 50);
   const currentTestimonial = await data[currentIndex];
   const root = document.getElementById('testimonial-root');
   root.innerHTML = '';
   const mainContainer = document.createElement('div');
   mainContainer.classList.add('main-container');
   mainContainer.innerHTML = 
   `
      <div class="line-bar"></div>
      <i class="fa-solid fa-quote-left"></i>
      <i class="fa-solid fa-quote-right"></i>
      <div class="testimonial-container">
         <p class="testimonial">${currentTestimonial.lorem}</p>
      </div>
      <div class="profile-container">
         <div class="img-container">
            <img src="${currentTestimonial.avatar}" alt="" onerror="this.onerror=null; this.src='https://randomuser.me/api/portraits/men/${randomImage}.jpg';">
         </div>
         <div class="details-container">
            <span class="name">${currentTestimonial.name}</span>
            <span class="profession">${currentTestimonial.designation}</span>
         </div>
      </div>
   `;
   root.appendChild(mainContainer);
   lineBar = document.querySelector('.line-bar');
   lineBarSlide();
}

function startRotation(){
   setInterval(() => {
      currentIndex = (currentIndex + 1) % allData.length;
      renderCard(allData, currentIndex);
      setTimeout(lineBarSlide, 500);
   }, 11000)
}

function lineBarSlide(){
   clearInterval(intervalId);
   lineBar.style.width = '0px';
   const totalWidth = 660;
   const stepsWidth = totalWidth / 10;
   intervalId = setInterval(() => {
      if(parseInt(lineBar.style.width) >= totalWidth){
         clearInterval(intervalId);
      }
      let currentWidth = parseInt(lineBar.style.width);
      currentWidth += stepsWidth;
      lineBar.style.width = currentWidth + 'px';
   }, 1000);
}




