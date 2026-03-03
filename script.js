/* =========================================================
   MOSAIC QUEST - script.js
   Complete Mahjong Solitaire Game Engine + Pi Integration
   ========================================================= */

'use strict';

// ============================================================
// SECTION 1: CONSTANTS & CONFIG
// ============================================================
const TILE_W = 58;
const TILE_H = 72;
const TILE_GAP = 2;
const LAYER_SHIFT_X = 4;
const LAYER_SHIFT_Y = 4;

const HINT_COST_PI = 0.10;
const SHUFFLE_COST_PI = 0.20;
const SCORE_PER_MATCH = 100;
const SCORE_TIME_BONUS = 2;
const SCORE_NO_HINT_BONUS = 500;
const XP_PER_LEVEL = 1000;

// ============================================================
// SECTION 2: i18n TRANSLATIONS
// ============================================================
const TRANSLATIONS = {
  en: {
    tagline: 'Match • Win • Earn Pi', piNetwork: 'Pi Network', welcomeBack: 'Welcome Back!',
    username: 'Username', piId: 'Pi User ID', loginWithPi: 'Login with Pi', playAsGuest: 'Play as Guest',
    feature1: 'Mahjong Solitaire', feature2: 'Earn Pi Rewards', feature3: 'Global Leaderboard',
    home: 'Home', play: 'Play', profile: 'Profile', wallet: 'Wallet', settings: 'Settings',
    dailyReward: 'Daily Reward', chooseMode: 'Choose Mode', selectLevel: 'Select Level',
    classic: 'Classic', classicDesc: 'Match all tiles', timed: 'Timed', timedDesc: 'Beat the clock',
    challenge: 'Challenge', challengeDesc: 'No hints allowed', gamesPlayed: 'Games', wins: 'Wins',
    bestScore: 'Best', totalPi: 'Pi Earned', score: 'Score', time: 'Time', moves: 'Moves',
    hint: 'Hint', undo: 'Undo', shuffle: 'Shuffle', paused: 'Game Paused', resume: 'Resume',
    restart: 'Restart', exitGame: 'Exit', levelComplete: 'Level Complete!', nextLevel: 'Next Level',
    playAgain: 'Play Again', backHome: 'Back to Home', gameOver: 'Game Over', tryAgain: 'Try Again',
    shuffleBoard: 'Shuffle Board', dailyRewardTitle: 'Daily Reward!', claim: 'Claim!',
    shop: 'Pi Shop', piBalance: 'Pi Balance', testnet: 'Testnet (Mock)', transactions: 'Transactions',
    coins: 'Coins:', earnPi: 'Earn Pi', achievements: 'Achievements', scoreHistory: 'Score History',
    level: 'Level', stars: 'Stars', totalMatches: 'Matches', achievementUnlocked: 'Achievement Unlocked!',
    awesome: 'Awesome!', audio: 'Audio', soundEffects: 'Sound Effects', backgroundMusic: 'Background Music',
    appearance: 'Appearance', darkMode: 'Dark Mode', tileTheme: 'Tile Theme', language: 'Language',
    gameSettings: 'Game Settings', animations: 'Animations', autoHint: 'Auto-Hint Warning',
    resetProgress: 'Reset Progress', about: 'About', close: 'Close', leaderboard: 'Leaderboard',
    global: 'Global', weekly: 'Weekly', friends: 'Friends', aboutDesc: 'A Mahjong-style puzzle game integrated with Pi Network.',
    noMoves: 'No moves available! Try shuffling.', shuffled: 'Board shuffled!', hintUsed: 'Hint shown!',
    notEnoughPi: 'Not enough Pi!', purchased: 'Purchased!', logged_out: 'Logged out.',
    resetDone: 'Progress reset!', timeUp: 'Time\'s up!',
  },
  fr: {
    tagline: 'Associez • Gagnez • Obtenez Pi', piNetwork: 'Réseau Pi', welcomeBack: 'Bon retour!',
    username: 'Pseudo', piId: 'ID Pi', loginWithPi: 'Connexion Pi', playAsGuest: 'Jouer en invité',
    feature1: 'Solitaire Mahjong', feature2: 'Gagner des Pi', feature3: 'Classement Mondial',
    home: 'Accueil', play: 'Jouer', profile: 'Profil', wallet: 'Portefeuille', settings: 'Paramètres',
    dailyReward: 'Récompense Quotidienne', chooseMode: 'Choisir le Mode', selectLevel: 'Choisir le Niveau',
    classic: 'Classique', classicDesc: 'Associer toutes les tuiles', timed: 'Chronométré', timedDesc: 'Battez le chrono',
    challenge: 'Défi', challengeDesc: 'Sans indices', gamesPlayed: 'Parties', wins: 'Victoires',
    bestScore: 'Meilleur', totalPi: 'Pi Gagné', score: 'Score', time: 'Temps', moves: 'Coups',
    hint: 'Indice', undo: 'Annuler', shuffle: 'Mélanger', paused: 'Jeu en Pause', resume: 'Reprendre',
    restart: 'Redémarrer', exitGame: 'Quitter', levelComplete: 'Niveau Terminé!', nextLevel: 'Niveau Suivant',
    playAgain: 'Rejouer', backHome: 'Retour', gameOver: 'Jeu Terminé', tryAgain: 'Réessayer',
    shuffleBoard: 'Mélanger', dailyRewardTitle: 'Récompense du Jour!', claim: 'Réclamer!',
    shop: 'Boutique Pi', piBalance: 'Solde Pi', testnet: 'Réseau Test (Simulé)', transactions: 'Transactions',
    coins: 'Pièces:', earnPi: 'Gagner Pi', achievements: 'Succès', scoreHistory: 'Historique',
    level: 'Niveau', stars: 'Étoiles', totalMatches: 'Paires', achievementUnlocked: 'Succès Débloqué!',
    awesome: 'Super!', audio: 'Son', soundEffects: 'Effets Sonores', backgroundMusic: 'Musique de Fond',
    appearance: 'Apparence', darkMode: 'Mode Sombre', tileTheme: 'Thème Tuiles', language: 'Langue',
    gameSettings: 'Jeu', animations: 'Animations', autoHint: 'Avertissement Indice',
    resetProgress: 'Réinitialiser', about: 'À propos', close: 'Fermer', leaderboard: 'Classement',
    global: 'Mondial', weekly: 'Hebdomadaire', friends: 'Amis', aboutDesc: 'Un jeu de puzzle style Mahjong intégré au réseau Pi.',
    noMoves: 'Aucun coup disponible! Essayez de mélanger.', shuffled: 'Plateau mélangé!', hintUsed: 'Indice affiché!',
    notEnoughPi: 'Pas assez de Pi!', purchased: 'Acheté!', logged_out: 'Déconnecté.',
    resetDone: 'Progression réinitialisée!', timeUp: 'Temps écoulé!',
  },
  ar: {
    tagline: 'طابق • اربح • احصل على Pi', piNetwork: 'شبكة Pi', welcomeBack: 'مرحباً بعودتك!',
    username: 'اسم المستخدم', piId: 'معرّف Pi', loginWithPi: 'تسجيل الدخول بـ Pi', playAsGuest: 'اللعب كضيف',
    feature1: 'ماهجونغ سوليتير', feature2: 'اكسب مكافآت Pi', feature3: 'متصدرون عالميون',
    home: 'الرئيسية', play: 'العب', profile: 'الملف', wallet: 'المحفظة', settings: 'الإعدادات',
    dailyReward: 'المكافأة اليومية', chooseMode: 'اختر الوضع', selectLevel: 'اختر المستوى',
    classic: 'كلاسيكي', classicDesc: 'طابق جميع القطع', timed: 'موقوت', timedDesc: 'تغلب على الوقت',
    challenge: 'تحدي', challengeDesc: 'بدون تلميحات', gamesPlayed: 'الألعاب', wins: 'الانتصارات',
    bestScore: 'أفضل', totalPi: 'Pi مكتسب', score: 'النقاط', time: 'الوقت', moves: 'الحركات',
    hint: 'تلميح', undo: 'تراجع', shuffle: 'خلط', paused: 'اللعبة متوقفة', resume: 'استئناف',
    restart: 'إعادة', exitGame: 'خروج', levelComplete: 'اكتمل المستوى!', nextLevel: 'المستوى التالي',
    playAgain: 'العب ثانية', backHome: 'الرئيسية', gameOver: 'انتهت اللعبة', tryAgain: 'حاول ثانية',
    shuffleBoard: 'خلط اللوحة', dailyRewardTitle: 'المكافأة اليومية!', claim: 'احصل عليها!',
    shop: 'متجر Pi', piBalance: 'رصيد Pi', testnet: 'شبكة اختبار', transactions: 'المعاملات',
    coins: 'عملات:', earnPi: 'اكسب Pi', achievements: 'الإنجازات', scoreHistory: 'سجل النقاط',
    level: 'المستوى', stars: 'النجوم', totalMatches: 'التطابقات', achievementUnlocked: 'تم فتح إنجاز!',
    awesome: 'رائع!', audio: 'الصوت', soundEffects: 'المؤثرات الصوتية', backgroundMusic: 'الموسيقى الخلفية',
    appearance: 'المظهر', darkMode: 'الوضع الداكن', tileTheme: 'سمة القطع', language: 'اللغة',
    gameSettings: 'إعدادات اللعبة', animations: 'الرسوم المتحركة', autoHint: 'تحذير تلقائي',
    resetProgress: 'إعادة ضبط', about: 'حول', close: 'إغلاق', leaderboard: 'المتصدرون',
    global: 'عالمي', weekly: 'أسبوعي', friends: 'الأصدقاء', aboutDesc: 'لعبة بازل بأسلوب الماهجونغ مدمجة مع شبكة Pi.',
    noMoves: 'لا حركات متاحة! حاول الخلط.', shuffled: 'تم خلط اللوحة!', hintUsed: 'تم عرض التلميح!',
    notEnoughPi: '!Pi رصيد غير كافٍ', purchased: 'تم الشراء!', logged_out: 'تم تسجيل الخروج.',
    resetDone: 'تم إعادة الضبط!', timeUp: 'انتهى الوقت!',
  }
};

