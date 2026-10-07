// GLOBAL APP STATE
const appState = {
    currentTab: 'beranda',
    modelKey: 'kapal_mercusuar',
    grade: 'SMP',
    targetVar: 'c',
    params: {
        a: 12,        // horizontal leg / base / width / distance
        b: 5,         // vertical leg / height
        c: 13,        // hypotenuse / diagonal
        theta: 22.6,  // angle in degrees
        r: 7,         // radius / pizza slice angle
        scale: 1,     // scale multiplier
        extra1: 3,    // additional parameter (e.g. potong arsir / x)
        extra2: 8     // additional parameter (e.g. total potong)
    },
    autoCalc: true,
    badgeStates: {
        a: 'value',
        b: 'value',
        c: 'target',
        theta: 'value',
        r: 'value',
        extra1: 'value',
        extra2: 'value'
    },
    canvasTheme: 'blueprint', // blueprint, chalkboard, modern, dark
    questionType: 'pg',       // pg, isian, uraian, hots
    difficulty: 'sedang',
    customAnnotations: [],
    collection: []
};

// 14 CONTEXT MODELS DATASET DEFINITION
const MODELS_DATA = {
    kapal_mercusuar: {
        title: "🚢 Kapal & Mercusuar",
        grade: "SMP",
        topic: "Pythagoras & Trigonometri",
        desc: "Jarak kapal ke dasar mercusuar dan sudut elevasi puncak mercusuar.",
        paramsDef: [
            { key: 'a', label: 'Jarak Horisontal Kapal (a)', min: 5, max: 50, step: 1, unit: 'm' },
            { key: 'b', label: 'Tinggi Mercusuar (b)', min: 5, max: 40, step: 1, unit: 'm' },
            { key: 'c', label: 'Jarak Pandang / Miring (c)', min: 7, max: 65, step: 1, unit: 'm', calculated: true },
            { key: 'theta', label: 'Sudut Elevasi (θ)', min: 10, max: 80, step: 0.1, unit: '°', calculated: true }
        ]
    },
    tangga_dinding: {
        title: "🪜 Tangga & Dinding",
        grade: "SMP",
        topic: "Pythagoras Siku-siku",
        desc: "Panjang tangga yang disandarkan pada dinding tembok tinggi.",
        paramsDef: [
            { key: 'a', label: 'Jarak Dinding ke Dasar Tangga (a)', min: 1, max: 15, step: 0.5, unit: 'm' },
            { key: 'b', label: 'Tinggi Sandaran Tangga (b)', min: 2, max: 20, step: 0.5, unit: 'm' },
            { key: 'c', label: 'Panjang Tangga (c)', min: 2, max: 25, step: 0.5, unit: 'm', calculated: true },
            { key: 'theta', label: 'Sudut Kemiringan Tanah (θ)', min: 15, max: 75, step: 0.1, unit: '°', calculated: true }
        ]
    },
    pohon_bayangan: {
        title: "🌳 Pohon & Bayangan Sinar",
        grade: "SD",
        topic: "Kesebangunan & Rasio Sinar",
        desc: "Segitiga bayangan pohon akibat sinar matahari terik.",
        paramsDef: [
            { key: 'a', label: 'Panjang Bayangan Pohon (a)', min: 2, max: 30, step: 1, unit: 'm' },
            { key: 'b', label: 'Tinggi Pohon (b)', min: 2, max: 25, step: 1, unit: 'm' },
            { key: 'c', label: 'Garis Sinar Puncak (c)', min: 3, max: 40, step: 1, unit: 'm', calculated: true },
            { key: 'theta', label: 'Sudut Elevasi Sinar (θ)', min: 15, max: 75, step: 0.1, unit: '°', calculated: true }
        ]
    },
    pesawat_ketinggian: {
        title: "✈️ Pesawat & Ketinggian Jelajah",
        grade: "SMA",
        topic: "Trigonometri Sudut Elevasi",
        desc: "Pengamatan titik lepas landas pesawat udara dengan sudut elevasi.",
        paramsDef: [
            { key: 'a', label: 'Jarak Horisontal Radar (a)', min: 100, max: 2000, step: 50, unit: 'm' },
            { key: 'b', label: 'Ketinggian Jelajah (b)', min: 100, max: 1500, step: 50, unit: 'm' },
            { key: 'c', label: 'Jarak Pandang Radar (c)', min: 150, max: 2500, step: 50, unit: 'm', calculated: true },
            { key: 'theta', label: 'Sudut Elevasi Radar (θ)', min: 10, max: 70, step: 0.1, unit: '°', calculated: true }
        ]
    },
    tebing_kapal_sma: {
        title: "🏔️ Tebing & 2 Kapal Laut",
        grade: "SMA",
        topic: "Sudut Depresi Dual Pengamatan",
        desc: "Petugas pengamat tebing melihat 2 kapal sejajar di lautan.",
        paramsDef: [
            { key: 'b', label: 'Tinggi Pengamat Tebing (h)', min: 10, max: 150, step: 5, unit: 'm' },
            { key: 'a', label: 'Jarak Kapal Dekat (x1)', min: 10, max: 100, step: 5, unit: 'm' },
            { key: 'extra1', label: 'Jarak Kapal Jauh (x2)', min: 20, max: 250, step: 5, unit: 'm' },
            { key: 'theta', label: 'Sudut Depresi Kapal 1 (θ1)', min: 20, max: 75, step: 0.1, unit: '°', calculated: true }
        ]
    },
    pecahan_pizza: {
        title: "🍕 Pecahan Pizza & Pie",
        grade: "SD",
        topic: "Pecahan, Luas & Juring Lingkaran",
        desc: "Loyang pizza yang dipotong menjadi beberapa potong juring identik.",
        paramsDef: [
            { key: 'r', label: 'Jari-jari Pizza (r)', min: 7, max: 28, step: 1, unit: 'cm' },
            { key: 'extra1', label: 'Potongan Diarsir (k)', min: 1, max: 8, step: 1, unit: 'potong' },
            { key: 'extra2', label: 'Total Potongan (N)', min: 2, max: 12, step: 1, unit: 'bagian' },
            { key: 'theta', label: 'Sudut Pusat Juring (θ)', min: 15, max: 360, step: 1, unit: '°', calculated: true }
        ]
    },
    bianglala_ferris: {
        title: "🎡 Bianglala Ferris Wheel",
        grade: "SMP",
        topic: "Sudut Pusat & Panjang Busur",
        desc: "Roda bianglala dengan kabin penumpang dan jari-jari lingkaran.",
        paramsDef: [
            { key: 'r', label: 'Jari-jari Bianglala (r)', min: 5, max: 30, step: 1, unit: 'm' },
            { key: 'theta', label: 'Sudut Antar Kabin (θ)', min: 15, max: 120, step: 5, unit: '°' },
            { key: 'a', label: 'Panjang Busur Lintasan (s)', min: 2, max: 50, step: 0.1, unit: 'm', calculated: true }
        ]
    },
    taman_kota: {
        title: "🏞️ Taman Kota L-Shaped",
        grade: "SD",
        topic: "Luas & Keliling Gabungan Tiga Persegi",
        desc: "Layout taman kota berbentuk huruf L dengan kolam dan jalan.",
        paramsDef: [
            { key: 'a', label: 'Panjang Total Taman (a)', min: 10, max: 80, step: 2, unit: 'm' },
            { key: 'b', label: 'Lebar Total Taman (b)', min: 10, max: 60, step: 2, unit: 'm' },
            { key: 'extra1', label: 'Potongan Sisi L (x)', min: 3, max: 25, step: 1, unit: 'm' }
        ]
    },
    kuda_atap: {
        title: "🏠 Kuda-kuda Atap Rumah",
        grade: "SMP",
        topic: "Segitiga Sama Kaki & Pythagoras",
        desc: "Struktur rangka kayu segitiga kuda-kuda atap bangunan.",
        paramsDef: [
            { key: 'a', label: 'Lebar Bentang Atap (W)', min: 6, max: 20, step: 1, unit: 'm' },
            { key: 'b', label: 'Tinggi Tiang Raja (h)', min: 2, max: 8, step: 0.5, unit: 'm' },
            { key: 'c', label: 'Panjang Kasau Miring (c)', min: 3, max: 15, step: 0.1, unit: 'm', calculated: true },
            { key: 'theta', label: 'Kemiringan Atap (θ)', min: 15, max: 60, step: 0.1, unit: '°', calculated: true }
        ]
    },
    rangka_jembatan: {
        title: "🌉 Rangka Jembatan Warren",
        grade: "SMP",
        topic: "Kesebangunan Rangka Segitiga",
        desc: "Rangka jembatan baja model Warren truss berulang di atas sungai.",
        paramsDef: [
            { key: 'a', label: 'Panjang Bentang Jembatan (L)', min: 12, max: 60, step: 4, unit: 'm' },
            { key: 'b', label: 'Tinggi Rangka (h)', min: 3, max: 12, step: 1, unit: 'm' },
            { key: 'c', label: 'Panjang Rangka Miring (c)', min: 4, max: 15, step: 0.1, unit: 'm', calculated: true }
        ]
    },
    layang_layang: {
        title: "🪁 Layang-Layang Geometri",
        grade: "SD",
        topic: "Luas & Diagonal Layang-Layang",
        desc: "Bangun layang-layang tradisional dengan dua diagonal perpotongan siku.",
        paramsDef: [
            { key: 'a', label: 'Diagonal Horizontal (d1)', min: 10, max: 50, step: 2, unit: 'cm' },
            { key: 'b', label: 'Diagonal Vertikal (d2)', min: 12, max: 60, step: 2, unit: 'cm' },
            { key: 'c', label: 'Panjang Sisi Atas (s1)', min: 8, max: 35, step: 1, unit: 'cm', calculated: true }
        ]
    },
    lapangan_olahraga: {
        title: "🏃 Lapangan Olahraga Track",
        grade: "SMP",
        topic: "Keliling & Luas Bangun Gabungan",
        desc: "Trek lari atletik berbentuk persegi panjang dengan 2 setengah lingkaran.",
        paramsDef: [
            { key: 'a', label: 'Panjang Trek Lurus (p)', min: 50, max: 150, step: 5, unit: 'm' },
            { key: 'r', label: 'Jari-jari Lengkungan (r)', min: 14, max: 42, step: 7, unit: 'm' }
        ]
    },
    peta_grid: {
        title: "🗺️ Peta Grid & Skala",
        grade: "SD",
        topic: "Rasio Skala & Koordinat Grid",
        desc: "Peta koordinat grid dari Kota A ke Kota B dengan rasio skala.",
        paramsDef: [
            { key: 'a', label: 'Jarak Pada Peta (d)', min: 2, max: 20, step: 1, unit: 'cm' },
            { key: 'extra1', label: 'Faktor Skala (1 : N)', min: 50000, max: 1000000, step: 50000, unit: '' },
            { key: 'b', label: 'Jarak Sebenarnya (D)', min: 1, max: 200, step: 1, unit: 'km', calculated: true }
        ]
    },
    bak_air_3d: {
        title: "🧊 Bak Air Balok 3D",
        grade: "SMA",
        topic: "Prisma & Volume Ruang 3D",
        desc: "Bak penampungan air berbentuk balok transparan dengan kedalaman air.",
        paramsDef: [
            { key: 'a', label: 'Panjang Bak (p)', min: 10, max: 100, step: 5, unit: 'cm' },
            { key: 'b', label: 'Lebar Bak (l)', min: 10, max: 80, step: 5, unit: 'cm' },
            { key: 'c', label: 'Tinggi Bak (t)', min: 10, max: 90, step: 5, unit: 'cm' },
            { key: 'extra1', label: 'Kedalaman Air (h_air)', min: 5, max: 90, step: 5, unit: 'cm' }
        ]
    }
};

