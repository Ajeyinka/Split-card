document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
});

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);
