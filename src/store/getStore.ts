const storeData = {
  store: undefined,
};

export const getStore = () => storeData.store;

export const setStore = (store: any) => {
  storeData.store = store;
};