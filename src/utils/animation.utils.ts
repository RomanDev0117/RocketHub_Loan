import { randomInt } from './app.utils';

export const generateBezier = () => {
  const first = randomInt(10, 25) / 100;
  const second = randomInt(70, 98) / 100;
  const third = randomInt(30, 60) / 100;

  return `cubic-bezier(${first}, ${second}, ${third}, 1)`;
};