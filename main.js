// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

const generateBtn = document.getElementById('generate-questions-btn');
const resultContainer = document.getElementById('result-container');
const questionsList = document.getElementById('questions-list');
const copyBtn = document.getElementById('copy-btn');
const retryBtn = document.getElementById('retry-btn');

// --- Navigation ---
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === target);
        });
    });
});

// --- Theme ---
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

function updateThemeIcons(theme) {
    sunIcon.style.display = theme === 'dark' ? 'none' : 'block';
    moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
});

// --- Excavation Engine Core Logic ---
function generateExcavationQuestions(birthYear, location, occupation, traits, relationship) {
    const era = birthYear < 1960 ? "흑백 사진 같던 시절" : (birthYear < 1980 ? "산업화의 소음이 가득하던 시절" : "격변하는 시대");
    const traitList = traits.split(',').map(t => t.trim());
    const primaryTrait = traitList[0] || "침착함";

    // Logic for generating scene-based questions
    return [
        `1. ${location}에서 가장 추웠던 겨울날, 어린 당신이 추위를 뚫고 달려가던 그 장소엔 무엇이 있었나요?`,
        `2. ${occupation}을 하며 처음으로 '내 손으로 번 돈'을 쥐었을 때, 그 지폐의 감촉과 함께 떠오르는 첫 구매 품목은 무엇인가요?`,
        `3. 스스로를 '${primaryTrait}'한 사람이라 정의하기까지, 남몰래 울음을 삼켰거나 혹은 큰 소리로 웃음을 터뜨렸던 딱 한 장면이 있다면요?`,
        `4. ${relationship} 관계에서 벗어나 한 명의 청년으로서, 세상에 나가기 전 거울을 보며 매만졌던 당신의 모습은 어떠했나요?`,
        `5. 인생이라는 긴 여정에서 ${location}을(를) 떠나기로 결심했던 그 새벽, 혹은 그 기차역에서 맡았던 공기의 냄새를 기억하시나요?`
    ].join('\n\n');
}

generateBtn.addEventListener('click', () => {
    const birthYear = document.getElementById('birth-year').value;
    const location = document.getElementById('location').value.trim();
    const occupation = document.getElementById('occupation').value.trim();
    const traits = document.getElementById('traits').value.trim();
    const relationship = document.getElementById('relationship').value.trim();

    if (!birthYear || !location || !occupation || !traits || !relationship) {
        alert("모든 필드를 입력해 주세요.");
        return;
    }

    generateBtn.textContent = "기억의 파편을 모으는 중...";
    generateBtn.disabled = true;

    setTimeout(() => {
        const questions = generateExcavationQuestions(birthYear, location, occupation, traits, relationship);
        
        resultContainer.classList.remove('hidden');
        questionsList.textContent = '';
        
        // Staggered typing effect for the list
        let i = 0;
        const interval = setInterval(() => {
            questionsList.textContent += questions[i];
            i++;
            if (i >= questions.length) {
                clearInterval(interval);
                generateBtn.textContent = "다시 발굴하기";
                generateBtn.disabled = false;
            }
        }, 15);
    }, 800);
});

// Utilities
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(questionsList.textContent).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "복사 완료!";
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
});

retryBtn.addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
