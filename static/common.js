const BODY = document.getElementsByTagName('BODY')[0];
const FULLWIDE = 1880;

function recalibrateSize() {
    BODY.style.transform = `scale(${window.innerWidth / 1920},${window.innerWidth / 1920})`;
    BODY.style.transformOrigin = '0 0';
}

recalibrateSize();
window.addEventListener('resize', recalibrateSize);

const urlParamString = window.location.href.split("?").length > 1 ? window.location.href.split("?")[1] : '';
let urlParams = urlParamString === '' ? [] : urlParamString.split("&");

// add top color bar
const feldgrau = document.createElement('div');
feldgrau.style = 'position: absolute; top: 0px; left: 0px; width: 1880px; height: 54px; background-color:rgb(57, 83, 83)';
BODY.append(feldgrau);

// Actual title
const title = document.createElement('b');
title.textContent = 'Enlisted Weapon Comparison Tool';
title.className = 'TITLE';
title.style = 'position: absolute; top:-3px; left:20px; font-family: Trebuchet MS; width:1840px; font-size:50px; text-align:center; color: white';
BODY.appendChild(title);

(function initCSS() {
    // Create new css link Element
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.href = '../static/style.css';
    document.getElementsByTagName('HEAD')[0].appendChild(css);
})();

