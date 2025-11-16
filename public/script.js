const button=document.getElementById("menu-btn");
const links=document.getElementById("mobile-links");
const counters=document.querySelectorAll(".counter span")
const counterContainer=document.getElementById("counters");
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
          count+=50;
        }
        
        if(count>=target){
          c.innerText=target;
          clearInterval(interval);
        }else{
          c.innerText=count;
        }
      },20);
    });
    isActive=true;
  }
});