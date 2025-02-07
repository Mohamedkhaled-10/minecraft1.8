// تحميل اللعبة داخل الإطار (iframe) وإجباره على التركيز
function loadGame() {
    let iframe = document.getElementById("game-frame");
    iframe.src = "EaglercraftX_1.8_u49_Offline_Signed.html";
    
    iframe.onload = function () {
        iframe.contentWindow.focus();
    };
}

// وظيفة ملء الشاشة
function toggleFullScreen() {
    let gameContainer = document.getElementById("game-container");

    if (!document.fullscreenElement) {
        if (gameContainer.requestFullscreen) {
            gameContainer.requestFullscreen();
        } else if (gameContainer.mozRequestFullScreen) { // Firefox
            gameContainer.mozRequestFullScreen();
        } else if (gameContainer.webkitRequestFullscreen) { // Chrome, Safari & Opera
            gameContainer.webkitRequestFullscreen();
        } else if (gameContainer.msRequestFullscreen) { // IE/Edge
            gameContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// إعادة توجيه أحداث لوحة المفاتيح إلى اللعبة داخل iframe
window.addEventListener("keydown", function (event) {
    let iframe = document.getElementById("game-frame");
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({ action: "keydown", key: event.key, code: event.code }, "*");
    }
});

window.addEventListener("keyup", function (event) {
    let iframe = document.getElementById("game-frame");
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({ action: "keyup", key: event.key, code: event.code }, "*");
    }
});

// إعادة التركيز على iframe إذا فقده
document.addEventListener("click", function () {
    let iframe = document.getElementById("game-frame");
    if (iframe.contentWindow) {
        iframe.contentWindow.focus();
    }
});
