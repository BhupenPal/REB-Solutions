let hamburger = document.querySelector(".hamburger");
let hamMenu = document.querySelector(".ham-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("change");
    hamMenu.classList.toggle("hide");
})