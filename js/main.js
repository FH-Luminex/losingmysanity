
// Ensure decimal.js is loaded first
if (!window.Decimal) {
    var script = document.createElement('script');
    script.src = 'js/lib/decimal.js';
    script.onload = function() {
        console.log('[main.js] decimal.js loaded manually.');
    };
    document.head.appendChild(script);
    // Optionally, you could block further execution until loaded, but for now just log
} else {
    console.log('[main.js] decimal.js already loaded.');
}

let elms = {}

// Emergency hard reset on Down Arrow key (loads before anything else, no confirmation)
window.addEventListener("keydown", function(e) {
    if (e.key === "ArrowDown") {
        localStorage.clear();
        location.reload();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    initCloud();
    loadGame();
    initUI();
    updatePrefs();
    updateEffects();
    updateUnlocks();
    updateMusic();
    handleOfflineProgress();
    setTab("collection");
    animTime = time = performance.now();
    requestAnimationFrame(loop);
    requestAnimationFrame(animLoop);
    setTimeout(() => checkCloudSave(), 1000);
    
    $("#loading").remove();
    awardShow(1);

});

let time = 0;
let delta = 0;

function loop() {
    delta = performance.now() - time;
    time += delta;
    game.time.now = Date.now();

    onFrame();
    updateNotifs();

    if (game.option.updateRate) setTimeout(loop, 1000 / game.option.updateRate);
    else requestAnimationFrame(loop);
}

let animTime = 0;
let animDelta = 0;

function animLoop() {
    animDelta = performance.now() - animTime;
    animTime += animDelta;
    emit("anim-frame");
    requestAnimationFrame(animLoop);
}
