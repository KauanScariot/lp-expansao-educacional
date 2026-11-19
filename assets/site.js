/* =========================================================
   CONFIG — troque pelo número oficial (55 + DDD + número)
   ========================================================= */
const WHATSAPP_NUMBER = "5551999241975";

/* Links do WhatsApp com mensagem pré-preenchida */
document.querySelectorAll("[data-wa]").forEach(el => {
  el.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(el.dataset.wa);
});

/* Faixas infinitas — edite as palavras aqui */
const WORDS = (document.body.dataset.ribbonWords || "Autoridade|Eventos|Educação").split("|");
const item = w => `<span class="ribbon__item">${w}<svg aria-hidden="true"><use href="#i-spark"/></svg></span>`;
const group = `<div class="ribbon__group">${WORDS.concat(WORDS).map(item).join("")}</div>`;
document.querySelectorAll("[data-ribbon]").forEach(t => t.innerHTML = group + group);

/* Reveal ao rolar */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
}, { threshold: .15, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* FAQ: abre/fecha com animação, um por vez */
const faqItems = document.querySelectorAll(".faq__item");
faqItems.forEach(d => {
  if (d.open) d.classList.add("is-open");
  const body = d.querySelector(".faq__a");
  d.querySelector("summary").addEventListener("click", e => {
    e.preventDefault();
    if (d.open) {
      d.classList.remove("is-open");
      body.addEventListener("transitionend", () => { if (!d.classList.contains("is-open")) d.open = false; }, { once: true });
    } else {
      faqItems.forEach(o => { if (o !== d && o.open) { o.classList.remove("is-open"); setTimeout(() => { if (!o.classList.contains("is-open")) o.open = false; }, 450); } });
      d.open = true;
      requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add("is-open")));
    }
  });
});

/* Botão flutuante aparece depois da hero */
const fab = document.querySelector(".wa-float");
const hero = document.querySelector(".hero");
if (fab && hero) new IntersectionObserver(([e]) => fab.classList.toggle("is-visible", !e.isIntersecting), { threshold: .1 }).observe(hero);