// ============================================================
// SECTION 3: TILE CONFIGURATION
// ============================================================
const SUIT_CONFIG = {
  man: { name: 'Characters', symbol: '万', values: [1,2,3,4,5,6,7,8,9], getMain: v => ['一','二','三','四','五','六','七','八','九'][v-1] },
  bam: { name: 'Bamboo', symbol: '竹', values: [1,2,3,4,5,6,7,8,9], getMain: v => String(v) },
  cir: { name: 'Circles', symbol: '筒', values: [1,2,3,4,5,6,7,8,9], getMain: v => ['①','②','③','④','⑤','⑥','⑦','⑧','⑨'][v-1] },
  wnd: { name: 'Wind', symbol: '風', values: ['E','S','W','N'], getMain: v => ({'E':'東','S':'南','W':'西','N':'北'})[v] },
  drg: { name: 'Dragon', symbol: '龍', values: ['R','G','W'], getMain: v => ({'R':'中','G':'發','W':'白'})[v] },
  flo: { name: 'Flower', symbol: '花', values: [1,2,3,4], getMain: v => ['🌸','🌺','🌻','🌼'][v-1], isBonus: true },
  ssn: { name: 'Season', symbol: '節', values: [1,2,3,4], getMain: v => ['春','夏','秋','冬'][v-1], isBonus: true },
};

// ============================================================
// SECTION 4: BOARD LAYOUTS
// ============================================================
function generateSimpleLayout() {
  const pos = [];
  // Layer 0: 8×6 = 48
  for (let r=0;r<6;r++) for (let c=0;c<8;c++) pos.push({c,r,z:0});
  // Layer 1: cols 1-6, rows 1-4 = 24
  for (let r=1;r<=4;r++) for (let c=1;c<=6;c++) pos.push({c,r,z:1});
  // = 72 total
  return pos;
}

function generateTurtleLayout() {
  const pos = [];
  // Layer 0: body
  for (let c=2;c<=9;c++) pos.push({c,r:0,z:0}); // 8
  for (let c=0;c<=11;c++) pos.push({c,r:1,z:0}); // 12
  for (let c=0;c<=11;c++) pos.push({c,r:2,z:0}); // 12
  for (let c=0;c<=11;c++) pos.push({c,r:3,z:0}); // 12
  for (let c=0;c<=11;c++) pos.push({c,r:4,z:0}); // 12
  for (let c=2;c<=9;c++) pos.push({c,r:5,z:0}); // 8
  // Bridge tiles
  pos.push({c:-1,r:2,z:0},{c:-1,r:3,z:0},{c:12,r:2,z:0},{c:12,r:3,z:0});
  // Layer 0: 64+4 = 68
  // Layer 1: 4x8=32
  for (let r=1;r<=4;r++) for (let c=2;c<=9;c++) pos.push({c,r,z:1});
  // Layer 2: 2x4=8
  for (let r=2;r<=3;r++) for (let c=4;c<=7;c++) pos.push({c,r,z:2});
  // Layer 3: 4
  for (let r=2;r<=3;r++) for (let c=5;c<=6;c++) pos.push({c,r,z:3});
  // Total: 68+32+8+4 = 112 → pad to 112 (even)
  return pos; // 112 tiles
}

function generatePyramidLayout() {
  const pos = [];
  // Pyramid: widest at bottom, tapering upward
  const rows = [[0,11],[1,10],[2,9],[3,8],[4,7],[5,6]]; // [minC, maxC] per row
  rows.forEach(([minC,maxC], r) => {
    for (let c=minC;c<=maxC;c++) pos.push({c,r,z:0});
  });
  // Layer 1
  const rows1 = [[1,10],[2,9],[3,8],[4,7]];
  rows1.forEach(([minC,maxC], ri) => {
    for (let c=minC;c<=maxC;c++) pos.push({c,r:ri+1,z:1});
  });
  // Layer 2
  const rows2 = [[2,9],[3,8]];
  rows2.forEach(([minC,maxC], ri) => {
    for (let c=minC;c<=maxC;c++) pos.push({c,r:ri+2,z:2});
  });
  // Layer 3
  for (let c=3;c<=8;c++) pos.push({c,r:3,z:3});
  // Layer 4
  for (let c=4;c<=7;c++) pos.push({c,r:3,z:4});
  // Layer 5
  for (let c=5;c<=6;c++) pos.push({c,r:3,z:5});
  // Make count even
  if (pos.length % 2 !== 0) pos.pop();
  return pos;
}

function generateTowerLayout() {
  const pos = [];
  // Wide base
  for (let r=0;r<4;r++) for (let c=0;c<14;c++) pos.push({c,r,z:0}); // 56
  // Layer 1
  for (let r=0;r<4;r++) for (let c=1;c<13;c++) pos.push({c,r,z:1}); // 48
  // Layer 2
  for (let r=0;r<4;r++) for (let c=2;c<12;c++) pos.push({c,r,z:2}); // 40... trimming
  for (let r=0;r<2;r++) for (let c=3;c<11;c++) pos.push({c,r,z:3}); // 16
  for (let r=0;r<1;r++) for (let c=4;c<10;c++) pos.push({c,r,z:4}); // 6
  if (pos.length % 2 !== 0) pos.pop();
  return pos;
}

const LEVEL_CONFIG = [
  { id:1, name:'Beginner', layout:'simple', timeLimit:0, piReward:0.10, coinReward:50, stars:[400,800,1500] },
  { id:2, name:'Easy', layout:'simple', timeLimit:0, piReward:0.12, coinReward:60, stars:[600,1200,2000] },
  { id:3, name:'Normal', layout:'turtle', timeLimit:0, piReward:0.15, coinReward:75, stars:[1000,2000,3500] },
  { id:4, name:'Skilled', layout:'turtle', timeLimit:0, piReward:0.18, coinReward:90, stars:[1200,2400,4000] },
  { id:5, name:'Expert', layout:'pyramid', timeLimit:300, piReward:0.22, coinReward:110, stars:[1500,3000,5000] },
  { id:6, name:'Master', layout:'pyramid', timeLimit:240, piReward:0.25, coinReward:130, stars:[2000,4000,6000] },
  { id:7, name:'Legend', layout:'tower', timeLimit:300, piReward:0.30, coinReward:150, stars:[2500,5000,8000] },
  { id:8, name:'Titan', layout:'tower', timeLimit:240, piReward:0.35, coinReward:180, stars:[3000,6000,10000] },
  { id:9, name:'Infinity', layout:'turtle', timeLimit:180, piReward:0.40, coinReward:200, stars:[4000,8000,12000] },
  { id:10, name:'Godlike', layout:'pyramid', timeLimit:180, piReward:0.50, coinReward:250, stars:[5000,10000,15000] },
];

const ACHIEVEMENTS = [
  { id:'first_match', icon:'🎯', name:'First Match', desc:'Matched your first pair!', check: s => s.totalMatches >= 1 },
  { id:'first_win', icon:'🏆', name:'First Win', desc:'Completed a level!', check: s => s.wins >= 1 },
  { id:'speed_run', icon:'⚡', name:'Speed Run', desc:'Win in under 60 seconds!', check: s => s.fastWin },
  { id:'no_hint', icon:'🧠', name:'No Hints!', desc:'Complete a level without hints.', check: s => s.noHintWin },
  { id:'chain5', icon:'🔥', name:'Hot Streak', desc:'Match 5 pairs in a row!', check: s => s.maxChain >= 5 },
  { id:'matches50', icon:'💫', name:'50 Matches', desc:'Total 50 matches!', check: s => s.totalMatches >= 50 },
  { id:'matches200', icon:'🌟', name:'200 Matches', desc:'Total 200 matches!', check: s => s.totalMatches >= 200 },
  { id:'pi_earner', icon:'π', name:'Pi Earner', desc:'Earn 1 Pi total!', check: s => s.totalPi >= 1 },
  { id:'pi_whale', icon:'🐋', name:'Pi Whale', desc:'Earn 5 Pi total!', check: s => s.totalPi >= 5 },
  { id:'level5', icon:'🎖️', name:'Level 5', desc:'Reach level 5!', check: s => s.maxLevelUnlocked >= 5 },
  { id:'level10', icon:'👑', name:'Champion', desc:'Reach level 10!', check: s => s.maxLevelUnlocked >= 10 },
  { id:'daily_7', icon:'📅', name:'Daily Player', desc:'7 day streak!', check: s => s.maxStreak >= 7 },
];

