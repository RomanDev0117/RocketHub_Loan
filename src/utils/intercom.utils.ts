export const Intercom = (...args: any[]) => {
  if (window.Intercom) {
    window.Intercom(...args);
  }
};
