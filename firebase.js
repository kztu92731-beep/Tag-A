// =====================================
// Tag v3.0
// firebase.js
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {

getFirestore,

doc,

setDoc,

updateDoc,

getDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// -------------------------------------
// Firebase設定
// -------------------------------------

const firebaseConfig = {

apiKey: "AIzaSyBSmb0XG-z-O29p3lkHlRwuCg-m_VZJQGQ",

authDomain: "tag-a-819aa.firebaseapp.com",

projectId: "tag-a-819aa",

storageBucket: "tag-a-819aa.firebasestorage.app",

messagingSenderId: "511427848943",

appId: "1:511427848943:web:cc7edd1ed291f587de491a"

};

// -------------------------------------

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// -------------------------------------
// ランダム6文字
// -------------------------------------

function generateCode(){

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let code = "";

for(let i=0;i<6;i++){

code += chars[
Math.floor(Math.random()*chars.length)
];

}

return code;

}

// -------------------------------------
// ルーム作成
// -------------------------------------

export async function createRoom(

host,

interval

){

const code = generateCode();

await setDoc(

doc(db,"rooms",code),

{

host,

interval,

status:"waiting",

createdAt:serverTimestamp()

}

);

return code;

}

// -------------------------------------
// ルーム参加
// -------------------------------------

export async function joinRoom(

room,

nickname

){

await setDoc(

doc(

db,

"rooms",

room,

"players",

nickname

),

{

nickname,

joinedAt:serverTimestamp()

}

);

}

// -------------------------------------
// GPS更新
// -------------------------------------

export async function updateLocation(

room,

nickname,

lat,

lng

){

await updateDoc(

doc(

db,

"rooms",

room,

"players",

nickname

),

{

lat,

lng,

updatedAt:serverTimestamp()

}

);

}
