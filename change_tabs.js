/**
 * change_tabs.js
 * Lógica de interacción para la página de producto:
 *  - Cambio de pestañas "Producto" / "Imágenes"
 *  - Intercambio de imagen principal al hacer clic en una miniatura
 *  - Modal de imagen ampliada (lightbox)
 *
 * Nota: este archivo estaba vacío en el repositorio original (ds3peru/cisco),
 * por lo que los botones de pestañas y el modal de imágenes no funcionaban.
 * Se implementa aquí la funcionalidad completa, reutilizable en cualquier
 * página de producto que use los mismos IDs (img_main, information-section,
 * images-section, product-tab, images-tab, image-modal, modal-image).
 */

document.addEventListener('DOMContentLoaded', function () {
  initTabs();
});

/* -------------------- TABS: Producto / Imágenes -------------------- */
function initTabs() {
  const productTab = document.getElementById('product-tab');
  const imagesTab = document.getElementById('images-tab');
  const informationSection = document.getElementById('information-section');
  const imagesSection = document.getElementById('images-section');

  if (!productTab || !imagesTab) return;

  const activeClasses = ['bg-blue-600', 'text-white'];
  const inactiveClasses = ['bg-gray-100', 'text-gray-700'];

  function setActiveTab(activeBtn, inactiveBtn) {
    activeBtn.classList.remove(...inactiveClasses);
    activeBtn.classList.add(...activeClasses);
    inactiveBtn.classList.remove(...activeClasses);
    inactiveBtn.classList.add(...inactiveClasses);
  }

  productTab.addEventListener('click', function () {
    setActiveTab(productTab, imagesTab);
    if (informationSection) informationSection.classList.remove('hidden');
    if (imagesSection) imagesSection.classList.add('hidden');
  });

  imagesTab.addEventListener('click', function () {
    setActiveTab(imagesTab, productTab);
    if (imagesSection) imagesSection.classList.remove('hidden');
    if (informationSection) informationSection.classList.add('hidden');
  });
}

/* -------------------- GALERÍA: intercambiar imagen principal -------------------- */
function toExchangeImage(thumbnailImg) {
  const mainImg = document.getElementById('img_main');
  if (!mainImg || !thumbnailImg) return;
  mainImg.src = thumbnailImg.src;
  mainImg.alt = thumbnailImg.alt;
}

/* -------------------- MODAL: ver imagen ampliada -------------------- */
function viewImage(src) {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  if (!modal || !modalImage) return;
  modalImage.src = src;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('image-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Cerrar modal con la tecla Escape o haciendo clic fuera de la imagen
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

document.addEventListener('click', function (e) {
  const modal = document.getElementById('image-modal');
  if (modal && e.target === modal) closeModal();
});