window.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderHomePresets();
    renderWizardModels();
    updateModelParamsControls();
    recalculateMathParams();
    renderSVG();
    generateQuestionText();
    updateLKPDHeader();
    loadCollectionFromStorage();
}

// TAB SWITCHING
function switchTab(tabId) {
    appState.currentTab = tabId;
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`tab-${tabId}`);
    if (target) target.classList.remove('hidden');

    // Desktop Nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-sky-400', 'bg-slate-800', 'shadow');
        btn.classList.add('text-slate-400');
    });
    const activeBtn = document.getElementById(`nav-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-slate-400');
        activeBtn.classList.add('text-sky-400', 'bg-slate-800', 'shadow');
    }

    // Mobile Nav
    document.querySelectorAll('.mob-nav-btn').forEach(btn => {
        btn.classList.remove('bg-sky-500', 'text-white', 'font-medium');
        btn.classList.add('bg-slate-800', 'text-slate-300');
    });
    const activeMobBtn = document.getElementById(`mob-nav-${tabId}`);
    if (activeMobBtn) {
        activeMobBtn.classList.remove('bg-slate-800', 'text-slate-300');
        activeMobBtn.classList.add('bg-sky-500', 'text-white', 'font-medium');
    }

    if (tabId === 'lkpd') {
        syncSVGToLKPD();
    }
}

// RENDER HOME PRESETS
function renderHomePresets() {
    const container = document.getElementById('home-preset-grid');
    if (!container) return;

    const presets = [
        { key: 'kapal_mercusuar', title: 'Kapal & Mercusuar', grade: 'SMP', desc: 'Pythagoras & Sudut Elevasi' },
        { key: 'tangga_dinding', title: 'Tangga & Tembok', grade: 'SMP', desc: 'Sisi Miring & Sandaran' },
        { key: 'tebing_kapal_sma', title: 'Tebing Pengamat Dual Kapal', grade: 'SMA', desc: 'Trigonometri Sudut Depresi' },
        { key: 'pecahan_pizza', title: 'Pecahan Pizza Pepperoni', grade: 'SD', desc: 'Juring & Luas Pecahan' },
        { key: 'kuda_atap', title: 'Kuda-kuda Atap Rumah', grade: 'SMP', desc: 'Segitiga Sama Kaki & Kasau' },
        { key: 'bak_air_3d', title: 'Bak Penampungan Air 3D', grade: 'SMA', desc: 'Volume Balok & Volume Air' }
    ];

    container.innerHTML = presets.map(p => `
        <div onclick="quickSelectModel('${p.key}')" class="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/50 p-4 rounded-xl cursor-pointer transition shadow-md flex items-center justify-between">
            <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">${p.grade}</span>
                <h4 class="font-bold text-white text-sm mt-1 group-hover:text-sky-300 transition">${p.title}</h4>
                <p class="text-xs text-slate-400">${p.desc}</p>
            </div>
            <div class="text-slate-500 group-hover:text-sky-400 transition text-lg">
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        </div>
    `).join('');
}

// RENDER WIZARD MODELS
function renderWizardModels() {
    const container = document.getElementById('wizard-models-list');
    if (!container) return;

    container.innerHTML = Object.keys(MODELS_DATA).map(key => {
        const item = MODELS_DATA[key];
        return `
            <div onclick="selectWizardModel('${key}')" id="w-model-${key}" class="wizard-model-card border border-slate-700 bg-slate-900/60 hover:border-sky-500 p-3 rounded-xl cursor-pointer transition flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${item.grade}</span>
                    </div>
                    <h5 class="font-bold text-white text-xs mb-1">${item.title}</h5>
                    <p class="text-[11px] text-slate-400 line-clamp-2">${item.desc}</p>
                </div>
            </div>
        `;
    }).join('');
}

function setWizardGrade(grade) {
    appState.grade = grade;
    document.querySelectorAll('.w-grade-btn').forEach(btn => {
        btn.classList.remove('border-2', 'border-sky-500', 'bg-sky-500/10', 'text-white');
        btn.classList.add('border-slate-700', 'bg-slate-800/80', 'text-slate-400');
    });
    const activeBtn = document.getElementById(`w-grade-${grade}`);
    if (activeBtn) {
        activeBtn.classList.remove('border-slate-700', 'bg-slate-800/80', 'text-slate-400');
        activeBtn.classList.add('border-2', 'border-sky-500', 'bg-sky-500/10', 'text-white');
    }
}

function selectWizardModel(key) {
    appState.modelKey = key;
    document.querySelectorAll('.wizard-model-card').forEach(el => {
        el.classList.remove('border-2', 'border-sky-500', 'bg-sky-500/20');
    });
    const card = document.getElementById(`w-model-${key}`);
    if (card) {
        card.classList.add('border-2', 'border-sky-500', 'bg-sky-500/20');
    }
}

function applyWizardSelection() {
    const selectEl = document.getElementById('model-select');
    if (selectEl) selectEl.value = appState.modelKey;
    changeModel(appState.modelKey);
    switchTab('matematika');
}

function quickSelectModel(key) {
    appState.modelKey = key;
    const selectEl = document.getElementById('model-select');
    if (selectEl) selectEl.value = key;
    changeModel(key);
    switchTab('matematika');
}

// CHANGE MODEL & UPDATE CONTROLS
function changeModel(key) {
    appState.modelKey = key;
    const mData = MODELS_DATA[key];
    if (mData) {
        document.getElementById('active-grade-badge').innerText = mData.grade;
        // Default target variable update
        if (mData.paramsDef.length > 0) {
            appState.targetVar = mData.paramsDef[mData.paramsDef.length - 1].key;
            Object.keys(appState.badgeStates).forEach(k => {
                appState.badgeStates[k] = (k === appState.targetVar) ? 'target' : 'value';
            });
        }
    }
    updateModelParamsControls();
    recalculateMathParams();
    renderSVG();
    generateQuestionText();
}

function updateModelParamsControls() {
    const mData = MODELS_DATA[appState.modelKey];
    const container = document.getElementById('dynamic-params-container');
    if (!mData || !container) return;

    container.innerHTML = mData.paramsDef.map(p => {
        const val = appState.params[p.key] !== undefined ? appState.params[p.key] : p.min;
        return `
            <div class="space-y-1">
                <div class="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <label>${p.label}</label>
                    <span class="font-mono text-sky-400 font-bold" id="val-disp-${p.key}">${val} ${p.unit}</span>
                </div>
                <input type="range" 
                       min="${p.min}" 
                       max="${p.max}" 
                       step="${p.step}" 
                       value="${val}" 
                       oninput="onParamInput('${p.key}', this.value)"
                       class="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-sky-500">
            </div>
        `;
    }).join('');
}

function onParamInput(key, val) {
    appState.params[key] = parseFloat(val);
    const disp = document.getElementById(`val-disp-${key}`);
    const pDef = MODELS_DATA[appState.modelKey].paramsDef.find(p => p.key === key);
    if (disp && pDef) {
        disp.innerText = `${val} ${pDef.unit}`;
    }

    if (appState.autoCalc) {
        recalculateMathParams();
    }

    renderSVG();
    generateQuestionText();
}

function toggleAutoCalc() {
    const cb = document.getElementById('auto-calc-toggle');
    appState.autoCalc = cb ? cb.checked : true;
    if (appState.autoCalc) recalculateMathParams();
    renderSVG();
    generateQuestionText();
}

// MATHEMATICAL AUTO-CALCULATION ENGINE
function recalculateMathParams() {
    const p = appState.params;
    const mKey = appState.modelKey;

    if (mKey === 'kapal_mercusuar' || mKey === 'tangga_dinding' || mKey === 'pohon_bayangan' || mKey === 'pesawat_ketinggian') {
        p.c = parseFloat(Math.sqrt(p.a * p.a + p.b * p.b).toFixed(1));
        p.theta = parseFloat((Math.atan2(p.b, p.a) * (180 / Math.PI)).toFixed(1));
    } else if (mKey === 'tebing_kapal_sma') {
        p.theta = parseFloat((Math.atan2(p.b, p.a) * (180 / Math.PI)).toFixed(1));
    } else if (mKey === 'pecahan_pizza') {
        if (p.extra1 > p.extra2) p.extra1 = p.extra2;
        p.theta = parseFloat(((p.extra1 / p.extra2) * 360).toFixed(1));
    } else if (mKey === 'bianglala_ferris') {
        const rad = (p.theta * Math.PI) / 180;
        p.a = parseFloat((p.r * rad).toFixed(1));
    } else if (mKey === 'kuda_atap') {
        const halfW = p.a / 2;
        p.c = parseFloat(Math.sqrt(halfW * halfW + p.b * p.b).toFixed(1));
        p.theta = parseFloat((Math.atan2(p.b, halfW) * (180 / Math.PI)).toFixed(1));
    } else if (mKey === 'rangka_jembatan') {
        const unitWidth = p.a / 4;
        p.c = parseFloat(Math.sqrt(unitWidth * unitWidth + p.b * p.b).toFixed(1));
    } else if (mKey === 'layang_layang') {
        const d1Half = p.a / 2;
        const d2Top = p.b * 0.4;
        p.c = parseFloat(Math.sqrt(d1Half * d1Half + d2Top * d2Top).toFixed(1));
    } else if (mKey === 'peta_grid') {
        p.b = parseFloat(((p.a * p.extra1) / 100000).toFixed(1));
    }

    MODELS_DATA[mKey].paramsDef.forEach(pDef => {
        const disp = document.getElementById(`val-disp-${pDef.key}`);
        if (disp) {
            disp.innerText = `${appState.params[pDef.key]} ${pDef.unit}`;
        }
    });
}

function toggleBadgeState(varKey) {
    const current = appState.badgeStates[varKey] || 'value';
    if (current === 'value') {
        appState.badgeStates[varKey] = 'target';
        appState.targetVar = varKey;
    } else if (current === 'target') {
        appState.badgeStates[varKey] = 'hidden';
    } else {
        appState.badgeStates[varKey] = 'value';
    }

    const pDef = MODELS_DATA[appState.modelKey].paramsDef.find(p => p.key === appState.targetVar);
    const targetDisp = document.getElementById('target-var-display');
    if (targetDisp) {
        targetDisp.innerText = pDef ? pDef.label : varKey;
    }

    renderSVG();
    generateQuestionText();
}

function setCanvasTheme(theme) {
    appState.canvasTheme = theme;
    const container = document.getElementById('svg-container');
    if (!container) return;

    container.className = `w-full max-w-2xl transition-all duration-300 rounded-xl p-4 border shadow-inner flex items-center justify-center theme-${theme}`;
    renderSVG();
}

function getBadgeText(varKey, value, unit) {
    const st = appState.badgeStates[varKey] || 'value';
    if (st === 'target') return '?';
    if (st === 'hidden') return '';
    return `${value} ${unit}`;
}

function isBadgeVisible(varKey) {
    return (appState.badgeStates[varKey] || 'value') !== 'hidden';
}

// SVG RENDERER ENGINE (SUPPORT 14 MODELS)
function renderSVG() {
    const container = document.getElementById('svg-container');
    if (!container) return;

    const mKey = appState.modelKey;
    const p = appState.params;
    const isThemeWhite = appState.canvasTheme === 'modern';
    
    const lineColor = isThemeWhite ? '#0f172a' : '#38bdf8';
    const accentColor = isThemeWhite ? '#dc2626' : '#f59e0b';
    const rightAngleColor = isThemeWhite ? '#16a34a' : '#10b981';
    const textColor = isThemeWhite ? '#0f172a' : '#ffffff';

    const showRightAngle = document.getElementById('toggle-right-angle')?.checked ?? true;
    const showGrid = document.getElementById('toggle-grid-lines')?.checked ?? false;
    const showVertices = document.getElementById('toggle-vertex-labels')?.checked ?? true;

    let svgContent = '';

    let gridPattern = '';
    if (showGrid) {
        gridPattern = `
            <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${isThemeWhite ? '#e2e8f0' : '#1e293b'}" stroke-width="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        `;
    }

    // Helper Badge Component
    const drawBadge = (key, x, y, val, unit, label = '') => {
        if (!isBadgeVisible(key)) return '';
        const txt = getBadgeText(key, val, unit);
        const displayStr = label ? `${label}: ${txt}` : txt;
        const width = Math.max(70, displayStr.length * 8 + 16);
        const isTarget = appState.badgeStates[key] === 'target';
        return `
            <g class="svg-badge" onclick="toggleBadgeState('${key}')">
                <rect x="${x - width/2}" y="${y - 12}" width="${width}" height="24" rx="6" fill="${isTarget ? '#f59e0b' : '#0284c7'}"/>
                <text x="${x}" y="${y + 4}" fill="#ffffff" text-anchor="middle" class="svg-text" font-size="11">${displayStr}</text>
            </g>
        `;
    };

    // Helper Annotations Component
    let customAnnotationsSVG = '';
    if (appState.customAnnotations.length > 0) {
        customAnnotationsSVG = appState.customAnnotations.map((anno, idx) => `
            <g transform="translate(20, ${30 + idx * 24})">
                <rect x="0" y="0" width="${anno.length * 7 + 16}" height="20" rx="4" fill="#a855f7" opacity="0.9"/>
                <text x="8" y="14" fill="#ffffff" font-size="10" font-weight="bold">${anno}</text>
            </g>
        `).join('');
    }

    if (mKey === 'kapal_mercusuar') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <path d="M 30 260 Q 150 270 270 260 T 470 260 L 470 290 L 30 290 Z" fill="${isThemeWhite ? '#e0f2fe' : '#0369a1'}" opacity="0.4"/>
            <path d="M 40 260 L 100 260 L 100 120 L 70 120 L 70 260 Z" fill="${isThemeWhite ? '#94a3b8' : '#334155'}"/>
            <rect x="75" y="60" width="20" height="60" fill="${isThemeWhite ? '#cbd5e1' : '#64748b'}" />
            <polygon points="70,60 85,45 100,60" fill="${accentColor}" />
            <polygon points="85,52 420,250 420,260" fill="${accentColor}" opacity="0.15"/>

            <path d="M 400 260 L 440 260 L 430 275 L 410 275 Z" fill="${accentColor}"/>
            <line x1="420" y1="260" x2="420" y2="235" stroke="${textColor}" stroke-width="2"/>
            <polygon points="420,235 435,247 420,247" fill="${isThemeWhite ? '#0284c7' : '#38bdf8'}"/>

            <line x1="85" y1="260" x2="420" y2="260" stroke="${lineColor}" stroke-width="2.5" stroke-dasharray="4,4"/>
            <line x1="85" y1="60" x2="85" y2="260" stroke="${lineColor}" stroke-width="2.5" stroke-dasharray="4,4"/>
            <line x1="85" y1="60" x2="420" y2="260" stroke="${accentColor}" stroke-width="3"/>

            ${showRightAngle ? `<path d="M 85 245 L 100 245 L 100 260" fill="none" stroke="${rightAngleColor}" stroke-width="2"/>` : ''}

            ${showVertices ? `
                <circle cx="85" cy="260" r="4" fill="${textColor}"/>
                <text x="70" y="275" fill="${textColor}" class="svg-text" font-size="12">A</text>
                <circle cx="85" cy="60" r="4" fill="${textColor}"/>
                <text x="70" y="55" fill="${textColor}" class="svg-text" font-size="12">B (Puncak)</text>
                <circle cx="420" cy="260" r="4" fill="${textColor}"/>
                <text x="430" y="275" fill="${textColor}" class="svg-text" font-size="12">C (Kapal)</text>
            ` : ''}

            ${drawBadge('a', 250, 280, p.a, 'm', 'a')}
            ${drawBadge('b', 45, 160, p.b, 'm', 'b')}
            ${drawBadge('c', 270, 140, p.c, 'm', 'c')}
            ${drawBadge('theta', 370, 240, p.theta, '°', 'θ')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'tangga_dinding') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <line x1="50" y1="270" x2="450" y2="270" stroke="${isThemeWhite ? '#94a3b8' : '#475569'}" stroke-width="4"/>
            <rect x="80" y="40" width="20" height="230" fill="${isThemeWhite ? '#cbd5e1' : '#334155'}"/>
            <line x1="90" y1="70" x2="380" y2="270" stroke="${accentColor}" stroke-width="6"/>
            <line x1="90" y1="70" x2="380" y2="270" stroke="#000" stroke-width="2" stroke-dasharray="2,8"/>

            ${showRightAngle ? `<path d="M 100 255 L 115 255 L 115 270" fill="none" stroke="${rightAngleColor}" stroke-width="2"/>` : ''}
            ${drawBadge('a', 230, 290, p.a, 'm', 'a')}
            ${drawBadge('b', 50, 160, p.b, 'm', 'b')}
            ${drawBadge('c', 260, 150, p.c, 'm', 'c')}
            ${drawBadge('theta', 330, 250, p.theta, '°', 'θ')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'pohon_bayangan') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <circle cx="420" cy="50" r="25" fill="#f59e0b"/>
            <path d="M 100 260 Q 80 180 100 120 Q 130 180 120 260 Z" fill="#854d0e"/>
            <circle cx="105" cy="110" r="50" fill="#16a34a"/>
            <line x1="110" y1="260" x2="380" y2="260" stroke="${accentColor}" stroke-width="4"/>
            <line x1="420" y1="50" x2="110" y2="260" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4"/>

            ${drawBadge('a', 240, 280, p.a, 'm', 'Bayangan')}
            ${drawBadge('b', 50, 160, p.b, 'm', 'Tinggi')}
            ${drawBadge('c', 240, 140, p.c, 'm', 'Sinar')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'pesawat_ketinggian') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <path d="M 380 70 L 410 70 L 420 60 L 390 60 Z" fill="${accentColor}"/>
            <circle cx="80" cy="260" r="10" fill="#0284c7"/>
            <line x1="80" y1="260" x2="400" y2="260" stroke="${lineColor}" stroke-dasharray="4,4"/>
            <line x1="400" y1="70" x2="400" y2="260" stroke="${lineColor}" stroke-dasharray="4,4"/>
            <line x1="80" y1="260" x2="400" y2="70" stroke="${accentColor}" stroke-width="3"/>

            ${drawBadge('a', 240, 280, p.a, 'm', 'a')}
            ${drawBadge('b', 430, 160, p.b, 'm', 'b')}
            ${drawBadge('c', 230, 140, p.c, 'm', 'c')}
            ${drawBadge('theta', 140, 240, p.theta, '°', 'θ')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'tebing_kapal_sma') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <path d="M 40 40 L 100 40 L 100 260 L 40 260 Z" fill="#475569"/>
            <line x1="100" y1="260" x2="460" y2="260" stroke="#0284c7" stroke-width="3"/>
            <circle cx="240" cy="260" r="6" fill="#ef4444"/>
            <circle cx="400" cy="260" r="6" fill="#f59e0b"/>
            <line x1="100" y1="40" x2="240" y2="260" stroke="${accentColor}" stroke-dasharray="4,4"/>
            <line x1="100" y1="40" x2="400" y2="260" stroke="${lineColor}" stroke-dasharray="4,4"/>

            ${drawBadge('b', 50, 150, p.b, 'm', 'h')}
            ${drawBadge('a', 170, 280, p.a, 'm', 'x1')}
            ${drawBadge('extra1', 320, 280, p.extra1, 'm', 'x2')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'pecahan_pizza') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <circle cx="250" cy="160" r="100" fill="#fef08a" stroke="#b45309" stroke-width="8"/>
            <path d="M 250 160 L 350 160 A 100 100 0 0 0 ${250 + 100*Math.cos(-p.theta*Math.PI/180)} ${160 + 100*Math.sin(-p.theta*Math.PI/180)} Z" fill="#ef4444" opacity="0.8"/>

            ${drawBadge('r', 290, 140, p.r, 'cm', 'r')}
            ${drawBadge('extra1', 250, 280, p.extra1, 'potong', 'Arsir')}
            ${drawBadge('theta', 250, 40, p.theta, '°', 'Sudut Juring')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'bianglala_ferris') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <circle cx="250" cy="150" r="90" fill="none" stroke="${lineColor}" stroke-width="4"/>
            <line x1="250" y1="150" x2="340" y2="150" stroke="${accentColor}" stroke-width="2"/>
            <line x1="250" y1="150" x2="${250 + 90*Math.cos(-p.theta*Math.PI/180)}" x2="${150 + 90*Math.sin(-p.theta*Math.PI/180)}" stroke="${accentColor}" stroke-width="2"/>
            <circle cx="250" cy="150" r="6" fill="${textColor}"/>

            ${drawBadge('r', 290, 135, p.r, 'm', 'r')}
            ${drawBadge('a', 250, 270, p.a, 'm', 'Busur s')}
            ${drawBadge('theta', 250, 40, p.theta, '°', 'θ')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'taman_kota') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <path d="M 100 60 L 350 60 L 350 140 L 220 140 L 220 250 L 100 250 Z" fill="#22c55e" stroke="#15803d" stroke-width="4" opacity="0.8"/>

            ${drawBadge('a', 225, 40, p.a, 'm', 'Panjang A')}
            ${drawBadge('b', 70, 155, p.b, 'm', 'Lebar B')}
            ${drawBadge('extra1', 285, 160, p.extra1, 'm', 'Sisi x')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'kuda_atap') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <polygon points="80,240 250,80 420,240" fill="none" stroke="${accentColor}" stroke-width="4"/>
            <line x1="80" y1="240" x2="420" y2="240" stroke="${lineColor}" stroke-width="3"/>
            <line x1="250" y1="80" x2="250" y2="240" stroke="${lineColor}" stroke-width="3"/>

            ${drawBadge('a', 250, 265, p.a, 'm', 'Bentang W')}
            ${drawBadge('b', 275, 160, p.b, 'm', 'Tiang h')}
            ${drawBadge('c', 150, 140, p.c, 'm', 'Kasau c')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'rangka_jembatan') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <line x1="60" y1="220" x2="440" y2="220" stroke="${lineColor}" stroke-width="4"/>
            <line x1="110" y1="120" x2="390" y2="120" stroke="${lineColor}" stroke-width="4"/>
            <polygon points="60,220 110,120 160,220 210,120 260,220 310,120 360,220 390,120 440,220" fill="none" stroke="${accentColor}" stroke-width="3"/>

            ${drawBadge('a', 250, 250, p.a, 'm', 'Panjang L')}
            ${drawBadge('b', 40, 170, p.b, 'm', 'Tinggi h')}
            ${drawBadge('c', 125, 160, p.c, 'm', 'Miring c')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'layang_layang') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <polygon points="250,50 350,150 250,270 150,150" fill="#38bdf8" opacity="0.6" stroke="${accentColor}" stroke-width="3"/>
            <line x1="150" y1="150" x2="350" y2="150" stroke="${lineColor}" stroke-dasharray="4,4"/>
            <line x1="250" y1="50" x2="250" y2="270" stroke="${lineColor}" stroke-dasharray="4,4"/>

            ${drawBadge('a', 250, 130, p.a, 'cm', 'd1')}
            ${drawBadge('b', 220, 200, p.b, 'cm', 'd2')}
            ${drawBadge('c', 310, 90, p.c, 'cm', 'sisi')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'lapangan_olahraga') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <path d="M 160 80 L 340 80 A 80 80 0 0 1 340 240 L 160 240 A 80 80 0 0 1 160 80 Z" fill="#334155" stroke="${accentColor}" stroke-width="4"/>
            <line x1="160" y1="80" x2="160" y2="240" stroke="${lineColor}" stroke-dasharray="2,4"/>
            <line x1="340" y1="80" x2="340" y2="240" stroke="${lineColor}" stroke-dasharray="2,4"/>

            ${drawBadge('a', 250, 60, p.a, 'm', 'Panjang p')}
            ${drawBadge('r', 110, 160, p.r, 'm', 'Jari-jari r')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'peta_grid') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <circle cx="430" cy="60" r="25" fill="${isThemeWhite ? '#e2e8f0' : '#334155'}"/>
            <text x="430" y="42" fill="${textColor}" font-size="10" font-weight="bold" text-anchor="middle">U</text>

            <circle cx="100" cy="220" r="8" fill="#ef4444"/>
            <text x="100" y="245" fill="${textColor}" font-size="12" font-weight="bold" text-anchor="middle">Kota A</text>

            <circle cx="360" cy="100" r="8" fill="#ef4444"/>
            <text x="360" y="85" fill="${textColor}" font-size="12" font-weight="bold" text-anchor="middle">Kota B</text>

            <line x1="100" y1="220" x2="360" y2="100" stroke="${accentColor}" stroke-width="3" stroke-dasharray="6,4"/>

            ${drawBadge('a', 230, 140, p.a, 'cm', 'Jarak Peta')}
            ${drawBadge('b', 230, 270, p.b, 'km', 'Sebenarnya')}
            ${customAnnotationsSVG}
        </svg>`;
    } else if (mKey === 'bak_air_3d') {
        svgContent = `
        <svg viewBox="0 0 500 320" class="w-full h-auto">
            ${gridPattern}
            <polygon points="120,220 320,220 380,160 180,160" fill="${isThemeWhite ? '#e2e8f0' : '#1e293b'}" stroke="${lineColor}" stroke-width="2"/>
            <polygon points="120,220 120,100 180,40 180,160" fill="${isThemeWhite ? '#cbd5e1' : '#334155'}" opacity="0.6" stroke="${lineColor}" stroke-width="2"/>
            <polygon points="120,220 320,220 320,100 120,100" fill="none" stroke="${lineColor}" stroke-width="2.5"/>
            <polygon points="320,220 380,160 380,40 320,100" fill="none" stroke="${lineColor}" stroke-width="2"/>
            <polygon points="120,100 180,40 380,40 320,100" fill="none" stroke="${lineColor}" stroke-width="2"/>

            <polygon points="120,220 320,220 380,160 180,160" fill="#38bdf8" opacity="0.5"/>

            ${drawBadge('a', 220, 240, p.a, 'cm', 'p')}
            ${drawBadge('b', 360, 200, p.b, 'cm', 'l')}
            ${drawBadge('c', 70, 160, p.c, 'cm', 't')}
            ${customAnnotationsSVG}
        </svg>`;
    }

    container.innerHTML = svgContent;
}

