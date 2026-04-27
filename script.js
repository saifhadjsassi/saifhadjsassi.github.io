document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger is missing.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const q = (selector, parent = document) => parent.querySelector(selector);
  const qa = (selector, parent = document) => gsap.utils.toArray(parent.querySelectorAll(selector));
  const has = (selector, parent = document) => !!parent.querySelector(selector);

  const revealOnScroll = (selector, options = {}) => {
    const items = qa(selector);
    if (!items.length) return;

    gsap.from(items, {
      y: options.y ?? 32,
      x: options.x ?? 0,
      autoAlpha: options.autoAlpha ?? 0,
      scale: options.scale ?? 1,
      stagger: options.stagger ?? 0.08,
      duration: options.duration ?? 0.75,
      ease: options.ease ?? "power2.out",
      scrollTrigger: {
        trigger: options.trigger || items[0].parentElement || items[0],
        start: options.start || "top 85%",
        toggleActions: options.toggleActions || "play none none reverse"
      }
    });
  };

  const animateFloatingWords = () => {
    if (!has(".hero-bg-words span")) return;

    gsap.to(".hero-bg-words span", {
      xPercent: (i) => (i % 2 === 0 ? -12 : 10),
      yPercent: (i) => (i % 2 === 0 ? 6 : -8),
      rotation: (i) => (i % 2 === 0 ? -6 : 5),
      ease: "sine.inOut",
      duration: 8,
      repeat: -1,
      yoyo: true
    });
  };

  const animateHeroEntrances = () => {
    qa(".hero-right").forEach((el) => {
      gsap.from(el, {
        y: 40,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power3.out"
      });
    });

    qa(".hero-main-media").forEach((el) => {
      gsap.from(el, {
        scale: 1.12,
        y: 20,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });
  };

  const heroConfigs = [
    {
      trigger: "#heroOption1",
      media: ".hero1-main-media",
      right: ".hero1-right",
      grid: ".hero1-grid-frame",
      words: [
        { selector: ".hero1-bg-words span:nth-child(1)", vars: { xPercent: -40, rotation: -12 } },
        { selector: ".hero1-bg-words span:nth-child(2)", vars: { xPercent: 25, rotation: 10 } },
        { selector: ".hero1-bg-words span:nth-child(3)", vars: { xPercent: -30, rotation: -8 } }
      ],
      mediaVars: { scale: 0.86, yPercent: -8 },
      rightVars: { yPercent: -30, autoAlpha: 0 },
      gridVars: { autoAlpha: 1, scale: 1, y: 0 },
      gridFromVars: { y: 60, autoAlpha: 0, stagger: 0.15, duration: 0.9, ease: "power2.out" },
      fadeWordsAt: 1.4
    },
    {
      trigger: "#heroOption2",
      media: ".hero2-main-media",
      right: ".hero2-right",
      grid: ".hero2-grid-frame",
      words: [
        { selector: ".hero2-bg-words span:nth-child(1)", vars: { xPercent: -30, yPercent: -10, rotation: -14 } },
        { selector: ".hero2-bg-words span:nth-child(2)", vars: { xPercent: 35, rotation: 10 } },
        { selector: ".hero2-bg-words span:nth-child(3)", vars: { xPercent: -20, rotation: -8 } }
      ],
      mediaVars: { scale: 0.9, xPercent: -10, yPercent: 12, rotation: -6 },
      rightVars: { yPercent: -20, xPercent: 10, autoAlpha: 0 },
      gridVars: { autoAlpha: 1, scale: 1.05, y: -10 },
      gridFromVars: { y: 80, autoAlpha: 0, stagger: 0.12, duration: 0.9, ease: "power2.out" }
    },
    {
      trigger: "#heroOption3",
      media: ".hero3-main-media",
      right: ".hero3-right",
      grid: ".hero3-grid-frame",
      words: [
        { selector: ".hero3-bg-words span:nth-child(1)", vars: { xPercent: -25, rotation: -10 } },
        { selector: ".hero3-bg-words span:nth-child(2)", vars: { xPercent: 30, rotation: 12 } },
        { selector: ".hero3-bg-words span:nth-child(3)", vars: { xPercent: -15, rotation: -8 } }
      ],
      mediaVars: { scale: 0.84, yPercent: -6, xPercent: 4, rotation: 4 },
      rightVars: { yPercent: -25, autoAlpha: 0 },
      gridVars: { autoAlpha: 1, scale: 1.08, y: -6 },
      gridFromVars: { y: 70, autoAlpha: 0, stagger: 0.13, duration: 0.9, ease: "power2.out" },
      fadeWordsAt: 1.5
    }
  ];

  const setupDesktopHeroes = () => {
    heroConfigs.forEach((hero) => {
      if (!has(hero.trigger)) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero.trigger,
          start: "top top",
          end: "+=220%",
          scrub: true,
          pin: true
        }
      });

      tl.to(hero.media, {
        ...hero.mediaVars,
        duration: 1.2,
        ease: "none"
      }, 0);

      tl.to(hero.right, {
        ...hero.rightVars,
        duration: 1.0,
        ease: "none"
      }, hero.trigger === "#heroOption2" ? 0.2 : 0.1);

      hero.words.forEach((word) => {
        tl.to(word.selector, {
          ...word.vars,
          ease: "none"
        }, 0);
      });

      tl.to(hero.grid, {
        ...hero.gridVars,
        duration: 1.2,
        ease: "power2.out"
      }, hero.trigger === "#heroOption2" ? 0.4 : 0.35);

      tl.from(`${hero.grid} img`, hero.gridFromVars, 0.45);

      if (hero.fadeWordsAt) {
        tl.to(hero.trigger.replace("#heroOption", ".hero") + "-bg-words span", {
          autoAlpha: 0,
          duration: 0.9,
          ease: "power1.out"
        }, hero.fadeWordsAt);
      }
    });
  };

  const setupMobileHeroes = () => {
    heroConfigs.forEach((hero, index) => {
      if (!has(hero.trigger)) return;

      const mainSel = `.hero${index + 1}-main-media`;
      const wordsSel = `.hero${index + 1}-bg-words span`;
      const gridSel = `.hero${index + 1}-grid-frame`;

      if (has(mainSel)) {
        gsap.to(mainSel, {
          yPercent: -10,
          scrollTrigger: {
            trigger: hero.trigger,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      if (has(wordsSel)) {
        gsap.to(wordsSel, {
          xPercent: (i) => (i % 2 === 0 ? -6 : 6),
          scrollTrigger: {
            trigger: hero.trigger,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      if (has(gridSel)) {
        gsap.from(gridSel, {
          autoAlpha: 0,
          scale: 0.9,
          y: 40,
          scrollTrigger: {
            trigger: hero.trigger,
            start: "top 70%",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });
  };

  const setupProjectsSlider = () => {
    const slides = qa(".project-slide");
    if (!slides.length || !has(".projects-pin")) return;

    ScrollTrigger.matchMedia({
      "(min-width: 768px)": function () {
        const tl = gsap.timeline({
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

          tl.to(slide, {
            autoAlpha: 1,
            scale: 1.08,
            zIndex: 10 + i,
            duration: 0.8,
            ease: "power2.out"
          }, enterAt);

          if (i < slides.length - 1) {
            tl.to(slide, {
              autoAlpha: 0,
              scale: 0.9,
              duration: 0.8,
              ease: "power2.in"
            }, leaveAt);
          }
        });
      },

      "(max-width: 767px)": function () {
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
    });
  };

  const setupMazeJourney = () => {
    if (!has("#journeyWrapper") || !has(".scenes-inner") || !has(".scene")) return;

    ScrollTrigger.matchMedia({
      "(min-width: 768px)": function () {
        const scenes = qa(".scene");
        const inner = q(".scenes-inner");

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
          if (i === 0) return;

          const tilt = i % 2 === 0 ? -2 : 2;
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

        qa(".hero-parallax").forEach((el) => {
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

        if (has(".scene-hero-words .hero-big-word")) {
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
            .fromTo(
              ".scene-hero-words .hero-big-word",
              { scale: 1.6, yPercent: 30, letterSpacing: "0.35em" },
              { scale: 1, yPercent: 0, letterSpacing: "0.18em", ease: "power2.out" }
            )
            .fromTo(
              ".scene-hero-words .hero-pill",
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1 },
              "-=0.2"
            );
        }

        const wordsScene = q(".scene-words-collage");
        if (wordsScene) {
          const floating = q(".floating-words", wordsScene);
          const collage = q(".collage", wordsScene);

          if (floating) {
            gsap.to(floating, {
              xPercent: -20,
              yPercent: -10,
              rotation: -4,
              ease: "none",
              scrollTrigger: {
                containerAnimation: journeyTl,
                trigger: wordsScene,
                start: "top bottom",
                end: "bottom -200%",
                scrub: true
              }
            });
          }

          if (collage) {
            gsap.fromTo(
              collage,
              { scale: 1.1 },
              {
                scale: 0.95,
                scrollTrigger: {
                  containerAnimation: journeyTl,
                  trigger: wordsScene,
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

          const items = qa(".scene-tag, .scene-title, .scene-body, .scene-list li, .scene-meta", scene);
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

        qa(".scene-media, .collage").forEach((el) => {
          const scene = el.closest(".scene");
          if (!scene) return;

          gsap.fromTo(
            el,
            { scale: 1.04 },
            {
              scale: 0.98,
              ease: "none",
              scrollTrigger: {
                containerAnimation: journeyTl,
                trigger: scene,
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
        qa("#journeyWrapper .scene").forEach((scene, index) => {
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
  };

  const setupStillness = () => {
    qa(".bg-line").forEach((line, i) => {
      gsap.fromTo(
        line,
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

    if (has(".stillness-heading")) {
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

    if (has(".stillness-collage")) {
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
  };

  const setupMarquee = () => {
    const marquee = q(".marquee-track");
    if (!marquee) return;

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
  };

  const setupKeywords = () => {
    if (!has(".keyword")) return;

    gsap.to(".keyword", {
      y: (i) => (i % 2 === 0 ? 20 : -20),
      x: (i) => (i % 2 === 0 ? -10 : 8),
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2
    });
  };

  const setupSharedReveals = () => {
    revealOnScroll(".skill-card", {
      trigger: ".skills-grid",
      start: "top 80%",
      y: 40,
      scale: 0.96,
      stagger: 0.1,
      duration: 0.8
    });

    revealOnScroll(".timeline-item", {
      trigger: ".timeline-inner",
      start: "top 80%",
      x: -40,
      stagger: 0.18,
      duration: 0.8
    });

    if (has(".timeline-aside")) {
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

    revealOnScroll(".extras-box", {
      trigger: ".extras-inner",
      start: "top 80%",
      y: 40,
      scale: 0.97,
      stagger: 0.12,
      duration: 0.8
    });
  };

  const setupPublicationsPage = () => {
    revealOnScroll(".featured-paper", {
      trigger: ".featured-papers",
      start: "top 82%",
      y: 42,
      scale: 0.97,
      stagger: 0.14,
      duration: 0.85,
      ease: "power3.out"
    });

    qa(".pub-year-group").forEach((group) => {
      gsap.from(group, {
        y: 34,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: group,
          start: "top 88%"
        }
      });
    });

    qa(".pub-item").forEach((item, index) => {
      gsap.from(item, {
        x: index % 2 === 0 ? -18 : 18,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 92%"
        }
      });
    });
  };

  animateHeroEntrances();
  animateFloatingWords();
  setupProjectsSlider();
  setupMazeJourney();
  setupStillness();
  setupMarquee();
  setupKeywords();
  setupSharedReveals();
  setupPublicationsPage();

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": setupDesktopHeroes,
    "(max-width: 767px)": setupMobileHeroes
  });
});
