document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // 1. DOM REFERENCES
    // =========================================================

    const navbar = document.querySelector(".navbar");
    const toggle = document.querySelector(".toggle");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll(".menu a");
    const banner = document.querySelector(".banner");
    const typingText = document.querySelector(".banner h3");
    const sections = document.querySelectorAll("section");

    // Impact Tracker Elements
    const range = document.getElementById("donationRange");
    const amount = document.getElementById("amount");
    const impactText = document.getElementById("impactText");

    // Counter Elements
    const counters = document.querySelectorAll(".counter");

    // =========================================================
    // 2. CREATE PARTICLE BACKGROUND
    // =========================================================

    const particleContainer = document.createElement("div");
    particleContainer.classList.add("particle-container");
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 80; i++) {

        const particle = document.createElement("span");

        particle.classList.add("particle");

        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDuration = (10 + Math.random() * 20) + "s";
        particle.style.animationDelay = Math.random() * 10 + "s";
        particle.style.opacity = Math.random();

        particleContainer.appendChild(particle);
    }

    // =========================================================
    // 3. CREATE SCROLL BUTTON
    // =========================================================

    const scrollBtn = document.createElement("div");

    scrollBtn.innerHTML = `
        <i class="fa fa-arrow-up"></i>
    `;

    scrollBtn.classList.add("scroll-top-btn");

    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    // =========================================================
    // 4. MOBILE MENU SYSTEM
    // =========================================================

    const closeMenu = () => {

        if (!menu || !toggle) return;

        menu.classList.remove("active");

        toggle.innerHTML = `
            <i class="fa fa-bars"></i>
        `;
    };

    if (toggle && menu) {

        toggle.addEventListener("click", (e) => {

            e.stopPropagation();

            menu.classList.toggle("active");

            const active = menu.classList.contains("active");

            toggle.innerHTML = active
                ? `<i class="fa fa-times"></i>`
                : `<i class="fa fa-bars"></i>`;

        });

    }

    menuLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    document.addEventListener("click", (e) => {

        if (
            menu &&
            toggle &&
            !menu.contains(e.target) &&
            !toggle.contains(e.target)
        ) {

            closeMenu();

        }

    });

    // =========================================================
    // 5. SMOOTH SCROLL
    // =========================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: "smooth"
            });

        });

    });

    // =========================================================
    // 6. SCROLL SYSTEM
    // =========================================================

    let ticking = false;

    window.addEventListener("scroll", () => {

        if (!ticking) {

            requestAnimationFrame(() => {

                handleScroll();

                ticking = false;

            });

            ticking = true;
        }

    }, { passive: true });

    function handleScroll() {

        const scrollY = window.scrollY;

        // Sticky Navbar
        if (navbar) {

            navbar.classList.toggle("sticky", scrollY > 20);

        }

        // Scroll Button Visibility
        scrollBtn.classList.toggle("show", scrollY > 400);

        // Parallax Background
        if (banner && window.innerWidth > 768) {

            banner.style.backgroundPositionY =
                `${scrollY * 0.3}px`;

        }

        // Active Link Detection
        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 160;

            if (scrollY >= sectionTop) {

                currentSection = section.getAttribute("id");

            }

        });

        menuLinks.forEach(link => {

            link.classList.remove("active-link");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active-link");

            }

        });

    }

    // =========================================================
    // 7. REVEAL ANIMATION SYSTEM
    // =========================================================

    const revealElements = document.querySelectorAll(
        ".content-box, .heading, iframe, .bottom-container ul li, .donate-text, .video-card"
    );

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    revealElements.forEach(el => {

        revealObserver.observe(el);

    });

    // =========================================================
    // 8. HERO TYPING EFFECT
    // =========================================================

    if (typingText) {

        const words = [

            "Building Schools For Every Child",
            "Creating Brighter Futures",
            "Education For Everyone",
            "Together We Can Change Lives",
            "Every Child Deserves Knowledge"

        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            typingText.textContent =
                currentWord.substring(0, charIndex);

            if (!deleting) {

                charIndex++;

            } else {

                charIndex--;

            }

            let speed = deleting ? 45 : 80;

            if (charIndex === currentWord.length + 1) {

                deleting = true;

                speed = 2000;

            }

            if (deleting && charIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) % words.length;

                speed = 400;

            }

            setTimeout(typeEffect, speed);

        }

        typeEffect();

    }

    // =========================================================
    // 9. IMPACT DONATION RANGE TRACKER
    // =========================================================

    function updateImpact(value) {

        if (!amount || !impactText) return;

        amount.textContent = value;

        let message = "";

        const books = Math.floor(value / 100);
        const students = Math.floor(value / 250);
        const schools = Math.floor(value / 1500);

        if (value < 300) {

            message =
                `📚 Can provide ${books} education kits`;

        }

        else if (value < 1000) {

            message =
                `👦 Supports ${students} children`;

        }

        else if (value < 5000) {

            message =
                `🏫 Helps improve rural classrooms`;

        }

        else {

            message =
                `🎓 Sponsors complete education support`;

        }

        impactText.textContent = message;

        // Optional Dynamic Numbers
        const b = document.getElementById("books");
        const s = document.getElementById("schools");
        const st = document.getElementById("students");

        if (b) b.textContent = books;
        if (s) s.textContent = schools;
        if (st) st.textContent = students;

    }

    if (range) {

        range.addEventListener("input", (e) => {

            updateImpact(e.target.value);

        });

        updateImpact(range.value);

    }

    // =========================================================
    // 10. LIVE IMPACT COUNTER
    // =========================================================

    function animateCounter(counter) {

        const target =
            parseInt(counter.dataset.target);

        let current = 0;

        const increment = target / 180;

        function updateCounter() {

            current += increment;

            if (current < target) {

                counter.innerText =
                    Math.floor(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText =
                    target.toLocaleString() + "+";

            }

        }

        updateCounter();

    }

    const counterObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.5
        }

    );

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    // =========================================================
    // 11. AUTO LIVE COUNTER UPDATES
    // =========================================================

    setInterval(() => {

        counters.forEach(counter => {

            let current =
                parseInt(counter.innerText.replace(/\D/g, ""));

            if (!isNaN(current)) {

                current += Math.floor(Math.random() * 5);

                counter.innerText =
                    current.toLocaleString() + "+";

            }

        });

    }, 5000);

    // =========================================================
    // 12. CURSOR GLOW EFFECT
    // =========================================================

    const glow = document.createElement("div");

    glow.classList.add("cursor-glow");

    document.body.appendChild(glow);

    document.addEventListener("mousemove", (e) => {

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    });

    // =========================================================
    // 13. DONATE BUTTON MICRO INTERACTION
    // =========================================================

    document.querySelectorAll(".donate-btn").forEach(btn => {

        btn.addEventListener("mouseenter", () => {

            btn.classList.add("pulse");

        });

        btn.addEventListener("mouseleave", () => {

            btn.classList.remove("pulse");

        });

        btn.addEventListener("click", () => {

            btn.style.transform = "scale(0.95)";

            setTimeout(() => {

                btn.style.transform = "";

            }, 120);

        });

    });

    // =========================================================
    // 14. PRELOADER
    // =========================================================

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {

        if (loader) {

            loader.classList.add("loader-hidden");

            setTimeout(() => {

                loader.remove();

            }, 800);

        }

    });

    // =========================================================
    // 15. DYNAMIC YEAR
    // =========================================================

    const year = document.querySelector(".year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

    // =========================================================
    // 16. ESC KEY CLOSE MENU
    // =========================================================

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closeMenu();

        }

    });

    // =========================================================
    // 17. PAGE LOAD ANIMATION
    // =========================================================

    document.body.classList.add("loaded");

    // =========================================================
    // 18. CONSOLE MESSAGE
    // =========================================================

    console.log(
        "%c✨ Paathshala Website Fully Loaded ✨",
        "color:#8b5cf6;font-size:16px;font-weight:bold;"
    );

});
