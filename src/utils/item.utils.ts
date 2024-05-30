const priceColors = [
  {
    min: 0,
    max: 1,
    color: '#B0B0B0'
  },
  {
    min: 1,
    max: 5,
    color: '#00FF00'
  },
  {
    min: 5,
    max: 25,
    color: '#0000FF'
  },
  {
    min: 25,
    max: 50,
    color: '#800080'
  },
  {
    min: 50,
    max: 100,
    color: '#FF0000'
  },
  {
    min: 100,
    max: Infinity,
    color: '#FFFF00'
  },
];

export const getItemColorByPrice = (price = 0) => {
  const config = priceColors.find(config => {
    return price >= config.min && price < config.max;
  });

  return config?.color || priceColors[0].color;
};