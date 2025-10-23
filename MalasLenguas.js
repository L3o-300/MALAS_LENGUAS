document.addEventListener('DOMContentLoaded', () => {
    const carrusel = document.querySelector('.ScrollCarrusel');
    const slides = carrusel ? Array.from(carrusel.querySelectorAll('section')) : [];
    const prevBtn = document.querySelector('.prev-button');
    const nextBtn = document.querySelector('.next-button');

    if (!carrusel) return console.error('No se encontró .ScrollCarrusel');
    if (!slides.length) return console.error('No se encontraron slides en el carrusel');
    if (!prevBtn || !nextBtn) return console.error('No se encontraron botones de navegación');

    let current = 0;

    function init() {
        slides.forEach((s, i) => {
            gsap.set(s, { x: `${i * 100}%` });
            s.classList.remove('active');
        });
        slides[current].classList.add('active');
    }

    function goTo(targetIndex) {
        const total = slides.length;
        const newIndex = ((targetIndex % total) + total) % total;
        current = newIndex;

        slides.forEach((slide, i) => {
            const offset = (i - current) * 100;
            gsap.to(slide, { x: `${offset}%`, duration: 0.6, ease: 'power2.inOut' });
            slide.classList.toggle('active', i === current);
        });
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goTo(current + 1);
        if (e.key === 'ArrowLeft') goTo(current - 1);
    });

    let startX = null;
    carrusel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    carrusel.addEventListener('touchend', (e) => {
        if (startX === null) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 30) {
            if (diff > 0) goTo(current + 1);
            else goTo(current - 1);
        }
        startX = null;
    });

    init();
    goTo(0);

    console.log(`Carrusel inicializado con ${slides.length} slides`);
});

document.addEventListener('DOMContentLoaded', function() {

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    

    const rightCenter = {
        x: windowWidth - 100, 
        y: windowHeight / 2   
    };
    const bottomLeft = {
        x: 0,                
        y: windowHeight  
    };
    const start = {
        x: 0,                 
        y: 0                  
    };


    const tl = gsap.timeline({
        repeat: -1,           
        defaults: {
            duration: 4,     
            ease: "power1.inOut" 
        }
    });


    tl.to("#dvd", {
        x: rightCenter.x,
        y: rightCenter.y,
        duration: 4
    })
    .to("#dvd", {
        x: bottomLeft.x,
        y: bottomLeft.y,
        duration: 4
    })
    .to("#dvd", {
        x: rightCenter.x,
        y: rightCenter.y,
        duration: 4
    })
    .to("#dvd", {
        x: start.x,
        y: start.y,
        duration: 4
    });
});
