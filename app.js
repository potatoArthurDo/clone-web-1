// Initialize Lenis with slower scrolling
const lenis = new Lenis({
  smooth: true, // Enable smooth scrolling
  lerp: 0.05, // Smoothness (slower)
  speed: 0.1, // Slow scrolling (default is 1)
});

// Animation function to request animation frame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
  hamburger.classList.toggle("toggle");
});

// Start the animation frame loop
requestAnimationFrame(raf);

// Example of your existing ScrollTrigger/GSAP logic
gsap.registerPlugin(ScrollTrigger);

const splitTypes = document.querySelectorAll(".reveal-type");

splitTypes.forEach((char) => {
  const bg = char.dataset.bgColor;
  const fg = char.dataset.fgColor;

  const text = new SplitType(char, { types: "chars" });

  gsap.fromTo(
    text.chars,
    {
      color: bg,
    },
    {
      color: fg,
      duration: 0.3,
      stagger: 0.02,
      scrollTrigger: {
        trigger: char,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
        markers: false,
        toggleActions: "play play reverse reverse",
      },
    }
  );
});

// Parallax Backgrounds and Tabs (your existing logic)
let listBg = document.querySelectorAll(".bg");
let listTab = document.querySelectorAll(".tab");
let titleBanner = document.querySelector(".banner h1");

window.addEventListener("scroll", () => {
  let top = window.scrollY;

  listBg.forEach((bg, index) => {
    if (index != 0 && index != 8) {
      bg.style.transform = `translateY(${(top * index) / 2}px)`;
    } else if (index == 0) {
      bg.style.transform = `translateY(${top / 3}px)`;
    }
  });

  titleBanner.style.transform = `translateY(${(top * 4) / 2}px)`;

  listTab.forEach((tab) => {
    if (tab.offsetTop - top < 550) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
});

window.addEventListener("load", () => {
    const images = document.querySelectorAll(".image-container img");
  // Select the middle image
  const middleImage = document.querySelectorAll(".image-container img")[1]; // Assuming it's the 2nd image

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".image-wrapper",
        start: "top top", // Start when the wrapper reaches the top of the viewport
        end: "bottom+=300% top", // Extend the scroll duration by 200% (stay in section longer)
        scrub: true,
        pin: true, // Pin the image-wrapper in place as the scroll progresses
        markers: true,
      },
    })
    .to(middleImage, {
      scale: 7, // Zoom to fill the viewport (adjust scale as needed)
      transformOrigin: "center center", // Ensure zooming happens from the center
      ease: "power1.inOut",
      // position: "fixed", // Make the image stay fixed on the screen
      // left: "50%", // Position it horizontally in the middle of the viewport
      // top: "50%", // Position it vertically in the middle of the viewport
      // x: "-50%", // Center it by shifting left by half of its width
      // y: "-50%", // Center it by shifting up by half of its height
      // Ensure smooth centering and scaling
      willChange: "transform",
    })
    // Fade out all other images except the middle one
    // .to(images, {
    //     x: (index) => {
    //       // Calculate the distance to move based on the position relative to the middle image
    //       const distance = Math.abs(index - 1); // Get the distance of the image from the middle image
    //       return distance * 200; // Move away based on distance (adjust value to your preference)
    //     },
    //     opacity: (index) => {
    //       // Calculate opacity based on distance from middle image
    //       const distance = Math.abs(index - 1);
    //       return 1 - (distance * 0.3); // Reduce opacity as they move further from the middle
    //     },
    //     duration: 0.5, // Duration for the fade and move effect
    //     ease: "power1.inOut"
    //   });


  gsap.to(".next-section", {
    scrollTrigger: {
      trigger: ".next-section",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
    opacity: 1,
  });
});

gsap.to("#footer", {
  opacity: 1,
  y: 0,
  duration: 1.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#footer",
    start: "top 90%",
    toggleActions: "play none none reverse"
  }
});
