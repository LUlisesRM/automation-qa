const track = document.getElementById('carousel-track');
  const leftBtn = document.getElementById('carousel-left');
  const rightBtn = document.getElementById('carousel-right');

  let scrollAmount = 0;
  const scrollStep = 270; // ancho + gap

  rightBtn.addEventListener('click', () => {
    scrollAmount += scrollStep;
    track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  });

  leftBtn.addEventListener('click', () => {
    scrollAmount -= scrollStep;
    if (scrollAmount < 0) scrollAmount = 0;
    track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  });
