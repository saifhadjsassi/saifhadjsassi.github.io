document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ----------------- UTILITIES ----------------- */

  function safeQuery(selector) {
    return document.querySelector(selector);
  }

  function safeQueryAll(selector) {
    return gsap.utils.toArray(selector);
  }

  function hasElement(selector) {
    return !!document.querySelector(selector);
  }

  /* ----------------- ACTIVE NAV LINK ----------------- */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  safeQueryAll(".nav-link[data-page]").forEach((link) => {
    const page = link.getAttribute("data-page");
    if (page === currentPage) {
      link.classList.add("active");
    }
  });

  /* ----------------- GENERIC REVEALS ----------------- */

  safeQueryAll(".reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 28, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  /* ----------------- BASIC ENTRANCE for hero cards ----------------- */

  safeQueryAll(".hero-right, .page-hero-right").forEach(function (right) {
    gsap.from(right, {
      y: 40,
      autoAlpha: 0,
      duration: 1.1,
      ease: "power3.out"
    });
  });

  safeQueryAll(".hero-main-media, .page-hero-media").forEach(function (media) {
    gsap.from(media, {
      scale: 1.12,
      y: 20,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power3.out"
    });
  });

  safeQueryAll(".page-hero-collage").forEach(function (collage) {
    gsap.from(collage, {
      autoAlpha: 0,
      scale: 0.85,
      y: 40,
      duration: 1.1,
      ease: "power3.out",
      delay: 0.2
    });
  });

  /* Floating background words in heroes */
  if (hasElement(".hero-bg-words span") || hasElement(".page-hero-words span")) {
    gsap.to(".hero-bg-words span, .page-hero-words span", {
      xPercent: (i) => (i % 2 === 0 ? -12 : 10),
      yPercent: (i) => (i % 2 === 0 ? 6 : -8),
      rotation: (i) => (i % 2 === 0 ? -6 : 5),
      ease: "sine.inOut",
      duration: 8,
      repeat: -1,
      yoyo: true
    });
  }

  /* ================================================================
     DESKTOP: 3 pinned hero options on home page
  ================================================================ */
  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      if (hasElement("#heroOption1")) {
        const heroTL1 = gsap.timeline({
          scrollTrigger: {
            trigger: "#heroOption1",
            start: "top top",
            end: "+=220%",
            scrub: true,
            pin: true
          }
        });

        heroTL1
          .to(".hero1-main-media", {
            scale: 0.86,
            yPercent: -8,
            duration: 1.2,
            ease: "none"
          }, 0)
          .to(".hero1-right", {
            yPercent: -30,
            autoAlpha: 0,
            duration: 1.0,
            ease: "none"
          }, 0)
          .to(".hero1-bg-words span:nth-child(1)", {
            xPercent: -40,
            rotation: -12,
            ease: "none"
          }, 0)
          .to(".hero1-bg-words span:nth-child(2)", {
            xPercent: 25,
            rotation: 10,
            ease: "none"
          }, 0)
          .to(".hero1-bg-words span:nth-child(3)", {
            xPercent: -30,
            rotation: -8,
            ease: "none"
          }, 0)
          .to(".hero1-grid-frame", {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out"
          }, 0.35)
          .from(".hero1-grid-frame img", {
            y: 60,
            autoAlpha: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: "power2.out"
          }, 0.45)
          .to(".hero1-bg-words span", {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power1.out"
          }, 1.4);
      }

      if (hasElement("#heroOption2")) {
        const heroTL2 = gsap.timeline({
          scrollTrigger: {
            trigger: "#heroOption2",
            start: "top top",
            end: "+=220%",
            scrub: true,
            pin: true
          }
        });

        heroTL2
          .to(".hero2-main-media", {
            scale: 0.9,
            xPercent: -10,
            yPercent: 12,
            rotation: -6,
            ease: "none"
          }, 0)
          .to(".hero2-right", {
            yPercent: -20,
            xPercent: 10,
            autoAlpha: 0,
            ease: "none"
          }, 0.2)
          .to(".hero2-bg-words span:nth-child(1)", {
            xPercent: -30,
            yPercent: -10,
            rotation: -14,
            ease: "none"
          }, 0)
          .to(".hero2-bg-words span:nth-child(2)", {
            xPercent: 35,
            rotation: 10,
            ease: "none"
          }, 0)
          .to(".hero2-bg-words span:nth-child(3)", {
            xPercent: -20,
            rotation: -8,
            ease: "none"
          }, 0)
          .to(".hero2-grid-frame", {
            autoAlpha: 1,
            scale: 1.05,
            y: -10,
            duration: 1.2,
            ease: "power2.out"
          }, 0.4)
          .from(".hero2-grid-frame img", {
            y: 80,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power2.out"
          }, 0.45);
      }

      if (hasElement("#heroOption3")) {
        const heroTL3 = gsap.timeline({
          scrollTrigger: {
            trigger: "#heroOption3",
            start: "top top",
            end: "+=220%",
            scrub: true,
            pin: true
          }
        });

        heroTL3
          .to(".hero3-main-media", {
            scale: 0.84,
            yPercent: -6,
            xPercent: 4,
            rotation: 4,
            ease: "none"
          }, 0)
          .to(".hero3-right", {
            yPercent: -25,
            autoAlpha: 0,
            ease: "none"
          }, 0.1)
          .to(".hero3-bg-words span:nth-child(1)", {
            xPercent: -25,
            rotation: -10,
            ease: "none"
          }, 0)
          .to(".hero3-bg-words span:nth-child(2)", {
            xPercent: 30,
            rotation: 12,
            ease: "none"
          }, 0)
          .to(".hero3-bg-words span:nth-child(3)", {
            xPercent: -15,
            rotation: -8,
            ease: "none"
          }, 0)
          .to(".hero3-grid-frame", {
            autoAlpha: 1,
            scale: 1.08,
            y: -6,
            duration: 1.2,
            ease: "power2.out"
          }, 0.35)
          .from(".hero3-grid-frame img", {
            y: 70,
            autoAlpha: 0,
            stagger: 0.13,
            duration: 0.9,
            ease: "power2.out"
          }, 0.45)
          .to(".hero3-bg-words span", {
            autoAlpha: 0,
            duration: 0.9,
            ease: "power1.out"
          }, 1.5);
      }

      /* =====================================================
         PROJECTS PINNED BIG SLIDER
      ===================================================== */
      const slides = safeQueryAll(".project-slide");
      if (slides.length && hasElement(".projects-pin")) {
        const projTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".projects-pin",
            start: "top top",
            end: "+=" + (slides.length * 180) + "%",
            scrub: true,
            pin: true
          }
        });

        slides.forEach((slide, i) => {
          const enterAt = i * 1.0;
          const leaveAt = enterAt + 0.75;

          projTL.to(slide, {
            autoAlpha: 1,
            scale: 1.08,
            zIndex: 10 + i,
            duration: 0.8,
            ease: "power2.out"
          }, enterAt);

          if (i < slides.length - 1) {
            projTL.to(slide, {
              autoAlpha: 0,
              scale: 0.9,
              duration: 0.8,
              ease: "power2.in"
            }, leaveAt);
          }
        });
      }
    },

    /* ----------------------------------------------------
       MOBILE: no pin, softer parallax
    ---------------------------------------------------- */
    "(max-width: 767px)": function () {
      ["#heroOption1", "#heroOption2", "#heroOption3"].forEach((id, idx) => {
        if (!hasElement(id)) return;

        const mainSel = ".hero" + (idx + 1) + "-main-media";
        const wordsSel = ".hero" + (idx + 1) + "-bg-words span";

        if (hasElement(mainSel)) {
          gsap.to(mainSel, {
            yPercent: -10,
            scrollTrigger: {
              trigger: id,
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        }

        if (hasElement(wordsSel)) {
          gsap.to(wordsSel, {
            xPercent: (i) => (i % 2 === 0 ? -6 : 6),
            scrollTrigger: {
              trigger: id,
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        }

        const frameSel = ".hero" + (idx + 1) + "-grid-frame";
        if (hasElement(frameSel)) {
          gsap.from(frameSel, {
            autoAlpha: 0,
            scale: 0.9,
            y: 40,
            scrollTrigger: {
              trigger: id,
              start: "top 70%",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

      if (hasElement(".projects")) {
        gsap.from(".project-slide", {
          y: 40,
          autoAlpha: 0,
          scale: 0.95,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects",
            start: "top 80%"
          }
        });
      }
    }
  });

  /* =====================================================
     MAZE JOURNEY – PINNED CAMERA PATH
  ===================================================== */
  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      if (!hasElement("#journeyWrapper")) return;

      const scenes = safeQueryAll(".scene");
      const inner = safeQuery(".scenes-inner");

      if (!inner || !scenes.length) return;

      const coords = [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 5, y: 4 },
        { x: 5, y: 5 },
        { x: 6, y: 5 }
      ];

      scenes.forEach((scene, i) => {
        const c = coords[i];
        if (!c) return;
        gsap.set(scene, {
          xPercent: c.x * 100,
          yPercent: c.y * 100,
          position: "absolute"
        });
      });

      const journeyTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#journeyWrapper",
          start: "top top",
          end: () => "+=" + window.innerHeight * (coords.length + 2),
          scrub: true,
          pin: true
        }
      });

      gsap.set(inner, {
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        rotation: 0,
        transformOrigin: "50% 50%"
      });

      const maxZoom = 1.18;
      const zoomStep = (maxZoom - 1) / (coords.length - 1);

      coords.forEach((c, i) => {
        if (i === 0 || !c) return;

        const tilt = (i % 2 === 0 ? -2 : 2);
        const zoom = 1 + zoomStep * i;

        journeyTl.to(inner, {
          xPercent: -c.x * 100,
          yPercent: -c.y * 100,
          scale: zoom,
          rotation: tilt,
          duration: 1,
          ease: "power2.inOut"
        });
      });

      scenes.forEach((scene) => {
        if (
          scene.classList.contains("scene-hero") ||
          scene.classList.contains("scene-hero-words")
        ) {
          gsap.set(scene, { autoAlpha: 1, scale: 1 });
          return;
        }

        gsap.fromTo(
          scene,
          { scale: 0.96, autoAlpha: 0.6 },
          {
            scale: 1,
            autoAlpha: 1,
            scrollTrigger: {
              containerAnimation: journeyTl,
              trigger: scene,
              start: "center center",
              end: "center center",
              scrub: true
            }
          }
        );
      });

      safeQueryAll(".hero-parallax").forEach((el) => {
        gsap.to(el, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            containerAnimation: journeyTl,
            trigger: ".scene-hero",
            start: "center center",
            end: "bottom top",
            scrub: true
          }
        });
      });

      if (hasElement(".scene-hero-words")) {
        const heroWordsTl = gsap.timeline({
          scrollTrigger: {
            containerAnimation: journeyTl,
            trigger: ".scene-hero-words",
            start: "top center",
            end: "bottom top",
            scrub: true
          }
        });

        heroWordsTl
          .fromTo(".scene-hero-words .hero-big-word", {
            scale: 1.6,
            yPercent: 30,
            letterSpacing: "0.35em"
          }, {
            scale: 1,
            yPercent: 0,
            letterSpacing: "0.18em",
            ease: "power2.out"
          })
          .fromTo(".scene-hero-words .hero-pill", {
            y: 60,
            opacity: 0
          }, {
            y: 0,
            opacity: 1
          }, "-=0.2");
      }

      const wordsCollageScene = safeQuery(".scene-words-collage");
      if (wordsCollageScene) {
        const floatingWords = wordsCollageScene.querySelector(".floating-words");
        const collage = wordsCollageScene.querySelector(".collage");

        if (floatingWords) {
          gsap.to(floatingWords, {
            xPercent: -20,
            yPercent: -10,
            rotation: -4,
            ease: "none",
            scrollTrigger: {
              containerAnimation: journeyTl,
              trigger: wordsCollageScene,
              start: "top bottom",
              end: "bottom -200%",
              scrub: true
            }
          });
        }

        if (collage) {
          gsap.fromTo(collage,
            { scale: 1.1 },
            {
              scale: 0.95,
              scrollTrigger: {
                containerAnimation: journeyTl,
                trigger: wordsCollageScene,
                start: "top center",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      }

      scenes.forEach((scene) => {
        if (
          scene.classList.contains("scene-hero") ||
          scene.classList.contains("scene-hero-words")
        ) return;

        const items = gsap.utils.toArray(
          scene.querySelectorAll(".scene-tag, .scene-title, .scene-body, .scene-list li, .scene-meta")
        );

        if (!items.length) return;

        gsap.from(items, {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            containerAnimation: journeyTl,
            trigger: scene,
            start: "center center+=80",
            toggleActions: "play none none reverse"
          }
        });
      });

      safeQueryAll(".scene-media, .collage").forEach((el) => {
        gsap.fromTo(el,
          { scale: 1.04 },
          {
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
              containerAnimation: journeyTl,
              trigger: el.closest(".scene"),
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });

      window.addEventListener("resize", () => ScrollTrigger.refresh());
    },

    "(max-width: 767px)": function () {
      safeQueryAll("#journeyWrapper .scene").forEach((scene, index) => {
        gsap.from(scene, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.05,
          scrollTrigger: {
            trigger: scene,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }
  });

  /* ----------------- STILLNESS SECTION BG WORDS ----------------- */

  const bgLines = safeQueryAll(".bg-line");
  bgLines.forEach((line, i) => {
    gsap.fromTo(line,
      {
        xPercent: i % 2 === 0 ? -20 : 20,
        rotation: i % 2 === 0 ? -8 : 8
      },
      {
        xPercent: i % 2 === 0 ? 10 : -10,
        rotation: i % 2 === 0 ? 4 : -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".stillness-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });

  if (hasElement(".stillness-heading")) {
    gsap.from(".stillness-heading", {
      y: 40,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".stillness-section",
        start: "top 80%"
      }
    });
  }

  if (hasElement(".stillness-collage")) {
    gsap.from(".stillness-collage", {
      y: 60,
      scale: 0.85,
      autoAlpha: 0,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".stillness-section",
        start: "top 75%"
      }
    });
  }

  /* ----------------- MARQUEE ----------------- */

  const marquee = safeQuery(".marquee-track");
  if (marquee) {
    gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 30,
      ease: "none"
    });

    gsap.to(marquee, {
      skewX: 5,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut"
    });
  }

  /* ----------------- SKILLS ----------------- */

  if (hasElement(".skill-card")) {
    gsap.from(".skill-card", {
      y: 40,
      autoAlpha: 0,
      scale: 0.96,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%"
      }
    });
  }

  /* ----------------- FLOATING KEYWORDS ----------------- */

  if (hasElement(".keyword")) {
    gsap.to(".keyword", {
      y: (i) => (i % 2 === 0 ? 20 : -20),
      x: (i) => (i % 2 === 0 ? -10 : 8),
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2
    });
  }

  /* ----------------- TIMELINE ----------------- */

  if (hasElement(".timeline-item")) {
    gsap.from(".timeline-item", {
      x: -40,
      autoAlpha: 0,
      stagger: 0.18,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".timeline-inner",
        start: "top 80%"
      }
    });
  }

  if (hasElement(".timeline-aside")) {
    gsap.from(".timeline-aside", {
      x: 40,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".timeline-inner",
        start: "top 75%"
      }
    });
  }

  /* ----------------- EXTRAS ----------------- */

  if (hasElement(".extras-box")) {
    gsap.from(".extras-box", {
      y: 40,
      autoAlpha: 0,
      scale: 0.97,
      stagger: 0.12,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".extras-inner",
        start: "top 80%"
      }
    });
  }

  /* ----------------- GENERIC CONTENT CARDS ----------------- */

  if (hasElement(".content-card")) {
    gsap.from(".content-card", {
      y: 36,
      autoAlpha: 0,
      scale: 0.98,
      stagger: 0.08,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".content-card",
        start: "top 88%"
      }
    });
  }

  if (hasElement(".list-card")) {
    gsap.from(".list-card", {
      y: 28,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".list-stack",
        start: "top 85%"
      }
    });
  }

  if (hasElement(".metric-box")) {
    gsap.from(".metric-box", {
      y: 20,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".metric-strip",
        start: "top 90%"
      }
    });
  }
});