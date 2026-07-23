function buscarPlaca() {
  const input = document.getElementById('placaInput');
  const toast = document.getElementById('searchToast');
  const valor = input.value.trim().toUpperCase();

  if (!valor) {
    input.focus();
    input.style.borderColor = '#D4AF37';
    setTimeout(() => {
      input.style.borderColor = '';
    }, 1500);
    return;
  }

  input.value = valor;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(valor).then(() => {
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 4000);
    });
  }

  document.getElementById('modulos')?.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('placaInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const input = document.getElementById('placaInput');
    const valor = input.value.trim().toUpperCase();

    if (!valor) {
      input.focus();
      input.style.borderColor = '#D4AF37';
      setTimeout(() => {
        input.style.borderColor = '';
      }, 1500);
      return;
    }

    input.value = valor;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(valor);
    }

    window.open('https://consultavehicular.sunarp.gob.pe/consulta-vehicular/inicio', '_blank', 'noopener');
  }
});

document.querySelectorAll('.fuente-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.getElementById('placaInput');
    const valor = input.value.trim();
    if (valor && navigator.clipboard) {
      navigator.clipboard.writeText(valor);
    }
  });
});

const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

if (slides.length > 1) {
  setInterval(nextSlide, 5500);
}

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => observer.observe(el));

const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

navToggle?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(15, 15, 16, 0.95)';
  } else {
    nav.style.background = 'rgba(15, 15, 16, 0.82)';
  }
});

/* ---------- LOGO REVEAL (clic para ver, X para cerrar) ---------- */
const logoOverlay = document.getElementById('logoRevealOverlay');
const logoTriggers = document.querySelectorAll('.brand');
const logoCloseBtn = document.getElementById('logoRevealClose');

if (logoOverlay && logoTriggers.length) {
  const openLogoReveal = () => logoOverlay.classList.add('active');
  const closeLogoReveal = () => logoOverlay.classList.remove('active');

  logoTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault(); // evita que el "#" del logo haga scroll
      openLogoReveal();
    });
  });

  // Cerrar con el botón X
  logoCloseBtn?.addEventListener('click', closeLogoReveal);

  // Cerrar haciendo clic fuera de la imagen (en el fondo oscuro)
  logoOverlay.addEventListener('click', (e) => {
    if (e.target === logoOverlay) {
      closeLogoReveal();
    }
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLogoReveal();
    }
  });
}
