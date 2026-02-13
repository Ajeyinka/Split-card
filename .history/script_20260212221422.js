document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const cardContainer = document.querySelector(".card-container");
  const stickyHeader = document.querySelector(".sticky-header h1");

  let isGapAnimationComplete = false;
  let isFlipAnimationComplete = false;

  function initAnimations() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kil());

    const mm = gsap.matchMedia();

    mm.add("(max-width:999px)", () => {
      document
        .querySelector(".card .card-container, .sticky-header h1")
        .forEach((el) => (el.style = ""));
      return {};
    });

    mm.add("(min-width:1000px)", () => {
      ScrollTrigger.create({
        trigger: ".sticky",
      });
    });
  }

  initAnimations();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initAnimations();
    }, 250);
  });
});
