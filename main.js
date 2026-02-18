const setsContainer = document.getElementById('sets-container');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Navigation Logic
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        
        // Update buttons
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update content
        tabContents.forEach(content => {
            if (content.id === target) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});

// Theme Management
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

function updateThemeIcons(theme) {
    if (theme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
});

// Lotto Generation
function getRangeClass(num) {
    if (num <= 10) return 'range-1';
    if (num <= 20) return 'range-11';
    if (num <= 30) return 'range-21';
    if (num <= 40) return 'range-31';
    return 'range-41';
}

function generateLottoSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function createSetElement(index, numbers) {
    const setDiv = document.createElement('div');
    setDiv.classList.add('number-set');
    
    const label = document.createElement('span');
    label.classList.add('set-label');
    label.textContent = String.fromCharCode(65 + index);
    setDiv.appendChild(label);
    
    const ballsContainer = document.createElement('div');
    ballsContainer.classList.add('balls');
    
    numbers.forEach(num => {
        const ball = document.createElement('div');
        ball.classList.add('ball', getRangeClass(num));
        ball.textContent = num;
        ballsContainer.appendChild(ball);
    });
    
    setDiv.appendChild(ballsContainer);
    return setDiv;
}

function displaySets() {
    setsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const numbers = generateLottoSet();
        const setElement = createSetElement(i, numbers);
        
        setElement.style.opacity = '0';
        setElement.style.transform = 'translateY(10px)';
        setElement.style.transition = `all 0.3s ease-out ${i * 0.1}s`;
        
        setsContainer.appendChild(setElement);
        
        requestAnimationFrame(() => {
            setElement.style.opacity = '1';
            setElement.style.transform = 'translateY(0)';
        });
    }
}

generateBtn.addEventListener('click', displaySets);

// Initial Load
displaySets();
