import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";

import { firebaseConfig } from "../config/config.js";

const app = initializeApp(firebaseConfig);

import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js'

document.querySelector('.btnSubscribe').addEventListener('click', async (e) => {

    let txtName = document.getElementById('txtName').value;
    let txtEmail = document.getElementById('txtEmail').value;
    let txtLevel = document.getElementById('txtLevel').value;
    let txtCharacter = document.getElementById('txtCharacter').value;
    let txtLatitude = document.getElementById('txtLatitude').value;
    let txtLongitude = document.getElementById('txtLongitude').value;

    let subscription = {
        name: txtName,
        email: txtEmail,
        level: txtLevel,
        character: txtCharacter,
        latitude: txtLatitude,
        longitude: txtLongitude
    }
    if (subscription.name === "" || subscription.email === "" || subscription.level === "" || subscription.character === "") {
        // Aviso de erro que precisa preencher todos os campos
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showClass: {
                popup: 'swal2-show',
                backdrop: 'swal2-backdrop-show',
                icon: 'swal2-icon-show'
            },
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'error',
            title: 'Preencha  todos os campos'
        })
        e.preventDefault();
    } else {
        // Gravação no banco de dados
        const db = getFirestore(app);
        const hellfireClubCollection = collection(db, 'hellfire-clube');
        await addDoc(hellfireClubCollection, subscription);
        // alerta de cadastro bem sucedido
        Swal.fire({
            title: 'Ha Ha Ha!',
            text: 'Bem vindo ao clube DUNGEONS & DRAGONS!',
            icon: 'success',
            template: '#template'
        })
        // Limpa os dados do input
        txtName = document.getElementById('txtName').value = "";
        txtEmail = document.getElementById('txtEmail').value = "";
        txtLevel = document.getElementById('txtLevel').value = "";
        txtCharacter = document.getElementById('txtCharacter').value = "";
    }
    // alerta de erro quando sem internet
    setTimeout(() => {
        if (!window.navigator.onLine) {
            Swal.fire({
                title: 'Sem Internet ',
                text: 'Verifique sua conexão',
                icon: 'error'
            })
        }
    }, 100)
})

// Pegar localização
function getLocation() {
    navigator.geolocation.watchPosition(sucesso);
}
function sucesso(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const time = position.timestamp;
    document.getElementById('txtLatitude').value = latitude;
    document.getElementById('txtLongitude').value = longitude;
}
getLocation();