/**
 * 《艾瑟蘭大陸 Eseran》第一章：雲川城的吟遊詩人
 * 互動式小說章節引擎 (Interactive Novel Stage Engine)
 * 技術：純原生 JavaScript (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 一、核心資料庫：人物誌與章節故事事件 (Centralized Data)
  // =========================================================================
  const characters = {
    bibi: {
      id: 'bibi',
      name: '鼻鼻',
      title: '雲川城流浪詩人',
      role: '吟遊詩人',
      weapon: '梧桐七弦琴（冰蠶絲弦）',
      ability: '萬聲之耳（聽見強烈誓約與殘留遠古之音）',
      item: '古老銀蛇護符',
      icon: '🎻',
      desc: '雲川城最不起眼的吟遊詩人。隨性幽默、極擅察言觀色，喜歡蒐集各地不為人知的怪誕傳說與殘破古謠。極度討厭惹麻煩，最大的願望只是賺足房租與熱湯錢，卻在絕境中無意間撥動了開啟封印的失落音律。'
    },
    fanfan: {
      id: 'fanfan',
      name: '汎汎',
      title: '前帝國秘館研究學者',
      role: '秘紋術師',
      weapon: '古代幾何符文重構術',
      ability: '解讀古代碑文、破譯秘術封印、解析失落法則',
      item: '銀蛇之頁（古代不朽神金）',
      status: '蒼龍帝國最高通緝中',
      icon: '❄️',
      desc: '極為罕見的秘紋術師。原受雇於帝國研究機構，在北方冰原出土的遠古石板上破譯出推翻五聖神話的禁忌文字，發現「銀蛇可能並非惡神」的震驚真相，攜帶「銀蛇之頁」亡命逃亡至雲川城。'
    }
  };

  const storyEvents = [
    'cityNight',
    'bardSong',
    'tippingHat',
    'fanfanEntrance',
    'guardSearch',
    'silverSnakeReveal',
    'ancientMelody',
    'blackoutEcho',
    'secretPassage',
    'escapeBanter',
    'glyphPuzzle',
    'silverPageReveal',
    'chapterEnd'
  ];

  // =========================================================================
  // 二、Canvas 背景氛圍微粒 (夜色薄霧與燭火微光)
  // =========================================================================
  const canvas = document.getElementById('atmosphere-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Mote {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.8;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -Math.random() * 0.3 - 0.1;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.fade = Math.random() * 0.004 + 0.001;
      this.isAmber = Math.random() > 0.4;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.fade;
      if (this.alpha <= 0 || this.y < 0) {
        this.reset();
        this.y = canvas.height + 5;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.isAmber 
        ? `rgba(245, 158, 11, ${this.alpha})` // 溫暖燭光金
        : `rgba(203, 209, 216, ${this.alpha * 0.8})`; // 月色銀白
      ctx.fill();
    }
  }

  function initMotes() {
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 18), 60);
    for (let i = 0; i < count; i++) {
      particles.push(new Mote());
    }
  }
  initMotes();

  function loopMotes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animId = requestAnimationFrame(loopMotes);
  }
  loopMotes();

  // =========================================================================
  // 三、開場：雲川城夜色與遠方雷光定時器
  // =========================================================================
  const lightningFlash = document.getElementById('lightning-flash');

  function triggerRandomLightning() {
    if (lightningFlash) {
      lightningFlash.classList.add('active');
      playSynthesizedSound('thunder');
      setTimeout(() => {
        lightningFlash.classList.remove('active');
      }, 600);
    }
    // 每 15~28 秒隨機閃爍一次
    const nextInterval = Math.random() * 13000 + 15000;
    setTimeout(triggerRandomLightning, nextInterval);
  }
  setTimeout(triggerRandomLightning, 4000);

  // 頂部導航滾動感知
  const novelNav = document.getElementById('novel-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      novelNav.classList.add('nav-scrolled');
    } else {
      novelNav.classList.remove('nav-scrolled');
    }
  });

  // =========================================================================
  // 四、側邊欄控制（人物誌 & 世界誌）
  // =========================================================================
  const characterDossier = document.getElementById('character-dossier');
  const worldDrawer = document.getElementById('world-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  const btnOpenDossier = document.getElementById('btn-open-dossier');
  const btnCloseDossier = document.getElementById('btn-close-dossier');
  const btnOpenWorld = document.getElementById('btn-open-world-drawer');
  const btnCloseWorld = document.getElementById('btn-close-world-drawer');
  const dossierContent = document.getElementById('dossier-content');

  // 動態注入人物誌
  function renderDossier() {
    dossierContent.innerHTML = '';
    ['bibi', 'fanfan'].forEach(key => {
      const c = characters[key];
      const card = document.createElement('div');
      card.className = 'dossier-card';
      card.innerHTML = `
        <div class="dossier-head">
          <div class="dossier-avatar"><span>${c.icon}</span></div>
          <div class="dossier-title-box">
            <h4>${c.name}</h4>
            <span class="dossier-role">${c.title}・${c.role}</span>
          </div>
        </div>
        <div class="dossier-row"><strong>攜帶物件：</strong>${c.item}</div>
        <div class="dossier-row"><strong>主要能力：</strong>${c.ability}</div>
        ${c.status ? `<div class="dossier-row" style="color:#f87171;"><strong>當前狀態：</strong>${c.status}</div>` : ''}
        <div class="dossier-row" style="margin-top:0.8rem; font-size:0.85rem; line-height:1.7;">${c.desc}</div>
      `;
      dossierContent.appendChild(card);
    });
  }
  renderDossier();

  function openDrawer(drawer) {
    drawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAllDrawers() {
    characterDossier.classList.remove('open');
    worldDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  btnOpenDossier.addEventListener('click', () => openDrawer(characterDossier));
  btnCloseDossier.addEventListener('click', closeAllDrawers);
  btnOpenWorld.addEventListener('click', () => openDrawer(worldDrawer));
  btnCloseWorld.addEventListener('click', closeAllDrawers);
  drawerBackdrop.addEventListener('click', closeAllDrawers);

  // =========================================================================
  // 五、鼻鼻的日常互動：賞錢帽與內心旁白
  // =========================================================================
  const btnTipCoin = document.getElementById('btn-tip-coin');
  const feltHat = document.getElementById('felt-hat');
  const coinContainer = document.getElementById('hat-coin-container');
  const incomeCount = document.getElementById('income-count');
  const thoughtText = document.getElementById('thought-text');

  let currentCoins = 17;
  let tipClickCount = 0;

  const bibiThoughts = [
    "「嗯……今晚房租有著落了。」",
    "「如果那桌商人再喝兩杯，也許會多一枚銀幣。」",
    "「明早可以去碼頭買一碗熱騰騰的清蒸鮮魚湯了！」",
    "「那個剛進門穿黑斗篷的人，神情好緊繃……希望今晚不要出事。」",
    "「等等，遠處石橋那邊好像傳來好多馬蹄聲……？」"
  ];

  function addCoin() {
    currentCoins++;
    tipClickCount++;
    incomeCount.textContent = currentCoins;

    // 動態產生墜落金幣特效
    const coinEl = document.createElement('span');
    coinEl.className = 'dropping-coin';
    coinEl.textContent = '🪙';
    coinEl.style.left = `${Math.random() * 40 + 25}px`;
    coinContainer.appendChild(coinEl);

    setTimeout(() => {
      coinEl.remove();
    }, 700);

    // 切換鼻鼻的碎碎念
    const thoughtIdx = Math.min(tipClickCount - 1, bibiThoughts.length - 1);
    thoughtText.textContent = bibiThoughts[thoughtIdx];

    playSynthesizedSound('coin');
  }

  btnTipCoin.addEventListener('click', addCoin);
  feltHat.addEventListener('click', addCoin);

  // =========================================================================
  // 六、劇情推進：汎汎闖入事件
  // =========================================================================
  const btnTriggerFanfan = document.getElementById('btn-trigger-fanfan');
  const sceneIntrusion = document.getElementById('scene-intrusion');
  const doorSlamFx = document.getElementById('door-slam-fx');
  const fanfanSpotlight = document.getElementById('fanfan-spotlight');

  btnTriggerFanfan.addEventListener('click', () => {
    sceneIntrusion.scrollIntoView({ behavior: 'smooth' });
    triggerIntrusionDrama();
  });

  function triggerIntrusionDrama() {
    playSynthesizedSound('doorCrash');

    // 畫面震動
    document.body.style.animation = 'screenShake 0.4s ease';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 450);

    // 聚焦汎汎
    if (fanfanSpotlight) {
      fanfanSpotlight.style.transform = 'scale(1.02)';
      fanfanSpotlight.style.borderColor = '#38bdf8';
      setTimeout(() => {
        fanfanSpotlight.style.transform = '';
      }, 800);
    }
  }

  // =========================================================================
  // 七、帝國秘衛搜查進度條互動
  // =========================================================================
  const btnContinueSearch = document.getElementById('btn-continue-search');
  const searchDistance = document.getElementById('search-distance');
  const searchProgressBar = document.getElementById('search-progress-bar');
  const dialogueTheater = document.getElementById('dialogue-theater');

  const searchSteps = [
    { distance: '80 公尺', progress: '25%', label: '士兵在門口封鎖盤查……' },
    { distance: '60 公尺', progress: '50%', label: '士兵掀翻了第三桌商人的貨箱……' },
    { distance: '30 公尺', progress: '75%', label: '長劍出鞘聲已在五步之外！' },
    { distance: '10 公尺', progress: '100%', label: '軍官手按刀柄，正朝木台直步走來！' }
  ];
  let currentSearchStep = 0;

  btnContinueSearch.addEventListener('click', () => {
    currentSearchStep++;
    if (currentSearchStep < searchSteps.length) {
      const step = searchSteps[currentSearchStep];
      searchDistance.textContent = `距離木台：${step.distance}`;
      searchProgressBar.style.width = step.progress;
      btnContinueSearch.querySelector('span').textContent = step.label;
      playSynthesizedSound('footsteps');
    } else {
      btnContinueSearch.disabled = true;
      btnContinueSearch.querySelector('span').textContent = '⚠️ 軍官已立於身前！';
      // 平滑引導至銀蛇之頁發現區
      const nextSection = document.getElementById('scene-serpent-revelation');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // =========================================================================
  // 八、古音激盪、全黑屏與「萬聲之耳」揭曉
  // =========================================================================
  const btnPlayAncientMelody = document.getElementById('btn-play-ancient-melody');
  const melodyWaves = document.getElementById('melody-waves');
  const blackoutScreen = document.getElementById('blackout-screen');
  const tenThousandVoice = document.getElementById('ten-thousand-voice');
  const sceneCatacombs = document.getElementById('scene-catacombs');
  let hasPlayedMelody = false;

  btnPlayAncientMelody.addEventListener('click', () => {
    if (hasPlayedMelody) return;
    hasPlayedMelody = true;

    btnPlayAncientMelody.disabled = true;
    melodyWaves.classList.add('active');

    // 播放神秘失落旋律 (古音五重琶音)
    playAncientLuteChord();

    // 1.5 秒後燈火驟熄，全黑屏降臨
    setTimeout(() => {
      blackoutScreen.classList.add('active');
    }, 1500);

    // 2.8 秒後「逃」字自遠古深淵緩緩浮現
    setTimeout(() => {
      tenThousandVoice.classList.add('visible');
      const sub = blackoutScreen.querySelector('.voice-subtext');
      if (sub) sub.classList.add('visible');
      playSynthesizedSound('whisper');
    }, 2800);

    // 5.5 秒後黑屏退去，密道開啟震顫
    setTimeout(() => {
      blackoutScreen.classList.remove('active');
      document.body.style.animation = 'screenShake 0.7s ease';
      setTimeout(() => { document.body.style.animation = ''; }, 750);
      sceneCatacombs.scrollIntoView({ behavior: 'smooth' });
    }, 5500);
  });

  // =========================================================================
  // 九、秘紋術師解謎：破解三道古代石門封印
  // =========================================================================
  const glyphBtn1 = document.getElementById('glyph-btn-1');
  const glyphBtn2 = document.getElementById('glyph-btn-2');
  const glyphBtn3 = document.getElementById('glyph-btn-3');
  const puzzleFeedback = document.getElementById('puzzle-feedback');

  glyphBtn1.addEventListener('click', () => {
    glyphBtn1.classList.add('solved');
    glyphBtn1.disabled = true;
    glyphBtn2.disabled = false;
    puzzleFeedback.textContent = '汎汎：『第一道【門・Porta】解析成功，古代軸芯開始偏轉……』';
    playSynthesizedSound('glyph');
  });

  glyphBtn2.addEventListener('click', () => {
    glyphBtn2.classList.add('solved');
    glyphBtn2.disabled = true;
    glyphBtn3.disabled = false;
    puzzleFeedback.textContent = '汎汎：『第二道【記憶・Memoria】重構完成，鎖死的三百年機括已鬆脫！』';
    playSynthesizedSound('glyph');
  });

  glyphBtn3.addEventListener('click', () => {
    glyphBtn3.classList.add('solved');
    glyphBtn3.disabled = true;
    puzzleFeedback.innerHTML = '<strong>汎汎：『第三道【守望・Vigil】契合！石門開啟，快走！』</strong>';
    playSynthesizedSound('doorCrash');
  });

  // =========================================================================
  // 十、終章：3D 翻轉銀蛇之頁與懸念揭曉
  // =========================================================================
  const metalPageCard = document.getElementById('metal-page-card');
  const cliffhangerBox = document.getElementById('cliffhanger-box');
  const chLine1 = document.getElementById('ch-line-1');
  const chLine2 = document.getElementById('ch-line-2');
  const chapterEndCard = document.getElementById('chapter-end-card');
  let hasFlippedPage = false;

  metalPageCard.addEventListener('click', () => {
    metalPageCard.classList.toggle('flipped');
    playSynthesizedSound('metalFlip');

    if (!hasFlippedPage) {
      hasFlippedPage = true;

      // 翻面後 1.2 秒浮現第一句終局文字
      setTimeout(() => {
        chLine1.classList.add('visible');
      }, 1200);

      // 2.8 秒浮現震撼第二句
      setTimeout(() => {
        chLine2.classList.add('visible');
        playSynthesizedSound('omenChime');
      }, 2800);

      // 4.5 秒落幕卡淡入
      setTimeout(() => {
        chapterEndCard.scrollIntoView({ behavior: 'smooth' });
      }, 4500);
    }
  });

  // 下一章按鈕
  const btnNextChapter = document.getElementById('btn-next-chapter');
  btnNextChapter.addEventListener('click', () => {
    alert("【第二章：銀蛇之頁】原稿正由吟遊詩人整理中，敬請期待後續正式篇章！");
  });

  // =========================================================================
  // 十一、Web Audio API 合成音效系統 (零外部音檔依賴)
  // =========================================================================
  let audioCtx = null;
  let isAmbientOn = false;
  let tavernNoise = null;
  let tavernGain = null;

  const btnAmbientAudio = document.getElementById('btn-ambient-audio');
  const ambientLabel = btnAmbientAudio.querySelector('.text');

  function initAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtxClass();
    }
  }

  function startAmbientTavern() {
    initAudioContext();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    tavernGain = audioCtx.createGain();
    tavernGain.gain.setValueAtTime(0.025, audioCtx.currentTime);
    tavernGain.connect(audioCtx.destination);

    // 雙音合成酒館低頻暖流 (F調五度音)
    const osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(87.31, audioCtx.currentTime); // F2

    const osc2 = audioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(130.81, audioCtx.currentTime); // C3

    osc1.connect(tavernGain);
    osc2.connect(tavernGain);

    osc1.start();
    osc2.start();

    tavernNoise = { osc1, osc2 };
  }

  function stopAmbientTavern() {
    if (tavernGain && audioCtx) {
      tavernGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      setTimeout(() => {
        try {
          tavernNoise.osc1.stop();
          tavernNoise.osc2.stop();
        } catch (e) {}
      }, 400);
    }
  }

  btnAmbientAudio.addEventListener('click', () => {
    if (!isAmbientOn) {
      startAmbientTavern();
      isAmbientOn = true;
      btnAmbientAudio.classList.add('playing');
      ambientLabel.textContent = '環境音: 開啟中';
    } else {
      stopAmbientTavern();
      isAmbientOn = false;
      btnAmbientAudio.classList.remove('playing');
      ambientLabel.textContent = '環境音: 關閉';
    }
  });

  // 音效合成調用
  function playSynthesizedSound(type) {
    if (!audioCtx) initAudioContext();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'coin') {
        // 金幣清脆叮噹聲
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1760, now); // A6
        osc.frequency.exponentialRampToValueAtTime(3520, now + 0.1);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'doorCrash') {
        // 重木門撞擊低頻
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'thunder') {
        // 遠處滾雷
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(65, now);
        osc.frequency.linearRampToValueAtTime(35, now + 0.8);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
      } else if (type === 'footsteps') {
        // 鎧甲重靴踏步
        osc.type = 'square';
        osc.frequency.setValueAtTime(110, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'whisper') {
        // 萬聲之耳幽渺低迴
        osc.type = 'sine';
        osc.frequency.setValueAtTime(146.83, now); // D3
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
        osc.start(now);
        osc.stop(now + 2.0);
      } else if (type === 'glyph') {
        // 秘符解讀微光鳴響
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.linearRampToValueAtTime(880, now + 0.3); // A5
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'metalFlip') {
        // 金屬頁翻轉錚鳴
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'omenChime') {
        // 終極命運磬鐘
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now); // A3
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
        osc.start(now);
        osc.stop(now + 3.0);
      }
    } catch (e) {}
  }

  // 古代失落旋律 (破障之音五重琶音)
  function playAncientLuteChord() {
    if (!audioCtx) initAudioContext();
    if (!audioCtx) return;

    const notes = [293.66, 329.63, 415.30, 493.88, 659.25]; // 古代調式
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const now = audioCtx.currentTime;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 1.2);
        } catch (e) {}
      }, idx * 160);
    });
  }

  // ESC 鍵關閉所有側欄
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDrawers();
    }
  });

});
