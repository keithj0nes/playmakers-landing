// https://firebase.google.com/docs/web/setup#available-libraries -->

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCFIHw1f_WZWGNCF24KFDhfcUnsfIJAdWs",
    authDomain: "rn-auth-15547.firebaseapp.com",
    databaseURL: "https://rn-auth-15547.firebaseio.com",
    projectId: "rn-auth-15547",
    storageBucket: "rn-auth-15547.appspot.com",
    messagingSenderId: "489908155127",
    appId: "1:489908155127:web:8b347c640c7a7ae4cad9f2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();


const CHECKBOX_DATA = [
    { name: 'hockey' },
    { name: 'baseball' },
    { name: 'basketball' },
    { name: 'lacrosse' },
    { name: 'soccer' },
    { name: 'kickball' },
    { name: 'other' },
]

let selectedSports = [];

const checkboxField = document.querySelector('.checkbox-field');
const form = document.querySelector('form');
const formSuccess = document.querySelector('.form-success');
const email = document.getElementById('email');
const invalidEmail = document.querySelector('.invalid-email');
function createCheckbox(details) {
    return `
    <label class="checkbox-container">${details.name.charAt(0).toUpperCase()}${details.name.slice(1)}
        <input type="checkbox" onClick="addSport('${details.name}')">
        <span class="checkmark"></span>
    </label>
    `
}

function addSport(id) {
    const ind = selectedSports.indexOf(id); 
    ind >= 0 ? selectedSports.splice(ind, 1) : selectedSports.push(id)
}

CHECKBOX_DATA.forEach(data => {
    let m = createCheckbox(data);
    checkboxField.insertAdjacentHTML('beforeend', m);
})


function handleSubmit(e) {
    e.preventDefault();

    // check email validation
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(email.value)) {
        // add alert that it's bad bad
        return invalidEmail.classList.add('show');
    }

    form.style.opacity = 0.5;
    form.style.pointerEvents = 'none';
    
    // send to firebase
    storeToFB().then(rs => {
        
        // alert user success - wait 1.5 seconds
        return new Promise(r => {
            setTimeout(() => {
                return r(handleSubmitSuccess());
            }, 2000);
        })
    })
}


function handleSubmitSuccess() {
    form.classList.add('hide');
    formSuccess.style.display = 'block';
}

function storeToFB() {
    return firebase.database().ref('/').push().set({
        date_submitted: Date(),
        email: email.value,
        sports : selectedSports
    }).then(() => {
        return true
    })
}