const WHATS_NUMBER = '554184763850';
const DEFAULT_MESSAGE = 'Olá! Gostaria de fazer uma encomenda.';

const modal = document.querySelector('[data-modal]');
const modalText = modal?.querySelector('[data-modal-text]');
const modalWhats = modal?.querySelector('[data-modal-whatsapp]');

function openWhats(message = DEFAULT_MESSAGE) {
  const text = encodeURIComponent(message);
  const url = `https://wa.me/${WHATS_NUMBER}?text=${text}`;
  window.open(url, '_blank');
}

function openModal(message = DEFAULT_MESSAGE) {
  if (!modal || !modalText || !modalWhats) return;

  modalText.textContent = message;
  modalWhats.dataset.message = message;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  modalWhats.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

function bindWhatsButtons() {
  document.querySelectorAll('[data-whatsapp]').forEach((button) => {
    const message = button.dataset.message || DEFAULT_MESSAGE;
    button.addEventListener('click', () => openWhats(message));
  });
}

function bindPedidoButtons() {
  document.querySelectorAll('[data-pedido]').forEach((button) => {
    const message = button.dataset.message || DEFAULT_MESSAGE;
    button.addEventListener('click', () => openModal(message));
  });
}

function bindModalControls() {
  if (!modal) return;

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modalWhats?.addEventListener('click', (event) => {
    const message = event.currentTarget.dataset.message || DEFAULT_MESSAGE;
    openWhats(message);
    closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('show')) {
      closeModal();
    }
  });
}

function bindContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = form.querySelector('#nome')?.value.trim();
    const telefone = form.querySelector('#telefone')?.value.trim();
    const pedido = form.querySelector('#pedido')?.value.trim();
    const mensagem = form.querySelector('#msg')?.value.trim();

    if (!nome || !telefone) {
      alert('Preencha nome e telefone.');
      return;
    }

    let texto = `Olá, meu nome é ${nome}. Gostaria de fazer uma encomenda.`;
    if (pedido) texto += ` Pedido: ${pedido}.`;
    if (mensagem) texto += ` Observações: ${mensagem}.`;
    texto += ` (telefone: ${telefone})`;

    openWhats(texto);
  });
}

function init() {
  bindWhatsButtons();
  bindPedidoButtons();
  bindModalControls();
  bindContactForm();
}

document.addEventListener('DOMContentLoaded', init);