// QUESTION GENERATOR & SOLUTION LOGIC
function generateQuestionText() {
    const narrativeEl = document.getElementById('generated-narrative-text');
    const pgChoicesEl = document.getElementById('pg-choices-container');
    const solutionEl = document.getElementById('step-by-step-solution');
    if (!narrativeEl) return;

    const mKey = appState.modelKey;
    const p = appState.params;
    const target = appState.targetVar;

    let narrative = "";
    let solutionSteps = [];
    let correctAnswer = 0;
    let unit = "m";

    if (mKey === 'kapal_mercusuar') {
        if (target === 'c') {
            narrative = `Sebuah kapal laut berlabuh pada jarak <b>${p.a} meter</b> dari dasar mercusuar. Jika tinggi mercusuar tersebut adalah <b>${p.b} meter</b>, berapakah jarak pandang langsung dari puncak mercusuar ke kapal tersebut?`;
            correctAnswer = p.c;
            solutionSteps = [
                `Gunakan Teorema Pythagoras: c² = a² + b²`,
                `c² = (${p.a})² + (${p.b})²`,
                `c² = ${p.a * p.a} + ${p.b * p.b} = ${p.a * p.a + p.b * p.b}`,
                `c = √${p.a * p.a + p.b * p.b} = <b>${p.c} meter</b>`
            ];
        } else if (target === 'a') {
            narrative = `Jarak pandang dari puncak mercusuar setinggi <b>${p.b} meter</b> ke sebuah kapal adalah <b>${p.c} meter</b>. Hitunglah jarak mendatar antara kapal tersebut dengan dasar mercusuar!`;
            correctAnswer = p.a;
            solutionSteps = [
                `Gunakan Teorema Pythagoras: a² = c² - b²`,
                `a² = (${p.c})² - (${p.b})²`,
                `a² = ${p.c * p.c} - ${p.b * p.b} = ${p.c * p.c - p.b * p.b}`,
                `a = √${p.c * p.c - p.b * p.b} = <b>${p.a} meter</b>`
            ];
        } else {
            narrative = `Sebuah kapal berada <b>${p.a} meter</b> dari dasar mercusuar. Jarak pandang dari puncak mercusuar ke kapal adalah <b>${p.c} meter</b>. Tentukan tinggi mercusuar tersebut!`;
            correctAnswer = p.b;
            solutionSteps = [
                `Gunakan Teorema Pythagoras: b² = c² - a²`,
                `b² = (${p.c})² - (${p.a})²`,
                `b = √${p.c * p.c - p.a * p.a} = <b>${p.b} meter</b>`
            ];
        }
    } else {
        const pDefTarget = MODELS_DATA[mKey].paramsDef.find(x => x.key === target);
        unit = pDefTarget ? pDefTarget.unit : 'm';
        correctAnswer = p[target] || 10;
        
        narrative = `Berdasarkan diagram visual model <b>${MODELS_DATA[mKey].title}</b>, tentukan nilai dari parameter <b>${pDefTarget ? pDefTarget.label : target}</b> yang ditandai dengan label (<b>?</b>)!`;
        solutionSteps = [
            `Analisis parameter yang diketahui dari diagram visual.`,
            `Gunakan formula geometri/trigonometri yang sesuai dengan konteks ${MODELS_DATA[mKey].topic}.`,
            `Hasil perhitungan nilai target: <b>${correctAnswer} ${unit}</b>`
        ];
    }

    narrativeEl.innerHTML = narrative;

    // Render PG Choices
    if (pgChoicesEl) {
        const rawOpts = [
            correctAnswer,
            parseFloat((correctAnswer * 0.8).toFixed(1)),
            parseFloat((correctAnswer * 1.25).toFixed(1)),
            parseFloat((correctAnswer + 4).toFixed(1))
        ];
        const uniqueOpts = Array.from(new Set(rawOpts)).sort(() => Math.random() - 0.5);

        pgChoicesEl.innerHTML = uniqueOpts.map((opt, idx) => `
            <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-between text-xs text-slate-200">
                <span class="font-bold text-sky-400">${String.fromCharCode(65 + idx)}.</span>
                <span>${opt} ${unit}</span>
                ${opt === correctAnswer ? '<i class="fa-solid fa-check text-emerald-400"></i>' : ''}
            </div>
        `).join('');
    }

    if (solutionEl) {
        solutionEl.innerHTML = solutionSteps.map((s, idx) => `<p>${idx + 1}. ${s}</p>`).join('');
    }

    // Update AI Prompt Text Box
    const aiPromptEl = document.getElementById('ai-prompt-text');
    if (aiPromptEl) {
        aiPromptEl.innerText = `Buatkan soal HOTS naratif matematika tingkat ${appState.grade} berbasis konteks ${MODELS_DATA[mKey].title} dengan nilai parameter: ${JSON.stringify(appState.params)}. Berikan pembahasan berbasis pemecahan masalah.`;
    }
}

