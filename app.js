let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const searchBar = document.getElementById('search');
const arrowContainer = document.querySelector('.arrows-container');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let openModal;

// 'fetch' data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(data => displayEmployees(data))
    .catch(err => console.log(err));

// function to iterate data from API, create HTML markup and display each on screen
function displayEmployees(employeeData) {
    employees = employeeData;

    // store the employee HTML as it's created below
    let employeeHTML = '';

    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
    

        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}">
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `;
    });

    gridContainer.innerHTML = employeeHTML;
}

// SHOW MODAL 

function displayModal(index) {
    let {name, dob, phone, email, location: {city, street, state, postcode}, 
        picture} = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p class="phone">${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p class="bday">Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

// CARD SELECT TO DISPLAY MODAL

gridContainer.addEventListener('click', (e) => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute("data-index");
        displayModal(index);
        openModal = index;
    }

});

// CLOSE MODAL

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

// SEARCH BAR

searchBar.addEventListener('input', () => {
    let searchInput = searchBar.value.toUpperCase();
    let cards = document.querySelectorAll('.card');
    
    cards.forEach((card) => {
        let nameH2s = card.querySelector('h2');
        let employeeName = nameH2s.innerHTML.toUpperCase();
        
        if (!employeeName.includes(searchInput)) {
            card.classList.add("hidden");
        } else {
            card.classList.remove("hidden");
        }
    });
});

// CHANGE MODALS WITH ARROWS

arrowContainer.addEventListener('click', (e) => {
    if (e.target === leftArrow) {
        if(openModal === 0) {
            openModal = 0;
        } else {
            openModal--;
            displayModal(openModal);
        }
    } else if (e.target === rightArrow) {
        if(openModal === 11) {
            openModal = 11;
        } else {
            openModal++;
            displayModal(openModal);
        }
    }
});
