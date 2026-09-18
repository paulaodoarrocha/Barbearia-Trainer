/* =========================================================
   ALFA BARBER — script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     CONFIGURAÇÃO — SUBSTITUIR PELOS DADOS REAIS DO CLIENTE
  ======================================================= */
  const WHATSAPP_NUMBER = "5561985504077";
  const WHATSAPP_MESSAGE = "Olá! Gostaria de agendar um horário na ALFA BARBER.";
  const INSTAGRAM_URL = "https://www.instagram.com/phflow.px?stkn=NDEwemU2dTI0ajcx"; // <-- trocar pelo perfil real da barbearia

  const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  document.querySelectorAll(".btn-whatsapp").forEach((link) => {
    link.setAttribute("href", whatsappLink);
  });

  const instagramBtn = document.getElementById("instagramBtn");
  if (instagramBtn) instagramBtn.setAttribute("href", INSTAGRAM_URL);

  /* =======================================================
     MENU MOBILE
  ======================================================= */
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  function closeMenu() {
    navMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", toggleMenu);

    // Fecha o menu ao clicar em um link (mobile)
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Fecha o menu ao pressionar Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Fecha o menu se a tela for redimensionada para desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  /* =======================================================
     SCROLL SUAVE PARA LINKS INTERNOS
     (reforço via JS para navegadores sem suporte a
     scroll-behavior: smooth via CSS)
  ======================================================= */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  /* =======================================================
     ANIMAÇÃO DE ENTRADA AO ROLAR A PÁGINA
     Respeita prefers-reduced-motion (tratado também em CSS)
  ======================================================= */
  const revealElements = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Sem suporte a IntersectionObserver ou movimento reduzido: mostra tudo direto
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* =======================================================
     ANO ATUAL NO RODAPÉ
  ======================================================= */
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

});
