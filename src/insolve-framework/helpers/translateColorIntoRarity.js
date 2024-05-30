const rarity = {
  'b0c3d9': 'common',
  '6496e1': 'uncommon',
  '4b69ff': 'rare',
  '8847ff': 'mythical',
  'd32ce6': 'legendary',
  'eb4b4b': 'ancient',
  'caab05': 'exc-rare',
  '886a08': 'immortal'
}

const translateColorIntoRarity = (color) => {
  return rarity[color] || rarity['afafaf'];
}

export default translateColorIntoRarity;