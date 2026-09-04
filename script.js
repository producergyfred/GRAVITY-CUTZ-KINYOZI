/*
  AJ CUTS BARBERSHOP SETTINGS

  WhatsApp:
  International format WITHOUT +, spaces or dashes.

  Phone:
  International format WITH +.
*/

const AJ_CUTS_WHATSAPP = "254797624522";
const AJ_CUTS_PHONE = "+254797624522";

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     MOBILE MENU
  ====================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.classList.toggle("active", isOpen);

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

    });

    /* Close menu when navigation link is clicked */

    nav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.classList.remove("active");

        document.body.classList.remove(
          "menu-open"
        );

      });

    });

  }


  /* =====================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
  ====================================================== */

  document.addEventListener("click", (event) => {

    if (!nav || !menuToggle) return;

    const clickedInsideNav =
      nav.contains(event.target);

    const clickedToggle =
      menuToggle.contains(event.target);

    if (
      nav.classList.contains("open") &&
      !clickedInsideNav &&
      !clickedToggle
    ) {

      nav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.classList.remove("active");

      document.body.classList.remove(
        "menu-open"
      );

    }

  });


  /* =====================================================
     ESCAPE KEY CLOSES MOBILE MENU
  ====================================================== */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      nav?.classList.contains("open")
    ) {

      nav.classList.remove("open");

      menuToggle?.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle?.classList.remove("active");

      document.body.classList.remove(
        "menu-open"
      );

      menuToggle?.focus();

    }

  });


  /* =====================================================
     BOOKING DATE
  ====================================================== */

  const dateInput =
    document.getElementById("date");

  if (dateInput) {

    const today = new Date();

    const yyyy =
      today.getFullYear();

    const mm =
      String(today.getMonth() + 1)
        .padStart(2, "0");

    const dd =
      String(today.getDate())
        .padStart(2, "0");

    dateInput.min =
      `${yyyy}-${mm}-${dd}`;

  }


  /* =====================================================
     PHONE + WHATSAPP BUTTONS
  ====================================================== */

  const callLink =
    document.getElementById("callLink");

  const whatsappLink =
    document.getElementById("whatsappLink");


  /* =====================================================
     CALL BUTTON
  ====================================================== */

  if (callLink) {

    callLink.href =
      `tel:${AJ_CUTS_PHONE}`;

  }


  /* =====================================================
     WHATSAPP BUTTON
  ====================================================== */

  if (whatsappLink) {

    const message =
      "Hello AJ CUTS BARBERSHOP, I would like to make an appointment.";

    whatsappLink.href =
      `https://wa.me/${AJ_CUTS_WHATSAPP}?text=${encodeURIComponent(message)}`;

    whatsappLink.target = "_blank";

    whatsappLink.rel =
      "noopener noreferrer";

  }


  /* =====================================================
     BOOKING FORM → WHATSAPP
  ====================================================== */

  const form =
    document.getElementById("bookingForm");


  if (form) {

    form.addEventListener("submit", (event) => {

      event.preventDefault();


      /* =================================================
         GET FORM VALUES
      ================================================== */

      const name =
        document
          .getElementById("name")
          ?.value
          .trim() || "";


      const phone =
        document
          .getElementById("phone")
          ?.value
          .trim() || "";


      const service =
        document
          .getElementById("service")
          ?.value
          .trim() || "";


      const date =
        document
          .getElementById("date")
          ?.value || "";


      const time =
        document
          .getElementById("time")
          ?.value || "";


      const message =
        document
          .getElementById("message")
          ?.value
          .trim() || "";


      /* =================================================
         BASIC VALIDATION
      ================================================== */

      if (
        !name ||
        !phone ||
        !service ||
        !date ||
        !time
      ) {

        alert(
          "Please complete your name, phone number, service, date and preferred time."
        );

        return;

      }


      /* =================================================
         FORMAT DATE
      ================================================== */

      let formattedDate = date;

      if (date) {

        const dateObject =
          new Date(`${date}T00:00:00`);

        if (
          !Number.isNaN(
            dateObject.getTime()
          )
        ) {

          formattedDate =
            dateObject.toLocaleDateString(
              "en-KE",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              }
            );

        }

      }


      /* =================================================
         WHATSAPP BOOKING MESSAGE
      ================================================== */

      const text =
`Hello AJ CUTS BARBERSHOP,

I'd like to book an appointment.

Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred date: ${formattedDate}
Preferred time: ${time}
Message: ${message || "None"}

Thank you.`;


      /* =================================================
         CREATE WHATSAPP URL
      ================================================== */

      const url =
        `https://wa.me/${AJ_CUTS_WHATSAPP}?text=${encodeURIComponent(text)}`;


      /* =================================================
         OPEN WHATSAPP
      ================================================== */

      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    });

  }


  /* =====================================================
     CURRENT YEAR
  ====================================================== */

  const year =
    document.getElementById("year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =====================================================
     SCROLL REVEAL ANIMATION
  ====================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    revealElements.length &&
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        (entries, obs) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              obs.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {

      observer.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add(
        "visible"
      );

    });

  }


  /* =====================================================
     PREVENT EMPTY / BROKEN IMAGE LAYOUTS
  ====================================================== */

  document
    .querySelectorAll("img")
    .forEach((image) => {

      image.addEventListener(
        "error",
        () => {

          const parent =
            image.closest(
              ".image-frame, .style-image-wrap, .gallery-item"
            );

          if (parent) {

            parent.classList.add(
              "empty-image"
            );

          }

          image.style.display =
            "none";

        }
      );

    });

});
