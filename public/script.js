const counters=document.querySelectorAll(".counter span")
const counterContainer=document.getElementById("counters");
const cardContainer=document.getElementById("cardsContainer");
const faqCards=document.querySelectorAll(".faq-card")
const showTlTextBox=document.getElementById("tl-show-text")


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
