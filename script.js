let currentStep = 1;

function nextStep(step) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    
    // Update current step
    currentStep = step;
    
    // Show next step
    const nextStepEl = document.getElementById(`step-${currentStep}`);
    if (nextStepEl) {
        nextStepEl.classList.add('active');
    }

    // Show header and update progress from step 2 onwards
    const header = document.getElementById('main-header');
    if (currentStep >= 2) {
        header.style.display = 'block';
        updateProgress();
    } else {
        header.style.display = 'none';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
    const progressBar = document.getElementById('progress');
    // Total steps is now 19
    const steps = {
        2: 5,
        3: 10,
        4: 15,
        5: 20,
        6: 25,
        7: 30,
        8: 35,
        9: 40,
        10: 45,
        11: 50,
        12: 55,
        13: 60,
        14: 65,
        15: 70,
        16: 75,
        17: 80,
        18: 90,
        19: 100
    };
    
    if (steps[currentStep]) {
        progressBar.style.width = steps[currentStep] + '%';
    }
}

function startLoading() {
    nextStep(17);
    let p1 = 0;
    let p2 = 0;
    
    const interval = setInterval(() => {
        if (p1 < 100) {
            p1 += Math.floor(Math.random() * 5) + 1;
            if (p1 > 100) p1 = 100;
            document.getElementById('bar1').style.width = p1 + '%';
            document.getElementById('percent1').innerText = p1 + '%';
        }
        
        if (p1 > 40 && p2 < 100) {
            p2 += Math.floor(Math.random() * 3) + 1;
            if (p2 > 100) p2 = 100;
            document.getElementById('bar2').style.width = p2 + '%';
            document.getElementById('percent2').innerText = p2 + '%';
        }

        if (p1 === 100 && p2 === 100) {
            clearInterval(interval);
            setTimeout(() => {
                nextStep(18);
            }, 800);
        }
    }, 100);
}

function validateStep8() {
    const selected = document.querySelectorAll('#step-8 .check-item.selected');
    if (selected.length > 0) {
        nextStep(9);
    } else {
        alert("Por favor, seleccioná al menos un síntoma para continuar.");
    }
}

function validateStep12() {
    const selected = document.querySelectorAll('#step-12 .btn-med.selected');
    if (selected.length > 0) {
        nextStep(13);
    } else {
        alert("Por favor, seleccioná al menos una opción para continuar.");
    }
}

function finish() {
    alert("¡Evaluación completada! Serás redirigido al protocolo.");
    // Here you would redirect to the next part of the funnel
}

function goToCheckout() {
    window.location.href = "https://zuckpay.com.br/checkout/protocolo-de-vida-saludable";
}

function toggleCheck(el) {
    el.classList.toggle('selected');
}

function toggleMed(el) {
    el.classList.toggle('selected');
}

function toggleAudio(id, el) {
    const audio = document.getElementById(id);
    const playBtn = el.querySelector('.play-btn');
    const waveBars = el.querySelectorAll('.wave-bar');

    if (audio.paused) {
        audio.play();
        playBtn.innerText = '⏸';
        waveBars.forEach((bar, index) => {
            bar.style.animation = `wave 1s infinite ease-in-out ${index * 0.1}s`;
        });
    } else {
        audio.pause();
        playBtn.innerText = '▶';
        waveBars.forEach(bar => {
            bar.style.animation = 'none';
        });
    }

    audio.onended = () => {
        playBtn.innerText = '▶';
        waveBars.forEach(bar => {
            bar.style.animation = 'none';
        });
    };
}

// Carousel Logic
let carouselIndex = 0;
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    const images = document.querySelectorAll('.carousel-track img');
    
    if (!track || images.length === 0) return;

    function updateCarousel() {
        track.style.transform = `translateX(-${carouselIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === carouselIndex);
        });
    }

    // Auto play
    setInterval(() => {
        carouselIndex = (carouselIndex + 1) % images.length;
        updateCarousel();
    }, 3000);

    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            carouselIndex = index;
            updateCarousel();
        });
    });
}

// Initialize on load
window.addEventListener('load', () => {
    initCarousel();
});
