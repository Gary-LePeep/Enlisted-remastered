const EN = {
  'class.Default': 'Default',
  'class.Rifleman': 'Rifleman',
  'class.Medic': 'Medic',
  'class.Assaulter': 'Assaulter',
  'class.Engineer': 'Engineer',
  'class.Sniper': 'Sniper',
  'class.ATGunner': 'AT Gunner',
  'class.Machinegunner': 'Machine Gunner',
  'class.Radio': 'Radio Operator',
  'class.Mortarman': 'Mortarman',
  'class.Flametrooper': 'Flametrooper',
  'class.FighterPilot': 'Fighter Pilot',
  'class.AttackerPilot': 'Attacker Pilot',
  'class.Tanker': 'Tanker',
  'class.Rider': 'Rider',
  'class.rank': 'Rank',
  'EMPTY': '',
  'language': 'Language',
  'page.comparison.button': 'Weapon Tool',
  'page.comparison.title': 'Weapon Comparison Tool',
  'page.datamine.button': 'Datamine',
  'page.datamine.title': 'Enlisted Datamine',
  'page.soldierStats.button': 'Soldier Stats',
  'page.soldierStats.footer': [
    'Numbers in parentheses mean the net return in bronze orders if soldier is first upgraded to 5 stars, then sold',
    "Values for stars of a silver order's result are experimental and may not be completely accurate",
  ],
  'page.soldierStats.header': [
    'This page contains the data of the optimal rolls for soldiers based on class and rank.',
    'Actual soldiers may have between 0 and 2 points less in each category by random chance.',
  ],
  'page.soldierStats.table.bronzeSale': 'Bronze orders per sale',
  'page.soldierStats.table.defaultPerk': 'Default Perks',
  'page.soldierStats.table.silverBuy': 'Chance per silver order',
  'page.soldierStats.table.silverWeap': 'Chance per silver order',
  'page.soldierStats.title': 'Soldier Statistics',
  'page.tanks.button': 'Tank Tool',
  'page.tanks.title': 'Tank Comparison Tool'
}

const RU = {
  'class.Default': 'Стандартный',
  'class.Rifleman': 'Боец',
  'class.Medic': 'Медик',
  'class.Assaulter': 'Штурмовик',
  'class.Engineer': 'Инженер',
  'class.Sniper': 'Снайпер',
  'class.ATGunner': 'Бронебойщик',
  'class.Machinegunner': 'Пулемётчик',
  'class.Radio': 'Радист',
  'class.Mortarman': 'Миномётчик',
  'class.Flametrooper': 'Огнемётчик',
  'class.FighterPilot': 'Пилот-истребитель',
  'class.AttackerPilot': 'Пилот-штурмовик',
  'class.Tanker': 'Танкист',
  'class.Rider': 'Мотоциклист',
  'class.rank': 'Звание',
  'EMPTY': '',
  'language': 'Язык',
  'page.comparison.button': 'Оружейный',
  'page.comparison.title': 'Инструмент Сравнения Оружия',
  'page.datamine.button': 'Датамайн',
  'page.datamine.title': 'Enlisted Датамайн',
  'page.soldierStats.button': 'Харак. Солдат',
  'page.soldierStats.footer': [
    'Цифры в скобках означают прибыль в бронзовых заявок, если солдат сначала будет повышен до 5 звезд, а затем продан.',
    'Данные о количестве звезд результата серебряной заявки являются экспериментальными и могут быть неточными.',
  ],
  'page.soldierStats.header': [
    'Эта страница содержит данные оптимальной статистики для солдат в зависимости от класса и звания.',
    'Настоящие солдаты могут случайно иметь от 0 до 2 очков меньше в каждой категории.',
  ],
  'page.soldierStats.table.bronzeSale': 'Бронзовых заявок за продажу',
  'page.soldierStats.table.defaultPerk': 'Начальный перк',
  'page.soldierStats.table.silverBuy': 'Шанс за серебряную заявку',
  'page.soldierStats.table.silverWeap': 'Шанс за серебряную заявку',
  'page.soldierStats.title': 'Характеристики Солдат',
  'page.tanks.button': 'Танковый',
  'page.tanks.title': 'Инструмент Сравнения Танков'
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