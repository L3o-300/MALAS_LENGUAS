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

document.addEventListener('DOMContentLoaded', function() {
    function isMobileView() {
        return window.innerWidth <= 1024; 
    }
    
    const personajeImages = document.querySelectorAll(
        '.totakeke, .yayoi, .ladygagamini, .edwardmini, .rusowskymini, .dinomini'
    );
    
    if (typeof bootstrap === 'undefined') {
        console.error('Bootstrap no está cargado');
        return;
    }
    
    const loreModalElement = document.getElementById('loreModal');
    if (!loreModalElement) {
        console.error('No se encontró el modal #loreModal');
        return;
    }
    
    const loreModal = new bootstrap.Modal(loreModalElement);
    
    personajeImages.forEach(function(img) {
        img.addEventListener('click', function() {
            if (!isMobileView()) return;
            
            const section = this.closest('section');
            const lore = section.querySelector('.lore1');
            const title = section.querySelector('h3');
            
            if (lore && title) {
                document.getElementById('loreModalLabel').textContent = title.textContent;
                document.getElementById('loreModalBody').innerHTML = lore.innerHTML;
                
                loreModal.show();
            }
        });
    });
    
    window.addEventListener('resize', function() {
        if (!isMobileView()) {
            const modalInstance = bootstrap.Modal.getInstance(loreModalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    });
    
    console.log('Sistema de modales inicializado correctamente');
});
document.addEventListener('DOMContentLoaded', function() {
    const musicPlayer = document.getElementById('musicPlayer');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const minimizePlayer = document.getElementById('minimizePlayer');
    const trackName = document.getElementById('trackName');

    const playlist = [
        { src: "imagenes/musica/jesucristogarcia.mp3", name: 'Jesucristo García' },
        { src: "imagenes/musica/Just_Dance.mp3", name: 'Just Dance' },
        { src: "imagenes/musica/Backstabber.mp3", name: 'Backstabber' },
        { src: "imagenes/musica/SuperBass.mp3", name: 'Super Bass' }
    ];

    let currentTrack = 0;
    let isPlaying = false;
    let isMinimized = false;

    function loadTrack(index) {
        audioPlayer.src = playlist[index].src;
        trackName.textContent = playlist[index].name;
    }

    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.textContent = '▶';
            isPlaying = false;
        } else {
            audioPlayer.play();
            playPauseBtn.textContent = '⏸';
            isPlaying = true;
        }
    });

    prevBtn.addEventListener('click', function() {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrack);
        if (isPlaying) {
            audioPlayer.play();
        }
    });

    nextBtn.addEventListener('click', function() {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        if (isPlaying) {
            audioPlayer.play();
        }
    });

    minimizePlayer.addEventListener('click', function() {
        if (isMinimized) {
            musicPlayer.classList.remove('minimized');
            minimizePlayer.textContent = '−';
            isMinimized = false;
        } else {
            musicPlayer.classList.add('minimized');
            minimizePlayer.textContent = '+';
            isMinimized = true;
        }
    });

    audioPlayer.addEventListener('ended', function() {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        audioPlayer.play();
    });

    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    musicPlayer.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    musicPlayer.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);

    function dragStart(e) {
        if (e.target.classList.contains('music-btn') || 
            e.target.classList.contains('music-minimize')) {
            return;
        }

        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        isDragging = true;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, musicPlayer);
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    loadTrack(0);
});