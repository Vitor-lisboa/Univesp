// Variáveis
let theme = "light";

// INICIALIZA
console.log("JS carregado");

// ONBOARDING
function startOnboarding() {
  document.getElementById("onboarding").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
}

// LOGIN
function login() {
  const name = document.getElementById("username").value;

  if(name !== ""){
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
  } else {
    alert("Digite seu nome");
  }
}

// LOGOUT
function logout(){
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
}

// TEMA
function toggleTheme(){
  document.body.classList.toggle("dark");
}
