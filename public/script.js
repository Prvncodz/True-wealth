const button=document.getElementById("menu-btn");
const links=document.getElementById("mobile-links");
const counters=document.querySelectorAll(".counter span")
const counterContainer=document.getElementById("counters");
const cardContainer=document.getElementById("cardsContainer");



button.addEventListener('click', () => {
  const isOpen=button.classList.toggle("open");
  button.innerHTML=isOpen? "✕" :"☰" ;
  links.style.display = links.style.display === "flex" ? "none" : "flex";
  
});
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