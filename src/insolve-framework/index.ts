
// import roulette from './lib/roulette';
import chatApi from './lib/chat';
import userApi from './lib/user';
// import p2p from './lib/p2p';
// import coinflip from './lib/coinflip';
import adminApi from './lib/admin';
import caseApi from './lib/cases';
// import jackpot from './lib/jackpot';
import waxpeerApi from './lib/waxpeer';
import rainApi from './lib/rain';
import wheelOfFortuneApi from './lib/wheelOfFortune';
// import towers from './lib/towers';
// import statistics from './lib/statistics';

import config from './config';

import getShortCsName from './helpers/getShortCsName';
import requestAPI from './helpers/requestAPI';

const start = (_: string) => {
  // roulette.init()
  chatApi.init();
  userApi.init();
  // p2p.init()
  // coinflip.init()
  adminApi.init();
  caseApi.init();
  // jackpot.init()
  // statistics.init()
  waxpeerApi.init();
  wheelOfFortuneApi.init();
  rainApi.init();
  // towers.init()
};


export {
  start,
  // roulette,
  chatApi,
  userApi,
  // p2p,
  // coinflip,
  adminApi,
  caseApi,
  // jackpot,
  // statistics,
  waxpeerApi,
  wheelOfFortuneApi,
  rainApi,
  // towers,
  getShortCsName,
  config,
  requestAPI,
};
