const toggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

toggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  toggle.innerHTML = mobileMenu.classList.contains("hidden") ? "☰" : "X";
});

function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};
locomotiveAnimation();

Shery.imageEffect(".images", {
  style: 5,
  config: {
    a: { value: 1.15, range: [0, 30] },
    b: { value: -0.98, range: [-1, 1] },
    zindex: { value: -9996999, range: [-9999999, 9999999] },
    aspect: { value: 2.131121642969984 },
    ignoreShapeAspect: { value: true },
    shapePosition: { value: { x: 0, y: 0 } },
    shapeScale: { value: { x: 0.5, y: 0.5 } },
    shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
    shapeRadius: { value: 0, range: [0, 2] },
    currentScroll: { value: 0 },
    scrollLerp: { value: 0.07 },
    gooey: { value: false },
    infiniteGooey: { value: true },
    growSize: { value: 4, range: [1, 15] },
    durationOut: { value: 1, range: [0.1, 5] },
    durationIn: { value: 1, range: [0.1, 5] },
    displaceAmount: { value: 0.5 },
    masker: { value: false },
    maskVal: { value: 1, range: [1, 5] },
    scrollType: { value: 0 },
    geoVertex: { range: [1, 64], value: 1 },
    noEffectGooey: { value: false },
    onMouse: { value: 1 },
    noise_speed: { value: 0.2, range: [0, 10] },
    metaball: { value: 0.2, range: [0, 2], _gsap: { id: 1 } },
    discard_threshold: { value: 0.48, range: [0, 1] },
    antialias_threshold: { value: 0.04, range: [0, 0.1] },
    noise_height: { value: 0.5, range: [0, 2] },
    noise_scale: { value: 10, range: [0, 100] },
  },
  gooey: true,
});

function cursorAnimation() {
  let videoContainer = document.querySelector(".video-container");
  let video = document.querySelector(".video-container video");
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to(".mousefollower", {
        opacity: 0,
      });
      gsap.to("#video-cursor", {
        left: dets.x - 500,
        y: dets.y - 200,
      });
    });
  });
  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    gsap.to("#video-cursor", {
      left: "-5%",
      top: "5%",
    });
  });

  let flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-pause-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-play-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 1,
      });
      flag = 0;
    }
  });
};
cursorAnimation();


function gsapAnimation(){
const tl = gsap.timeline();
tl.from("nav",{
  y: -100,
  duration: 0.4,
  delay: 0.2,
  ease: "back.out(1.5)"
})
tl.from("#title span h1", {
  y: 100,
  stagger: 0.1,
  duaration: 0.5,
  delay: 0.2,
});
tl.from("#title h2", {
  y: 100,
  duaration: 0.2,
});
tl.from("#hotspot", {
  left: -300,
  duration: 0.4,
  opacity: 0,
});
tl.from(
  "#subtitle-img",
  {
    // left: -80,
    opacity: 0,
    duaration: 0.3,
  },
  "-=1"
);
tl.from("#subtitle h3, #subtitle p", {
  y: 80,
  opacity: 0,
  duration: 0.3,
  stagger: 0.1,
});
gsap.from("#star", {
  rotateZ: 360,
  duration: 0.5,
  opacity: 0,
  delay: 1,
});
gsap.from(".right", {
  opacity: 0,
  y: 200,
  duration: 0.4,
  delay: 0.2,
});

gsap.from("#contact-title h2", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 85%",
    end: "top 40%",
    scroller: "main",
    // markers: true,
  },
  y: 40,
  opacity: 0,
  stagger: 0.2,
  ease: "back.out(1.7)",
});

gsap.from("#list div, .cta, contact-title p", {
  scrollTrigger: {
    trigger: "#contact-title",
    start: "top 85%",
    end: "top 40%",
    scroller: "main",
    // markers: true,
  },
  y: 40,
  opacity: 0,
  stagger: 0.2,
  ease: "back.out(1.7)",
});

gsap.from(".qeske-logo",{
  scrollTrigger: {
   trigger: "#contact",
    start: "top 85%",
    end: "top 40%",
    scroller: "main",
    // markers: true,
  },
  x: -200,
  opacity: 0,
  ease: "back.out(1.7)",
})

gsap.from("#services-title h2, .services .service", {
  scrollTrigger: {
    trigger: ".services",
    start: "top 85%",
    end: "top 40%",
    scroller: "main",
    // markers: true,
  },
  y: 40,
  opacity: 0,
  stagger: 0.2,
  ease: "back.out(1.7)",
});
};
gsapAnimation();