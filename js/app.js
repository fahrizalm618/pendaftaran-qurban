import { db } from "/js/firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("formPeserta");

const nama = document.getElementById("nama");
const phone = document.getElementById("phone");
const jenis = document.getElementById("jenis");
const jumlahHewan = document.getElementById("jumlahHewan");

const listPeserta =
document.getElementById("listPeserta");

let editId = null;

loadData();

form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const data = {
            nama: nama.value,
            phone: phone.value,
            jenis: jenis.value,
            jumlahHewan: Number(jumlahHewan.value),
            tanggalDaftar: new Date().toISOString()
        };

        if(editId){

            await updateDoc(
                doc(
                    db,
                    "peserta_qurban",
                    editId
                ),
                data
            );

            editId = null;

        }else{

            await addDoc(
                collection(
                    db,
                    "peserta_qurban"
                ),
                data
            );

        }

        form.reset();

        loadData();

    }
);

async function loadData(){

    listPeserta.innerHTML = "";

    const snapshot =
    await getDocs(
        collection(
            db,
            "peserta_qurban"
        )
    );

    snapshot.forEach((d)=>{

        const data = d.data();

        const card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${data.nama}</h3>

            <p>
                📞 ${data.phone}
            </p>

            <p>
                🐄 Jenis Hewan :
                ${data.jenis}
            </p>

            <p>
                📦 Jumlah Hewan :
                ${data.jumlahHewan}
            </p>

            <div class="actions">

                <button
                    class="editBtn"
                    data-id="${d.id}"
                    data-nama="${data.nama}"
                    data-phone="${data.phone}"
                    data-jenis="${data.jenis}"
                    data-jumlah="${data.jumlahHewan}">
                    Edit
                </button>

                <button
                    class="hapusBtn"
                    data-id="${d.id}">
                    Hapus
                </button>

            </div>
        `;

        listPeserta.appendChild(card);

    });

    pasangEvent();
}

function pasangEvent(){

    document
    .querySelectorAll(".hapusBtn")
    .forEach((btn)=>{

        btn.onclick = async()=>{

            const id =
            btn.dataset.id;

            await deleteDoc(
                doc(
                    db,
                    "peserta_qurban",
                    id
                )
            );

            loadData();

        };

    });

    document
    .querySelectorAll(".editBtn")
    .forEach((btn)=>{

        btn.onclick = ()=>{

            editId =
            btn.dataset.id;

            nama.value =
            btn.dataset.nama;

            phone.value =
            btn.dataset.phone;

            jenis.value =
            btn.dataset.jenis;

            jumlahHewan.value =
            btn.dataset.jumlah;

        };

    });

}