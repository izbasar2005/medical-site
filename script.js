document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
      }
    });
  }

  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const city = searchForm.city.value;
      const specialty = searchForm.specialty.value;
      const doctor = searchForm["doctor-name"].value.trim();

      let message = "Іздеу параметрлері:\n";
      message += city ? `Қала: ${city}\n` : "";
      message += specialty ? `Мамандығы: ${specialty}\n` : "";
      message += doctor ? `Дәрігер: ${doctor}\n` : "";

      if (!city && !specialty && !doctor) {
        alert("Іздеу үшін кем дегенде бір өрісті толтырыңыз.");
      } else {
        alert(message || "Іздеу параметрлері таңдалды.");
      }
    });
  }

  const appointmentForm = document.getElementById("appointment-form");
  const successMessage = document.getElementById("appointment-success");

  if (appointmentForm && successMessage) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!appointmentForm.checkValidity()) {
        appointmentForm.reportValidity();
        return;
      }

      successMessage.hidden = false;
      appointmentForm.reset();

      setTimeout(() => {
        successMessage.hidden = true;
      }, 5000);
    });
  }

  const doctorButtons = document.querySelectorAll(".doctor-book-btn");
  const preferredDoctorInput = document.getElementById("preferred-doctor");

  doctorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const doctorName = btn.getAttribute("data-doctor");
      if (preferredDoctorInput) {
        preferredDoctorInput.value = doctorName || "";
        preferredDoctorInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }
        const otherIcon = otherItem.querySelector(".faq-icon");
        if (otherIcon) {
          otherIcon.textContent = "+";
        }
      });

      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        const icon = item.querySelector(".faq-icon");
        if (icon) {
          icon.textContent = "−";
        }
      } else {
        item.classList.remove("active");
        answer.style.maxHeight = null;
        const icon = item.querySelector(".faq-icon");
        if (icon) {
          icon.textContent = "+";
        }
      }
    });
  });

  const testimonialsTrack = document.getElementById("testimonials-track");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (testimonialsTrack && prevBtn && nextBtn) {
    const items = Array.from(testimonialsTrack.children);
    let index = 0;

    const updateCarousel = () => {
      items.forEach((item, i) => {
        item.style.transform = `translateX(${(i - index) * 100}%)`;
      });
    };

    items.forEach((item, i) => {
      item.style.transition = "transform 0.3s ease-out";
      item.style.transform = `translateX(${i * 100}%)`;
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + items.length) % items.length;
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % items.length;
      updateCarousel();
    });

    let autoSlide = setInterval(() => {
      index = (index + 1) % items.length;
      updateCarousel();
    }, 7000);

    [prevBtn, nextBtn, testimonialsTrack].forEach((el) => {
      el.addEventListener("mouseenter", () => clearInterval(autoSlide));
      el.addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => {
          index = (index + 1) % items.length;
          updateCarousel();
        }, 7000);
      });
    });
  }
});
