/**
 * 《艾瑟蘭大陸 Eseran》史詩奇幻互動式序章 - 核心腳本
 * 技術：原生 JavaScript (Vanilla JS)，無任何第三方依賴
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 一、五大國度與神秘第六聖獸 核心資料庫 (Centralized Codex Data)
  // =========================================================================
  const nations = {
    dragonEmpire: {
      id: 'dragonEmpire',
      name: '蒼龍帝國',
      direction: '東方',
      deity: '蒼天龍・奧爾雷恩',
      deityTitle: '雷霆與秩序之神',
      symbol: '雷霆、天空、秩序、王權',
      capital: '天龍京',
      terrain: '雷鳴山脈、奔騰三角洲、萬里沃土',
      culture: '艾瑟蘭最大的中央集權帝國，擁有嚴謹而龐大的官僚法度。皇帝受封「龍裔天子」，皇族宣稱身負蒼龍神血。',
      motto: '天有秩序，人亦應有秩序。',
      magicName: '龍脈術',
      magicDesc: '透過龍脈陣法調動大氣與地脈，可精確操控萬鈞雷霆、狂嵐風刃與堅不可摧的符文封印結界。',
      military: '蒼雷龍騎軍 —— 騎乘青鱗飛龍與雷獸的重甲近衛，大陸最頂尖的制空突擊部隊。',
      beastIcon: '🐉',
      beastDesc: '體長逾千丈的蒼青色東方神龍，鱗片閃爍著雷弧，行經之處天降甘霖、雷雲永隨。',
      themeClass: 'card-theme-dragon',
      color: '#38bdf8'
    },
    lionKingdom: {
      id: 'lionKingdom',
      name: '白獅聖王國',
      direction: '西方',
      deity: '聖耀白獅・雷古斯',
      deityTitle: '太陽與誓言之神',
      symbol: '太陽、勇氣、正義、榮耀',
      capital: '日耀堡',
      terrain: '白金山脈、聖耀大平原、白銀之丘',
      culture: '極度尊崇騎士精神、古老誓約與神聖決鬥。全國奉行誓約法典，所有騎士在受封時皆以性命起誓守護弱小。',
      motto: '願白獅見證我的劍。',
      magicName: '聖焰',
      magicDesc: '召喚無垢太陽聖火，兼具驅除深淵魔穢、強力療癒創傷與為兵刃附魔之神聖威能。最強圓桌騎士可引導「獅王降臨」。',
      military: '白金聖殿騎士團 —— 紀律嚴明之鋼鐵洪流，以白金十字重盾與破曉聖劍著稱。',
      beastIcon: '🦁',
      beastDesc: '巨大的純白雄獅，飄逸的鬃毛由永不熄滅的金色聖火化成，目光能看穿所有謊言與背叛。',
      themeClass: 'card-theme-lion',
      color: '#f59e0b'
    },
    wolfFederation: {
      id: 'wolfFederation',
      name: '玄狼冰原聯邦',
      direction: '北方',
      deity: '月影玄狼・芬里雅',
      deityTitle: '月亮與自由之神',
      symbol: '月亮、狩獵、自由、死亡',
      capital: '冬牙城 (七部冬至會盟之城)',
      terrain: '萬年永凍冰原、霜牙巨峰、針葉林海',
      culture: '由七個性格迥異的北方古老部族結盟而成。不設世襲國王，唯有在大陸遭遇存亡外患時，由七部勇士共同選出「狼王」。',
      motto: '沒有任何人可以永遠統治另一個人。',
      magicName: '獸魂術',
      magicDesc: '與極地野性精靈共鳴，戰士可與狼魂、雪熊魂或古代猛禽締結血契，借得魔獸之力，極限境界甚至能化身半獸戰神。',
      military: '寒霜狼魂遊俠與七族狂戰士 —— 極耐嚴寒，於風雪黑夜中來去如風的頂尖荒原獵殺者。',
      beastIcon: '🐺',
      beastDesc: '毛色如黑曜石般深邃的巨狼，皮毛上浮動著銀色星芒紋路，踏雪無痕，其長嚎能喚醒月華。',
      themeClass: 'card-theme-wolf',
      color: '#94a3b8'
    },
    phoenixTheocracy: {
      id: 'phoenixTheocracy',
      name: '朱凰神國',
      direction: '南方',
      deity: '不滅朱凰・瑟菲拉',
      deityTitle: '火焰與重生之神',
      symbol: '火焰、生命、死亡、重生',
      capital: '涅槃聖殿 (赤宮)',
      terrain: '緋紅火山裂谷、熾熱晶石沙漠、赤焰聖泉',
      culture: '政教合一的神聖國度。最高執政者為歷代「焰之聖女」。民間驚異於歷代聖女容顏幾無二致，流傳「所有聖女皆為同一靈魂轉世」之說。',
      motto: '唯有投身烈焰，始得永恆之生。',
      magicName: '緋焰術',
      magicDesc: '駕馭富含生機的赤色天火。最高秘奧法門名為「涅槃」——相傳能令甫殞落者自灰燼中逆死復生，但必須以施法者不可名狀之代價作交換。',
      military: '緋翼炎衛與祭火大祭司團 —— 兼具毀滅性火海術式與戰場緊急續命能力的熾熱部隊。',
      beastIcon: '🦅',
      beastDesc: '周身沐浴在紅金交織烈火中的不死神凰，尾羽化作飄散的火星，能在灰燼中永劫輪迴、浴火重生。',
      themeClass: 'card-theme-phoenix',
      color: '#f87171'
    },
    deerForest: {
      id: 'deerForest',
      name: '翠鹿森國',
      direction: '中央',
      deity: '世界樹神鹿・艾露希亞',
      deityTitle: '自然與記憶之神',
      symbol: '自然、時間、記憶、命運',
      capital: '森之冠 (世界樹聚落)',
      terrain: '太古世界樹、翡翠神鏡湖、低語林蔭',
      culture: '居民融合了人類、森之精靈、德魯伊與諸多隱居古族。國都圍繞貫通天地之世界樹而建，是五聖大陸最古老的智慧中樞。',
      motto: '森林記得所有戰爭的結局。',
      magicName: '森語術',
      magicDesc: '能夠傾聽古樹、花草與岩石泥土的低語。高位祭司能藉由地脈記憶重現千年前的光景，部分通神祭司甚至能窺伺命運未來之諸多分支。',
      military: '翡翠誓約弓手與林冠巨獸德魯伊 —— 與密林融為一體，百步穿楊的無聲林海守護軍。',
      beastIcon: '🦌',
      beastDesc: '體態修長優雅的神鹿，鹿角形如微縮的世界樹，枝椏間綻放著發光花朵與璀璨星芒。',
      themeClass: 'card-theme-deer',
      color: '#34d399'
    },
    rift: {
      id: 'rift',
      name: '深淵未知裂隙',
      direction: '大陸核心秘境',
      deity: '第六聖獸・沉睡之主',
      deityTitle: '深淵與被遺忘者',
      symbol: '銀蛇、虛空、真實、被抹滅之始',
      capital: '無底裂罅',
      terrain: '空間扭曲之淵、虛無迷霧',
      culture: '所有五聖盟約碑文與編年史中皆無記載的絕對禁忌。真相在無星紀元終結時被五國聯手抹滅。',
      motto: '五國相信他們知道世界，但歷史從未告訴他們真相。',
      magicName: '銀蝕法印 (？？？)',
      magicDesc: '具有瓦解其他五聖魔法法則、消弭秩序與混亂界線的本源威能。',
      military: '無（僅於沉眠中呼吸）',
      beastIcon: '🐍',
      beastDesc: '銀色巨蛇，身軀宛如劃破天穹的冰冷星河，無聲盤踞在歷史記憶的裂口之中。',
      themeClass: 'card-theme-rift',
      color: '#c084fc'
    }
  };

  // 地標與重要城邦註記資料
  const landmarksData = {
    tianlong: {
      title: '天龍京（首都）',
      desc: '蒼龍帝國皇都，依龍脊天脈而築，九層高聳雲霄的帝宮傲視大陸，是整個艾瑟蘭人口最多、最為繁榮昌盛的萬邦之源。'
    },
    yunchuan: {
      title: '雲川城 📜【特別城邦】',
      desc: '位於蒼龍帝國東南方的重要商業都市。商船雲集，無數商隊、冒險者與吟遊詩人聚集於此。酒館裡常有一位名為「鼻鼻」的青年詩人彈奏未知的旋律。'
    },
    sunbastion: {
      title: '日耀堡（首都）',
      desc: '白獅聖王國聖都，由高純度白色大理石與耀金構築。每逢正午，聖堡外壁反射燦爛光芒如太陽降臨，為誓約騎士的精神原鄉。'
    },
    winterfang: {
      title: '冬牙城（會盟之地）',
      desc: '玄狼冰原聯邦大部族聚落，建在萬年玄冰之窟上方。七大部族長每逢冬至長夜在此共飲烈火酒，祭祀雪狼先祖。'
    },
    north_ruin: {
      title: '極北冰封遺蹟',
      desc: '聯邦獵手近期在深層永凍冰蓋發現的未知遠古造物，建築風格完全不屬於五聖神話，牆上散發奇異的銀色暗芒。'
    },
    nirvana: {
      title: '涅槃聖殿（赤宮）',
      desc: '朱凰神國最高行政與神權中樞，矗立於滾燙的熔岩湖之上。傳說「焰之聖女」在此聆聽朱凰從未停息的呼吸之火。'
    },
    arborcrown: {
      title: '森之冠・世界樹聚落',
      desc: '翠鹿森國都城，以龐大無匹的世界樹根莖與樹幹為居所。這裡保存著大陸自無星紀元以來最古老的石板文獻。'
    }
  };

  // =========================================================================
  // 二、Canvas 粒子系統（星塵、微光與浮遊火燼）
  // =========================================================================
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.4 - 0.15; // 緩緩往上飄
      this.opacity = Math.random() * 0.6 + 0.2;
      this.fadeSpeed = Math.random() * 0.005 + 0.002;
      this.colorType = Math.random();
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= this.fadeSpeed;

      if (this.opacity <= 0 || this.y < 0) {
        this.reset();
        this.y = canvas.height + 5;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      
      // 點綴金黃星塵、白銀微光與淡青雲氣
      if (this.colorType < 0.6) {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`; // 琥珀金
      } else if (this.colorType < 0.85) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.9})`; // 星白
      } else {
        ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity * 0.7})`; // 蒼龍蒼青
      }
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 14), 80);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animationFrameId = requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // =========================================================================
  // 三、導覽列滾動監聽與平滑滾動
  // =========================================================================
  const topNav = document.getElementById('top-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      topNav.classList.add('nav-scrolled');
    } else {
      topNav.classList.remove('nav-scrolled');
    }

    // 導覽標籤當前位置感知 (Scroll Spy)
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // 手機版漢堡選單抽屜
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
  }
  function closeDrawer() {
    mobileDrawer.classList.remove('open');
  }

  mobileMenuBtn.addEventListener('click', openDrawer);
  closeDrawerBtn.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // =========================================================================
  // 四、地圖互動引擎 (Interactive SVG Map Logic)
  // =========================================================================
  const svgMapStage = document.getElementById('svg-map-stage');
  const territoryPaths = document.querySelectorAll('.nation-territory');
  const hoverCard = document.getElementById('map-hover-card');
  const closeHoverCardBtn = document.getElementById('close-hover-card-btn');
  const cardJumpBtn = document.getElementById('card-jump-btn');

  // 情報卡欄位元素
  const cardNationName = document.getElementById('card-nation-name');
  const cardDeityName = document.getElementById('card-deity-name');
  const cardBeastSigil = document.getElementById('card-beast-sigil');
  const cardSymbol = document.getElementById('card-symbol');
  const cardCapital = document.getElementById('card-capital');
  const cardTerrain = document.getElementById('card-terrain');
  const cardMagic = document.getElementById('card-magic');
  const cardCulture = document.getElementById('card-culture');
  const cardMotto = document.getElementById('card-motto');

  let currentActiveNationId = null;

  // 更新浮動情報卡內容
  function updateHoverCard(nationId) {
    const data = nations[nationId];
    if (!data) return;

    currentActiveNationId = nationId;
    cardNationName.textContent = data.name;
    cardDeityName.textContent = `主神：${data.deity}`;
    cardBeastSigil.textContent = data.beastIcon;
    cardSymbol.textContent = data.symbol;
    cardCapital.textContent = data.capital;
    cardTerrain.textContent = data.terrain;
    cardMagic.textContent = data.magicName;
    cardCulture.textContent = data.culture;
    cardMotto.textContent = data.motto;

    hoverCard.classList.add('active');
  }

  function hideHoverCard() {
    hoverCard.classList.remove('active');
    svgMapStage.classList.remove('has-hover');
    territoryPaths.forEach(p => p.classList.remove('highlighted'));
  }

  closeHoverCardBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hideHoverCard();
  });

  // 點擊情報卡前往完整百科
  cardJumpBtn.addEventListener('click', () => {
    if (currentActiveNationId && currentActiveNationId !== 'rift') {
      openCodexModal(currentActiveNationId);
    } else if (currentActiveNationId === 'rift') {
      // 導向終章探索
      const endingSection = document.getElementById('prologue-ending');
      endingSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // 為所有國家地界綁定 Hover 與 Click 互動
  territoryPaths.forEach(path => {
    const nationId = path.getAttribute('data-nation');

    // 滑鼠移入：高亮當前國家，其他國家變暗
    path.addEventListener('mouseenter', () => {
      svgMapStage.classList.add('has-hover');
      path.classList.add('highlighted');
      updateHoverCard(nationId);
    });

    path.addEventListener('mouseleave', () => {
      // 如果不是手機模式，滑鼠移開時維持卡片，但取消地圖其他變暗
      svgMapStage.classList.remove('has-hover');
      path.classList.remove('highlighted');
    });

    // 點擊事件：鎖定選取，同時適用於手機 RWD 觸控
    path.addEventListener('click', (e) => {
      e.stopPropagation();
      territoryPaths.forEach(p => p.classList.remove('highlighted'));
      path.classList.add('highlighted');
      svgMapStage.classList.add('has-hover');
      updateHoverCard(nationId);
    });
  });

  // 深淵裂隙互動
  const mysticRift = document.getElementById('mystic-rift-zone');
  if (mysticRift) {
    mysticRift.addEventListener('mouseenter', () => {
      svgMapStage.classList.add('has-hover');
      updateHoverCard('rift');
    });
    mysticRift.addEventListener('click', (e) => {
      e.stopPropagation();
      updateHoverCard('rift');
    });
  }

  // 地圖篩選按鈕列
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      if (filter === 'all') {
        hideHoverCard();
      } else if (filter === 'rift') {
        svgMapStage.classList.add('has-hover');
        updateHoverCard('rift');
      } else {
        territoryPaths.forEach(p => {
          const id = p.getAttribute('data-nation');
          if (id === filter) {
            p.classList.add('highlighted');
          } else {
            p.classList.remove('highlighted');
          }
        });
        svgMapStage.classList.add('has-hover');
        updateHoverCard(filter);
      }
    });
  });

  // 地圖縮放與重設功能
  let currentZoom = 1;
  const zoomInBtn = document.getElementById('btn-zoom-in');
  const zoomOutBtn = document.getElementById('btn-zoom-out');
  const zoomResetBtn = document.getElementById('btn-zoom-reset');

  function applyZoom(zoom) {
    currentZoom = Math.min(Math.max(zoom, 0.85), 2.0);
    svgMapStage.style.transform = `scale(${currentZoom})`;
  }

  zoomInBtn.addEventListener('click', () => applyZoom(currentZoom + 0.2));
  zoomOutBtn.addEventListener('click', () => applyZoom(currentZoom - 0.2));
  zoomResetBtn.addEventListener('click', () => applyZoom(1));

  // =========================================================================
  // 五、地標城邦即時氣泡 Tooltip (Landmark Pins Tooltip)
  // =========================================================================
  const landmarkPins = document.querySelectorAll('.landmark-pin');
  const landmarkTooltip = document.getElementById('landmark-tooltip');
  const tooltipTitle = document.getElementById('tooltip-title');
  const tooltipDesc = document.getElementById('tooltip-desc');
  const mapViewport = document.getElementById('map-viewport');

  landmarkPins.forEach(pin => {
    const key = pin.getAttribute('data-landmark');
    const data = landmarksData[key];
    if (!data) return;

    pin.addEventListener('mouseenter', (e) => {
      tooltipTitle.textContent = data.title;
      tooltipDesc.textContent = data.desc;
      landmarkTooltip.style.display = 'block';
      landmarkTooltip.style.opacity = '1';
      positionTooltip(e);
    });

    pin.addEventListener('mousemove', (e) => {
      positionTooltip(e);
    });

    pin.addEventListener('mouseleave', () => {
      landmarkTooltip.style.display = 'none';
      landmarkTooltip.style.opacity = '0';
    });

    // 手機點擊支援
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      tooltipTitle.textContent = data.title;
      tooltipDesc.textContent = data.desc;
      landmarkTooltip.style.display = 'block';
      landmarkTooltip.style.opacity = '1';
      positionTooltip(e);
    });
  });

  function positionTooltip(e) {
    const viewportRect = mapViewport.getBoundingClientRect();
    let left = e.clientX - viewportRect.left + 15;
    let top = e.clientY - viewportRect.top + 15;

    // 防止超出右界與下界
    if (left + 260 > viewportRect.width) {
      left = left - 280;
    }
    if (top + 120 > viewportRect.height) {
      top = top - 130;
    }

    landmarkTooltip.style.left = `${left}px`;
    landmarkTooltip.style.top = `${top}px`;
  }

  // 聖獸在地圖上的專屬徽章 Hover
  const beastBadges = document.querySelectorAll('.map-beast-emblem');
  beastBadges.forEach(badge => {
    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      const beastKey = badge.getAttribute('data-beast');
      const keyMap = {
        canglong: 'dragonEmpire',
        bailion: 'lionKingdom',
        xuanwolf: 'wolfFederation',
        zhuhuang: 'phoenixTheocracy',
        shenlu: 'deerForest'
      };
      if (keyMap[beastKey]) {
        updateHoverCard(keyMap[beastKey]);
      }
    });
  });

  // =========================================================================
  // 六、國家介紹區（動態產生五國檔案卡片）
  // =========================================================================
  const cardContainer = document.getElementById('nations-card-container');
  const nationKeys = ['dragonEmpire', 'lionKingdom', 'wolfFederation', 'phoenixTheocracy', 'deerForest'];

  nationKeys.forEach(key => {
    const n = nations[key];
    const card = document.createElement('article');
    card.className = `nation-card ${n.themeClass}`;
    card.innerHTML = `
      <div class="card-top-banner">
        <div class="banner-silhouette-bg"></div>
        <div class="card-crest-avatar" title="${n.deity}">
          <span>${n.beastIcon}</span>
        </div>
      </div>
      <div class="card-info-content">
        <span class="card-direction-tag">${n.direction}之邦・主神守護</span>
        <h3 class="card-main-title">${n.name}</h3>
        <span class="card-deity-lead">主神：${n.deity}</span>
        <p class="card-synopsis">${n.culture}</p>
        <div class="card-motto-snippet">“ ${n.motto} ”</div>
        <div class="card-action-bar">
          <button class="card-read-btn" data-nation-id="${n.id}">查閱秘典詳細誌 ➔</button>
        </div>
      </div>
    `;
    cardContainer.appendChild(card);
  });

  // 監聽卡片上的「查閱秘典詳細誌」
  document.querySelectorAll('.card-read-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-nation-id');
      openCodexModal(id);
    });
  });

  // =========================================================================
  // 七、國家詳細誌 MODAL 控制
  // =========================================================================
  const codexModal = document.getElementById('codex-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');

  // Modal 欄位
  const modalBeastSigil = document.getElementById('modal-beast-sigil');
  const modalDirection = document.getElementById('modal-direction');
  const modalNationName = document.getElementById('modal-nation-name');
  const modalDeityTitle = document.getElementById('modal-deity-title');
  const modalBeastPortrait = document.getElementById('modal-beast-portrait');
  const modalBeastDesc = document.getElementById('modal-beast-desc');
  const modalQuote = document.getElementById('modal-quote');
  const modalCulture = document.getElementById('modal-culture');
  const modalMagicName = document.getElementById('modal-magic-name');
  const modalMagicDesc = document.getElementById('modal-magic-desc');
  const modalMilitary = document.getElementById('modal-military');
  const modalGeography = document.getElementById('modal-geography');

  function openCodexModal(nationId) {
    const data = nations[nationId];
    if (!data) return;

    modalBeastSigil.textContent = data.beastIcon;
    modalDirection.textContent = `${data.direction}之境・守護方位`;
    modalNationName.textContent = data.name;
    modalDeityTitle.textContent = `主神：${data.deity}（${data.deityTitle}）`;
    
    modalBeastPortrait.innerHTML = `<span style="filter: drop-shadow(0 0 15px ${data.color}); font-size: 5rem;">${data.beastIcon}</span>`;
    modalBeastDesc.textContent = data.beastDesc;
    modalQuote.textContent = `“ ${data.motto} ”`;
    modalCulture.textContent = data.culture;
    modalMagicName.textContent = `秘術體系：${data.magicName}`;
    modalMagicDesc.textContent = data.magicDesc;
    modalMilitary.innerHTML = `<strong>精銳部隊：</strong>${data.military}`;
    modalGeography.innerHTML = `<strong>自然地貌與名城：</strong>首都【${data.capital}】，境內遍布【${data.terrain}】。`;

    codexModal.classList.add('open');
    codexModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCodexModal() {
    codexModal.classList.remove('open');
    codexModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalBackdrop.addEventListener('click', closeCodexModal);
  modalCloseBtn.addEventListener('click', closeCodexModal);
  modalDoneBtn.addEventListener('click', closeCodexModal);

  // =========================================================================
  // 八、序章終局儀式與第六聖獸揭秘 (Prologue Climax Narrative)
  // =========================================================================
  const triggerFateBtn = document.getElementById('btn-trigger-fate');
  const darknessOverlay = document.getElementById('darkness-overlay');
  const line1 = document.getElementById('line-1');
  const line2 = document.getElementById('line-2');
  const line3 = document.getElementById('line-3');
  const sixthBeastBox = document.getElementById('sixth-beast-box');
  const protagonistTeaser = document.getElementById('protagonist-teaser');
  let hasTriggeredFate = false;

  triggerFateBtn.addEventListener('click', () => {
    if (hasTriggeredFate) return;
    hasTriggeredFate = true;

    // 播放儀式震音 (若有啟用 Web Audio)
    playChime(130, 2.5);

    // 步驟 1：天幕降下深沉陰影，五國地圖光芒依序熄滅
    triggerFateBtn.style.opacity = '0.3';
    triggerFateBtn.style.pointerEvents = 'none';
    darknessOverlay.style.opacity = '0.98';

    // 五國地圖光芒依序暗滅，只留下中央未知裂隙
    const orderToExtinguish = ['nation-dragonEmpire', 'nation-lionKingdom', 'nation-wolfFederation', 'nation-phoenixTheocracy', 'nation-deerForest'];
    orderToExtinguish.forEach((id, idx) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.style.transition = 'all 1.5s ease';
          el.style.fill = '#06080c';
          el.style.stroke = '#151c24';
          el.style.opacity = '0.15';
          el.style.filter = 'none';
        }
      }, idx * 600);
    });

    setTimeout(() => {
      const riftEl = document.getElementById('mystic-rift-zone');
      if (riftEl) {
        riftEl.style.transform = 'scale(1.35)';
        riftEl.style.filter = 'drop-shadow(0 0 30px #c084fc)';
      }
    }, 3200);

    // 步驟 2：第一句字幕浮現（1.0 秒）
    setTimeout(() => {
      line1.classList.add('visible');
      playChime(220, 1.2);
    }, 1000);

    // 步驟 3：第二句字幕浮現（2.6 秒）
    setTimeout(() => {
      line2.classList.add('visible');
      playChime(196, 1.2);
    }, 2600);

    // 步驟 4：第三句震撼揭曉（4.5 秒）
    setTimeout(() => {
      line3.classList.add('visible');
      playChime(164, 2.5);
    }, 4500);

    // 步驟 5：第六聖獸・銀蛇神印甦醒顯現（6.2 秒）
    setTimeout(() => {
      sixthBeastBox.classList.add('visible');
      playChime(330, 3.0);
    }, 6200);

    // 步驟 6：主角伏筆與第一章入口浮現（8.0 秒）
    setTimeout(() => {
      protagonistTeaser.classList.add('visible');
      playChime(440, 2.0);
    }, 8000);
  });

  // 無星紀元五聖降臨卡點擊：平滑滾動至地圖並聚焦該國
  const descentItems = document.querySelectorAll('.descent-item');
  descentItems.forEach(item => {
    item.addEventListener('click', () => {
      const beastKey = item.getAttribute('data-beast');
      const keyMap = {
        canglong: 'dragonEmpire',
        bailion: 'lionKingdom',
        xuanwolf: 'wolfFederation',
        zhuhuang: 'phoenixTheocracy',
        shenlu: 'deerForest'
      };
      const nationId = keyMap[beastKey];
      if (nationId) {
        const mapSection = document.getElementById('interactive-map');
        mapSection.scrollIntoView({ behavior: 'smooth' });
        territoryPaths.forEach(p => {
          if (p.getAttribute('data-nation') === nationId) {
            p.classList.add('highlighted');
          } else {
            p.classList.remove('highlighted');
          }
        });
        svgMapStage.classList.add('has-hover');
        updateHoverCard(nationId);
        playChime(392, 1.5);
      }
    });
  });

  // 第一章預告 Modal
  const btnChapterOne = document.getElementById('btn-chapter-one');
  const chapterModal = document.getElementById('chapter-preview-modal');
  const previewBackdrop = document.getElementById('preview-backdrop');
  const previewCloseBtn = document.getElementById('preview-close-btn');
  const previewOkBtn = document.getElementById('preview-ok-btn');

  function openChapterModal() {
    chapterModal.classList.add('open');
    chapterModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeChapterModal() {
    chapterModal.classList.remove('open');
    chapterModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btnChapterOne.addEventListener('click', openChapterModal);
  previewBackdrop.addEventListener('click', closeChapterModal);
  previewCloseBtn.addEventListener('click', closeChapterModal);
  previewOkBtn.addEventListener('click', closeChapterModal);

  // =========================================================================
  // 九、Web Audio API 合成中古空靈環境音 (Zero External Audio File)
  // =========================================================================
  let audioCtx = null;
  let isSoundActive = false;
  let ambientOsc1 = null;
  let ambientOsc2 = null;
  let masterGain = null;
  const soundToggleBtn = document.getElementById('sound-toggle');
  const soundLabel = soundToggleBtn.querySelector('.label');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  function startAmbientDrone() {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // 雙振盪器合成中古低吟詠唱基底 (D調根音與五度微顫)
    ambientOsc1 = audioCtx.createOscillator();
    ambientOsc1.type = 'sine';
    ambientOsc1.frequency.setValueAtTime(73.42, audioCtx.currentTime); // D2

    ambientOsc2 = audioCtx.createOscillator();
    ambientOsc2.type = 'triangle';
    ambientOsc2.frequency.setValueAtTime(110.00, audioCtx.currentTime); // A2

    ambientOsc1.connect(masterGain);
    ambientOsc2.connect(masterGain);

    ambientOsc1.start();
    ambientOsc2.start();
  }

  function stopAmbientDrone() {
    if (masterGain && audioCtx) {
      masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        try {
          ambientOsc1.stop();
          ambientOsc2.stop();
        } catch (e) {}
      }, 500);
    }
  }

  function playChime(freq, duration) {
    if (!isSoundActive || !audioCtx) return;
    try {
      const chimeOsc = audioCtx.createOscillator();
      const chimeGain = audioCtx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      chimeGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(audioCtx.destination);

      chimeOsc.start();
      chimeOsc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  soundToggleBtn.addEventListener('click', () => {
    if (!isSoundActive) {
      startAmbientDrone();
      isSoundActive = true;
      soundToggleBtn.classList.add('playing');
      soundLabel.textContent = '氛圍音效: 開啟中';
    } else {
      stopAmbientDrone();
      isSoundActive = false;
      soundToggleBtn.classList.remove('playing');
      soundLabel.textContent = '氛圍音效: 關閉';
    }
  });

  // ESC 快捷鍵關閉視窗
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCodexModal();
      closeChapterModal();
      hideHoverCard();
    }
  });

});
