const counters=document.querySelectorAll(".counter span")
const counterContainer=document.getElementById("counters");
const cardContainer=document.getElementById("cardsContainer");
const faqCards=document.querySelectorAll(".faq-card")



let isActive=false;
window.addEventListener("scroll",()=>{
  
  if(pageYOffset> counterContainer.offsetTop- counterContainer.offsetHeight - 200 && isActive===false){
    counters.forEach(c=>{
      const target=c.dataset.target;
      let count=0;
      const interval= setInterval(()=>{
        if(target<60){
          count+=1;
        }else if(target<1100){
          count+=15;
        }else{
          count+=40;
        }
        
        if(count>=target){
          c.innerText=target;
          clearInterval(interval);
        }else{
          c.innerText=count;
        }
      },30);
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