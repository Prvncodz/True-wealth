document.addEventListener('DOMContentLoaded', () => {
	
const counters=document.querySelectorAll(".counter span")
const counterContainer=document.getElementById("counters");
const cardContainer=document.getElementById("cardsContainer");
const faqCards=document.querySelectorAll(".faq-card")
const showMoreContent=document.querySelectorAll(".timeline-content")
const valueCards=document.querySelectorAll(".value-card")
let isActive=false;
window.addEventListener("scroll",()=>{
  
  if(pageYOffset> counterContainer.offsetTop- counterContainer.offsetHeight-200 && isActive===false){
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
  
});

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
  
  
});