// HELPER FUNCTIONS
function toggleGeminiPromptBox() {
    const box = document.getElementById('gemini-prompt-box');
    if (box) box.classList.toggle('hidden');
}

function copyAIPrompt() {
    const txt = document.getElementById('ai-prompt-text')?.innerText;
    if (txt) navigator.clipboard.writeText(txt);
}

function copyQuestionToClipboard() {
    const txt = document.getElementById('generated-narrative-text')?.innerText;
    if (txt) navigator.clipboard.writeText(txt);
}

function addCustomAnnotation() {
    const input = document.getElementById('custom-annotation-input');
    if (!input || !input.value.trim()) return;
    appState.customAnnotations.push(input.value.trim());
    input.value = '';
    renderAnnotationsList();
    renderSVG();
}

function renderAnnotationsList() {
    const container = document.getElementById('annotations-list-container');
    if (!container) return;
    container.innerHTML = appState.customAnnotations.map((a, i) => `
        <div class="flex items-center justify-between bg-slate-800 p-2 rounded border border-slate-700">
            <span>${a}</span>
            <button onclick="removeAnnotation(${i})" class="text-red-400 hover:text-red-300"><i class="fa-solid fa-times"></i></button>
        </div>
    `).join('');
}

function removeAnnotation(idx) {
    appState.customAnnotations.splice(idx, 1);
    renderAnnotationsList();
    renderSVG();
}

