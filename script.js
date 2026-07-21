// ===============================
// Tag v2.0
// ===============================

// 要素取得
const nickname = document.getElementById("nickname");
const interval = document.getElementById("interval");
const roomCode = document.getElementById("roomCode");

const createBtn = document.getElementById("createRoom");
const joinBtn = document.getElementById("joinRoom");

// -------------------------------
// 前回の設定を読み込み
// -------------------------------
window.onload = () => {

    if (localStorage.getItem("nickname")) {
        nickname.value = localStorage.getItem("nickname");
    }

    if (localStorage.getItem("interval")) {
        interval.value = localStorage.getItem("interval");
    }

};

// -------------------------------
// 保存
// -------------------------------
nickname.addEventListener("input", () => {

    localStorage.setItem("nickname", nickname.value);

});

interval.addEventListener("change", () => {

    localStorage.setItem("interval", interval.value);

});

// -------------------------------
// ランダム6文字ルームコード生成
// -------------------------------
function generateRoomCode(length = 6) {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {

        result += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );

    }

    return result;

}

// -------------------------------
// ルーム作成
// -------------------------------
createBtn.addEventListener("click", () => {

    if (nickname.value.trim() === "") {

        alert("ニックネームを入力してください。");
        return;

    }

    const code = generateRoomCode();

    alert(
        "ルームを作成しました！\n\n" +
        "ルームコード：" + code
    );

    console.log("Create Room:", code);

});

// -------------------------------
// ルーム参加
// -------------------------------
joinBtn.addEventListener("click", () => {

    if (nickname.value.trim() === "") {

        alert("ニックネームを入力してください。");
        return;

    }

    if (roomCode.value.trim().length !== 6) {

        alert("6文字のルームコードを入力してください。");
        return;

    }

    alert(
        "ルームに参加しました！\n\n" +
        roomCode.value.toUpperCase()
    );

    console.log("Join Room:", roomCode.value);

});

// -------------------------------
// GPS取得
// -------------------------------
function getLocation() {

    if (!navigator.geolocation) {

        alert("この端末ではGPSが利用できません。");
        return;

    }

    navigator.geolocation.getCurrentPosition(

        (position) => {

            console.log("緯度:", position.coords.latitude);
            console.log("経度:", position.coords.longitude);

        },

        (error) => {

            alert("位置情報を取得できませんでした。");

            console.log(error);

        }

    );

}

// -------------------------------
// GPS開始
// -------------------------------
function startTracking() {

    getLocation();

    const minutes = Number(interval.value);

    alert(minutes + "分ごとに位置情報を更新します。");

    setInterval(() => {

        getLocation();

    }, minutes * 60 * 1000);

}
