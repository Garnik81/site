document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll('.slide');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.display = 'block';
        slide.style.opacity = 1;
      } else {
        slide.style.display = 'none';
        slide.style.opacity = 0;
      }
    });
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
    currentIndex = nextIndex;
  }

  showSlide(currentIndex);
  setInterval(nextSlide, 5000); // Смена каждые 5 секунд
});
