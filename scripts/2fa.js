
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC912hWJA30SGuCr5fifVL_rcQX6W2t2Y4",
    authDomain: "blueberry-f13f4.firebaseapp.com",
    projectId: "blueberry-f13f4",
    storageBucket: "blueberry-f13f4.appspot.com",
    messagingSenderId: "419066870873",
    appId: "1:419066870873:web:936456ae01c5a050340548"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
recaptchaVerifier.render();

const phoneForm = document.getElementById('phoneForm');
const codeForm = document.getElementById('codeForm');
const phoneInputSection = document.getElementById('phoneInputSection');
const codeInputSection = document.getElementById('codeInputSection');

let confirmationResult;

phoneForm.addEventListener('submit', async function (e) {
    //todo: nao consegui testar o metodo de envio aqui, erro type=module dps q importei auth, c node isso se resolvia mas n sei com javascript puro
    //fix: import declarations may only appear at top level of a module
    e.preventDefault();
    const phoneNumber = document.getElementById('phone').value;

    try {
        confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        phoneInputSection.classList.add('hidden');
        codeInputSection.classList.remove('hidden');
        alert('Código de verificação enviado!');
    } catch (error) {
        console.error('Erro ao enviar código:', error);
        alert('Falha ao enviar o código. Tente novamente.');
    }
});

codeForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const code = document.getElementById('code').value;

    try {
        const result = await confirmationResult.confirm(code);
        alert('Código verificado com sucesso!');
        console.log('Usuário autenticado:', result.user);
    } catch (error) {
        console.error('Erro ao verificar código:', error);
        alert('Código incorreto. Tente novamente.');
    }
});
  
