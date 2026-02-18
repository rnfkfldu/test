// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Step Elements
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');

const generateQuestionsBtn = document.getElementById('generate-questions-btn');
const generateBioBtn = document.getElementById('generate-biography-btn');
const questionsFeedbackList = document.getElementById('questions-for-answers');
const finalBioText = document.getElementById('final-biography');
const restartBtn = document.getElementById('restart-btn');
const copyBtn = document.getElementById('copy-btn');

// --- Navigation ---
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === target);
        });

        // Disqus Reset on Tab Switch
        if (target === 'community-section' && typeof DISQUS !== 'undefined') {
            DISQUS.reset({ reload: true });
        }
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

// --- Logic ---
let parentData = {};

generateQuestionsBtn.addEventListener('click', () => {
    const name = document.getElementById('parent-name').value.trim();
    const year = document.getElementById('birth-year').value;
    const location = document.getElementById('location').value.trim();
    const occupation = document.getElementById('occupation').value.trim();
    const traits = document.getElementById('traits').value.trim();
    const relationship = document.getElementById('relationship').value.trim();

    if (!name || !year || !location || !occupation || !traits || !relationship) {
        alert("모든 정보를 입력해주세요.");
        return;
    }

    parentData = { name, year, location, occupation, traits, relationship };

    // Generate 3 specific questions
    const traitArray = traits.split(',').map(t => t.trim());
    const primaryTrait = traitArray[0];

    const questions = [
        `${location}에서 보낸 어린 시절 중, 가장 선명하게 기억나는 소리나 냄새가 있는 '그날'의 장면을 설명해주실 수 있나요?`,
        `${occupation}을(를) 평생의 업으로 삼으면서, 가장 보람찼거나 혹은 남몰래 힘들어서 포기하고 싶었던 구체적인 순간은 언제였나요?`,
        `자녀에게 평소 '${relationship}'의 모습을 보여주셨지만, 사실 부모님 내면의 '${primaryTrait}'함을 유지하기 위해 스스로에게 가장 많이 했던 다짐은 무엇인가요?`
    ];

    questionsFeedbackList.innerHTML = questions.map((q, i) => `
        <div class="answer-box">
            <p>질문 ${i + 1}: ${q}</p>
            <textarea class="input-field textarea-field answer-input" placeholder="여기에 답변을 적어주세요..."></textarea>
        </div>
    `).join('');

    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    window.scrollTo(0, 0);
});

generateBioBtn.addEventListener('click', () => {
    const answers = Array.from(document.querySelectorAll('.answer-input')).map(input => input.value.trim());
    if (answers.some(a => !a)) {
        alert("모든 질문에 답변을 작성해주세요. 소중한 기억이 자서전의 거름이 됩니다.");
        return;
    }

    generateBioBtn.textContent = "이야기를 엮어 자서전을 쓰는 중...";
    generateBioBtn.disabled = true;

    setTimeout(() => {
        const bio = `
[ ${parentData.name}의 삶: 기억의 발굴 ]

${parentData.year}년, ${parentData.location}의 따스한 햇살 아래서 한 아이가 태어났습니다. 
이 아이는 훗날 누군가의 든든한 '${parentData.relationship}'이자, 세상을 '${parentData.traits}'하게 살아가는 어른이 되었습니다.

부모님은 기억합니다. ${answers[0]}
그 기억의 파편들이 모여 지금의 부드러운 미소가 되었습니다.

삶의 무게가 무거웠던 시절도 있었습니다. ${parentData.occupation}라는 이름으로 살아온 세월 속에서, 
부모님은 ${answers[1]} (이)라는 순간들을 견디고 이겨내며 가족의 울타리를 지켜오셨습니다.

무엇보다 우리가 몰랐던 부모님의 진심은 ${answers[2]} (이)라는 다짐 속에 있었습니다. 
그 깊은 속내를 이제야 문장으로 마주하며, 우리는 비로소 부모님이라는 거대한 세계를 이해하기 시작합니다.

이 기록은 단순히 한 개인의 역사가 아닌, 사랑과 헌신으로 써 내려간 우리 가족의 뿌리입니다.
        `.trim();

        finalBioText.textContent = bio;
        step2.classList.add('hidden');
        step3.classList.remove('hidden');
        generateBioBtn.textContent = "최종 자서전 생성하기";
        generateBioBtn.disabled = false;
        window.scrollTo(0, 0);
    }, 1500);
});

restartBtn.addEventListener('click', () => {
    step3.classList.add('hidden');
    step1.classList.remove('hidden');
    document.querySelectorAll('input, textarea').forEach(el => el.value = '');
    window.scrollTo(0, 0);
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(finalBioText.textContent).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "복사 완료!";
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
});
