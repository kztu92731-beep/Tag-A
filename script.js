// =====================================
// Tag v3.0
// script.js
// =====================================

import {
    createRoom,
    joinRoom,
    updateLocation
} from "./firebase.js";

// -----------------------------
// 要素取得
// -----------------------------

const nickname = document.getElementById("nickname");
const interval = document.getElementById("interval");
const roomCode = document.getElementById("roomCode");

const createBtn = document.getElementById("createRoom");
const joinBtn = document.getElementById("joinRoom");
const gpsBtn = document.getElementById("startGPS");

const status = document.getElementById("status");

// -----------------------------
// 前回データ読込
// -----------------------------

nickname.value = localStorage.getItem("nickname") || "";
interval.value = localStorage.getItem("interval") || "60";

// -----------------------------
// 保存
// -----------------------------

nickname.addEventListener("input", () => {

    localStorage.setItem("nickname", nickname.value);

});

interval.addEventListener("change", () => {

    localStorage.setItem("interval", interval.value);

});

// -----------------------------
// ルーム作成
// -----------------------------

createBtn.onclick = async () => {

    if(nickname.value.trim() === ""){

        alert("ニックネームを入力してください");

        return;

    }

    const code = await createRoom(

        nickname.value,
        Number(interval.value)

    );

    roomCode.value = code;

    status.textContent =
        "ルームを作成しました！\nコード：" + code;

};

// -----------------------------
// ルーム参加
// -----------------------------

joinBtn.onclick = async () => {

    if(nickname.value.trim() === ""){

        alert("ニックネームを入力してください");

        return;

    }

    if(roomCode.value.length !== 6){

        alert("ルームコードは6文字です");

        return;

    }

    await joinRoom(

        roomCode.value.toUpperCase(),
        nickname.value

    );

    status.textContent =
        "ルームへ参加しました";

};

// -----------------------------
// GPS開始
// -----------------------------

gpsBtn.onclick = () => {

    if(!navigator.geolocation){

        alert("GPS非対応端末です");

        return;

    }

    status.textContent =
        "GPS取得中...";

    navigator.geolocation.watchPosition(

        async(position)=>{

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            status.textContent =
                "位置情報更新中";

            await updateLocation(

                roomCode.value.toUpperCase(),

                nickname.value,

                lat,

                lng

            );

        },

        ()=>{

            alert("位置情報を取得できません");

        },

        {

            enableHighAccuracy:true

        }

    );

};
