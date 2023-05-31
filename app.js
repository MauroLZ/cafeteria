// Firebase

import {child, remove, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAEqnjBr4A2BMmtUt9nKG_DKebc5UEBbr0",
    authDomain: "cafeteria-50342.firebaseapp.com",
    databaseURL: "https://coffee4182.firebaseio.com/",
    projectId: "cafeteria-50342",
    storageBucket: "cafeteria-50342.appspot.com",
    messagingSenderId: "275046546605",
    appId: "1:275046546605:web:bc8fd51a1815386ec99a24"
};

// Importing functions from database library
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";


// creating const App that holds the firebaseConfig
const app = initializeApp(firebaseConfig);

const db = getDatabase();

let enterID = document.querySelector("#enterID");
let enterName = document.querySelector("#enterName");
let enterPrice = document.querySelector("#enterPrice");
let findCoffeeName = document.querySelector("#findCoffeeName");
let findCoffeeID = document.querySelector("#findCoffeeID");
let coffeeName = document.querySelector("#coffeeName");
let findAge = document.querySelector("#findAge");

let insertBtn = document.querySelector("#insert");
let updateBtn = document.querySelector("#update");
let removeBtn = document.querySelector("#remove");
let findBtn = document.querySelector("#find");



// Get the user data from the registration form
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

// Create a new user object with the user data
const newUser = {
    name: name,
    email: email,
    password: password
};

console.log(newUser);

// Add the new user to the database
ref.push(newUser)
    .then(() => {
        console.log('New user added to database');
    })
    .catch((error) => {
        console.error('Error adding new user to database:', error);
    });

//Coffee variables
function InsertData() {
    set(ref(db, "Coffees/" + enterName.value), {
        ID: enterID.value,
        Price: enterPrice.value
    })
        .then(() => {
            alert("Data added successfully");
            enterName.value = '';
            enterPrice.value = '';
            enterID.value = '';
            findCoffeeName.value = '';
        })
        .catch((error) => {
            alert(error);
        });
}

function FindData() {
    const dbref = ref(db);

    get(child(dbref, "Coffees/" + findCoffeeName.value))
        .then((snapshot) => {
            if (snapshot.exists()) {
                coffeeName.innerHTML = "Name: " + findCoffeeName.value;
                findCoffeeID.innerHTML = "ID: " + snapshot.val().ID;
                findAge.innerHTML = "Price: " + snapshot.val().Price;
                enterName.value = '';
                enterPrice.value = '';
                enterID.value = '';
                findCoffeeName.value = '';
            } else {
                alert("No data found");
            }
        })
        .catch((error) => {
            alert(error)
        })
}

function UpdateData() {
    update(ref(db, "Coffees/" + enterName.value), {
        ID: enterID.value,
        Price: enterPrice.value
    })
        .then(() => {
            alert("Data updated successfully");
            enterName.value = '';
            enterPrice.value = '';
            enterID.value = '';
            findCoffeeName.value = '';
        })
        .catch((error) => {
            alert(error);
        });
}

function RemoveData() {
    remove(ref(db, "Coffees/" + enterName.value))
        .then(() => {
            alert("Data deleted successfully");
            enterName.value = '';
            enterPrice.value = '';
            enterID.value = '';
            findCoffeeName.value = '';
        })
        .catch((error) => {
            alert(error);
        });
}

insertBtn.addEventListener('click', InsertData);
updateBtn.addEventListener('click', UpdateData);
removeBtn.addEventListener('click', RemoveData);
findBtn.addEventListener('click', FindData);











/*// Login design
let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});*/
