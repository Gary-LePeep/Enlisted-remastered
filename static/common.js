function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

let FULLWIDE = 1920;
const BODY = document.getElementsByTagName('BODY')[0];

function recalibrateSize() {
    BODY.style.transform = `scale(${window.innerWidth / FULLWIDE},${window.innerWidth / FULLWIDE})`;
    BODY.style.transformOrigin = '0 0';
}

recalibrateSize();
window.addEventListener('resize', recalibrateSize);

function getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function setCookie(cname, cvalue, expiresDays = -1) {
    document.cookie = `${cname}=${cvalue};secure;path=/;domain=enlisted.vercel.app`;
    if (expiresDays !== -1) {
        const d = new Date();
        d.setTime(d.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
        const expires = `;expires=${d.toUTCString()}`;
        document.cookie += expires;
    }
}

(function initCSS() {
    // Create new css link Element
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.href = '../static/style.css';
    document.getElementsByTagName('HEAD')[0].appendChild(css);
})();

function toPlace(number, place) {
    const ret = Math.round(number * (10 ** place));
    return (ret / (10 ** place));
}

let LANG = getCookie('language') === '' ? 'English' : getCookie('language');

function readJSON(stringName) {
    return JSON.parse(stringName.replace(/&#39;/g, '"').replace(/&#34;/g, '"').replace(/~/g, "'").replace(/None/g, 'null').replace(/False/g, false).replace(/True/g, true).replace(/Ã—/g, '×').replace(/ÄŒ/g, 'Č').replace(/Ã¶/g, 'ö').replace(/Ã¤/g, 'ä').replace(/&amp;/g, '&'));
}

function translate(text, type = 'string', style = '') {
    let language = readJSON(LANGUAGE);
    if (type === 'string') {
        let ret = language[text];
        if (ret == null) {
            ret = text;
        }
        return ret;
    }

    const element = document.createElement(type);
    element.style = style;

    if (Array.isArray(language[text])) {
        element.textContent = language[text].join('\r\n');
        element.text = language[text].join('\r\n');
        element.style = `${style}; white-space: pre-line`;
    } else {
        let ret = language[text];
        if (ret == null) {
            ret = text;
        }
        element.textContent = ret;
        element.text = ret;
    }
    return element;
}

// Colors
const colorBG = '#27373D';
const colorTitle = '#1F2C32';
const colorTitleLight = '#29363C';
const colorTitleSelect = '#010E14';
const colorTitleSelectLight = '#0B181E';

// TITLE BAR
const titleBar = document.createElement('div');
titleBar.style = `position: absolute; top: 0px; left: 0px; width: ${FULLWIDE}px; height: 65px; background-color:${colorTitle}; box-shadow: 0px 0px 10px;`;
BODY.append(titleBar);

const logo = document.createElement('img');
logo.src = '../static/img/logo.png';
logo.style = 'position: absolute; top: 0px; left: 0px; width: 116px; height: 65px; object-fit: contain;';
BODY.append(logo);

// Language dropdown
const langButton = document.createElement('button');
langButton.style = `position: relative; top: 0px; left: 1770px; width: 150px; height: 65px; font-size:23px; font-family: Trebuchet MS; background-color:${colorTitle}; color: white; border-color:${colorTitleLight}`
langButton.innerHTML = `🌐 ${translate('language')}`;
titleBar.append(langButton);

const langPanel = document.createElement('div');
langPanel.style = 'position: relative; top: 0px; left: 0px; width: 150px; font-size:24px; font-family: Trebuchet MS; display: none;';
langButton.addEventListener("click", function () {
    if (langPanel.style.display === 'block') {
        langPanel.style.display = langPanel.style.display = 'none';
        langButton.style.backgroundColor = colorTitle;
        langButton.style.borderColor = colorTitleLight;
    } else {
        langPanel.style.display = langPanel.style.display = 'block';
        langButton.style.backgroundColor = colorTitleSelect;
        langButton.style.borderColor = colorTitleSelectLight;
    }
});
titleBar.append(langPanel);

// Add languages
const EnButton = document.createElement('button');
EnButton.style = `position: relative; top:0px; left:1770px; width:150px; height:50px; font-size:24px; font-family: Trebuchet MS; color: white; background-color:${LANG === 'English' ? colorTitleSelect : colorTitle}; border-color:${LANG === 'English' ? colorTitleSelectLight : colorTitleLight}; text-align:left;`;
EnButton.innerHTML = '      English';
EnButton.addEventListener("click", function () {
    if (LANG !== 'English') {
        setCookie('language', 'English');
        window.location.reload();
    }
});
const EnFlag = document.createElement('img');
EnFlag.src = '../static/translations/English.png';
EnFlag.style = 'position: absolute; top: 8px; left: 8px;';
EnButton.append(EnFlag);
langPanel.append(EnButton);

const RuButton = document.createElement('button');
RuButton.style = `position: relative; top:0px; left:1770px; width:150px; height:50px; font-size:24px; font-family: Trebuchet MS; color: white; background-color:${LANG === 'Russian' ? colorTitleSelect : colorTitle}; border-color:${LANG === 'Russian' ? colorTitleSelectLight : colorTitleLight}; text-align:left;`;
RuButton.innerHTML = '      Русский';
RuButton.addEventListener("click", function () {
    if (LANG !== 'Russian') {
        setCookie('language', 'Russian');
        window.location.reload();
    }
});
const RuFlag = document.createElement('img');
RuFlag.src = '../static/translations/Russian.png';
RuFlag.style = 'position: absolute; top: 8px; left: 8px;';
RuButton.append(RuFlag);
langPanel.append(RuButton);

// add the title bar's navigation buttons, highlighting the active one
let i = 0;
function createButton(active, where) {
    const button = document.createElement('button');
    button.innerHTML = translate(`page.${where}.button`);
    button.style = `position: absolute; top: 0px; left: ${1168 + (i * 150)}px; width: 150px; height: 65px; font-size:20px; font-family: Trebuchet MS; background-color:${colorTitle}; color: white; border-color:${colorTitleLight}`
    if (active === where) {
        button.style.backgroundColor = colorTitleSelect;
        button.style.borderColor = colorTitleSelectLight;
    }
    button.onclick = () => { window.location = `https://enlisted.vercel.app/${where}`; };
    BODY.appendChild(button);
    i++;
}

function addButtons(active) {
    createButton(active, 'comparison');
    createButton(active, 'datamine');
    createButton(active, 'soldierStats');
    createButton(active, 'tanks');
}
