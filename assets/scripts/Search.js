var head = document.querySelector('.Head');
var bookmark = document.querySelectorAll('.bookmark');


if (window.innerWidth < 769) {
    head.classList.remove("head-scroll");
}

window.addEventListener('scroll', () => {
    var top = window.scrollY;
    if (top > 1) {
        head.classList.remove("head-scroll");
    } else if (window.innerWidth > 768) {
        head.classList.add("head-scroll");
    }
});

for (let i = 0; i < bookmark.length; i++) {
    bookmark[i].addEventListener("click", () => {
        bookmark[i].classList.toggle('bookmark-click');
    });
}


