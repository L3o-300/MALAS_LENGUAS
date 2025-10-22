document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded'); 
    const carrusel = document.querySelector('.ScrollCarrusel');
    const slides = Array.from(document.querySelectorAll('.TOTAKEKEMINI, .YAYOIMINI'));
    const prevBtn = document.querySelector('.prev-button');
    const nextBtn = document.querySelector('.next-button');

    if (!carrusel || !slides.length || !prevBtn || !nextBtn) {
        console.error('Elementos no encontrados');
        return;
    }

    console.log(`Encontrados ${slides.length} slides`); 

    let currentSlide = 0;

    function initializeSlides() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100}%)`;
        });
    }

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.style.transition = 'transform 0.5s ease-in-out';
            slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
        });
        updateButtons();
    }

    function updateButtons() {
        prevBtn.style.display = currentSlide === 0 ? 'none' : 'block';
        nextBtn.style.display = currentSlide === slides.length - 1 ? 'none' : 'block';
    }

    nextBtn.addEventListener('click', () => {
        console.log('Next clicked'); 
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlides();
        }
    });

    prevBtn.addEventListener('click', () => {
        console.log('Prev clicked'); 
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    });

   
    initializeSlides();
    updateButtons();

  
    console.log('Carrusel inicializado');

  
    function prevSlide() {
        if (currentIndex > 0) {

            gsap.to(slides[currentIndex], {
                x: '100%',
                opacity: 0.5,
                duration: 1,
                ease: 'power2.inOut'
            });

            currentIndex--;


            gsap.to(slides[currentIndex], {
                x: '0%',
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut'
            });

            updateButtonVisibility();
        }
    }


    function updateButtonVisibility() {
        prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentIndex === totalSlides - 1 ? 'none' : 'block';
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    updateButtonVisibility();

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
});
