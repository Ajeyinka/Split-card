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
        .querySelector(".card, .card-container, .sticky-header h1")
        .forEach((el) => (el.style = ""));
      return {};
    });

    mm.add("(min-width:1000px)", () => {
      ScrollTrigger.create({
        trigger: ".sticky",
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress >= 0.1 && progress <= 0.25) {
            const headerProgress = gsap.utils.mapRange(
              0.1,
              0.25,
              0,
              1,
              progress
            );
            const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
            const opacityValue = gsap.utils.mapRange(
              0,
              1,
              0,
              1,
              headerProgress
            );
            gsap.set(stickyHeader, {
              y: yValue,
              opacity: opacityValue,
            });
          } else if (progress < 0.1) {
            gsap.set(stickyHeader, {
              y: 40,
              opacity: 0,
            });
          } else if (progress > 0.25) {
            gsap.set(stickyHeader, {
              y: 0,
              opacity: 1,
            });
          }

          if (progress <= 0.25) {
            const widthPercentage = gsap.utils.mapRange(
              0,
              0.25,
              75,
              60,
              Progress
            );
            gsap.set(cardContainer, {
              width: `${widthPercentage}%`,
            });
          } else {
            gsap.set(cardContainer, {
              width: "60%",
            });
          }

          if (progress >= 0.35 && !isGapAnimationComplete) {
            gsap.to(cardContainer, {
              gap: "20px",
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to(["#card-1", "#card-2", "#card-3"], {
              borderRadius: "20px",
              duration: 0.5,
              ease: "power3.out",
            });

            isGapAnimationComplete = true;
          } else if (progress < 0.35 && isGapAnimationComplete) {
            gsap.to(cardContainer, {
              gap: "0px",
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to("#card-1", {
              gap: "0px",
              duration: 0.5,
              ease: "power3.out",
            });
          }
        },
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
