// script.js

const firebaseConfig = {
    apiKey: "AIzaSyC912hWJA30SGuCr5fifVL_rcQX6W2t2Y4",
    authDomain: "blueberry-f13f4.firebaseapp.com",
    projectId: "blueberry-f13f4",
    storageBucket: "blueberry-f13f4.appspot.com",
    messagingSenderId: "419066870873",
    appId: "1:419066870873:web:936456ae01c5a050340548"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
let confirmationResult;

function signInWithPhone() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptchaContainer', {
        size: 'invisible',
        callback: (response) => {
            // reCAPTCHA solved, allow sign-in with phone number.
        },
        'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
        }
    });

    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((result) => {
            confirmationResult = result;
            console.log("Código de verificação enviado para o número do celular");
            document.getElementById('verificationContainer').style.display = 'block'; // Show the verification input
        })
        .catch((error) => {
            console.error('Erro ao enviar o código de verificação inicial:', error);
            // Handle error sending initial phone verification code (e.g., display error message)
        });
}

function verifyCode() {
    const code = document.getElementById('verificationCode').value;

    confirmationResult.confirm(code)
        .then((result) => {
            // User signed in successfully
            const user = result.user;
            console.log(user);
            // You can now redirect the user or take other actions
        })
        .catch((error) => {
            console.error('Erro ao verificar o código:', error);
            // Handle error verifying code (e.g., display error message)
        });
}
