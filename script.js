// تحميل اللعبة داخل الإطار (iframe) وإجباره على التركيز
function loadGame() {
    let iframe = document.getElementById("game-frame");
    iframe.src = "EaglercraftX_1.8_u49_Offline_Signed.html";

    iframe.onload = function () {
        setTimeout(() => {
            iframe.contentWindow.focus();
        }, 500);
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

// إرسال أحداث لوحة المفاتيح إلى `iframe`
function sendKeyEventToGame(event, type) {
    let iframe = document.getElementById("game-frame");
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ action: type, key: event.key, code: event.code }, "*");
    }
}

// الاستماع إلى أحداث لوحة المفاتيح
window.addEventListener("keydown", (event) => sendKeyEventToGame(event, "keydown"));
window.addEventListener("keyup", (event) => sendKeyEventToGame(event, "keyup"));

// التأكد من إعادة التركيز على `iframe` عند الضغط على أي مكان في الصفحة
document.addEventListener("click", function () {
    let iframe = document.getElementById("game-frame");
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.focus();
    }
});

// إعادة التركيز على `iframe` عند تحريك الماوس داخل منطقة اللعبة
document.getElementById("game-container").addEventListener("mouseenter", function () {
    let iframe = document.getElementById("game-frame");
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.focus();
    }
});
