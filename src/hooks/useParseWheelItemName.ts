import { useMemo } from 'react';
import { GAME_TYPE } from '../types/caseTypes';
import { WAXPEER_ITEM_EXTERIOR } from '../types/waxpeer.types';

export const useParseWheelItemName = (wheelItemName: string, caseType?: GAME_TYPE) => {
  const { name, itemClass } = useMemo(() => {
    let itemClass = '';
    let _name = wheelItemName;
    if (caseType === GAME_TYPE.CSGO) {
      // get item class
      const arr = _name.split(' | ');
      if (arr.length > 1) {
        itemClass = arr[0];
        _name = arr[1];
      }

      // remove exterior
      const arr1 = _name.split(' (');
      _name = arr1[0];

      // remove exterior again
      const exteriors = Object.values(WAXPEER_ITEM_EXTERIOR);
      const arr2 = _name.split(' ');
      if (exteriors.includes(arr2[arr2.length - 1].toUpperCase() as WAXPEER_ITEM_EXTERIOR)) {
        arr2.pop();
        _name = arr2.join(' ');
      }
    }

    return {
      name: _name,
      itemClass,
    };
  }, [wheelItemName, caseType]);

  return {
    name, itemClass
  };
};