const MOCK_LEADERBOARD = [
  {rank:1, name:'PiKing_88', avatar:'👑', score:98450, pi:12.5, level:10},
  {rank:2, name:'TileWizard', avatar:'🧙', score:87320, pi:10.2, level:9},
  {rank:3, name:'MosaicPro', avatar:'💎', score:76510, pi:8.7, level:8},
  {rank:4, name:'DragonSlayer', avatar:'🐉', score:65890, pi:7.1, level:7},
  {rank:5, name:'StarPlayer42', avatar:'⭐', score:54300, pi:5.9, level:7},
  {rank:6, name:'PuzzleKing', avatar:'🎯', score:43210, pi:4.8, level:6},
  {rank:7, name:'TileHunter', avatar:'🏹', score:38760, pi:4.1, level:6},
  {rank:8, name:'MosaicMaster', avatar:'🏆', score:32100, pi:3.4, level:5},
  {rank:9, name:'QuickFinger', avatar:'⚡', score:28940, pi:2.9, level:5},
  {rank:10, name:'NightOwl77', avatar:'🦉', score:24500, pi:2.2, level:4},
];

// ============================================================
// SECTION 5: DATA STORE
// ============================================================
const Store = {
  KEY: 'mosaic_quest_v1',
  defaults: {
    user: null,
    settings: { sound:true, music:true, dark:false, animations:true, autohint:true, language:'en', tileTheme:'classic' },
    progress: { level:1, maxLevelUnlocked:1, xp:0, totalMatches:0, totalPi:0, totalCoins:0, wins:0, games:0, stars:0, maxChain:0, fastWin:false, noHintWin:false, maxStreak:0, lastLoginDate:null, streak:0, maxLevelReached:1 },
    scores: [],
    transactions: [],
    achievements: [],
    adminSettings: { piRate:0.10, coinsRate:5 },
    dailyRewardClaimed: null,
    piBalance: 1.5,
    coinBalance: 150,
  },
  data: null,
  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      this.data = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(this.defaults));
      // Ensure all defaults exist
      Object.keys(this.defaults).forEach(k => { if (this.data[k] === undefined) this.data[k] = JSON.parse(JSON.stringify(this.defaults[k])); });
      Object.keys(this.defaults.settings).forEach(k => { if (this.data.settings[k] === undefined) this.data.settings[k] = this.defaults.settings[k]; });
      Object.keys(this.defaults.progress).forEach(k => { if (this.data.progress[k] === undefined) this.data.progress[k] = this.defaults.progress[k]; });
    } catch(e) { this.data = JSON.parse(JSON.stringify(this.defaults)); }
  },
  save() { try { localStorage.setItem(this.KEY, JSON.stringify(this.data)); } catch(e) {} },
  reset() { this.data = JSON.parse(JSON.stringify(this.defaults)); this.save(); },
  get(key) { return this.data[key]; },
  set(key, val) { this.data[key] = val; this.save(); },
  getSetting(k) { return this.data.settings[k]; },
  setSetting(k, v) { this.data.settings[k] = v; this.save(); },
  getProgress(k) { return this.data.progress[k]; },
  setProgress(k, v) { this.data.progress[k] = v; this.save(); },
  addTransaction(tx) {
    this.data.transactions.unshift({ ...tx, date: new Date().toLocaleDateString(), id: Date.now() });
    if (this.data.transactions.length > 50) this.data.transactions.pop();
    this.save();
  },
  addScore(entry) {
    this.data.scores.unshift(entry);
    if (this.data.scores.length > 20) this.data.scores.pop();
    this.save();
  },
  earnPi(amount, reason) {
    this.data.piBalance = parseFloat((this.data.piBalance + amount).toFixed(3));
    this.data.progress.totalPi = parseFloat((this.data.progress.totalPi + amount).toFixed(3));
    this.addTransaction({ type:'earn', amount:`+${amount.toFixed(3)}`, reason, icon:'💰' });
    this.save();
  },
  spendPi(amount, reason) {
    if (this.data.piBalance < amount) return false;
    this.data.piBalance = parseFloat((this.data.piBalance - amount).toFixed(3));
    this.addTransaction({ type:'spend', amount:`-${amount.toFixed(3)}`, reason, icon:'🛒' });
    this.save();
    return true;
  },
  earnCoins(amount) { this.data.coinBalance += amount; this.data.progress.totalCoins += amount; this.save(); },
  spendCoins(amount) { if (this.data.coinBalance < amount) return false; this.data.coinBalance -= amount; this.save(); return true; },
};

// ============================================================
// SECTION 6: PI NETWORK MOCK
// ============================================================
const PiNetwork = {
  isAuthenticated: false,
  currentUser: null,
  async authenticate(username, piId) {
    return new Promise(resolve => setTimeout(() => {
      const user = { username: username || 'PiPlayer', piId: piId || 'pi_' + Math.random().toString(36).substr(2,8), authenticated: true, createdAt: Date.now() };
      resolve({ success: true, user });
    }, 800));
  },
  async createPayment(amount, memo) {
    return new Promise(resolve => setTimeout(() => {
      resolve({ success: true, txId: 'TX_' + Date.now(), amount, memo });
    }, 500));
  },
  logout() { this.isAuthenticated = false; this.currentUser = null; }
};

// ============================================================
// SECTION 7: AUDIO SYSTEM
// ============================================================
const Audio = {
  ctx: null, bgTimer: null, bgNoteIdx: 0,
  init() {
    try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  },
  resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },
  tone(freq, dur, type='sine', vol=0.25, delay=0) {
    if (!this.ctx || !Store.getSetting('sound')) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.type = type; osc.frequency.value = freq;
      const t = this.ctx.currentTime + delay;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.start(t); osc.stop(t + dur + 0.05);
    } catch(e) {}
  },
  click() { this.tone(440, 0.08, 'sine', 0.15); },
  match() {
    this.tone(523, 0.12, 'sine', 0.3);
    this.tone(659, 0.12, 'sine', 0.3, 0.12);
    this.tone(784, 0.2, 'sine', 0.3, 0.24);
  },
  error() { this.tone(220, 0.25, 'square', 0.2); this.tone(180, 0.25, 'square', 0.2, 0.1); },
  select() { this.tone(600, 0.08, 'sine', 0.2); },
  win() {
    const m = [523,659,784,1047,1319];
    m.forEach((f,i) => this.tone(f, 0.25, 'sine', 0.3, i*0.18));
  },
  hint() { this.tone(880, 0.15, 'sine', 0.2); this.tone(1100, 0.15, 'sine', 0.2, 0.15); },
  shuffle() { [300,400,350,450,380].forEach((f,i) => this.tone(f, 0.1, 'triangle', 0.15, i*0.06)); },
  startBgMusic() {
    if (!Store.getSetting('music') || !this.ctx) return;
    this.stopBgMusic();
    const notes = [261, 294, 330, 349, 392, 330, 294, 261, 311, 349, 392, 440, 392, 349];
    const playNote = () => {
      if (!Store.getSetting('music')) { this.stopBgMusic(); return; }
      const f = notes[this.bgNoteIdx % notes.length];
      this.tone(f, 0.5, 'triangle', 0.06);
      this.bgNoteIdx++;
      this.bgTimer = setTimeout(playNote, 500);
    };
    this.bgTimer = setTimeout(playNote, 300);
  },
  stopBgMusic() { if (this.bgTimer) { clearTimeout(this.bgTimer); this.bgTimer = null; } },
};

// ============================================================
// SECTION 8: PARTICLE SYSTEM
// ============================================================
const Particles = {
  canvas: null, ctx: null, particles: [], raf: null,
  init() {
    this.canvas = document.getElementById('particle-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  },
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },
  emit(x, y, count=24, colors=null) {
    if (!Store.getSetting('animations')) return;
    const defaultColors = ['#f1c40f','#e74c3c','#27ae60','#3498db','#9b59b6','#e67e22','#1abc9c','#ff6b9d'];
    for (let i=0; i<count; i++) {
      const angle = (Math.PI*2/count)*i + Math.random()*0.5;
      const speed = 2 + Math.random()*5;
      this.particles.push({
        x, y,
        vx: Math.cos(angle)*speed,
        vy: Math.sin(angle)*speed - 2,
        life: 1,
        decay: 0.018 + Math.random()*0.025,
        size: 3 + Math.random()*5,
        color: (colors || defaultColors)[Math.floor(Math.random()*(colors||defaultColors).length)],
        shape: Math.random() > 0.5 ? 'circle' : 'star',
        rotation: Math.random()*Math.PI*2,
        rotSpeed: (Math.random()-0.5)*0.2,
      });
    }
  },
  loop() {
    this.raf = requestAnimationFrame(() => this.loop());
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles = this.particles.filter(p => p.life > 0);
    this.particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.18; p.vx *= 0.98;
      p.life -= p.decay;
      p.rotation += p.rotSpeed;
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.fillStyle = p.color;
      if (p.shape === 'star') {
        this.drawStar(p.size);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, 0, Math.PI*2);
        this.ctx.fill();
      }
      this.ctx.restore();
    });
  },
  drawStar(size) {
    this.ctx.beginPath();
    for (let i=0;i<5;i++) {
      const a = (Math.PI*2/5)*i - Math.PI/2;
      const a2 = a + Math.PI/5;
      this.ctx.lineTo(Math.cos(a)*size, Math.sin(a)*size);
      this.ctx.lineTo(Math.cos(a2)*size*0.45, Math.sin(a2)*size*0.45);
    }
    this.ctx.closePath();
    this.ctx.fill();
  },
  burst(x, y) { this.emit(x, y, 32); },
};

