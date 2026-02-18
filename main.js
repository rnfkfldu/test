// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Step Containers (Writer Section)
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');

// Buttons
const toStep2Btn = document.getElementById('to-step-2-btn');
const toStep3Btn = document.getElementById('to-step-3-btn');
const restartBtn = document.getElementById('restart-btn');
const copyBtn = document.getElementById('copy-btn');

// --- Navigation ---
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        
        // Update Buttons
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Switch Sections (Strict Isolation)
        tabContents.forEach(content => {
            if (content.id === target) {
                content.classList.add('active');
                content.style.display = 'block'; // Ensure visibility
                
                // Disqus Reset
                if (target === 'community-section' && typeof DISQUS !== 'undefined') {
                    DISQUS.reset({ reload: true });
                }
            } else {
                content.classList.remove('active');
                content.style.display = 'none'; // Ensure isolation
            }
        });
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// --- Theme Management ---
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

// --- Multimedia Handling ---
let photoUrl = null;
let voiceUrl = null;

document.getElementById('photo-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        photoUrl = URL.createObjectURL(file);
        document.getElementById('photo-name').textContent = `✅ ${file.name}`;
    }
});

document.getElementById('voice-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        voiceUrl = URL.createObjectURL(file);
        document.getElementById('voice-name').textContent = `✅ ${file.name}`;
    }
});

// --- Biography Engine Logic ---
let parentData = {};

toStep2Btn.addEventListener('click', () => {
    const name = document.getElementById('parent-name').value.trim();
    const year = document.getElementById('birth-year').value;
    const location = document.getElementById('location').value.trim();
    const occupation = document.getElementById('occupation').value.trim();
    const traits = document.getElementById('traits').value.trim();

    if (!name || !year || !location || !occupation || !traits) {
        alert("모든 필수 정보를 입력해주세요.");
        return;
    }

    parentData = { name, year, location, occupation, traits };

    // Questions Generation (Scene-based & Sensory)
    const questionsArea = document.getElementById('questions-area');
    const traitList = traits.split(',').map(t => t.trim());
    const mainTrait = traitList[0] || "침착함";

    const questions = [
        `1. ${location}에서 보낸 가장 추웠던 겨울날, 어린 당신의 기억 속 대문 밖 풍경은 어떠했나요?`,
        `2. ${occupation}이라는 이름으로 살아가며 처음으로 자부심을 느꼈던 그날, 손끝에 닿았던 사물이나 들려오던 소리를 기억하시나요?`,
        `3. 삶의 중심을 지켜온 '${mainTrait}'함이라는 힘 뒤에, 당신이 가장 남몰래 삼켜야 했던 감정은 무엇이었나요?`
    ];

    questionsArea.innerHTML = questions.map((q, i) => `
        <div class="form-group" style="margin-bottom: 2.5rem; animation: fadeIn 0.4s ease ${i * 0.1}s forwards;">
            <label style="font-size: 1.15rem; color: var(--text); line-height: 1.5; margin-bottom: 1rem; display: block;">${q}</label>
            <textarea class="input-field answer-input" style="min-height: 140px; resize: none; font-size: 1rem;" placeholder="답변을 입력해주세요..."></textarea>
        </div>
    `).join('');

    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

toStep3Btn.addEventListener('click', () => {
    const answers = Array.from(document.querySelectorAll('.answer-input')).map(a => a.value.trim());
    if (answers.some(a => !a)) {
        alert("모든 질문에 답을 해주시면 더욱 감동적인 자서전이 됩니다.");
        return;
    }

    toStep3Btn.textContent = "자서전을 정성껏 엮는 중...";
    toStep3Btn.disabled = true;

    setTimeout(() => {
        const resultMedia = document.getElementById('result-media');
        const biographyText = document.getElementById('biography-text');

        resultMedia.innerHTML = '';
        if (photoUrl) {
            const img = document.createElement('img');
            img.src = photoUrl;
            img.classList.add('profile-img');
            resultMedia.appendChild(img);
        }
        if (voiceUrl) {
            const audio = document.createElement('audio');
            audio.src = voiceUrl;
            audio.controls = true;
            audio.style.width = '260px';
            audio.style.marginTop = '1rem';
            resultMedia.appendChild(audio);
        }

        const bio = `
[ ${parentData.name}의 삶: 기억의 발굴 ]

${parentData.year}년, ${parentData.location}의 공기 속에서 한 아이가 태어났습니다. 
이 아이는 훗날 세상을 '${parentData.traits}'하게 살아가는 어른이 되었습니다.

부모님은 기억합니다. ${answers[0]}
그 기억의 파편들이 모여 지금의 부드러운 미소가 되었습니다.

삶의 무게가 무거웠던 시절도 있었습니다. ${parentData.occupation}라는 이름으로 살아온 세월 속에서, 
부모님은 ${answers[1]} (이)라는 순간들을 견디고 이겨내며 가족의 울타리를 지켜오셨습니다.

무엇보다 우리가 몰랐던 부모님의 진심은 ${answers[2]} (이)라는 다짐 속에 있었습니다. 
그 깊은 속내를 이제야 문장으로 마주하며, 우리는 비로소 부모님이라는 거대한 세계를 이해하기 시작합니다.

이 기록은 단순히 한 개인의 역사가 아닌, 사랑과 헌신으로 써 내려간 우리 가족의 뿌리입니다.
        `.trim();

        biographyText.textContent = bio;
        step2.classList.add('hidden');
        step3.classList.remove('hidden');
        toStep3Btn.textContent = "자서전 완성하기";
        toStep3Btn.disabled = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
});

restartBtn.addEventListener('click', () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    if (voiceUrl) URL.revokeObjectURL(voiceUrl);
    photoUrl = null; voiceUrl = null;
    
    step3.classList.add('hidden');
    step1.classList.remove('hidden');
    document.querySelectorAll('.input-field').forEach(el => el.value = '');
    document.getElementById('photo-name').textContent = "사진 첨부";
    document.getElementById('voice-name').textContent = "음성 첨부";
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('biography-text').textContent).then(() => {
        const original = copyBtn.textContent;
        copyBtn.textContent = "✅ 복사 완료";
        setTimeout(() => copyBtn.textContent = original, 2000);
    });
});
