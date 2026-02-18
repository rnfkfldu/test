// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

const generateBtn = document.getElementById('generate-story-btn');
const storyResult = document.getElementById('story-result');
const storyText = document.getElementById('story-text');
const copyBtn = document.getElementById('copy-btn');
const retryBtn = document.getElementById('retry-btn');

// --- Navigation Logic ---
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
                // Trigger reflow for animation if needed
                void content.offsetWidth;
                content.style.opacity = '1';
            } else {
                content.classList.remove('active');
                content.style.opacity = '0';
            }
        });
    });
});

// --- Theme Management ---
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

// --- Autobiography Generation Logic ---
function generateAutobiography(name, year, keywords, tone) {
    const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k);
    const key1 = keywordList[0] || '어린 시절';
    const key2 = keywordList[1] || '청춘';
    const key3 = keywordList[2] || '지금';

    // Simple Template Engine
    let intro, body, conclusion;

    if (tone === 'touching') {
        intro = `저의 이름은 ${name}입니다. ${year}년, 세상이 조금 더 느리게 흐르던 시절에 태어나 지금까지 쉼 없이 달려왔습니다. 돌이켜보면 낡은 흑백 사진처럼 흐릿하지만, 그 온기만큼은 여전히 가슴 한켠에 남아있습니다.`;
        body = `특히 '${key1}'에 대한 기억은 저를 지탱해준 뿌리와도 같습니다. 힘들 때마다 '${key2}'의 순간들을 떠올리며 다시 일어설 힘을 얻곤 했습니다. 삶이란 때로는 거친 파도 같았지만, 그 속에서도 '${key3}'(이)라는 보석 같은 순간들이 있어 행복했습니다.`;
        conclusion = `이제 저는 지나온 날들을 추억하며, 앞으로 남은 날들을 사랑하는 이들과 함께 채워가려 합니다. 이 글이 저의 작은 발자취가 되기를 바랍니다.`;
    } else if (tone === 'factual') {
        intro = `나는 ${name}이다. ${year}년에 태어났다. 격변하는 시대 속에서 나의 삶은 평범하면서도 특별한 역사였다.`;
        body = `나의 인생에서 가장 중요했던 키워드는 '${key1}', '${key2}', 그리고 '${key3}'이다. 이 세 가지는 내가 어떤 사람인지, 무엇을 위해 살았는지를 설명해주는 중요한 이정표다. '${key1}'을(를) 통해 세상을 배웠고, '${key2}'을(를) 겪으며 어른이 되었다.`;
        conclusion = `'${key3}'은(는) 지금의 나를 만든 마지막 퍼즐 조각이다. 묵묵히 걸어온 나의 길이 누군가에게 작은 교훈이 되기를 바란다.`;
    } else { // heroic
        intro = `${name}, ${year}년생. 그 해에는 수많은 생명이 태어났지만, 나의 삶은 그 자체로 하나의 투쟁이자 도전이었다.`;
        body = `운명은 나에게 '${key1}'이라는 시련을 주었지만 나는 굴하지 않았다. '${key2}'의 시기를 건너오며 나는 더 단단해졌다. 강철은 두드릴수록 강해지듯, 나의 의지는 꺾이지 않았다. 마침내 '${key3}'에 도달했을 때, 나는 비로소 승리감보다 더 깊은 평온을 맛보았다.`;
        conclusion = `나의 이야기는 아직 끝나지 않았다. 거친 비바람을 견뎌낸 고목처럼, 나는 오늘도 굳건히 이 자리에 서 있다.`;
    }

    return `${intro}\n\n${body}\n\n${conclusion}`;
}

generateBtn.addEventListener('click', () => {
    const name = document.getElementById('parent-name').value.trim();
    const year = document.getElementById('birth-year').value.trim();
    const keywords = document.getElementById('keywords').value.trim();
    const tone = document.getElementById('tone-select').value;

    if (!name || !year || !keywords) {
        alert('모든 정보를 입력해주세요.');
        return;
    }

    // Simulate Processing
    generateBtn.textContent = '이야기 엮는 중...';
    generateBtn.disabled = true;

    setTimeout(() => {
        const story = generateAutobiography(name, year, keywords, tone);
        
        // Typing Effect
        storyResult.classList.remove('hidden');
        storyText.textContent = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            storyText.textContent += story.charAt(i);
            i++;
            if (i >= story.length) {
                clearInterval(typeInterval);
                generateBtn.textContent = '다시 생성하기';
                generateBtn.disabled = false;
            }
        }, 30); // Speed of typing

    }, 1000); // Fake delay
});

// Copy Functionality
copyBtn.addEventListener('click', () => {
    const text = storyText.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '복사완료!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
});

retryBtn.addEventListener('click', () => {
    document.getElementById('parent-name').value = '';
    document.getElementById('birth-year').value = '';
    document.getElementById('keywords').value = '';
    storyResult.classList.add('hidden');
    document.getElementById('parent-name').focus();
});
