
var toggleMenu = document.querySelectorAll(".navbar .toggle-menu");
var navLinks = document.querySelector(".nav-links");
var links = document.querySelectorAll(".nav-links a");


function toggleLinks(ourArray, ourFubction) {
  ourArray.forEach((element) => {
    element.addEventListener("click", () => {
      ourFubction();
    });
  });
}

function toggleNavLinks() {
  navLinks.classList.toggle("active");
}

toggleLinks(toggleMenu, toggleNavLinks);
toggleLinks(links, toggleNavLinks);