// ============================================================
// SECTION 9: GAME STATE
// ============================================================
const GameState = {
  tiles: [],
  selectedTile: null,
  score: 0,
  moves: 0,
  startTime: 0,
  timerInterval: null,
  elapsed: 0,
  level: 1,
  mode: 'classic',
  layout: 'simple',
  history: [],
  chain: 0,
  maxChain: 0,
  hintUsed: false,
  noHintThisGame: true,
  paused: false,
  gameOver: false,
  won: false,
  timedMode: false,
  timeLimit: 0,
  layoutMinC: 0, layoutMinR: 0,
};

// ============================================================
// SECTION 10: MAHJONG ENGINE
// ============================================================
function shuffleArray(arr) {
  for (let i=arr.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateTileSet(positions) {
  const count = positions.length;
  if (count % 2 !== 0) { console.warn('Odd tile count!'); }
  const pairs = count / 2;
  
  // All possible pair types in order
  const pool = [];
  Object.entries(SUIT_CONFIG).forEach(([suit, cfg]) => {
    cfg.values.forEach(v => {
      const mk = (cfg.isBonus) ? suit : `${suit}-${v}`;
      pool.push({ suit, value: v, matchKey: mk });
    });
  });
  
  // Pick pairs (cycling through pool)
  const chosen = [];
  for (let i=0; i<pairs; i++) chosen.push(pool[i % pool.length]);
  
  // Duplicate each pair
  const faces = [];
  chosen.forEach(f => { faces.push({...f}); faces.push({...f}); });
  shuffleArray(faces);
  
  // Assign positions
  return faces.map((f, i) => ({
    id: i,
    suit: f.suit, value: f.value, matchKey: f.matchKey,
    c: positions[i].c, r: positions[i].r, z: positions[i].z,
    removed: false, selected: false, free: false,
  }));
}

function isTileFree(tile, allTiles) {
  if (tile.removed) return false;
  const active = allTiles.filter(t => !t.removed && t.id !== tile.id);
  
  // Check if covered from above
  const covered = active.some(t => t.z === tile.z + 1 && t.c === tile.c && t.r === tile.r);
  if (covered) return false;
  
  // Check left/right
  const leftBlocked = active.some(t => t.z === tile.z && t.c === tile.c - 1 && t.r === tile.r);
  const rightBlocked = active.some(t => t.z === tile.z && t.c === tile.c + 1 && t.r === tile.r);
  
  return !leftBlocked || !rightBlocked;
}

function updateFreeTiles() {
  GameState.tiles.forEach(t => {
    if (!t.removed) t.free = isTileFree(t, GameState.tiles);
  });
}

function tilesMatch(t1, t2) { return t1.matchKey === t2.matchKey; }

function findHint() {
  const free = GameState.tiles.filter(t => !t.removed && t.free);
  for (let i=0; i<free.length; i++) {
    for (let j=i+1; j<free.length; j++) {
      if (tilesMatch(free[i], free[j])) return [free[i], free[j]];
    }
  }
  return null;
}

function checkBoardSolvable() { return findHint() !== null; }

function getBoardPositions() {
  const lc = LEVEL_CONFIG[GameState.level - 1] || LEVEL_CONFIG[0];
  let raw;
  switch(lc.layout) {
    case 'turtle': raw = generateTurtleLayout(); break;
    case 'pyramid': raw = generatePyramidLayout(); break;
    case 'tower': raw = generateTowerLayout(); break;
    default: raw = generateSimpleLayout(); break;
  }
  return raw;
}

function initGame(level, mode) {
  GameState.level = level;
  GameState.mode = mode;
  GameState.score = 0;
  GameState.moves = 0;
  GameState.elapsed = 0;
  GameState.chain = 0;
  GameState.maxChain = 0;
  GameState.hintUsed = false;
  GameState.noHintThisGame = true;
  GameState.paused = false;
  GameState.gameOver = false;
  GameState.won = false;
  GameState.selectedTile = null;
  GameState.history = [];
  
  const lc = LEVEL_CONFIG[level - 1] || LEVEL_CONFIG[0];
  GameState.timedMode = (mode === 'timed' && lc.timeLimit > 0);
  GameState.timeLimit = lc.timeLimit || 0;
  
  const positions = getBoardPositions();
  GameState.tiles = generateTileSet(positions);
  
  // Calculate layout bounds for rendering
  GameState.layoutMinC = Math.min(...positions.map(p=>p.c));
  GameState.layoutMinR = Math.min(...positions.map(p=>p.r));
  
  updateFreeTiles();
  
  // Ensure at least 1 match exists
  let attempts = 0;
  while (!checkBoardSolvable() && attempts < 10) {
    shuffleArray(GameState.tiles);
    GameState.tiles.forEach((t,i) => {
      const p = positions[i]; t.c=p.c; t.r=p.r; t.z=p.z;
    });
    updateFreeTiles();
    attempts++;
  }
  
  renderBoard();
  updateGameHUD();
  startTimer();
  clearSlot();
  
  showScreen('game');
  document.getElementById('timer-display').style.display = (GameState.timedMode || mode === 'timed') ? 'block' : 'none';
  
  Audio.resume();
  Audio.startBgMusic();
}

function getTilePixelPos(tile) {
  const minC = GameState.layoutMinC;
  const minR = GameState.layoutMinR;
  const x = (tile.c - minC) * (TILE_W + TILE_GAP) + tile.z * LAYER_SHIFT_X + 10;
  const y = (tile.r - minR) * (TILE_H + TILE_GAP) - tile.z * LAYER_SHIFT_Y + 10;
  return {x, y};
}

function getBoardPixelSize() {
  const active = GameState.tiles.filter(t=>!t.removed);
  if (!active.length) return {w:400, h:300};
  const minC = GameState.layoutMinC;
  const minR = GameState.layoutMinR;
  const maxX = Math.max(...active.map(t => getTilePixelPos(t).x)) + TILE_W + 10;
  const maxY = Math.max(...active.map(t => getTilePixelPos(t).y)) + TILE_H + 10;
  return {w: maxX, h: maxY};
}

function getTileFaceHTML(tile) {
  const cfg = SUIT_CONFIG[tile.suit];
  const main = cfg.getMain(tile.value);
  const sym = cfg.symbol;
  return `
    <div class="tile-top-symbol">${sym}</div>
    <div class="tile-main-value">${main}</div>
    <div class="tile-bottom-symbol">${sym}</div>
  `;
}

function renderBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  
  // Sort for correct z-order (lower z first, then by row, then by col)
  const sorted = [...GameState.tiles].sort((a,b) => {
    if (a.z !== b.z) return a.z - b.z;
    if (a.r !== b.r) return a.r - b.r;
    return a.c - b.c;
  });
  
  sorted.forEach(tile => {
    if (tile.removed) return;
    const pos = getTilePixelPos(tile);
    const el = document.createElement('div');
    el.className = `tile suit-${tile.suit}`;
    el.dataset.id = tile.id;
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';
    el.style.width = TILE_W + 'px';
    el.style.height = TILE_H + 'px';
    el.style.zIndex = tile.z * 200 + tile.r * 10 + tile.c;
    el.innerHTML = getTileFaceHTML(tile);
    
    if (!tile.free) el.classList.add('blocked');
    if (tile.selected) el.classList.add('selected');
    
    el.addEventListener('click', () => handleTileClick(tile.id));
    el.addEventListener('touchstart', (e) => { e.preventDefault(); handleTileClick(tile.id); }, {passive:false});
    
    board.appendChild(el);
  });
  
  // Size board
  const size = getBoardPixelSize();
  board.style.width = size.w + 'px';
  board.style.height = size.h + 'px';
  
  scaleBoardToFit();
}

function scaleBoardToFit() {
  const wrapper = document.getElementById('board-wrapper');
  const board = document.getElementById('game-board');
  if (!wrapper || !board) return;
  
  requestAnimationFrame(() => {
    const ww = wrapper.clientWidth || window.innerWidth;
    const wh = wrapper.clientHeight || (window.innerHeight - 200);
    const bw = parseFloat(board.style.width) || 400;
    const bh = parseFloat(board.style.height) || 300;
    
    const scale = Math.min(ww / (bw + 20), wh / (bh + 20), 1.2);
    board.style.transform = `scale(${scale})`;
    board.style.transformOrigin = 'center center';
    board.style.marginTop = Math.max(0, (wh - bh * scale) / 2 - 10) + 'px';
  });
}

function updateTileElement(tile) {
  const el = document.querySelector(`.tile[data-id="${tile.id}"]`);
  if (!el) return;
  el.className = `tile suit-${tile.suit}`;
  if (!tile.free) el.classList.add('blocked');
  if (tile.selected) el.classList.add('selected');
}

function handleTileClick(id) {
  if (GameState.paused || GameState.gameOver || GameState.won) return;
  Audio.resume();
  
  const tile = GameState.tiles.find(t => t.id === id);
  if (!tile || tile.removed) return;
  
  if (!tile.free) {
    Audio.error();
    const el = document.querySelector(`.tile[data-id="${id}"]`);
    if (el) { el.classList.add('error-shake'); setTimeout(() => el.classList.remove('error-shake'), 400); }
    return;
  }
  
  Audio.select();
  
  if (!GameState.selectedTile) {
    // First selection
    tile.selected = true;
    GameState.selectedTile = tile;
    updateTileElement(tile);
    showInSlot(tile, 1);
    Audio.click();
  } else if (GameState.selectedTile.id === tile.id) {
    // Deselect
    tile.selected = false;
    GameState.selectedTile = null;
    updateTileElement(tile);
    clearSlot();
  } else {
    // Second selection - check match
    const first = GameState.selectedTile;
    
    if (tilesMatch(first, tile)) {
      // MATCH!
      GameState.history.push({ first: {...first}, second: {...tile}, score: GameState.score });
      
      first.selected = false;
      tile.selected = false;
      first.removed = true;
      tile.removed = true;
      GameState.selectedTile = null;
      GameState.moves++;
      GameState.chain++;
      if (GameState.chain > GameState.maxChain) GameState.maxChain = GameState.chain;
      
      // Score
      let pts = SCORE_PER_MATCH;
      if (GameState.chain > 1) pts += (GameState.chain - 1) * 25;
      pts += Math.floor(GameState.elapsed > 0 ? Math.max(0, 30 - GameState.elapsed % 60) : 0);
      GameState.score += pts;
      
      // Animate
      const el1 = document.querySelector(`.tile[data-id="${first.id}"]`);
      const el2 = document.querySelector(`.tile[data-id="${tile.id}"]`);
      
      if (el1 && el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();
        const cx1 = rect1.left + rect1.width/2;
        const cy1 = rect1.top + rect1.height/2;
        const cx2 = rect2.left + rect2.width/2;
        const cy2 = rect2.top + rect2.height/2;
        
        Particles.burst(cx1, cy1);
        Particles.burst(cx2, cy2);
        
        el1.classList.add('matching');
        el2.classList.add('matching');
        
        setTimeout(() => { el1.remove(); el2.remove(); }, 450);
      }
      
      showInSlot(tile, 2);
      
      // Coins
      const coinsEarned = Store.get('adminSettings').coinsRate || 5;
      Store.earnCoins(coinsEarned);
      
      // Update progress
      const prog = Store.get('progress');
      prog.totalMatches++;
      Store.set('progress', prog);
      
      updateFreeTiles();
      updateGameHUD();
      Audio.match();
      
      showMatchFeedback(`+${pts}`, GameState.chain > 1 ? `🔥 x${GameState.chain}` : '');
      
      setTimeout(() => {
        clearSlot();
        checkGameEnd();
        checkAchievements();
      }, 500);
      
    } else {
      // No match
      GameState.chain = 0;
      first.selected = false;
      tile.selected = false;
      GameState.selectedTile = null;
      updateTileElement(first);
      updateTileElement(tile);
      clearSlot();
      Audio.error();
      
      const el1 = document.querySelector(`.tile[data-id="${first.id}"]`);
      const el2 = document.querySelector(`.tile[data-id="${tile.id}"]`);
      if (el1) { el1.classList.add('error-shake'); setTimeout(() => el1.classList.remove('error-shake'), 400); }
      if (el2) { el2.classList.add('error-shake'); setTimeout(() => el2.classList.remove('error-shake'), 400); }
    }
  }
}

function checkGameEnd() {
  const remaining = GameState.tiles.filter(t => !t.removed);
  
  if (remaining.length === 0) {
    // WIN!
    endGame(true);
    return;
  }
  
  if (!checkBoardSolvable()) {
    if (Store.getSetting('autohint')) {
      showToast(t('noMoves'), 'warning');
    }
    if (GameState.mode === 'challenge') {
      endGame(false, t('noMoves'));
    }
  }
}

function endGame(won, reason='') {
  clearInterval(GameState.timerInterval);
  GameState.won = won;
  GameState.gameOver = !won;
  
  Audio.stopBgMusic();
  
  const prog = Store.get('progress');
  prog.games++;
  
  if (won) {
    Audio.win();
    prog.wins++;
    
    // No hint bonus
    if (GameState.noHintThisGame) {
      GameState.score += SCORE_NO_HINT_BONUS;
      prog.noHintWin = true;
    }
    
    // Fast win bonus
    if (GameState.elapsed < 60) prog.fastWin = true;
    
    // Stars
    const lc = LEVEL_CONFIG[GameState.level - 1];
    let stars = 1;
    if (GameState.score >= lc.stars[2]) stars = 3;
    else if (GameState.score >= lc.stars[1]) stars = 2;
    
    // Unlock next level
    if (GameState.level >= prog.maxLevelUnlocked && GameState.level < LEVEL_CONFIG.length) {
      prog.maxLevelUnlocked = Math.min(GameState.level + 1, LEVEL_CONFIG.length);
    }
    
    prog.stars += stars;
    if (GameState.score > (prog.bestScore || 0)) prog.bestScore = GameState.score;
    
    Store.set('progress', prog);
    
    // Rewards
    const piReward = lc.piReward * Store.get('adminSettings').piRate / 0.1;
    Store.earnPi(piReward, `Level ${GameState.level} Complete`);
    Store.earnCoins(lc.coinReward);
    
    // Score history
    Store.addScore({ level: GameState.level, score: GameState.score, stars, mode: GameState.mode, date: new Date().toLocaleDateString(), time: GameState.elapsed });
    
    showWinModal(stars, piReward, lc.coinReward);
  } else {
    Store.set('progress', prog);
    showGameOverModal(reason);
  }
  
  checkAchievements();
}

function startTimer() {
  clearInterval(GameState.timerInterval);
  GameState.startTime = Date.now();
  GameState.elapsed = 0;
  
  GameState.timerInterval = setInterval(() => {
    if (GameState.paused) return;
    GameState.elapsed = Math.floor((Date.now() - GameState.startTime) / 1000);
    updateGameHUD();
    
    if (GameState.timedMode && GameState.elapsed >= GameState.timeLimit) {
      endGame(false, t('timeUp'));
    }
  }, 500);
}

function formatTime(secs) {
  const m = Math.floor(secs/60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2,'0')}`;
}

function updateGameHUD() {
  document.getElementById('game-score').textContent = GameState.score.toLocaleString();
  document.getElementById('game-moves').textContent = GameState.moves;
  
  const timeEl = document.getElementById('game-timer');
  if (GameState.timedMode) {
    const rem = Math.max(0, GameState.timeLimit - GameState.elapsed);
    timeEl.textContent = formatTime(rem);
    timeEl.style.color = rem < 30 ? '#e74c3c' : '#fff';
  } else {
    timeEl.textContent = formatTime(GameState.elapsed);
  }
  document.getElementById('game-level-badge').textContent = `Lv.${GameState.level}`;
}

function showInSlot(tile, slot) {
  const slotEl = document.getElementById(`slot-tile${slot}`);
  if (!slotEl) return;
  const cfg = SUIT_CONFIG[tile.suit];
  slotEl.innerHTML = `<span style="font-size:20px">${cfg.getMain(tile.value)}</span>`;
  slotEl.classList.remove('empty');
  slotEl.classList.add('filled');
}

function clearSlot() {
  ['slot-tile1','slot-tile2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.innerHTML=''; el.className='slot-tile empty'; }
  });
}

function showMatchFeedback(pts, extra) {
  const el = document.getElementById('match-feedback');
  if (!el) return;
  el.textContent = `${pts} ${extra}`;
  el.style.color = '#2ecc71';
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 600);
}

function useHint() {
  if (GameState.gameOver || GameState.won || GameState.paused) return;
  if (GameState.mode === 'challenge') { showToast('No hints in Challenge mode!', 'error'); return; }
  
  const pi = Store.get('piBalance');
  if (pi < HINT_COST_PI) { showToast(t('notEnoughPi'), 'error'); return; }
  
  // Remove previous hints
  document.querySelectorAll('.tile.hint-glow').forEach(el => el.classList.remove('hint-glow'));
  
  const pair = findHint();
  if (!pair) { showToast(t('noMoves'), 'warning'); return; }
  
  Store.spendPi(HINT_COST_PI, 'Hint');
  GameState.hintUsed = true;
  GameState.noHintThisGame = false;
  Audio.hint();
  showToast(t('hintUsed'), 'info');
  
  pair.forEach(tile => {
    const el = document.querySelector(`.tile[data-id="${tile.id}"]`);
    if (el) {
      el.classList.add('hint-glow');
      setTimeout(() => el.classList.remove('hint-glow'), 3000);
    }
  });
  
  updateWalletDisplays();
}

function useUndo() {
  if (GameState.history.length === 0 || GameState.paused || GameState.gameOver) return;
  const last = GameState.history.pop();
  
  const t1 = GameState.tiles.find(t => t.id === last.first.id);
  const t2 = GameState.tiles.find(t => t.id === last.second.id);
  
  if (t1) { t1.removed=false; t1.selected=false; }
  if (t2) { t2.removed=false; t2.selected=false; }
  
  GameState.score = last.score;
  GameState.selectedTile = null;
  clearSlot();
  updateFreeTiles();
  renderBoard();
  updateGameHUD();
  Audio.shuffle();
}

function useShuffle() {
  if (GameState.paused || GameState.won) return;
  
  const pi = Store.get('piBalance');
  if (pi < SHUFFLE_COST_PI) { showToast(t('notEnoughPi'), 'error'); return; }
  
  Store.spendPi(SHUFFLE_COST_PI, 'Shuffle');
  
  const active = GameState.tiles.filter(t => !t.removed);
  const faces = active.map(t => ({ suit:t.suit, value:t.value, matchKey:t.matchKey }));
  shuffleArray(faces);
  active.forEach((tile, i) => {
    tile.suit = faces[i].suit;
    tile.value = faces[i].value;
    tile.matchKey = faces[i].matchKey;
  });
  
  GameState.selectedTile = null;
  GameState.chain = 0;
  clearSlot();
  updateFreeTiles();
  renderBoard();
  
  Audio.shuffle();
  showToast(t('shuffled'), 'success');
  updateWalletDisplays();
  
  // Close gameover modal if open
  closeModal('gameover');
}

// ============================================================
// SECTION 11: LEVEL SYSTEM
// ============================================================
function renderLevelGrid() {
  const grid = document.getElementById('level-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const maxUnlocked = Store.getProgress('maxLevelUnlocked');
  
  LEVEL_CONFIG.forEach(lc => {
    const btn = document.createElement('button');
    const isUnlocked = lc.id <= maxUnlocked;
    const scores = Store.get('scores').filter(s => s.level === lc.id);
    const bestStars = scores.length ? Math.max(...scores.map(s => s.stars)) : 0;
    
    btn.className = `level-btn ${isUnlocked ? (bestStars > 0 ? 'completed' : (lc.id === maxUnlocked ? 'current' : 'unlocked')) : 'locked'}`;
    
    if (isUnlocked) {
      btn.innerHTML = `<span>${lc.id}</span>${bestStars > 0 ? `<span class="level-stars">${'⭐'.repeat(bestStars)}</span>` : ''}`;
      btn.addEventListener('click', () => {
        Audio.click();
        startGameFromMenu(lc.id);
      });
    } else {
      btn.innerHTML = `<span class="level-lock">🔒</span>`;
      btn.disabled = true;
    }
    
    btn.title = `Level ${lc.id}: ${lc.name}`;
    grid.appendChild(btn);
  });
}

function startGameFromMenu(levelId) {
  const mode = AppState.selectedMode || 'classic';
  initGame(levelId, mode);
}

// ============================================================
// SECTION 12: REWARD SYSTEM
// ============================================================
function canClaimDailyReward() {
  const claimed = Store.get('dailyRewardClaimed');
  if (!claimed) return true;
  const today = new Date().toDateString();
  return claimed !== today;
}

function claimDailyReward() {
  if (!canClaimDailyReward()) {
    showToast('Already claimed today!', 'warning');
    return;
  }
  
  const pi = 0.5 + Math.random() * 0.5;
  const coins = 100 + Math.floor(Math.random() * 100);
  
  Store.earnPi(parseFloat(pi.toFixed(2)), 'Daily Reward');
  Store.earnCoins(coins);
  
  const today = new Date().toDateString();
  Store.set('dailyRewardClaimed', today);
  
  // Update streak
  const prog = Store.get('progress');
  const lastLogin = prog.lastLoginDate;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (lastLogin === yesterday) {
    prog.streak = (prog.streak || 0) + 1;
  } else if (lastLogin !== today) {
    prog.streak = 1;
  }
  if (prog.streak > prog.maxStreak) prog.maxStreak = prog.streak;
  prog.lastLoginDate = today;
  Store.set('progress', prog);
  
  document.getElementById('daily-pi-reward').textContent = `+${pi.toFixed(2)} π`;
  document.getElementById('daily-coins-reward').textContent = `+${coins}`;
  document.getElementById('daily-streak').textContent = `🔥 Day ${prog.streak} Streak!`;
  
  document.getElementById('modal-daily').classList.remove('hidden');
  
  updateWalletDisplays();
  updateHomeStats();
  updateDailyBanner();
  
  Audio.win();
}

function updateDailyBanner() {
  const banner = document.getElementById('daily-reward-status');
  if (!banner) return;
  if (canClaimDailyReward()) {
    banner.textContent = 'Claim Now!';
    banner.style.background = 'rgba(255,255,255,0.4)';
  } else {
    banner.textContent = 'Claimed ✓';
    banner.style.background = 'rgba(0,0,0,0.2)';
  }
}

// ============================================================
// SECTION 13: ACHIEVEMENTS
// ============================================================
function checkAchievements() {
  const prog = Store.get('progress');
  const earned = Store.get('achievements');
  
  prog.maxChain = Math.max(prog.maxChain || 0, GameState.maxChain);
  Store.set('progress', prog);
  
  ACHIEVEMENTS.forEach(ach => {
    if (earned.includes(ach.id)) return;
    if (ach.check(prog)) {
      earned.push(ach.id);
      Store.set('achievements', earned);
      setTimeout(() => showAchievementModal(ach), 800);
    }
  });
}

function showAchievementModal(ach) {
  document.getElementById('ach-icon').textContent = ach.icon;
  document.getElementById('ach-name').textContent = ach.name;
  document.getElementById('ach-desc').textContent = ach.desc;
  document.getElementById('modal-achievement').classList.remove('hidden');
  Audio.win();
  Particles.emit(window.innerWidth/2, window.innerHeight/2, 40);
}

function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const earned = Store.get('achievements');
  
  ACHIEVEMENTS.forEach(ach => {
    const div = document.createElement('div');
    const isEarned = earned.includes(ach.id);
    div.className = `achievement-item ${isEarned ? 'earned' : 'locked'}`;
    div.innerHTML = `<div class="ach-icon-sm">${ach.icon}</div><div class="ach-name-sm">${ach.name}</div>`;
    div.title = ach.desc;
    grid.appendChild(div);
  });
}

// ============================================================
// SECTION 14: LEADERBOARD
// ============================================================
function renderLeaderboard(tab='global') {
  const list = document.getElementById('leaderboard-list');
  if (!list) return;
  list.innerHTML = '';
  
  let data = [...MOCK_LEADERBOARD];
  
  // Insert current user
  const user = Store.get('user');
  const prog = Store.get('progress');
  if (user) {
    const myScore = prog.bestScore || 0;
    const myRank = data.filter(p => p.score > myScore).length + 1;
    data.push({ rank: myRank, name: user.username || 'You', avatar: '🀄', score: myScore, pi: parseFloat(prog.totalPi||0), level: prog.maxLevelUnlocked, isMe: true });
    data.sort((a,b) => b.score - a.score);
    data.forEach((p,i) => p.rank = i+1);
    data = data.slice(0,12);
  }
  
  if (tab === 'weekly') data = data.map(p => ({...p, score: Math.floor(p.score*0.3)})).sort((a,b)=>b.score-a.score);
  if (tab === 'friends') data = data.slice(0,5);
  
  data.forEach(p => {
    const div = document.createElement('div');
    div.className = `lb-item${p.rank <= 3 ? ' top-3' : ''}${p.isMe ? ' my-row' : ''}`;
    if (p.isMe) div.style.border = '2px solid var(--primary-light)';
    
    const rankClass = p.rank === 1 ? 'gold' : p.rank === 2 ? 'silver' : p.rank === 3 ? 'bronze' : '';
    const rankDisplay = p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : `#${p.rank}`;
    
    div.innerHTML = `
      <div class="lb-rank ${rankClass}">${rankDisplay}</div>
      <div class="lb-avatar">${p.avatar}</div>
      <div class="lb-info">
        <div class="lb-name">${p.name}${p.isMe?' (You)':''}</div>
        <div class="lb-detail">Level ${p.level} • ${p.pi.toFixed(1)} π</div>
      </div>
      <div class="text-right">
        <div class="lb-score">${p.score.toLocaleString()}</div>
        <div class="lb-pi">${p.pi.toFixed(2)} π</div>
      </div>
    `;
    list.appendChild(div);
  });
}

