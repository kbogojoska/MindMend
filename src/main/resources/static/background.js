let popupWindowId = null;

function openPopup() {
    if (!popupWindowId) {
        setTimeout(function () {
            createPopup();
        }, 700);
    }
}


function createPopup() {
    chrome.system.display.getInfo(function (displayInfo) {
        let screen = displayInfo[0].workArea;
        chrome.windows.create({
            url: 'src/main/resources/templates/sleep-reminder.html',
            type: 'popup',
            top: screen.height - 200,
            left: screen.width - 365,
            height: 150,
            width: 350
        }, function (window) {
            popupWindowId = window.id;
            setTimeout(function () {
                closePopup();
            }, 15000);
        });
    })
}

function closePopup() {
    if (popupWindowId) {
        chrome.windows.remove(popupWindowId);
        popupWindowId = null;
    }
}

function startPopupTimer() {
    chrome.windows.onCreated.addListener(function (window) {
        if (window.type === "popup" && window.id !== popupWindowId) {
            chrome.windows.remove(window.id);
        }
    });
    openPopup();
}

startPopupTimer();