const WearValues = {
  'Factory New': 'FN',
  'Minimal Wear': 'MW',
  'Field-Tested': 'FT',
  'Well-Worn': 'WW',
  'Battle-Scarred': 'BS'
};

const getShortCsName = fullName => {
  // todo: fix knives not showing up correctly (look at csgoversus code for reference)
  let splitName = fullName.split(' ');
  let splitNameWear = fullName.split('|');
  let wear = fullName.split('(').length >= 2 ? fullName.split('(')[1].slice(0, -1) : '';

  let name = `${splitName[splitName[0].includes('StatTrak') || splitName[0].includes('Souvenir') ? 1 : 0]} ${wear ? '(' + WearValues[wear] + ')' : ''}`;
  let desc = splitNameWear.length > 1 ? splitNameWear[1].split('(')[0] : undefined;

  if(splitName[splitName.length - 1] === 'Case') {
    name = splitName[splitName.length - 1];
    desc = splitName.join(' ').split('Case')[0];
  }

  if(splitNameWear[0].includes('Graffiti')) {
    name = 'Graffiti';
    desc = splitNameWear[1] ? splitNameWear[1].split('(')[0] : '';
  }

  return { name, desc, wear, wearShort: WearValues[wear] };
}
export default getShortCsName;