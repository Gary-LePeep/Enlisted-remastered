const EN = {
  'language': 'Language',
  'page.button.comparison': 'Weapon Tool',
  'page.title.comparison': 'Weapon Comparison Tool',
  'page.button.datamine': 'Datamine',
  'page.title.datamine': 'Enlisted Datamine',
  'page.button.soldierStats': 'Soldier Stats',
  'page.title.soldierStats': 'Soldier Statistics',
  'page.button.tanks': 'Tank Tool',
  'page.title.tanks': 'Tank Comparison Tool'
}

const RU = {
  'language': 'Язык',
  'page.button.comparison': 'Оружейный',
  'page.title.comparison': 'Инструмент Сравнения Оружия',
  'page.button.datamine': 'Датамайн',
  'page.title.datamine': 'Enlisted Датамайн',
  'page.button.soldierStats': 'Харак. Солдат',
  'page.title.soldierStats': 'Характеристики Солдат',
  'page.button.tanks': 'Танковый',
  'page.title.tanks': 'Инструмент Сравнения Танков'
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