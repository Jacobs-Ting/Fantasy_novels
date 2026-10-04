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
      title: '記憶者 / 雲川城詩人',
      role: '吟遊詩人 ・ 【連接者 (Bridge)】',
      weapon: '梧桐七弦琴（冰蠶絲弦・已斷弦）',
      ability: '萬聲之耳（聽覺記憶） / 世界詠唱（Worldsong） / 連接萬物記憶與故事',
      item: '古老銀蛇護符 / 聖樹遺物・夢葉（Dreamleaf）',
      quote: '真正改變世界的人，不一定是最強的人，而是能讓不同的人，願意相信同一個未來的人。',
      icon: '🎻',
      desc: '看似最不起眼的吟遊詩人，實際上為團隊中唯一不屬於任何單一神之法則的『連接者』。他能理解不同的故事與立場，成為溝通的橋樑，肩負著重塑艾瑟蘭共同命運的真正使命。'
    },
    fanfan: {
      id: 'fanfan',
      name: '汎汎',
      title: '前帝國秘館研究學者',
      role: '秘紋術師',
      symbol: '文字',
      weapon: '古代幾何符文重構術',
      ability: '解讀古代文字、破譯秘術封印、解析失落法則',
      item: '銀蛇之頁（古代不朽神金）',
      status: '蒼龍帝國最高通緝中',
      icon: '❄️',
      desc: '極為罕見的秘紋術師。原受雇於帝國研究機構，在北方冰原出土的遠古石板上破譯出推翻五聖神話的禁忌文字，攜帶「銀蛇之頁」逃亡。'
    },
    papa: {
      id: 'papa',
      name: '帕帕',
      title: '神秘聖騎士',
      role: '聖騎士',
      affiliation: '守頁騎士團',
      symbol: '誓約 / 見證',
      age: '900+',
      weapon: '古代誓約長劍（已折斷）',
      shield: '守頁之盾（已破碎）',
      ability: '銀白聖焰 / 誓約之焰 / 終誓',
      quote: '有些誓言，比人的壽命更長。',
      icon: '⚔️',
      desc: '守頁騎士團的古老聖騎士。活過了九百年的漫長歲月，曾親眼見證九百年前殺死蒼龍與聖獸封印的現場。'
    },
    leah: {
      id: 'leah',
      name: '莉亞',
      title: '渡魂者',
      role: '死靈法師',
      symbol: '死亡與平衡',
      item: '古老魂燈與死靈法杖',
      ability: '亡魂召喚 / 亡者記憶 / 萬魂回聲',
      quote: '活人會修改歷史，死者沒有這個必要。',
      status: '與鼻鼻、汎汎、帕帕同行',
      icon: '🔮',
      desc: '遊走於生者與亡者邊界的死靈法師。能召喚古靈與跨越冥界，保護生死平衡。'
    },
    pipi: {
      id: 'pipi',
      name: '屁屁',
      title: '森脈守望者',
      role: '德魯伊',
      symbol: '生命與自然',
      form: '古森巨鹿（Ancient Grove Stag）',
      ability: '自然感知 / 植物操控 / 野獸溝通 / 河流引導 / 局部氣候控制 / 自然治癒 / 古森巨鹿化身',
      quote: '它不是在攻擊你。它只是在痛。',
      status: '翠鹿森國荒野守護者・與主角群同行',
      icon: '🦌',
      desc: '翠鹿森國的高階德魯伊。能聽見森林與野獸的聲音，與自然締結共生關係。面對失控的大地，他選擇的從來不是消滅，而是治癒。'
    },
    isendra: {
      id: 'isendra',
      name: '依森德拉',
      title: '秘紋大賢者',
      role: '汎汎的導師',
      status: '？？？（神鹿之夢中登場）',
      ability: '高階秘紋重構 / 法則解構 / 封印術式',
      quote: '秘術師最危險的敵人，不是未知，而是自以為已經理解。',
      icon: '🔮',
      desc: '汎汎年輕時最敬畏的秘術導師。在神鹿之夢深層登場考驗汎汎的心魔。無人能確認她是真正的導師本人、汎汎記憶的投影，亦或是夢境生成的幻象。'
    },
    elysea: {
      id: 'elysea',
      name: '艾露希亞',
      title: '世界樹神鹿',
      role: '翠鹿森國守護主神',
      status: '重新進入自然安息沉睡',
      ability: '自然、時間、記憶、命運與可能性觀測',
      quote: '謝謝你，沒有相信我的恐懼。',
      icon: '🦌✨',
      desc: '翠鹿森國的古老主神。掌管自然與命運可能性，因受無數極端未來折磨險些暴走毀滅世界，最終被旅人小隊的安魂曲安撫並重新安息。'
    },
    remy: {
      id: 'remy',
      name: '蕾米',
      title: '赤狼',
      role: '鐵狼族戰團指揮官',
      affiliation: '鐵狼氏族聯盟',
      weapon: '厚重雙手巨斧',
      ability: '軍事防線調度 / 戰場地形洞察 / 雪原近身巨斧戰技',
      quote: '王国军是敌人，但不是每个穿王国军服的人，都自己选择来到这里。',
      icon: '🪓',
      desc: '鐵狼氏族年輕的戰團指揮官，族長赫魯恩之女。她熟悉北方雪原與戰爭，也比任何人更清楚戰爭真正意味著什麼。面對王國大軍，她選擇守住玄狼聖地，卻從不把殺戮視為榮耀。'
    },
    versain: {
      id: 'versain',
      name: '維爾薩恩',
      title: '王國首相',
      role: '高階術士 / 戰爭政策推動者',
      affiliation: '北境王國',
      ability: '情緒增幅秘術（銀黑秘紋） / 政治演講 / 高階元素與心智術法',
      quote: '我们没有选择战争。王国只是保护自己的人民。',
      icon: '👑',
      desc: '北境王國最具權勢的政治人物之一，也是國王最信任的顧問。他公開宣稱戰爭是為了保護王國，但其發布的戰時文書中隱藏著與未知力量相似的銀黑秘紋。'
    },
    hruen: {
      id: 'hruen',
      name: '赫魯恩',
      title: '鐵狼族長',
      role: '老練北境領袖',
      affiliation: '鐵狼氏族聯盟',
      weapon: '傳統雙狼戰刀',
      quote: '妳的任务不是陪这座峡谷一起死，是让族人还有明天。',
      icon: '🐺',
      desc: '身經百戰的鐵狼氏族老族長，蕾米之父。長期率領部族守護玄狼聖地與北方邊境，堅信守護族人的未來比盲目死守死地更重要。'
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
    'silverPageBeacon',
    'papaArrival',
    'ancientCrestReveal',
    'keepersOfPagesReveal',
    'imperialAmbush',
    'oathFlame',
    'papaBattle',
    'partyFormation',
    'dragonAwakening',
    'easternAnomaly',
    'ghostTown',
    'bibiOverload',
    'leahArrival',
    'deathBalanceReveal',
    'dragonResurrectionTheory',
    'echoesOfTheDeparted',
    'ancientPriestSummon',
    'dragonDeathReveal',
    'youngPapaMemory',
    'silverPageSealMemory',
    'leahLostInDeath',
    'bibiFindsLeah',
    'dragonTomb',
    'dragonResurrection',
    'silverEyesReveal',
    'soullessDragon',
    'worldCollapse',
    'fanfanSealAttempt',
    'papaFinalOath',
    'leahSoulSearch',
    'allHeroesDefeated',
    'bibiHearsWorld',
    'memoryBearerReveal',
    'trueSixthVerse',
    'worldsongAwakening',
    'fiveNationsChorus',
    'dragonSoulReconstruction',
    'unknownSilverEntity',
    'dragonRecognizesBibi',
    'fiveGodsSealedReveal',
    'forestAftershock',
    'seasonChaos',
    'beastAttack',
    'pipiStagArrival',
    'pipiReveal',
    'livingForest',
    'vinesInPain',
    'unknownFaction',
    'lifeAndDeathDialogue',
    'bibiHearsPlants',
    'doNotWakeHer',
    'worldTreeArrival',
    'deerSealCracks',
    'dreamCorruption',
    'forestAssault',
    'ancientGroveStag',
    'natureCounterattack',
    'forestMemory',
    'fiveBeastsVision',
    'mutualSealReveal',
    'worldTreeHeartbeat',
    'druidVillageNight',
    'pipiDreamWarning',
    'mysteriousSong',
    'dreamboughTree',
    'memoryBearerCall',
    'enterSacredTreeDream',
    'fiveLawsVision',
    'bibiSelfDoubt',
    'godsAreNotFree',
    'fiveBeastsDistrust',
    'connectorReveal',
    'reshapeStoryMission',
    'worldsongTruth',
    'futureFragments',
    'missingBibiFuture',
    'dreamleafGift',
    'wakeUnderTree',
    'sacredDeerWarning',
    'daylightMoon',
    'fanfanRealityFreeze',
    'enterSacredDeerDream',
    'arcaneAnalysis',
    'fanfanIsTheCore',
    'isendraArrival',
    'firstRegretVision',
    'bibiRegretVision',
    'hiddenMemoryBearerSecret',
    'isendraDominance',
    'conceptualDreamReveal',
    'fanfanRepeatedFailure',
    'iDontKnow',
    'acceptUncertainty',
    'listenInsteadOfControl',
    'isendraFinalQuestions',
    'walkWithoutAnswer',
    'futureFragmentsReveal',
    'silverBlackThreads',
    'possibilityTruth',
    'fanfanAwakens',
    'dreamleafValidation',
    'allPossibleFutures',
    'blankWorldBibi',
    'unknownVoice',
    'blankWorldVision',
    'papaTurnsOnBibi',
    'leahSoulFire',
    'bibiRefusesToFight',
    'pipiStopsConflict',
    'fanfanRejectsFixedFuture',
    'worldTreeQuake',
    'sacredDeerAwakens',
    'deerWorldDestruction',
    'partyRealizesDreamInfluence',
    'pipiAncientStag',
    'healTheSacredDeer',
    'forestPresentMemory',
    'bibiRequiem',
    'fivePersonHarmony',
    'deerCalms',
    'deerThanksBibi',
    'moonWolfClue',
    'forestRestored',
    'northwardPreview',
    'enterFrostcrown',
    'wartimeCheckpoints',
    'mobilizationOrders',
    'whiteAntlerInn',
    'innkeeperConscriptionStory',
    'ironWolfReputation',
    'storyChangedInSixMonths',
    'fanfanFindsBlackRunes',
    'emotionAmplificationReveal',
    'leahWarDeaths',
    'pipiWarConsumesNature',
    'frostfangPass',
    'remyIntroduction',
    'remyDefensePlanning',
    'armyDisparity',
    'remyRejectsWarGlory',
    'chieftainHruen',
    'protectConscriptedSoldiers',
    'dualWarMontage',
    'versainSpeech',
    'crowdWarFrenzy',
    'bibiHearsHiddenVoice',
    'versainNoticesBibi',
    'royalArmyApproaches',
    'warHorn',
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
    ['bibi', 'fanfan', 'papa', 'leah', 'pipi', 'isendra', 'elysea', 'remy', 'versain', 'hruen'].forEach(key => {
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
        ${c.item ? `<div class="dossier-row"><strong>攜帶物件：</strong>${c.item}</div>` : ''}
        ${c.affiliation ? `<div class="dossier-row"><strong>曾經所屬/勢力：</strong>${c.affiliation}</div>` : ''}
        ${c.weapon ? `<div class="dossier-row"><strong>武器裝備：</strong>${c.weapon} ${c.shield ? ' / ' + c.shield : ''}</div>` : ''}
        <div class="dossier-row"><strong>主要能力：</strong>${c.ability}</div>
        ${c.quote ? `<div class="dossier-row" style="color:var(--silver-serpent); font-style:italic;"><strong>名言：</strong>「${c.quote}」</div>` : ''}
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
      } else if (type === 'beaconPulse') {
        // 銀蛇之頁信標召喚聲
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1500, now + 1.5);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        osc.start(now);
        osc.stop(now + 1.8);
      } else if (type === 'horseHooves') {
        // 沉穩馬蹄踏踏聲
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(90, now);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'silverFlame') {
        // 誓約之焰拔劍與銀白火光
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.8);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        osc.start(now);
        osc.stop(now + 1.2);
      } else if (type === 'shieldBlock') {
        // 盾牌阻擋蒼藍雷擊金鐵與魔法聲
        osc.type = 'square';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.4);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'soulLamp') {
        // 莉亞魂燈點亮與幽藍幽魂微光
        osc.type = 'sine';
        osc.frequency.setValueAtTime(261.63, now); // C4
        osc.frequency.linearRampToValueAtTime(523.25, now + 0.8); // C5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        osc.start(now);
        osc.stop(now + 1.2);
      } else if (type === 'echoesRitual') {
        // 萬魂回聲降臨 (三重低音共鳴)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(130.81, now); // C3
        osc.frequency.exponentialRampToValueAtTime(65.41, now + 1.5); // C2
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
        osc.start(now);
        osc.stop(now + 2.0);
      } else if (type === 'ancientMemory') {
        // 進入九百年前記憶時空穿梭音
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(880, now + 1.0);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
        osc.start(now);
        osc.stop(now + 1.5);
      } else if (type === 'dragonRoar') {
        // 蒼天龍震撼天地之怒咆與雷鳴
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.linearRampToValueAtTime(30, now + 1.8);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
        osc.start(now);
        osc.stop(now + 2.2);
      } else if (type === 'silverGlow') {
        // 蒼龍銀瞳睜開與銀蛇護符共鳴神威
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now); // A5
        osc.frequency.exponentialRampToValueAtTime(1760, now + 1.0); // A6
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
        osc.start(now);
        osc.stop(now + 1.5);
      } else if (type === 'worldsong') {
        // 世界詠唱 (五聲華彩五度音階共鳴)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.exponentialRampToValueAtTime(880, now + 2.0); // A5
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
        osc.start(now);
        osc.stop(now + 2.5);
      } else if (type === 'stringSnap') {
        // 七弦琴弦崩斷清脆撞擊聲
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'chorusResonance') {
        // 全艾瑟蘭大合唱天地宏大共鳴
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.linearRampToValueAtTime(659.25, now + 3.0); // E5
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
        osc.start(now);
        osc.stop(now + 3.5);
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

  // =========================================================================
  // 七、第二章（下）互動邏輯：銀蛇之頁信標共鳴與戰鬥互動
  // =========================================================================
  const btnTriggerBeacon = document.getElementById('btn-trigger-beacon');
  const beaconEffectLog = document.getElementById('beacon-effect-log');
  const beaconBeamLine = document.getElementById('beacon-beam-line');
  const groundRunesLayer = document.getElementById('ground-runes-layer');
  const serpentAmuletGlow = document.getElementById('serpent-amulet-glow');

  const totemNodes = {
    dragon: document.getElementById('totem-dragon'),
    lion: document.getElementById('totem-lion'),
    wolf: document.getElementById('totem-wolf'),
    phoenix: document.getElementById('totem-phoenix'),
    deer: document.getElementById('totem-deer'),
    snake: document.getElementById('totem-snake')
  };

  let isBeaconActive = false;

  if (btnTriggerBeacon) {
    btnTriggerBeacon.addEventListener('click', () => {
      if (isBeaconActive) return;
      isBeaconActive = true;

      playSynthesizedSound('beaconPulse');
      beaconEffectLog.textContent = '銀蛇之頁劇烈震動！古代圖騰依序亮起……';

      const sequence = ['dragon', 'lion', 'wolf', 'phoenix', 'deer'];
      
      // 前五個圖騰依序亮起並熄滅
      sequence.forEach((name, idx) => {
        setTimeout(() => {
          if (totemNodes[name]) {
            totemNodes[name].classList.add('illuminated');
            playSynthesizedSound('glyph');
            setTimeout(() => {
              totemNodes[name].classList.remove('illuminated');
            }, 500);
          }
        }, idx * 450);
      });

      // 最後銀蛇圖騰恆亮，地面符文與信標光束亮起
      setTimeout(() => {
        if (totemNodes['snake']) {
          totemNodes['snake'].classList.add('active-snake-glow');
        }
        if (serpentAmuletGlow) {
          serpentAmuletGlow.classList.add('active');
        }
        if (beaconBeamLine) {
          beaconBeamLine.classList.add('active');
        }
        if (groundRunesLayer) {
          groundRunesLayer.classList.add('active');
        }

        beaconEffectLog.innerHTML = '✨ <strong>［信標已啟動］</strong> 冷銀光束刺破夜霧直貫穹頂！鼻鼻的銀蛇護符強烈共鳴發光！';
        playSynthesizedSound('whisper');
      }, sequence.length * 450 + 200);
    });
  }

  // 帕帕戰鬥敘事互動按鈕
  const cmdShield = document.getElementById('cmd-shield');
  const cmdSlash = document.getElementById('cmd-slash');
  const cmdEscape = document.getElementById('cmd-escape');
  const battleNarrativeLog = document.getElementById('battle-narrative-log');

  if (cmdShield) {
    cmdShield.addEventListener('click', () => {
      playSynthesizedSound('shieldBlock');
      battleNarrativeLog.innerHTML = '🛡️ <strong>【舉盾】</strong> 帕帕挺身而出，揮舞古代守頁重盾接下蒼藍狂雷！盾面上古代文字『吾等守護真相，而非王冠』熠熠生輝！';
    });
  }

  if (cmdSlash) {
    cmdSlash.addEventListener('click', () => {
      playSynthesizedSound('silverFlame');
      battleNarrativeLog.innerHTML = '⚔️ <strong>【斬斷術式】</strong> 帕帕拔出古代長劍，純白銀聖焰（誓約之焰）破空而出，硬生生斬斷了十餘名帝國術士的交織魔法陣！';
    });
  }

  if (cmdEscape) {
    cmdEscape.addEventListener('click', () => {
      playSynthesizedSound('horseHooves');
      battleNarrativeLog.innerHTML = '🐎 <strong>【撤離山丘】</strong> 帕帕引導銀白聖火化為火牆阻斷追兵道路，護送鼻鼻與汎汎縱馬突破包圍圈，直奔西方！';
    });
  }

  // 第三章未開放提示按鈕
  const btnCh3Teaser = document.getElementById('btn-ch3-teaser');
  const ch3Notice = document.getElementById('ch3-notice');

  if (btnCh3Teaser) {
    btnCh3Teaser.addEventListener('click', () => {
      if (ch3Notice) {
        ch3Notice.style.display = 'block';
        playSynthesizedSound('omenChime');
      }
    });
  }

  // =========================================================================
  // 八、第三章（沉睡的蒼龍）互動邏輯：萬魂回聲儀式、莉亞救援與銀瞳蒼龍降臨
  // =========================================================================
  const stepLightLamp = document.getElementById('step-light-lamp');
  const stepWakeBattlefield = document.getElementById('step-wake-battlefield');
  const stepListenDead = document.getElementById('step-listen-dead');
  const stepConnectMemory = document.getElementById('step-connect-memory');
  const ritualStatusLog = document.getElementById('ritual-status-log');
  const ancientMemoryRealm = document.getElementById('ancient-memory-realm');
  const ancientMemoryVignette = document.getElementById('ancient-memory-vignette');

  if (stepLightLamp) {
    stepLightLamp.addEventListener('click', () => {
      playSynthesizedSound('soulLamp');
      stepLightLamp.disabled = true;
      stepWakeBattlefield.disabled = false;
      ritualStatusLog.innerHTML = '🕯️ <strong>［STEP 1］</strong> 古老魂燈點亮！幽藍色的冥火在濃霧中綻放安息微光……';
    });
  }

  if (stepWakeBattlefield) {
    stepWakeBattlefield.addEventListener('click', () => {
      playSynthesizedSound('echoesRitual');
      stepWakeBattlefield.disabled = true;
      stepListenDead.disabled = false;
      ritualStatusLog.innerHTML = '👻 <strong>［STEP 2］</strong> 古戰場地脈響應！數千沉睡的逝者殘魂浮出地面……';
    });
  }

  if (stepListenDead) {
    stepListenDead.addEventListener('click', () => {
      playSynthesizedSound('whisper');
      stepListenDead.disabled = true;
      stepConnectMemory.disabled = false;
      ritualStatusLog.innerHTML = '🎻 <strong>［STEP 3］</strong> 鼻鼻的萬聲之耳啟動！萬千死者臨終前的微弱殘音匯聚成波紋……';
    });
  }

  if (stepConnectMemory) {
    stepConnectMemory.addEventListener('click', () => {
      playSynthesizedSound('ancientMemory');
      stepConnectMemory.disabled = true;
      ritualStatusLog.innerHTML = '✨ <strong>［STEP 4］</strong> 萬魂回聲共鳴成功！時空記憶倒流，跨越九百年歲月！';

      if (ancientMemoryVignette) ancientMemoryVignette.classList.add('active');

      setTimeout(() => {
        if (ancientMemoryRealm) {
          ancientMemoryRealm.style.display = 'block';
          ancientMemoryRealm.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    });
  }

  // 鼻鼻救援莉亞互動按鈕
  const btnCorrectLeah = document.getElementById('btn-correct-leah');
  const rescueFeedbackLog = document.getElementById('rescue-feedback-log');
  const wrongVoices = document.querySelectorAll('.wrong-v');

  wrongVoices.forEach(btn => {
    btn.addEventListener('click', () => {
      playSynthesizedSound('whisper');
      rescueFeedbackLog.innerHTML = '❌ 不是這個聲音！冥界雜音干擾中……鼻鼻需要更專注！';
    });
  });

  if (btnCorrectLeah) {
    btnCorrectLeah.addEventListener('click', () => {
      playSynthesizedSound('whisper');
      playSynthesizedSound('soulLamp');
      btnCorrectLeah.style.background = 'rgba(56, 189, 248, 0.4)';
      rescueFeedbackLog.innerHTML = '✨ <strong>【救援成功！】</strong> 鼻鼻一把抓住了莉亞「我還沒死」的微弱聲音，成功將她的意識拉回現實！';
    });
  }

  // 天穹龍墓蒼龍降臨見證按鈕
  const btnWitnessDragon = document.getElementById('btn-witness-dragon');
  const dragonAwakeningStage = document.getElementById('dragon-awakening-stage');
  const silverEyesBox = document.getElementById('silver-eyes-box');

  if (btnWitnessDragon) {
    btnWitnessDragon.addEventListener('click', () => {
      playSynthesizedSound('dragonRoar');
      btnWitnessDragon.style.display = 'none';

      if (dragonAwakeningStage) {
        dragonAwakeningStage.style.display = 'block';
        dragonAwakeningStage.scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => {
        playSynthesizedSound('silverGlow');
        if (silverEyesBox) {
          silverEyesBox.classList.add('illuminated');
        }
      }, 1800);
    });
  }

  // 第四章預告按鈕
  const btnCh4Teaser = document.getElementById('btn-ch4-teaser');
  const ch4Notice = document.getElementById('ch4-notice');

  if (btnCh4Teaser) {
    btnCh4Teaser.addEventListener('click', () => {
      if (ch4Notice) {
        ch4Notice.style.display = 'block';
        playSynthesizedSound('omenChime');
      }
    });
  }

  // =========================================================================
  // 九、章節分頁切換系統 (Chapter Pagination Manager)
  // =========================================================================
  const chapterTabBtns = document.querySelectorAll('.chapter-tab-btn');
  const chapterPages = document.querySelectorAll('.chapter-page');
  const switchChBtns = document.querySelectorAll('.switch-ch-btn');

  function switchChapterPage(targetChapterId) {
    // 隱藏所有分頁
    chapterPages.forEach(page => {
      page.classList.remove('active-page');
    });

    // 取消所有頁籤 active
    chapterTabBtns.forEach(btn => {
      btn.classList.remove('active');
    });

    // 顯示目標分頁
    const targetPage = document.getElementById(`${targetChapterId}-page`);
    if (targetPage) {
      targetPage.classList.add('active-page');
    }

    // 激活目標標籤
    const activeTab = document.querySelector(`.chapter-tab-btn[data-chapter="${targetChapterId}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // 平滑滾動置頂
    window.scrollTo({ top: 0, behavior: 'smooth' });

    playSynthesizedSound('glyph');
  }

  chapterTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chId = btn.getAttribute('data-chapter');
      switchChapterPage(chId);
    });
  });

  switchChBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chId = btn.getAttribute('data-target');
      switchChapterPage(chId);
    });
  });

  // =========================================================================
  // 十、第四章（世界的詠唱者）高潮互動邏輯：汎汎封印失敗、世界詠唱與第一部落幕
  // =========================================================================
  const sealBtnBody = document.getElementById('seal-btn-body');
  const sealBtnDivine = document.getElementById('seal-btn-divine');
  const sealBtnLeyline = document.getElementById('seal-btn-leyline');
  const sealStatusLog = document.getElementById('seal-status-log');

  if (sealBtnBody) {
    sealBtnBody.addEventListener('click', () => {
      playSynthesizedSound('glyph');
      sealBtnBody.disabled = true;
      sealBtnDivine.disabled = false;
      sealStatusLog.innerHTML = '🪨 ［第 1 重］ 肉體封印幾何陣圖構建完成！等待定固神性……';
    });
  }

  if (sealBtnDivine) {
    sealBtnDivine.addEventListener('click', () => {
      playSynthesizedSound('glyph');
      sealBtnDivine.disabled = true;
      sealBtnLeyline.disabled = false;
      sealStatusLog.innerHTML = '⚡ ［第 2 重］ 神性雷霆鎖鏈貫穿龍脈！準備閉合靈魂鎖環……';
    });
  }

  if (sealBtnLeyline) {
    sealBtnLeyline.addEventListener('click', () => {
      playSynthesizedSound('doorCrash');
      sealBtnLeyline.disabled = true;
      sealStatusLog.innerHTML = '💥 <strong>［封印失敗！］</strong> 蒼龍缺乏靈魂！三重封印無法閉環，秘紋反噬炸裂！銀蛇之頁崩裂出細痕！';
    });
  }

  // 世界詠唱【Worldsong】逐句點擊演唱互動
  const btnWorldsongSing = document.getElementById('btn-worldsong-sing');
  const songCurrentLine = document.getElementById('song-current-line');
  const singBtnLabel = document.getElementById('sing-btn-label');
  const wsProgressFill = document.getElementById('ws-progress-fill');
  const worldsongGoldAurora = document.getElementById('worldsong-gold-aurora');
  const whiteFlashOverlay = document.getElementById('white-flash-overlay');

  const worldsongLyrics = [
    { text: "「蒼龍馭雷而降，」", audio: "worldsong", hint: "✨ 詠唱第二句 ➔" },
    { text: "「白獅攜日而來，」", audio: "worldsong", hint: "✨ 詠唱第三句 ➔" },
    { text: "「玄狼行於月影，」", audio: "worldsong", hint: "✨ 詠唱第四句 ➔" },
    { text: "「朱凰浴火重生，」", audio: "worldsong", hint: "✨ 詠唱第五句 ➔" },
    { text: "「神鹿守望命運——」", audio: "worldsong", hint: "✨ 唱出失落的名 ➔" },
    { text: "「——而銀蛇銜尾，守住無人記得的名字！」", audio: "chorusResonance", hint: "✦ 完成世界詠唱 ✦" }
  ];

  let currentSingStep = 0;

  if (btnWorldsongSing) {
    btnWorldsongSing.addEventListener('click', () => {
      if (currentSingStep < worldsongLyrics.length) {
        const lyricObj = worldsongLyrics[currentSingStep];
        playSynthesizedSound(lyricObj.audio);

        songCurrentLine.textContent = lyricObj.text;
        singBtnLabel.textContent = lyricObj.hint;

        currentSingStep++;
        const pct = (currentSingStep / worldsongLyrics.length) * 100;
        if (wsProgressFill) wsProgressFill.style.width = `${pct}%`;

        if (worldsongGoldAurora) worldsongGoldAurora.classList.add('active');

        // 最後一句點擊：爆發純白光芒與大合唱效果
        if (currentSingStep === worldsongLyrics.length) {
          btnWorldsongSing.disabled = true;
          playSynthesizedSound('chorusResonance');

          if (whiteFlashOverlay) {
            whiteFlashOverlay.classList.add('active');
            setTimeout(() => {
              whiteFlashOverlay.classList.remove('active');
            }, 1200);
          }
        }
      }
    });
  }

  // =========================================================================
  // 十一、第二部 第一章（森林正在做夢）互動邏輯
  // =========================================================================
  // 1. 屁屁治療失控藤蔓三步驟互動
  const btnHealStep1 = document.getElementById('btn-heal-step1');
  const btnHealStep2 = document.getElementById('btn-heal-step2');
  const btnHealStep3 = document.getElementById('btn-heal-step3');
  const vineBarFill = document.getElementById('vine-bar-fill');
  const healingLog = document.getElementById('healing-log');

  if (btnHealStep1) {
    btnHealStep1.addEventListener('click', () => {
      playSynthesizedSound('whisper');
      btnHealStep1.disabled = true;
      btnHealStep2.disabled = false;
      if (vineBarFill) vineBarFill.style.width = '35%';
      if (healingLog) healingLog.innerHTML = '🌿 <strong>［步驟 1］</strong> 屁屁將手貼於狂暴藤蔓脈絡，感應到內部盤踞的劇痛與銀黑腐蝕氣流……';
    });
  }

  if (btnHealStep2) {
    btnHealStep2.addEventListener('click', () => {
      playSynthesizedSound('glyph');
      btnHealStep2.disabled = true;
      btnHealStep3.disabled = false;
      if (vineBarFill) vineBarFill.style.width = '70%';
      if (healingLog) healingLog.innerHTML = '✨ <strong>［步驟 2］</strong> 屁屁小心翼翼將侵蝕性銀黑力量抽離，藤蔓狂暴抽搐漸趨平緩！';
    });
  }

  if (btnHealStep3) {
    btnHealStep3.addEventListener('click', () => {
      playSynthesizedSound('natureGlow');
      btnHealStep3.disabled = true;
      if (vineBarFill) vineBarFill.style.width = '100%';
      if (healingLog) healingLog.innerHTML = '🌸 <strong>［修復成功！］</strong> 翠綠生命力注入！藤蔓停止侵蝕村落，鬆開木屋重新化為發香的普通自然植物！';
    });
  }

  // 2. 屁屁變身古森巨鹿與魔獸淨化
  const btnTransformStag = document.getElementById('btn-transform-stag');
  const beastPurifyPanel = document.getElementById('beast-purify-panel');
  const btnPurifyCut = document.getElementById('btn-purify-cut');
  const btnPurifySoothe = document.getElementById('btn-purify-soothe');
  const btnPurifyRestore = document.getElementById('btn-purify-restore');
  const purifyStatusBox = document.getElementById('purify-status-box');

  if (btnTransformStag) {
    btnTransformStag.addEventListener('click', () => {
      playSynthesizedSound('stagRoar');
      btnTransformStag.disabled = true;
      btnTransformStag.innerHTML = '✨ 巨鹿咆哮・自然脈絡共振中！';
      if (beastPurifyPanel) {
        beastPurifyPanel.style.display = 'block';
        beastPurifyPanel.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (btnPurifyCut) {
    btnPurifyCut.addEventListener('click', () => {
      playSynthesizedSound('glyph');
      btnPurifyCut.disabled = true;
      btnPurifySoothe.disabled = false;
      if (purifyStatusBox) purifyStatusBox.innerHTML = '⚡ ［第 1 擊］ 古森巨鹿以巨大的樹冠鹿角切斷了灰黑勢力的銀黑控制術式！';
    });
  }

  if (btnPurifySoothe) {
    btnPurifySoothe.addEventListener('click', () => {
      playSynthesizedSound('natureGlow');
      btnPurifySoothe.disabled = true;
      btnPurifyRestore.disabled = false;
      if (purifyStatusBox) purifyStatusBox.innerHTML = '🦌 ［第 2 擊］ 大地脈絡吟唱！失控的古樹巨人與暴走野獸痛苦平息，眼中猩紅褪去！';
    });
  }

  if (btnPurifyRestore) {
    btnPurifyRestore.addEventListener('click', () => {
      playSynthesizedSound('pulseGlow');
      btnPurifyRestore.disabled = true;
      if (purifyStatusBox) purifyStatusBox.innerHTML = '🌲 <strong>［淨化完成！］</strong> 森脈核心恢復和諧！魔獸全數脫離控制回归森林，世界樹保護完好！';
    });
  }

  // 3. 第二部第二章預告按鈕
  const btnP2Ch2Teaser = document.getElementById('btn-p2ch2-teaser');
  const p2ch2Notice = document.getElementById('p2ch2-notice');

  if (btnP2Ch2Teaser) {
    btnP2Ch2Teaser.addEventListener('click', () => {
      if (p2ch2Notice) {
        p2ch2Notice.style.display = 'block';
        playSynthesizedSound('heartbeat');
      }
    });
  }

  // =========================================================================
  // 十二、第二部 第二章（聖樹之夢）互動邏輯
  // =========================================================================
  // 1. 追隨歌聲四步驟互動
  const btnSongStep1 = document.getElementById('btn-song-step1');
  const btnSongStep2 = document.getElementById('btn-song-step2');
  const btnSongStep3 = document.getElementById('btn-song-step3');
  const btnSongStep4 = document.getElementById('btn-song-step4');
  const songJourneyLog = document.getElementById('song-journey-log');

  if (btnSongStep1) {
    btnSongStep1.addEventListener('click', () => {
      playSynthesizedSound('whisper');
      btnSongStep1.disabled = true;
      btnSongStep2.disabled = false;
      if (songJourneyLog) songJourneyLog.innerHTML = '👣 <strong>［步驟 1］</strong> 鼻鼻輕推木門走出樹屋，月光下村莊安靜得只剩遠方的古老旋律……';
    });
  }

  if (btnSongStep2) {
    btnSongStep2.addEventListener('click', () => {
      playSynthesizedSound('glyph');
      btnSongStep2.disabled = true;
      btnSongStep3.disabled = false;
      if (songJourneyLog) songJourneyLog.innerHTML = '🌉 <strong>［步驟 2］</strong> 赤足踩過搖曳的藤蔓長廊，夜螢在腳邊圍繞成指引的路徑。';
    });
  }

  if (btnSongStep3) {
    btnSongStep3.addEventListener('click', () => {
      playSynthesizedSound('natureGlow');
      btnSongStep3.disabled = true;
      btnSongStep4.disabled = false;
      if (songJourneyLog) songJourneyLog.innerHTML = '✨ <strong>［步驟 3］</strong> 順著微光穿過巨木樹冠，周圍蟲鳴漸遠，聖樹低吟愈發清晰。';
    });
  }

  if (btnSongStep4) {
    btnSongStep4.addEventListener('click', () => {
      playSynthesizedSound('pulseGlow');
      btnSongStep4.disabled = true;
      if (songJourneyLog) songJourneyLog.innerHTML = '🌳 <strong>［抵達終點！］</strong> 鼻鼻佇立於『夢枝聖樹』之下，銀綠光芒將他籠罩，落葉化為邀請之鑰！';
    });
  }

  // =========================================================================
  // 十三、第二部 第三章（夢中的秘術師）互動邏輯
  // =========================================================================
  // 1. 汎汎秘紋解析四步驟互動
  if (btnAnalyzeSpace) {
      playSynthesizedSound('glyph');
      btnAnalyzeSpace.disabled = true;
      btnAnalyzeTime.disabled = false;
      if (analysisResultBox) analysisResultBox.innerHTML = '📐 ［步驟 1］ 幾何符文鎖鏈展開！發現空間維度呈現重疊折疊狀態，非一般物理結界。';
    });
  }

  if (btnAnalyzeTime) {
    btnAnalyzeTime.addEventListener('click', () => {
      playSynthesizedSound('whisper');
      btnAnalyzeTime.disabled = true;
      btnAnalyzeCore.disabled = false;
      if (analysisResultBox) analysisResultBox.innerHTML = '⏳ ［步驟 2］ 時間脈絡倒流逆行，夢境混雜著無數可能發生的平行抉擇分支。';
    });
  }

  if (btnAnalyzeCore) {
    btnAnalyzeCore.addEventListener('click', () => {
      playSynthesizedSound('pulseGlow');
      btnAnalyzeCore.disabled = true;
      btnAnalyzeExit.disabled = false;
      if (analysisResultBox) analysisResultBox.innerHTML = '🔮 ［步驟 3］ 尋找結界核心……符文線居然全數彎曲並收束回【汎汎本人】身上！';
    });
  }

  if (btnAnalyzeExit) {
    btnAnalyzeExit.addEventListener('click', () => {
      playSynthesizedSound('doorCrash');
      btnAnalyzeExit.disabled = true;
      if (analysisResultBox) analysisResultBox.innerHTML = '💥 ［解析警示］ 發現通道被『潛意識信念』死死鎖定！迷霧中導師依森德拉踱步走出！';
    });
  }

  // 2. 第二部第四章預告按鈕
  const btnP2Ch4Teaser = document.getElementById('btn-p2ch4-teaser');
  const p2ch4Notice = document.getElementById('p2ch4-notice');

  if (btnP2Ch4Teaser) {
    btnP2Ch4Teaser.addEventListener('click', () => {
      if (p2ch4Notice) {
        p2ch4Notice.style.display = 'block';
        playSynthesizedSound('heartbeat');
      }
    });
  }

  // =========================================================================
  // 十四、第二部 第四章/終章（不存在的未來）互動邏輯
  // =========================================================================
  // 1. 五人協同救贖五連擊點擊互動
  const btnCoopFanfan = document.getElementById('btn-coop-fanfan');
  const btnCoopPapa = document.getElementById('btn-coop-papa');
  const btnCoopLeah = document.getElementById('btn-coop-leah');
  const btnCoopPipi = document.getElementById('btn-coop-pipi');
  const btnCoopBibi = document.getElementById('btn-coop-bibi');
  const coopStatusDisplay = document.getElementById('coop-status-display');
  const requiemSingBox = document.getElementById('requiem-sing-box');

  if (btnCoopFanfan) {
    btnCoopFanfan.addEventListener('click', () => {
      playSynthesizedSound('glyph');
      btnCoopFanfan.disabled = true;
      btnCoopPapa.disabled = false;
      if (coopStatusDisplay) coopStatusDisplay.innerHTML = '❄️ ［第 1 重］ 汎汎祭出古代幾何秘紋，切斷神鹿意識中纏繞的銀黑侵蝕絲線！';
    });
  }

  if (btnCoopPapa) {
    btnCoopPapa.addEventListener('click', () => {
      playSynthesizedSound('oathFlame');
      btnCoopPapa.disabled = true;
      btnCoopLeah.disabled = false;
      if (coopStatusDisplay) coopStatusDisplay.innerHTML = '⚔️ ［第 2 重］ 帕帕重新點燃銀白誓約之焰，建立護盾庇護世界樹根系！';
    });
  }

  if (btnCoopLeah) {
    btnCoopLeah.addEventListener('click', () => {
      playSynthesizedSound('soulLamp');
      btnCoopLeah.disabled = true;
      btnCoopPipi.disabled = false;
      if (coopStatusDisplay) coopStatusDisplay.innerHTML = '🔮 ［第 3 重］ 莉亞高舉古老魂燈，將億萬亡魂悲鳴隔開，安撫神鹿雜音。';
    });
  }

  if (btnCoopPipi) {
    btnCoopPipi.addEventListener('click', () => {
      playSynthesizedSound('natureGlow');
      btnCoopPipi.disabled = true;
      btnCoopBibi.disabled = false;
      if (coopStatusDisplay) coopStatusDisplay.innerHTML = '🍃 ［第 4 重］ 古森巨鹿鹿角交融，將整座森林『真實的現在』注入神鹿心中！';
    });
  }

  if (btnCoopBibi) {
    btnCoopBibi.addEventListener('click', () => {
      playSynthesizedSound('worldsong');
      btnCoopBibi.disabled = true;
      if (coopStatusDisplay) coopStatusDisplay.innerHTML = '🎻 <strong>［第 5 重］ 鼻鼻清唱安魂曲！</strong> 神鹿雙眼銀黑污染徹底退散，心魔熄滅！';
      if (requiemSingBox) {
        requiemSingBox.style.display = 'block';
        requiemSingBox.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 2. 《森眠安魂曲》逐句吟唱互動
  const btnSingNextRequiem = document.getElementById('btn-sing-next-requiem');
  const requiemLyricDisplay = document.getElementById('requiem-lyric-display');

  const requiemLyrics = [
    "「——風已經停了。」",
    "「——森林還在。」",
    "「——春天會回來。」",
    "「——今天還沒有結束。」",
    "「✦ 你可以休息了 ✦」"
  ];
  let requiemIndex = 0;

  if (btnSingNextRequiem) {
    btnSingNextRequiem.addEventListener('click', () => {
      requiemIndex++;
      if (requiemIndex < requiemLyrics.length) {
        playSynthesizedSound('worldsong');
        if (requiemLyricDisplay) requiemLyricDisplay.textContent = requiemLyrics[requiemIndex];
        if (requiemIndex === requiemLyrics.length - 1) {
          btnSingNextRequiem.disabled = true;
          playSynthesizedSound('chorusResonance');
        }
      }
    });
  }

  // 3. 第三部預告按鈕
  const btnBook3Teaser = document.getElementById('btn-book3-teaser');
  const book3Notice = document.getElementById('book3-notice');

  if (btnBook3Teaser) {
    btnBook3Teaser.addEventListener('click', () => {
      if (book3Notice) {
        book3Notice.style.display = 'block';
        playSynthesizedSound('heartbeat');
      }
    });
  }

  // =========================================================================
  // 十五、第三部 第一章（王都的戰時陰影）互動邏輯
  // =========================================================================
  // 1. 戰時告示點擊閱讀 Pop-up Modal
  // 1. 戰時告示點擊閱讀（內嵌方框與彈窗 Modal 雙向渲染）
  const noticeBtns = document.querySelectorAll('.notice-card-btn, .notice-read-btn');
  const noticeModalBackdrop = document.getElementById('notice-modal-backdrop');
  const noticeModalBody = document.getElementById('notice-modal-body');
  const noticeModalContent = document.getElementById('notice-modal-content');
  const btnCloseNoticeModal = document.getElementById('btn-close-notice-modal');

  const noticeTexts = {
    n1: `
      <h3>📜 《王國戰時動員令》</h3>
      <p style="color:#ef4444; font-weight:bold; margin-bottom:0.8rem;">【北境王國最高軍事委員會 頒布】</p>
      <p>鑑於北方鐵狼氏族非法集結軍隊、私藏聖物並脅迫邊境商隊，國王陛下正式簽署全面戰時動員。</p>
      <ul style="padding-left:1.2rem; margin-bottom:1rem; line-height:1.8;">
        <li>凡年滿 20 至 45 歲之健壯男子，必須於三日內向各地軍營登記入伍。</li>
        <li>鐵匠鋪、馬廄、糧倉及商會物資全面接受軍方優先徵用。</li>
        <li>拒絕服從徵召者，將以背叛王國罪處置。</li>
      </ul>
      <p style="font-size:0.85rem; color:#a3a3a3;">（羊皮紙邊角赫然附著極微弱的銀黑幾何紋路，散發著令人心慌的壓迫感……）</p>
    `,
    n2: `
      <h3>🛡️ 《霜冠城戒嚴管制令》</h3>
      <p style="color:#ef4444; font-weight:bold; margin-bottom:0.8rem;">【霜冠城衛軍司令部 公告】</p>
      <p>為確保王都安全與物資順利運往前線，即日起實行最高級別城市戒嚴：</p>
      <ul style="padding-left:1.2rem; margin-bottom:1rem; line-height:1.8;">
        <li>每日日落後城門全面封閉，未持有軍方特別通行證者禁止出入。</li>
        <li>市區實施宵禁，夜間三人以上聚會將立即接受衛兵盤問逮捕。</li>
        <li>外來商隊與旅人必須登記武器並接受三次身分核驗。</li>
      </ul>
    `,
    n3: `
      <h3>⚠️ 《禁止散播叛亂言論》</h3>
      <p style="color:#ef4444; font-weight:bold; margin-bottom:0.8rem;">【王國審訊廳與首相府 警示】</p>
      <p>近期城內出現質疑『北伐安定遠征』之荒謬言論與謠言，特此嚴正警告：</p>
      <ul style="padding-left:1.2rem; margin-bottom:1rem; line-height:1.8;">
        <li>公開同情鐵狼氏族或質疑戰爭合法性者，視同敵國間諜。</li>
        <li>凡私下宣傳『鐵狼族為守護者』等舊時代歷史者，剝奪公民財產並接受審訊。</li>
        <li>鼓勵民眾主動舉報身邊思想異常之人。</li>
      </ul>
    `
  };

  noticeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-notice');
      if (noticeTexts[type]) {
        playSynthesizedSound('glyph');

        // 1. 渲染至下方內嵌資訊顯示框
        if (noticeModalContent) {
          noticeModalContent.innerHTML = noticeTexts[type];
          noticeModalContent.style.borderColor = '#38bdf8';
          noticeModalContent.style.background = 'rgba(15, 23, 42, 0.95)';
          noticeModalContent.style.color = '#e2e8f0';
          noticeModalContent.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.3)';
        }

        // 2. 開啟高亮浮動 Modal 彈窗 (若 modal 存在)
        if (noticeModalBody && noticeModalBackdrop) {
          noticeModalBody.innerHTML = noticeTexts[type];
          noticeModalBackdrop.style.display = 'flex';
        }
      }
    });
  });

  if (btnCloseNoticeModal && noticeModalBackdrop) {
    btnCloseNoticeModal.addEventListener('click', () => {
      noticeModalBackdrop.style.display = 'none';
    });
    noticeModalBackdrop.addEventListener('click', (e) => {
      if (e.target === noticeModalBackdrop) {
        noticeModalBackdrop.style.display = 'none';
      }
    });
  }

  // 2. 蕾米前線布防選擇互動
  const btnPlanRethink = document.getElementById('btn-plan-rethink');
  const btnPlanArchers = document.getElementById('btn-plan-archers');
  const btnPlanWolves = document.getElementById('btn-plan-wolves');
  const planFeedbackBox = document.getElementById('plan-feedback-box');

  if (btnPlanRethink) {
    btnPlanRethink.addEventListener('click', () => {
      playSynthesizedSound('footsteps');
      if (planFeedbackBox) {
        planFeedbackBox.style.display = 'block';
        planFeedbackBox.innerHTML = '🪓 <strong>【防線調整完成】</strong> 拒馬向後撤退二十步！王國重騎兵衝入峽谷時將深陷鬆軟雪層，喪失衝鋒慣性。';
      }
    });
  }

  if (btnPlanArchers) {
    btnPlanArchers.addEventListener('click', () => {
      playSynthesizedSound('glyph');
      if (planFeedbackBox) {
        planFeedbackBox.style.display = 'block';
        planFeedbackBox.innerHTML = '🏹 <strong>【伏擊部署完成】</strong> 弓箭手全數隱蔽於兩側岩壁雪穴中！躲過王國術士第一波集中轟炸火力。';
      }
    });
  }

  if (btnPlanWolves) {
    btnPlanWolves.addEventListener('click', () => {
      playSynthesizedSound('whisper');
      if (planFeedbackBox) {
        planFeedbackBox.style.display = 'block';
        planFeedbackBox.innerHTML = '🐺 <strong>【機動游擊預備】</strong> 狼騎兵小隊遊走於側面峭壁，準備在兩軍交鋒時突襲敵軍後方糧草車隊！';
      }
    });
  }

  // 3. 第三部第二章預告按鈕
  const btnP3Ch2Teaser = document.getElementById('btn-p3ch2-teaser');
  const p3ch2Notice = document.getElementById('p3ch2-notice');

  if (btnP3Ch2Teaser) {
    btnP3Ch2Teaser.addEventListener('click', () => {
      if (p3ch2Notice) {
        p3ch2Notice.style.display = 'block';
        playSynthesizedSound('heartbeat');
      }
    });
  }

  // ESC 鍵關閉所有側欄
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDrawers();
      if (noticeModalBackdrop) noticeModalBackdrop.style.display = 'none';
    }
  });

});

