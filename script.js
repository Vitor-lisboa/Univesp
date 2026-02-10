// Dados globais
let user = null;
let progress = 0;
let studyTime = 0;
let timerInterval = null;
let currentWeek = 1;
let theme = 'light';
let performance = { math: 0, port: 0, gen: 0, red: 0 };
let currentSubject = 'math';

// Respostas IA locais inteligentes (expandidas para mais interatividade)
const localResponses = {
    'explique porcentagem': 'Porcentagem é uma fração de 100. Exemplo: 20% de 100 é 20. Pratique: 10% de 200 = ?',
    'exercício matemática': 'Quanto é 15% de 200? Resposta: 30. Tente outro: Regra de três: 2/4 = x/8, x = ?',
    'redação': 'Estrutura básica: Introdução (tema), desenvolvimento (argumentos), conclusão (síntese). Escreva uma sobre educação.',
    'história': 'Revolução Industrial (século XVIII, Inglaterra): Máquinas, fábricas. Ano Revolução Francesa: 1789.',
    'concordância': 'Concorde: As meninas ___ bonitas. Resposta: são. Regra: Sujeito plural, verbo plural.',
    'geometria': 'Área do círculo: πr². Para r=2, área ≈ 12.56. Perímetro quadrado: 4 x lado.',
    'interpretação texto': 'Identifique tema, ideia principal e pontuação. Exemplo: Texto sobre natureza → Tema: Meio ambiente.',
    'classes gramaticais': 'Substantivo (pessoa/coisa), verbo (ação), adjetivo (qualidade). Ex: Casa (substantivo), correr (verbo).',
    'biologia': 'Célula é unidade básica da vida. Respiração celular produz energia.',
    'física': 'Força = massa x aceleração (F=ma). Gravidade acelera objetos a 9.8 m/s².',
    'química': 'Água: H2O. Reação química muda substâncias.',
    'geografia': 'Brasil: 26 estados, capital Brasília. Clima tropical.',
    default: 'Pergunte sobre Matemática, Português, Redação ou Conhecimentos Gerais! Ex: "Explique equações".'
};

// Função IA local inteligente (adapta baseado em desempenho)
function getAIResponse(message) {
    const lowerMsg = message.toLowerCase();
    let response = localResponses[lowerMsg] || localResponses.default;
    
    // Inteligência: Adapte baseado em erros
    if (lowerMsg.includes('matemática') && performance.math < 0) {
        response += ' Você errou recentemente – pratique equações!';
    } else if (lowerMsg.includes('português') && performance.port < 0) {
        response += ' Foque em concordância para melhorar.';
    } else if (lowerMsg.includes('redação') && performance.red < 0) {
        response += ' Trabalhe na estrutura da redação.';
    } else if (lowerMsg.includes('conhecimentos gerais') && performance.gen < 0) {
        response += ' Revise História e Geografia.';
    }
    
    return response;
}

// Chat IA
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    addMessage('user', message);
    input.value = '';
    const response = getAIResponse(message);
    setTimeout(() => addMessage('ai', response), 500); // Simula delay IA
}

function addMessage(type, text) {
    const messages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    msgDiv.textContent = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

// Sugestões IA inteligentes
function generateSuggestion() {
    const weakSubject = Object.keys(performance).reduce((a, b) => performance[a] < performance[b] ? a : b);
    const suggestions = {
        math: 'Pratique equações – você errou recentemente!',
        port: 'Foque em concordância verbal.',
        gen: 'Revise História e Geografia.',
        red: 'Trabalhe na estrutura da redação.'
    };
    document.getElementById('suggestion-text').textContent = suggestions[weakSubject] || 'Continue o plano diário!';
}

// Atualizar desempenho
function updatePerformance(subject, correct) {
    performance[subject] = (performance[subject] || 0) + (correct ? 1 : -1);
    localStorage.setItem('performance', JSON.stringify(performance));
    generateSuggestion();
}

// Funções principais
function startOnboarding() {
    console.log('startOnboarding chamado');
    const onboarding = document.getElementById('onboarding');
    const loginScreen = document.getElementById('login-screen');
    if (onboarding && loginScreen) {
        onboarding.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        console.log('Transição para login realizada');
    } else {
        console.error('Elementos não encontrados: onboarding ou login-screen');
    }
}

function login() {
    const username = document.getElementById('username').value;
    if (username) {
        user = username;
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        loadProgress();
        generateCalendar();
        updateChart();
        generateSuggestion();
    }
}

function logout() {
    user = null;
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
}

function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', theme);
}

function loadProgress() {
    progress = parseInt(localStorage.getItem('progress') || 0);
    studyTime = parseInt(localStorage.getItem('studyTime') || 0);
   
