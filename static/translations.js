const EN = {
  'language': 'Language',
  'page.title.comparison': 'Weapon Comparison Tool'
}

const RU = {
  'language': 'Язык',
  'page.title.comparison': 'Инструмент Сравнения Оружия'
}

function translate(text, type = 'string', style = '') {
    let language;
    if (LANG === 'English') {
      language = EN;
    }
    if (LANG === 'Russian') {
      language = RU;
    }
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
      element.style += '; white-space: pre-line';
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