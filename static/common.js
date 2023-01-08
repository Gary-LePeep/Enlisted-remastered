const BODY = document.getElementsByTagName('BODY')[0];
const FULLWIDE = 1880;

function recalibrateSize() {
    BODY.style.transform = `scale(${window.innerWidth / 1920},${window.innerWidth / 1920})`;
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

function getLanguage() {
    let language = getCookie('language');
    console.log(language);
    return language === '' ? 'English' : language;
}

function translate(text) {

}

// Colors
const colorBG = '#27373D';
const colorTitle = '#1F2C32';
const colorTitleLight = '#29363C';
const colorTitleSelect = '#010E14';
const colorTitleSelectLight = '#0B181E';

// TITLE BAR
const titleBar = document.createElement('div');
titleBar.style = `position: absolute; top: 0px; left: 0px; width: 1920px; height: 65px; background-color:${colorTitle}; box-shadow: 0px 0px 10px;`;
BODY.append(titleBar);

const logo = document.createElement('img');
logo.src = '../static/img/logo.png';
logo.style = 'position: absolute; top: 0px; left: 0px; width: 116px; height: 65px; object-fit: contain;';
BODY.append(logo);

const title = document.createElement('b');
title.innerHTML = 'Weapon Comparison Tool';
title.style = 'position: absolute; top:0px; left:115px; font-family: Trebuchet MS; width:1000px; font-size:50px; color: white';
BODY.appendChild(title);

// Language dropdown
const langButton = document.createElement('button');
langButton.style = `position: relative; top: 0px; left: 1770px; width: 150px; height: 65px; font-size:23px; font-family: Trebuchet MS; background-color:${colorTitle}; color: white; border-color:${colorTitleLight}`
getLanguage();
langButton.innerHTML = '🌐 Language';
titleBar.append(langButton);

const langPanel = document.createElement('div');
langPanel.style = 'position: relative; top: 0px; left: 0px; width: 150px; font-size:24px; font-family: Trebuchet MS; display: none;';
langButton.addEventListener("click", function () {
    if (langPanel.style.display === 'block'){
        langPanel.style.display = langPanel.style.display = 'none';
        langButton.style.backgroundColor = colorTitle;
    } else {
        langPanel.style.display = langPanel.style.display = 'block';
        langButton.style.backgroundColor = colorTitleSelect;
    }
});
titleBar.append(langPanel);

// Add languages
const EnButton = document.createElement('button');
EnButton.style = `position: relative; top:0px; left:1770px; width:150px; height:50px; font-size:24px; font-family: Trebuchet MS; color: white; background-color:${getLanguage() === 'English' ? colorTitleSelect : colorTitle}; border-color:${getLanguage() === 'English' ? colorTitleSelectLight : colorTitleLight}; text-align:left;`;
EnButton.innerHTML = ' 🇺🇸 English';
EnButton.addEventListener("click", function () {
    if (getLanguage() !== 'English') {
        setCookie('language', 'English');
        window.location.reload();
    }
});
langPanel.append(EnButton);

const RuButton = document.createElement('button');
RuButton.style = `position: relative; top:0px; left:1770px; width:150px; height:50px; font-size:24px; font-family: Trebuchet MS; color: white; background-color:${getLanguage() === 'Russian' ? colorTitleSelect : colorTitle}; border-color:${getLanguage() === 'Russian' ? colorTitleSelectLight : colorTitleLight}; text-align:left;`;
RuButton.innerHTML = ' 🇷🇺 Русский';
RuButton.addEventListener("click", function () {
    if (getLanguage() !== 'Russian') {
        setCookie('language', 'Russian');
        window.location.reload();
    }
});
langPanel.append(RuButton);
