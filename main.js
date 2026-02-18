// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

const generateBtn = document.getElementById('generate-questions-btn');
const resultContainer = document.getElementById('result-container');
const questionsList = document.getElementById('questions-list');
const resultTitle = document.getElementById('result-title');
const copyBtn = document.getElementById('copy-btn');
const retryBtn = document.getElementById('retry-btn');

// --- Navigation & Theme (Existing logic) ---
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(content => content.classList.toggle('active', content.id === target));
    });
});

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

// --- Parental Memory Excavation Engine (Refined) ---
function generateExcavationQuestions(birthYear, location, occupation, traits, relationship) {
    const traitList = traits.split(',').map(t => t.trim());
    const primaryTrait = traitList[0] || "성실함";
    
    // Scene-based, sensory-focused, emotionally revealing questions
    const questions = [
        `1. ${location}에서 가장 크게 혼났거나 부끄러웠던 날, 숨어있던 장소의 냄새나 발끝에 닿았던 감촉이 기억나시나요?`,
        `2. ${occupation}을 시작하고 처음으로 '나도 이제 어른이구나'라고 느꼈던 그날, 퇴근길에 보았던 풍경이나 당신이 입고 있던 옷은 무엇이었나요?`,
        `3. 사람들은 당신을 '${primaryTrait}'한 분이라 하지만, 사실 마음속 깊이 가장 두려워했던 순간이나 그때 당신을 붙잡아준 작은 습관이 있었나요?`,
        `4. ${relationship}라는 역할 뒤에 숨겨진, 오직 '청년'이었던 당신이 가장 빛나던 순간에 찍힌 사진 한 장이 있다면 그 안의 당신은 어떤 표정을 짓고 있나요?`,
        `5. 인생의 큰 전환점이 되었던 그날, 결정을 내리고 난 직후 처음으로 먹었던 음식의 맛이나 그때 주변에서 들려오던 소리를 기억하시나요?`
    ];

    return questions.join('\n\n');
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

    // Exact Title Format
    resultTitle.textContent = "[Title] Questions to uncover the unknown youth of your parent";
    
    generateBtn.textContent = "기억의 장면을 발굴하는 중...";
    generateBtn.disabled = true;

    setTimeout(() => {
        const questions = generateExcavationQuestions(birthYear, location, occupation, traits, relationship);
        
        resultContainer.classList.remove('hidden');
        questionsList.textContent = '';
        
        let i = 0;
        const interval = setInterval(() => {
            questionsList.textContent += questions[i];
            i++;
            if (i >= questions.length) {
                clearInterval(interval);
                generateBtn.textContent = "새로운 질문 발굴하기";
                generateBtn.disabled = false;
            }
        }, 15);
    }, 800);
});

// Utilities
copyBtn.addEventListener('click', () => {
    const textToCopy = `${resultTitle.textContent}\n\n${questionsList.textContent}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "복사 완료!";
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
});

retryBtn.addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
