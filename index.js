document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================================
    // 1. DOM ELEMENT REFERENCES (SAFE MODE)
    // ==========================================================================

    const navbar = document.querySelector(".navbar");
    const toggle = document.querySelector(".toggle");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll(".menu a");
    const banner = document.querySelector(".banner");
    const typingText = document.querySelector(".banner h3");
    const sections = document.querySelectorAll("section");

    // NEW: Impact Tracker
    const range = document.getElementById("donationRange");
    const amount = document.getElementById("amount");
    const impactText = document.getElementById("impactText");

    // ==========================================================================
    // 2. CREATE SCROLL TO TOP BUTTON (ENHANCED)
    // ==========================================================================

    const scrollBtn = document.createElement("div");
    scrollBtn.innerHTML = `<i class="fa fa-arrow-up"></i>`;
    scrollBtn.classList.add("scroll-top-btn");
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ==========================================================================
    // 3. MOBILE MENU (ROBUST)
    // ==========================================================================

    const closeMenu = () => {
        if (!menu || !toggle) return;

        menu.classList.remove("active");
        toggle.innerHTML = `<i class="fa fa-bars"></i>`;
    };

    if (toggle && menu) {
        toggle.addEventListener("click", (e) => {
            e.stopPropagation();

            menu.classList.toggle("active");

            const isActive = menu.classList.contains("active");
            toggle.innerHTML = isActive
                ? `<i class="fa fa-times"></i>`
                : `<i class="fa fa-bars"></i>`;
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (e) => {
        if (menu && toggle &&
            !menu.contains(e.target) &&
            !toggle.contains(e.target)
        ) {
            closeMenu();
        }
    });

    // ==========================================================================
    // 4. SMOOTH SCROLL (IMPROVED ACCURACY)
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 70,
                behavior: "smooth"
            });
        });
    });

    // ==========================================================================
    // 5. PERFORMANCE SCROLL SYSTEM (OPTIMIZED)
    // ==========================================================================

    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    function handleScroll() {

        const scrollY = window.scrollY;

        // Sticky navbar
        if (navbar) {
            navbar.classList.toggle("sticky", scrollY > 20);
        }

        // Scroll button visibility FIX
        scrollBtn.classList.toggle("show", scrollY > 400);

        // Parallax effect
        if (banner && window.innerWidth > 768) {
            banner.style.backgroundPositionY = `${scrollY * 0.3}px`;
        }

        // Active section tracking (FIXED LOGIC)
        let current = "";

        sections.forEach(sec => {
            const top = sec.offsetTop - 150;
            if (scrollY >= top) {
                current = sec.id;
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove("active-link");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active-link");
            }
        });
    }

    // ==========================================================================
    // 6. IMPACT TRACKER (NEW CORE FEATURE ❤️)
    // ==========================================================================

    function updateImpact(value) {

        if (!amount || !impactText) return;

        amount.textContent = value;

        let message = "";
        let books = Math.floor(value / 100);
        let students = Math.floor(value / 250);
        let schools = Math.floor(value / 1200);

        if (value < 200) {
            message = "📚 Provides school supplies for 1 child";
        } else if (value < 1000) {
            message = "🏫 Supports weekly education for children";
        } else if (value < 3000) {
            message = "🧱 Helps build classroom learning resources";
        } else {
            message = "🎓 Sponsors full education support for a child";
        }

        impactText.textContent = message;

        // Optional dynamic counters if present
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

    // ==========================================================================
    // 7. REVEAL ON SCROLL (ENHANCED SAFETY)
    // ==========================================================================

    const revealElements = document.querySelectorAll(
        ".content-box, .heading, iframe, .bottom-container ul li, .donate-text"
    );

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));

    // ==========================================================================
    // 8. TYPING EFFECT (SMOOTHER)
    // ==========================================================================

    if (typingText) {

        const words = [
            "Building Schools For Every Child",
            "Creating Brighter Futures",
            "Education For Everyone"
        ];

        let i = 0, j = 0, deleting = false;

        function type() {

            const word = words[i];

            typingText.textContent = word.substring(0, j);

            if (!deleting && j < word.length) {
                j++;
            } else if (deleting && j > 0) {
                j--;
            }

            if (j === word.length) {
                deleting = true;
                setTimeout(type, 1500);
                return;
            }

            if (deleting && j === 0) {
                deleting = false;
                i = (i + 1) % words.length;
            }

            setTimeout(type, deleting ? 40 : 80);
        }

        type();
    }

    // ==========================================================================
    // 9. BUTTON MICRO INTERACTION (IMPROVED UX)
    // ==========================================================================

    document.querySelectorAll(".donate-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.style.transform = "scale(0.96)";
            setTimeout(() => {
                btn.style.transform = "scale(1)";
            }, 120);
        });
    });

    // ==========================================================================
    // 10. PRELOADER SAFE HANDLING
    // ==========================================================================

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {
        if (loader) {
            loader.classList.add("loader-hidden");
            setTimeout(() => loader.remove(), 800);
        }
    });

    // ==========================================================================
    // 11. DYNAMIC YEAR
    // ==========================================================================

    const year = document.querySelector(".year");
    if (year) year.textContent = new Date().getFullYear();

    // ==========================================================================
    // 12. KEYBOARD ACCESSIBILITY
    // ==========================================================================

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    // ==========================================================================
    // 13. FINAL CONSOLE MESSAGE
    // ==========================================================================

    console.log(
        "%c🚀 Paathshala NGO System Loaded Successfully",
        "color:#8b5cf6;font-size:14px;font-weight:bold;"
    );

});