function switchLbTab(tab, btn) {
  document.querySelectorAll('.lb-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLeaderboard(tab);
}

function refreshLeaderboard() {
  renderLeaderboard('global');
  showToast('Refreshed!', 'success');
}

// ============================================================
// SECTION 15: PROFILE
// ============================================================
function renderProfile() {
  const user = Store.get('user');
  const prog = Store.get('progress');
  
  document.getElementById('profile-username').textContent = user?.username || 'Player';
  document.getElementById('profile-piid').textContent = user?.piId || 'pi_xxxxx';
  document.getElementById('profile-level').textContent = prog.maxLevelUnlocked;
  
  const xp = prog.xp || 0;
  const xpFrac = xp % XP_PER_LEVEL;
  document.getElementById('profile-xp').textContent = xpFrac;
  document.getElementById('profile-xp-max').textContent = XP_PER_LEVEL;
  document.getElementById('xp-fill').style.width = (xpFrac / XP_PER_LEVEL * 100) + '%';
  
  document.getElementById('p-games').textContent = prog.games || 0;
  document.getElementById('p-wins').textContent = prog.wins || 0;
  document.getElementById('p-stars').textContent = prog.stars || 0;
  document.getElementById('p-matches').textContent = prog.totalMatches || 0;
  
  renderAchievements();
  renderScoreHistory();
}

function renderScoreHistory() {
  const list = document.getElementById('score-history-list');
  if (!list) return;
  const scores = Store.get('scores');
  
  if (!scores.length) {
    list.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:20px">No games played yet</div>';
    return;
  }
  
  list.innerHTML = scores.slice(0,10).map(s => `
    <div class="score-history-item">
      <div>
        <div class="score-val">${s.score.toLocaleString()}</div>
        <div class="score-mode">Level ${s.level} • ${s.mode}</div>
      </div>
      <div>
        <div style="text-align:right">${'⭐'.repeat(s.stars)}</div>
        <div class="score-date">${s.date}</div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// SECTION 16: WALLET
// ============================================================
function renderWallet() {
  document.getElementById('wallet-balance').textContent = Store.get('piBalance').toFixed(3);
  document.getElementById('wallet-coins').textContent = Store.get('coinBalance');
  renderTransactions();
}

function renderTransactions() {
  const list = document.getElementById('transaction-list');
  if (!list) return;
  const txs = Store.get('transactions');
  
  if (!txs.length) {
    list.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:20px">No transactions yet</div>';
    return;
  }
  
  list.innerHTML = txs.slice(0,20).map(tx => `
    <div class="transaction-item">
      <div class="tx-icon ${tx.type}">${tx.icon}</div>
      <div class="tx-details">
        <div class="tx-title">${tx.reason}</div>
        <div class="tx-date">${tx.date}</div>
      </div>
      <div class="tx-amount ${tx.type}">${tx.amount} π</div>
    </div>
  `).join('');
}

function showShop() {
  document.getElementById('shop-balance-val').textContent = Store.get('piBalance').toFixed(3);
  document.getElementById('modal-shop').classList.remove('hidden');
}

function buyItem(itemId) {
  const items = {
    hints3: { cost: 0.30, label: '3 Hints Pack', action: () => {} },
    shuffle3: { cost: 0.60, label: '3 Shuffles Pack', action: () => {} },
    neon_theme: { cost: 1.00, label: 'Neon Theme', action: () => { setTileTheme('neon'); document.getElementById('setting-theme').value='neon'; } },
    minimal_theme: { cost: 0.80, label: 'Minimal Theme', action: () => { setTileTheme('minimal'); document.getElementById('setting-theme').value='minimal'; } },
    coins200: { cost: 0.50, label: '200 Coins', action: () => Store.earnCoins(200) },
    xp2x: { cost: 0.20, label: '2× XP Boost', action: () => {} },
  };
  
  const item = items[itemId];
  if (!item) return;
  
  if (Store.spendPi(item.cost, item.label)) {
    item.action();
    showToast(t('purchased') + ' ' + item.label, 'success');
    document.getElementById('shop-balance-val').textContent = Store.get('piBalance').toFixed(3);
    renderWallet();
    updateWalletDisplays();
    Audio.match();
  } else {
    showToast(t('notEnoughPi'), 'error');
    Audio.error();
  }
}

function showEarnInfo() {
  showToast('Complete levels to earn Pi! Higher levels = more Pi! 🎮', 'info');
}

function updateWalletDisplays() {
  const bal = Store.get('piBalance').toFixed(3);
  const coinsEl = document.getElementById('wallet-coins');
  const balEl = document.getElementById('wallet-balance');
  const homeBalEl = document.getElementById('home-pi-balance');
  const shopBalEl = document.getElementById('shop-balance-val');
  
  if (balEl) balEl.textContent = Store.get('piBalance').toFixed(3);
  if (coinsEl) coinsEl.textContent = Store.get('coinBalance');
  if (homeBalEl) homeBalEl.textContent = bal;
  if (shopBalEl) shopBalEl.textContent = bal;
  renderTransactions();
}

// ============================================================
// SECTION 17: ADMIN PANEL
// ============================================================
function renderAdminPanel() {
  const prog = Store.get('progress');
  document.getElementById('admin-total-players').textContent = 1;
  document.getElementById('admin-total-games').textContent = prog.games || 0;
  document.getElementById('admin-total-pi').textContent = prog.totalPi?.toFixed(3) || '0.000';
  
  const adminS = Store.get('adminSettings');
  document.getElementById('admin-pi-rate').value = adminS.piRate || 0.10;
  document.getElementById('admin-pi-rate-val').textContent = (adminS.piRate || 0.10).toFixed(2) + ' π';
  document.getElementById('admin-coins-rate').value = adminS.coinsRate || 5;
  document.getElementById('admin-coins-rate-val').textContent = (adminS.coinsRate || 5) + ' 🪙';
  
  const user = Store.get('user');
  const pList = document.getElementById('admin-player-list');
  if (pList && user) {
    pList.innerHTML = `
      <div class="admin-player-item">
        <span class="admin-player-name">🀄 ${user.username}</span>
        <span class="admin-player-stats">Level ${prog.maxLevelUnlocked} • ${prog.wins} wins • ${prog.totalPi?.toFixed(2)} π</span>
      </div>
    `;
  }
  
  const gStats = document.getElementById('admin-game-stats');
  if (gStats) {
    gStats.innerHTML = `
      <div class="admin-gs-item"><div class="admin-gs-label">Total Matches</div><div class="admin-gs-val">${prog.totalMatches||0}</div></div>
      <div class="admin-gs-item"><div class="admin-gs-label">Win Rate</div><div class="admin-gs-val">${prog.games?Math.round(prog.wins/prog.games*100):0}%</div></div>
      <div class="admin-gs-item"><div class="admin-gs-label">Best Score</div><div class="admin-gs-val">${(prog.bestScore||0).toLocaleString()}</div></div>
      <div class="admin-gs-item"><div class="admin-gs-label">Max Streak</div><div class="admin-gs-val">${prog.maxStreak||0}</div></div>
    `;
  }
}

function updateAdminSetting(key, val) {
  const adminS = Store.get('adminSettings');
  adminS[key] = parseFloat(val);
  Store.set('adminSettings', adminS);
  
  if (key === 'piRate') document.getElementById('admin-pi-rate-val').textContent = parseFloat(val).toFixed(2) + ' π';
  if (key === 'coinsRate') document.getElementById('admin-coins-rate-val').textContent = parseInt(val) + ' 🪙';
}

// ============================================================
// SECTION 18: UI CONTROLLER
// ============================================================
const AppState = { currentScreen: 'login', selectedMode: 'classic', lbTab: 'global' };

function showScreen(name) {
  const prev = document.getElementById(`screen-${AppState.currentScreen}`);
  const next = document.getElementById(`screen-${name}`);
  
  if (prev) { prev.classList.remove('active'); prev.classList.add('slide-out'); setTimeout(() => prev.classList.remove('slide-out'), 400); }
  if (next) { next.classList.add('active'); }
  
  AppState.currentScreen = name;
  
  // Show/hide nav
  const navScreens = ['home','profile','wallet','settings','leaderboard','admin'];
  const nav = document.getElementById('bottom-nav');
  if (nav) nav.classList.toggle('hidden', !navScreens.includes(name));
  
  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  const navMap = { home:'nav-home', play:'nav-play', profile:'nav-profile', wallet:'nav-wallet', settings:'nav-settings' };
  if (navMap[name]) document.getElementById(navMap[name])?.classList.add('active');
  
  // Screen-specific updates
  if (name === 'home') { renderLevelGrid(); updateHomeStats(); updateDailyBanner(); }
  if (name === 'profile') renderProfile();
  if (name === 'wallet') renderWallet();
  if (name === 'leaderboard') renderLeaderboard(AppState.lbTab);
  if (name === 'admin') renderAdminPanel();
  if (name === 'settings') syncSettingsUI();
  
  // Stop music when leaving game
  if (name !== 'game') Audio.stopBgMusic();
}

function updateHomeStats() {
  const prog = Store.get('progress');
  const user = Store.get('user');
  
  if (document.getElementById('home-username')) document.getElementById('home-username').textContent = user?.username || 'Player';
  if (document.getElementById('home-level')) document.getElementById('home-level').textContent = `Lv.${prog.maxLevelUnlocked||1}`;
  if (document.getElementById('home-pi-balance')) document.getElementById('home-pi-balance').textContent = Store.get('piBalance')?.toFixed(2) || '0.00';
  if (document.getElementById('stat-games')) document.getElementById('stat-games').textContent = prog.games || 0;
  if (document.getElementById('stat-wins')) document.getElementById('stat-wins').textContent = prog.wins || 0;
  if (document.getElementById('stat-best')) document.getElementById('stat-best').textContent = (prog.bestScore||0).toLocaleString();
  if (document.getElementById('stat-pi')) document.getElementById('stat-pi').textContent = prog.totalPi?.toFixed(2) || '0.00';
}

function selectMode(mode) {
  AppState.selectedMode = mode;
  document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  Audio.click();
  showToast(`${mode.charAt(0).toUpperCase()+mode.slice(1)} mode selected!`, 'info');
}

function showLevelSelect() {
  showScreen('home');
  setTimeout(() => {
    const levelGrid = document.getElementById('level-grid');
    if (levelGrid) levelGrid.scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

// Modals
function showWinModal(stars, piReward, coinsReward) {
  const starsHTML = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  document.getElementById('win-stars').textContent = starsHTML;
  document.getElementById('win-score-val').textContent = GameState.score.toLocaleString();
  document.getElementById('win-pi').textContent = `+${piReward.toFixed(2)} π`;
  document.getElementById('win-coins').textContent = `+${coinsReward}`;
  document.getElementById('win-time-val').textContent = formatTime(GameState.elapsed);
  document.getElementById('modal-win').classList.remove('hidden');
  
  // Celebration particles
  setTimeout(() => Particles.burst(window.innerWidth/2, window.innerHeight/3), 100);
  setTimeout(() => Particles.burst(window.innerWidth/4, window.innerHeight/2), 400);
  setTimeout(() => Particles.burst(3*window.innerWidth/4, window.innerHeight/2), 700);
}

function showGameOverModal(reason) {
  document.getElementById('gameover-reason').textContent = reason || '';
  document.getElementById('gameover-score-val').textContent = GameState.score.toLocaleString();
  document.getElementById('modal-gameover').classList.remove('hidden');
}

function showPauseMenu() {
  GameState.paused = true;
  document.getElementById('modal-pause').classList.remove('hidden');
}

function resumeGame() {
  GameState.paused = false;
  GameState.startTime = Date.now() - GameState.elapsed * 1000;
  closeModal('pause');
  Audio.startBgMusic();
}

function restartLevel() {
  closeAllModals();
  initGame(GameState.level, GameState.mode);
}

function nextLevel() {
  closeAllModals();
  const next = Math.min(GameState.level + 1, LEVEL_CONFIG.length);
  initGame(next, GameState.mode);
}

function exitToHome() {
  clearInterval(GameState.timerInterval);
  Audio.stopBgMusic();
  closeAllModals();
  showScreen('home');
  updateHomeStats();
}

function closeModal(name) {
  const modal = document.getElementById(`modal-${name}`);
  if (modal) modal.classList.add('hidden');
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}

// Settings
function syncSettingsUI() {
  document.getElementById('setting-sound').checked = Store.getSetting('sound');
  document.getElementById('setting-music').checked = Store.getSetting('music');
  document.getElementById('setting-dark').checked = Store.getSetting('dark');
  document.getElementById('setting-animations').checked = Store.getSetting('animations');
  document.getElementById('setting-autohint').checked = Store.getSetting('autohint');
  document.getElementById('setting-theme').value = Store.getSetting('tileTheme') || 'classic';
  
  // Language buttons
  const lang = Store.getSetting('language') || 'en';
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`lang-${lang}`)?.classList.add('active');
}

function toggleSetting(key, val) {
  Store.setSetting(key, val);
  if (key === 'music') { val ? Audio.startBgMusic() : Audio.stopBgMusic(); }
  Audio.click();
}

function toggleTheme() {
  const isDark = !Store.getSetting('dark');
  setTheme(isDark ? 'dark' : 'light');
}

function setTheme(mode) {
  const isDark = mode === 'dark';
  Store.setSetting('dark', isDark);
  document.getElementById('app').classList.toggle('dark-mode', isDark);
  document.getElementById('theme-btn').textContent = isDark ? '☀️' : '🌙';
  const settingChk = document.getElementById('setting-dark');
  if (settingChk) settingChk.checked = isDark;
}

function setTileTheme(theme) {
  Store.setSetting('tileTheme', theme);
  const app = document.getElementById('app');
  app.classList.remove('theme-neon','theme-minimal','theme-classic');
  if (theme !== 'classic') app.classList.add(`theme-${theme}`);
  Audio.click();
}

function setLanguage(lang) {
  Store.setSetting('language', lang);
  applyLanguage(lang);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`lang-${lang}`)?.classList.add('active');
  
  // RTL for Arabic
  document.getElementById('app').setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  Audio.click();
}

function applyLanguage(lang) {
  const trs = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (trs[key]) el.textContent = trs[key];
  });
  document.documentElement.lang = lang;
}

function t(key) {
  const lang = Store.getSetting('language') || 'en';
  const trs = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return trs[key] || TRANSLATIONS.en[key] || key;
}

function confirmResetProgress() {
  if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
    const user = Store.get('user');
    Store.reset();
    Store.set('user', user);
    Store.set('piBalance', 1.5);
    Store.set('coinBalance', 150);
    showToast(t('resetDone'), 'success');
    syncSettingsUI();
    updateHomeStats();
  }
}

function showAbout() {
  document.getElementById('modal-about').classList.remove('hidden');
}

// Toast notifications
function showToast(msg, type='success', icon='') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icon || icons[type] || ''}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// ============================================================
// SECTION 19: AUTH
// ============================================================
async function handleLogin() {
  const username = document.getElementById('login-username').value.trim();
  const piId = document.getElementById('login-piid').value.trim();
  
  if (!username) { showToast('Please enter a username!', 'error'); return; }
  
  const btn = document.getElementById('btn-login');
  btn.disabled = true;
  btn.innerHTML = '<span class="pi-symbol">π</span> Authenticating...';
  
  const result = await PiNetwork.authenticate(username, piId);
  
  if (result.success) {
    Store.set('user', result.user);
    PiNetwork.isAuthenticated = true;
    PiNetwork.currentUser = result.user;
    
    applyLanguage(Store.getSetting('language') || 'en');
    setTheme(Store.getSetting('dark') ? 'dark' : 'light');
    setTileTheme(Store.getSetting('tileTheme') || 'classic');
    
    updateHomeStats();
    showScreen('home');
    
    // Check daily reward
    if (canClaimDailyReward()) {
      setTimeout(() => claimDailyReward(), 1000);
    }
    
    Audio.init();
    if (Store.getSetting('music')) Audio.startBgMusic();
  }
  
  btn.disabled = false;
  btn.innerHTML = '<span class="pi-symbol">π</span> Login with Pi';
}

function handleGuestLogin() {
  const guestUser = { username: 'Guest_' + Math.floor(Math.random()*1000), piId: 'pi_guest', authenticated: false };
  Store.set('user', guestUser);
  applyLanguage(Store.getSetting('language') || 'en');
  setTheme(Store.getSetting('dark') ? 'dark' : 'light');
  updateHomeStats();
  showScreen('home');
  Audio.init();
  if (Store.getSetting('music')) Audio.startBgMusic();
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    clearInterval(GameState.timerInterval);
    Audio.stopBgMusic();
    PiNetwork.logout();
    showToast(t('logged_out'), 'info');
    setTimeout(() => showScreen('login'), 300);
  }
}

// ============================================================
// SECTION 20: APP INITIALIZATION
// ============================================================
window.addEventListener('load', () => {
  Store.load();
  Particles.init();
  
  // Apply saved settings
  const lang = Store.getSetting('language') || 'en';
  applyLanguage(lang);
  document.getElementById('app').setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  setTheme(Store.getSetting('dark') ? 'dark' : 'light');
  setTileTheme(Store.getSetting('tileTheme') || 'classic');
  
  // Auto-login if user exists
  const user = Store.get('user');
  if (user) {
    PiNetwork.isAuthenticated = user.authenticated;
    PiNetwork.currentUser = user;
    updateHomeStats();
    showScreen('home');
    Audio.init();
    if (Store.getSetting('music')) setTimeout(() => Audio.startBgMusic(), 500);
    if (canClaimDailyReward()) setTimeout(() => claimDailyReward(), 1500);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    Particles.resize();
    if (AppState.currentScreen === 'game') scaleBoardToFit();
  });
  
  // Handle visibility change (pause on hide)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && AppState.currentScreen === 'game' && !GameState.paused && !GameState.gameOver && !GameState.won) {
      showPauseMenu();
    }
  });
  
  // Login Enter key
  document.getElementById('login-username')?.addEventListener('keydown', e => { if (e.key==='Enter') handleLogin(); });
  document.getElementById('login-piid')?.addEventListener('keydown', e => { if (e.key==='Enter') handleLogin(); });
  
  // Close modals on backdrop click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        const id = modal.id.replace('modal-','');
        if (!['pause','gameover','win'].includes(id)) closeModal(id);
      }
    });
  });
  
  console.log('🀄 Mosaic Quest initialized!');
});

// ============================================================
// SECTION 21: GAME MODE ENTRY
// ============================================================
// All exposed global functions for HTML onclick handlers are above.
// Additional helpers:

function showLevelInfo(level) {
  const lc = LEVEL_CONFIG[level-1];
  if (!lc) return;
  showToast(`Level ${level}: ${lc.name} | Layout: ${lc.layout} | Reward: ${lc.piReward} π`, 'info');
}
