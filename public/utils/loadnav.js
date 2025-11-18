fetch("./utils/nav.html")
.then(response=>response.text())
.then(data=>{
  document.getElementById("nav-placeholder").innerHTML=data;
  initializeNav();
})
.catch(error=>{
  console.log(error.message);
});


function initializeNav(){
  const button=document.getElementById("menu-btn");
  const links=document.getElementById("mobile-links");
  
  
  button.addEventListener('click', () => {
  const isOpen=button.classList.toggle("open");
  button.innerHTML=isOpen? "✕" :"☰" ;
  links.style.display = links.style.display === "flex" ? "none" : "flex";
});

}