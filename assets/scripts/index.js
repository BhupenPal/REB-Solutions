let hamburger = document.querySelector(".hamburger");
let hamMenu = document.querySelector(".ham-menu");
let button = document.querySelector('.searh-button')




hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("change");
    hamMenu.classList.toggle("hide");
})

