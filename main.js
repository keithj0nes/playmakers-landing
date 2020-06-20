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
function createCheckbox(details) {
    return `
    <label class="checkbox-container">${details.name.charAt(0).toUpperCase()}${details.name.slice(1)}
        <input type="checkbox" id="other" onClick="addSport('${details.name}')">
        <span class="checkmark"></span>
    </label>
    `
}

function addSport(id) {
    const ind = selectedSports.indexOf(id); 
    ind >= 0 ? selectedSports.splice(ind, 1) : selectedSports.push(id)
    console.log(selectedSports)
}

CHECKBOX_DATA.forEach(data => {
    let m = createCheckbox(data);
    checkboxField.insertAdjacentHTML('beforeend', m);
})

function handleSubmit(e) {
    e.preventDefault();

    form.style.opacity = 0.5;
    return new Promise(r => {
        setTimeout(() => {
            return r(handleSubmitSuccess());
        }, 2000);
    })
}



function handleSubmitSuccess() {
    form.style.display = 'none';
    formSuccess.style.display = 'block';
}