window.addEventListener("DOMContentLoaded", () => {

const counters=document.querySelectorAll(".counter span")
const counterContainer=document.getElementById("counter-container");
const valueCards=document.querySelectorAll(".value-card")
const Form=document.getElementById("mform");

let isActive=false;



window.addEventListener("scroll",()=>{
 if(counterContainer){ if(scrollY> counterContainer.offsetTop-
 counterContainer.offsetHeight-200 && isActive===false){
    counters.forEach(c=>{
      const target=c.dataset.target;
      let count=0;
      if(target<20){
          
          const interval= setInterval(()=>{
         count+=1;
        
        if(count>=target){
          c.innerText=target;
          clearInterval(interval);
        }else{
          c.innerText=count;
        }
      },300);
        }
      else if(target<60){
          
          const interval= setInterval(()=>{
         count+=1;
        
        if(count>=target){
          c.innerText=target;
          clearInterval(interval);
        }else{
          c.innerText=count;
        }
      },50);
        }else {
      const interval= setInterval(()=>{
        if(target<1100){
          count+=15;
        }else{
          count+=50;
        }
        
        if(count>=target){
          c.innerText=target;
          clearInterval(interval);
        }else{
          c.innerText=count;
        }
      },40);
        }
    });
    isActive=true;
  }
 }
});

const observer=new IntersectionObserver((entries)=>{
  	 entries.forEach(entry=>{
  	 	if(entry.isIntersecting){
  	 		entry.target.style.transform="translateY(0)";
  	 		entry.target.style.opacity="1"
  	 	}
  	 });
  },{threshold:0.1});
  
  valueCards.forEach((card,index)=>{
  	card.setAttribute("style", 
  	`opacity:0;  
  	transform:translateY(20px);
  	animation:translate 0.4s ease-in;
  	animation-delay:${index*0.1}s;`
  	);
  	observer.observe(card);
  })
  
  
 if (Form) {
    Form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Show loading popup
        showPopup('loading');
        
        const formData = new FormData(Form);
        const jsonData = Object.fromEntries(formData);
        
        try {
            const res = await fetch("https://wms-um5i.onrender.com/form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonData)
            });
            
            const output = await res.json();
            
            if (res.ok) {
                // Success
                showPopup('success');
                Form.reset(); // Clear the form
            } else {
                // Error from server
                showPopup('error', output.message || 'Something went wrong');
            }
            
        } catch (error) {
            // Network error
            showPopup('error', 'Network error. Please check your connection.');
        }
    });
   
}

function showPopup(type, message = '') {
    const overlay = document.getElementById('contactPopup');
    const content = document.getElementById('contactPopupContent');
    
    if (type === 'loading') {
        content.innerHTML = `
            <div class="tw-contact-popup-spinner"></div>
            <div class="tw-contact-popup-loading-text">Submitting...</div>
        `;
        overlay.classList.add('active');
    } 
    else if (type === 'success') {
        content.innerHTML = `
            <div class="tw-contact-popup-icon success">✓</div>
            <div class="tw-contact-popup-title success">Details Submitted!</div>
            <div class="tw-contact-popup-message">
                Thank you for contacting us. We'll get back to you soon.
            </div>
        `;
        
        // Auto close after 3 seconds
        setTimeout(() => {
            closePopup();
        }, 3000);
    } 
    else if (type === 'error') {
        content.innerHTML = `
            <div class="tw-contact-popup-icon error">✕</div>
            <div class="tw-contact-popup-title error">Error While Submitting</div>
            <div class="tw-contact-popup-message">
                ${message || 'Please try again later.'}
            </div>
        `;
        
        // Auto close after 4 seconds
        setTimeout(() => {
            closePopup();
        }, 4000);
    }
    
    overlay.classList.add('active');
}

function closePopup() {
    const overlay = document.getElementById('contactPopup');
    overlay.classList.remove('active');
}

// Close popup when clicking outside
document.getElementById('contactPopup')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});
 let quickContactInterval;
let popupCount = 0;
const maxPopups = 4; // Maximum times to show popup per session

window.addEventListener('load', function() {
    // Check if user already submitted
    const hasSubmitted = sessionStorage.getItem('quickContactSubmitted');
    
    if (!hasSubmitted) {
        // Start showing popup every 10 seconds
        quickContactInterval = setInterval(function() {
            // Don't show if already at max count
            if (popupCount < maxPopups) {
                showQuickContactPopup();
                popupCount++;
            } else {
                // Stop showing after max attempts
                clearInterval(quickContactInterval);
            }
        }, 9000); // 10 seconds
    }
});



// Handle form submission
const quickForm = document.getElementById('quickContactForm');
if (quickForm) {
    quickForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = quickForm.querySelector('.tw-quick-contact-submit');
        const originalText = submitBtn.textContent;
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        const formData = new FormData(quickForm);
        const jsonData = Object.fromEntries(formData);
        
        try {
            const res = await fetch("https://wms-um5i.onrender.com/form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonData)
            });
            
            const output = await res.json();
            
            if (res.ok) {
                // Success
                submitBtn.textContent = '✓ Submitted!';
                submitBtn.style.background = '#10b981';
                
                // Mark as submitted in session storage
                sessionStorage.setItem('quickContactSubmitted', 'true');
                
                // Stop the interval
                clearInterval(quickContactInterval);
                
                // Close popup after 2 seconds
                setTimeout(() => {
                    closeQuickContactPopup();
                    quickForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 2000);
                
            } else {
                // Error
                submitBtn.textContent = '✕ Error - Try Again';
                submitBtn.style.background = '#ef4444';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 2000);
            }
            
        } catch (error) {
            // Network error
            submitBtn.textContent = '✕ Network Error';
            submitBtn.style.background = '#ef4444';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 2000);
        }
    });
}

// Close popup when clicking outside
document.getElementById('quickContactPopup')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeQuickContactPopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeQuickContactPopup();
    }
});
});

	const cardContainer=document.getElementById("cardsContainer");
const faqCards=document.querySelectorAll(".faq-card")
const showMoreContent=document.querySelectorAll(".timeline-content")
function scrollCards(dir){
  const scrollAmount=400;
  if(dir=="left"){
    cardContainer.scrollBy({
      left:-scrollAmount,
      behaviour:"smooth",
    });
  }else{
   cardContainer.scrollBy({
      left:scrollAmount,
      behaviour:"smooth",
    });
  }
}

function toggleFAQ(card){
  faqCards.forEach((c)=>{
    if(c!==card){
      c.classList.remove("active");
    }
  });
  card.classList.toggle("active");
}


function toggleTlText(cont){
	showMoreContent.forEach(c=>{
		if(c!==cont){
			c.classList.remove("active")
		}
	})
	  	cont.classList.toggle("active")
}
function showQuickContactPopup() {
    const popup = document.getElementById('quickContactPopup');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickContactPopup() {
    const popup = document.getElementById('quickContactPopup');
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}