function resetAppDefaults() {
    appState.params = { a: 12, b: 5, c: 13, theta: 22.6, r: 7, scale: 1, extra1: 3, extra2: 8 };
    appState.customAnnotations = [];
    renderAnnotationsList();
    changeModel(appState.modelKey);
}

function exportSVGCanvas() {
    const svgEl = document.querySelector('#svg-container svg');
    if (!svgEl) return;
    const blob = new Blob([svgEl.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MathVisual_${appState.modelKey}.svg`;
    link.click();
}

function syncSVGToLKPD() {
    const slot = document.getElementById('lkpd-svg-render-slot');
    const svgEl = document.querySelector('#svg-container svg');
    if (slot && svgEl) {
        slot.innerHTML = svgEl.outerHTML;
    }
    const narrDisplay = document.getElementById('lkpd-narrative-display');
    const genNarr = document.getElementById('generated-narrative-text');
    if (narrDisplay && genNarr) {
        narrDisplay.innerHTML = genNarr.innerHTML;
    }
    const optsDisplay = document.getElementById('lkpd-options-display');
    const genOpts = document.getElementById('pg-choices-container');
    if (optsDisplay && genOpts) {
        optsDisplay.innerHTML = genOpts.innerHTML;
    }
    const solDisplay = document.getElementById('lkpd-solution-display');
    const genSol = document.getElementById('step-by-step-solution');
    if (solDisplay && genSol) {
        solDisplay.innerHTML = genSol.innerHTML;
    }
}

function updateLKPDHeader() {
    const schInput = document.getElementById('lkpd-school-input')?.value;
    const topInput = document.getElementById('lkpd-topic-input')?.value;
    const clsInput = document.getElementById('lkpd-class-input')?.value;

    if (schInput) document.getElementById('lkpd-school-display').innerText = schInput;
    if (topInput) document.getElementById('lkpd-topic-display').innerText = topInput;
    if (clsInput) document.getElementById('lkpd-class-display').innerText = clsInput;
}

function saveToCollection() {
    const item = {
        id: Date.now(),
        modelKey: appState.modelKey,
        title: MODELS_DATA[appState.modelKey].title,
        grade: MODELS_DATA[appState.modelKey].grade,
        params: { ...appState.params }
    };
    appState.collection.push(item);
    localStorage.setItem('mathvisual_collection', JSON.stringify(appState.collection));
    renderCollection();
}

function loadCollectionFromStorage() {
    const saved = localStorage.getItem('mathvisual_collection');
    if (saved) {
        try { appState.collection = JSON.parse(saved); } catch (e) {}
    }
    renderCollection();
}

function renderCollection() {
    const grid = document.getElementById('collection-items-grid');
    if (!grid) return;
    grid.innerHTML = appState.collection.map(item => `
        <div class="bg-slate-900 border border-slate-700 p-4 rounded-xl space-y-2">
            <span class="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-bold">${item.grade}</span>
            <h4 class="font-bold text-white text-sm">${item.title}</h4>
            <p class="text-xs text-slate-400 font-mono">${JSON.stringify(item.params)}</p>
        </div>
    `).join('');
}

function clearAllCollection() {
    appState.collection = [];
    localStorage.removeItem('mathvisual_collection');
    renderCollection();
}