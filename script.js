const translations = {
  "en-US": {
    continueAs: "Continue as user",
    removeAccount: "Remove account",
    usernameLabel: "*****, username or email",
    passwordLabel: "Password",
    logIn: "Log In",
    or: "OR",
    logInFacebook: "Log in with Facebook",
    forgotPassword: "****** password?",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    getApp: "Get the app."
  },
  "pt-BR": {
    continueAs: "Continuar como usuário",
    removeAccount: "Remover conta",
    usernameLabel: "********, nome de usuário ou e‑mail",
    passwordLabel: "Senha",
    logIn: "Entrar",
    or: "OU",
    logInFacebook: "Entrar com o Facebook",
    forgotPassword: "******** a senha?",
    noAccount: "Não tem uma conta?",
    signUp: "Cadastre-se",
    getApp: "Baixe o aplicativo."
  },
  "es-ES": {
    continueAs: "Continuar como usuario",
    removeAccount: "Eliminar cuenta",
    usernameLabel: "********, nombre de usuario o correo",
    passwordLabel: "Contraseña",
    logIn: "Iniciar sesión",
    or: "O",
    logInFacebook: "Iniciar con Facebook",
    forgotPassword: "********** la contraseña?",
    noAccount: "¿No tienes una cuenta?",
    signUp: "Regístrate",
    getApp: "Descarga la app."
  }
};

// Utility: apply translations to elements with data-i18n
function applyTranslations(locale) {
  const map = translations[locale] || translations["en-US"];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (map[key]) {
      el.textContent = map[key];
    }
  });
}

// Persist and apply theme (light/dark)
function setTheme(dark) {
  if (dark) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    document.getElementById("darkToggle").checked = true;
  } else {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    document.getElementById("darkToggle").checked = false;
  }
}

// Persist and apply language
function setLanguage(locale) {
  document.documentElement.lang = locale;
  localStorage.setItem("locale", locale);
  const select = document.getElementById("langSelect");
  if (select) select.value = locale;
  applyTranslations(locale);
}

// Initialize UI state
function init() {
  // Theme
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme === "dark");

  // Language
  const savedLocale = localStorage.getItem("locale") || navigator.language || "en-US";
  const normalized = ["en-US","pt-BR","es-ES"].includes(savedLocale) ? savedLocale : "en-US";
  setLanguage(normalized);

  // Event listeners
  document.getElementById("darkToggle").addEventListener("change", (e) => {
    setTheme(e.target.checked);
  });

  document.getElementById("langSelect").addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });

  // Simple form handler (demo only)
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    if (!username) {
      alert("Please enter your username or email.");
      return;
    }
    // Demo behavior: show a friendly message in the selected language
    const locale = localStorage.getItem("locale") || "en-US";
    const messages = {
      "en-US": `Welcome back, ${username}!`,
      "pt-BR": `Bem-vindo de volta, ${username}!`,
      "es-ES": `¡Bienvenido de nuevo, ${username}!`
    };
    alert(messages[locale] || messages["en-US"]);
  });
}

// Run init on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

