const translations = {
  "en": {
    "cardTitle":"Log in",
    "labelUser":"Phone, username or email",
    "labelPass":"Password",
    "loginBtn":"Log in",
    "fbBtn":"Log in with Facebook",
    "forgot":"Forgot password?",
    "signup":"Don't have an account? Sign up",
    "getApp":"Get the app."
  },
  "pt-br": {
    "cardTitle":"Entrar",
    "labelUser":"Telefone, nome de usuário ou e-mail",
    "labelPass":"Senha",
    "loginBtn":"Entrar",
    "fbBtn":"Entrar com Facebook",
    "forgot":"Esqueceu a senha?",
    "signup":"Não tem uma conta? Cadastre-se",
    "getApp":"Baixe o app."
  },
  "es": {
    "cardTitle":"Iniciar sesión",
    "labelUser":"Teléfono, nombre de usuario o correo",
    "labelPass":"Contraseña",
    "loginBtn":"Iniciar sesión",
    "fbBtn":"Iniciar con Facebook",
    "forgot":"¿Olvidaste tu contraseña?",
    "signup":"¿No tienes una cuenta? Regístrate",
    "getApp":"Consigue la app."
  }
};

// Elements
const body = document.body;
const langSelect = document.getElementById('lang');
const themeToggle = document.getElementById('themeToggle');
const iconMoon = document.getElementById('iconMoon');
const iconSun = document.getElementById('iconSun');
const toast = document.getElementById('toast');

const elements = {
  cardTitle: document.getElementById('card-title'),
  labelUser: document.getElementById('label-user'),
  labelPass: document.getElementById('label-pass'),
  loginBtn: document.getElementById('loginBtn'),
  fbBtn: document.getElementById('fbBtn'),
  forgotLink: document.getElementById('forgotLink'),
  signupText: document.getElementById('signupText'),
  getApp: document.getElementById('getApp')
};

// Initialize language from attribute or select
function initLanguage(){
  const initial = body.getAttribute('data-lang') || 'en';
  langSelect.value = initial;
  applyLanguage(initial);
}
function applyLanguage(code){
  const t = translations[code] || translations['en'];
  elements.cardTitle.textContent = t.cardTitle;
  elements.labelUser.textContent = t.labelUser;
  elements.labelPass.textContent = t.labelPass;
  elements.loginBtn.textContent = t.loginBtn;
  elements.fbBtn.textContent = t.fbBtn;
  elements.forgotLink.textContent = t.forgot;
  elements.signupText.innerHTML = t.signup.replace(/\?/, '?') + '';
  elements.getApp.textContent = t.getApp;
  body.setAttribute('data-lang', code);
}

// Theme toggle
function initTheme(){
  const saved = localStorage.getItem('theme');
  if(saved){
    body.classList.toggle('theme-dark', saved === 'dark');
    body.classList.toggle('theme-light', saved === 'light');
  } else {
    // default dark
    body.classList.add('theme-dark');
  }
  updateThemeIcon();
}
function toggleTheme(){
  const isDark = body.classList.contains('theme-dark');
  body.classList.toggle('theme-dark', !isDark);
  body.classList.toggle('theme-light', isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  updateThemeIcon();
}
function updateThemeIcon(){
  const isDark = body.classList.contains('theme-dark');
  // when dark, show moon (pressed true)
  iconMoon.classList.toggle('hidden', !isDark);
  iconSun.classList.toggle('hidden', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

// Simple toast
function showToast(msg, ms = 2200){
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(()=>{ toast.style.display = 'none'; }, ms);
}

// Form handling
const form = document.getElementById('loginForm');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const user = form.user.value.trim();
  const pass = form.password.value.trim();
  if(!user || !pass){
    showToast(getText('Please fill both fields'));
    return;
  }
  // Simulate success
  showToast(getText('Logged in successfully'));
  form.reset();
});

// Helper to get fallback text for toast
function getText(msg){
  // If translation exists for common messages, map them
  const lang = body.getAttribute('data-lang') || 'en';
  const map = {
    "en": {"Please fill both fields":"Please fill both fields","Logged in successfully":"Logged in successfully"},
    "pt-br": {"Please fill both fields":"Preencha ambos os campos","Logged in successfully":"Login realizado com sucesso"},
    "es": {"Please fill both fields":"Rellena ambos campos","Logged in successfully":"Inicio de sesión correcto"}
  };
  return (map[lang] && map[lang][msg]) ? map[lang][msg] : msg;
}

// Event listeners
langSelect.addEventListener('change', (e)=>{
  applyLanguage(e.target.value);
});
themeToggle.addEventListener('click', toggleTheme);

// Initialize
initLanguage();
initTheme();

// Accessibility: allow keyboard toggle with Enter/Space
themeToggle.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    toggleTheme();
  }
});
