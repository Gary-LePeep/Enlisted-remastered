const SOLDIER_STATS = [
  [
    {
      Name: 'class.Default',
      Stats: [4, 4, 4],
      Talent: '',
    },
  ],
  [
    {
      Name: 'class.Rifleman#I',
      Stats: [5, 5, 5],
      Talent: '+10.5% speed of decreasing of the shot spread after quick turning of the firearm',
    },
    {
      Name: 'class.Rifleman#II',
      Stats: [6, 6, 6],
      Talent: '+5.3% sprint speed',
    },
    {
      Name: 'class.Rifleman#III',
      Stats: [7, 7, 7],
      Talent: '+15% medpack usage speed',
    },
  ],
  [
    {
      Name: 'class.Medic',
      Stats: [4, 6, 5],
      Talent: '+3.5% run speed',
    },
    {
      Name: 'class.Assaulter#I',
      Stats: [6, 4, 5],
      Talent: '+35% climbing speed',
    },
    {
      Name: 'class.Assaulter#II',
      Stats: [7, 5, 6],
      Talent: '+35% stamina',
    },
    {
      Name: 'class.Assaulter#III',
      Stats: [8, 6, 7],
      Talent: '+100% health restored by medpack',
    },
	{
      Name: 'class.Assaulter#IV',
      Stats: [9, 7, 8],
      Talent: '+12% firearm reload speed',
    },
  ],
  [
    {
      Name: 'class.Engineer#I',
      Stats: [5, 6, 4],
      Talent: '+21% movement speed while crawling or crouching',
    },
    {
      Name: 'class.Engineer#II',
      Stats: [6, 8, 4],
      Talent: '+35% stamina regen speed',
    },
  ],
  [
    {
      Name: 'class.Sniper#I',
      Stats: [6, 2, 7],
      Talent: '+14% maximum jump height',
    },
    {
      Name: 'class.Sniper#II',
      Stats: [6, 2, 8],
      Talent: '+35% breath holding time while aiming',
    },
    {
      Name: 'class.Sniper#III',
      Stats: [6, 2, 10],
      Talent: '+4.8% firearm reload speed',
    },
  ],
  [
    {
      Name: 'class.ATGunner#I',
      Stats: [2, 6, 7],
      Talent: '+52.5% speed of changing pose',
    },
    {
      Name: 'class.ATGunner#II',
      Stats: [2, 8, 8],
      Talent: '+17.5% throwing range of grenades',
    },
  ],
  [
    {
      Name: 'class.Machinegunner#I',
      Stats: [4, 4, 7],
      Talent: '+3.5% run speed',
    },
    {
      Name: 'class.Machinegunner#II',
      Stats: [4, 4, 10],
      Talent: '+7% weapon aim speed',
    },
    {
      Name: 'class.Machinegunner#III',
      Stats: [5, 6, 10],
      Talent: '+100% health restored by medpack',
    },
  ],
  [
    {
      Name: 'class.Radio#I',
      Stats: [9, 4, 2],
      Talent: '+17.5% firearms changing speed',
    },
    {
      Name: 'class.Radio#II',
      Stats: [10, 6, 2],
      Talent: '+70% health restored by medpack',
    },
  ],
  [
    {
      Name: 'class.Mortarman#I',
      Stats: [3, 6, 6],
      Talent: ' -17.5% effect of head-shaking caused by nearby explosions',
    },
  ],
  [
    {
      Name: 'class.Flametrooper#I',
      Stats: [6, 9, 3],
      Talent: '+28% aim stability with firearms after receiving damage',
    },
    {
      Name: 'class.Flametrooper#II',
      Stats: [6, 11, 4],
      Talent: '+12.3% vitality',
    },
  ],
  [
    {
      Name: 'class.FighterPilot#I',
      Stats: [4, 6, 5],
      Talent: '+5% flight stamina regen speed',
    },
    {
      Name: 'class.FighterPilot#II',
      Stats: [5, 7, 6],
      Talent: '+5% flight stamina',
    },
    {
      Name: 'class.FighterPilot#III',
      Stats: [5, 9, 7],
      Talent: '-10% power of control loss after the blackout',
    },
  ],
  [
    {
      Name: 'class.AttackerPilot#I',
      Stats: [4, 5, 6],
      Talent: '-5% power of control loss after blackout',
    },
    {
      Name: 'class.AttackerPilot#II',
      Stats: [5, 6, 7],
      Talent: '+10% angle of focused and peripheral vision',
    },
  ],
  [
    {
      Name: 'class.Tanker#I',
      Stats: [7, 2, 6],
      Talent: '+10% speed of changing seat in vehicle',
    },
    {
      Name: 'class.Tanker#II',
      Stats: [9, 2, 7],
      Talent: '+5% speed of vehicle repair',
    },
    {
      Name: 'class.Tanker#III',
      Stats: [11, 2, 8],
      Talent: '+45% speed of gear shift',
    },
  ],
  [
    {
      Name: 'class.Rider#I',
      Stats: [6, 4, 8],
      Talent: '+7% of vehicle repair',
    },
  ],
];

const SELL_STATS = [
  {
    Name: 'class.rank#I',
    Sell: ['2', '2', '2 (4)', '5 (10)', '28'],
  },
  {
    Name: 'class.rank#II',
    Sell: ['3', '3', '5', '14', '54'],
  },
  {
    Name: 'class.rank#III',
    Sell: ['3', '3', '5', '18', '82'],
  },
];
