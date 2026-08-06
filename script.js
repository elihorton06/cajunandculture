document.addEventListener("DOMContentLoaded", () => {

    const pageLoader = document.getElementById("pageLoader");
    const siteHeader = document.getElementById("siteHeader");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const floatingBookButton = document.getElementById("floatingBookButton");
    const bookingSection = document.getElementById("booking");
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");
    const bookingForm = document.getElementById("bookingForm");
    const currentYear = document.getElementById("currentYear");

    // ==========================
    // Page Loader
    // ==========================

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (pageLoader) {
                pageLoader.classList.add("hidden");
            }
        }, 300);
    });

    // ==========================
    // Current Year
    // ==========================

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ==========================
    // Header Scroll Effect
    // ==========================

    function handleScroll() {

        if (window.scrollY > 25) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }

        if (window.scrollY > 650) {
            floatingBookButton.classList.add("visible");
        } else {
            floatingBookButton.classList.remove("visible");
        }
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    // ==========================
    // Mobile Menu
    // ==========================

    function closeMenu() {

        mobileMenu.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");

    }

    menuButton.addEventListener("click", () => {

        const open = !mobileMenu.classList.contains("open");

        mobileMenu.classList.toggle("open", open);
        menuButton.classList.toggle("active", open);

        menuButton.setAttribute(
            "aria-expanded",
            open
        );

        document.body.classList.toggle(
            "menu-open",
            open
        );

    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    // ==========================
    // Scroll Animations
    // ==========================

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    document.querySelectorAll(".reveal").forEach(element => {

        observer.observe(element);

    });

    // ==========================
    // FAQ
    // ==========================

    document.querySelectorAll(".faq-question").forEach(button => {

        button.addEventListener("click", () => {

            const item = button.closest(".faq-item");

            const alreadyOpen =
                item.classList.contains("open");

            document.querySelectorAll(".faq-item").forEach(card => {

                card.classList.remove("open");

                card.querySelector(".faq-question")
                    .setAttribute("aria-expanded", "false");

                card.querySelector("i").textContent = "+";

            });

            if (!alreadyOpen) {

                item.classList.add("open");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

                button.querySelector("i").textContent = "−";

            }

        });

    });

    // ==========================
    // Lightbox
    // ==========================

    function openLightbox(image) {

        lightboxImage.src = image;

        lightbox.classList.add("open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("lightbox-open");

    }

    function closeLightbox() {

        lightbox.classList.remove("open");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        lightboxImage.src = "";

        document.body.classList.remove("lightbox-open");

    }

    document.querySelectorAll(".gallery-item").forEach(item => {

        item.addEventListener("click", () => {

            openLightbox(item.dataset.image);

        });

    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            closeLightbox();

        }

    });

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            closeLightbox();
            closeMenu();

        }

    });

    // ==========================
    // Floating Button
    // ==========================

    floatingBookButton.addEventListener("click", () => {

        bookingSection.scrollIntoView({

            behavior: "smooth"

        });

    });

    // ==========================
    // Booking Form
    // ==========================

    bookingForm.addEventListener("submit", e => {

        e.preventDefault();

        const button =
            bookingForm.querySelector(".form-submit");

        const original = button.innerHTML;

        button.disabled = true;

        button.innerHTML =
            "Tour request ready ✓";

        setTimeout(() => {

            button.disabled = false;

            button.innerHTML = original;

        }, 2200);

    });

    // ==========================
    // Smooth Anchor Scrolling
    // ==========================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", e => {

            const id = link.getAttribute("href");

            if (id === "#") return;

            const target =
                document.querySelector(id);

            if (!target) return;

            e.preventDefault();

            closeMenu();

            const offset = 92;

            const top =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({

                top: top,
                behavior: "smooth"

            });

        });

    });

});
