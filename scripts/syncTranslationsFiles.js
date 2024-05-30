// /* eslint-disable no-restricted-syntax */
// const fs = require('fs');
// const path = require('path');
// const { captureMessage } = require('@sentry/react');
// const sourceTranslations = require('../src/i18n/messages/translations.json');
//
// const translationsConfig = [
//   {
//     name: 'en-US.json',
//     filePath: path.resolve(__dirname, '../src/i18n/messages/en-US.json'),
//     messages: {},
//   },
//   {
//     name: 'hn-IN.json',
//     filePath: path.resolve(__dirname, '../src/i18n/messages/hn-IN.json'),
//     messages: {},
//   },
//   {
//     name: 'nl-NL.json',
//     filePath: path.resolve(__dirname, '../src/i18n/messages/nl-NL.json'),
//     messages: {},
//   },
// ];
//
// translationsConfig.forEach((config) => {
//   try {
//     const messages = require(config.filePath);
//     config.messages = messages;
//   } catch (e) {
//     const errorMessage = `Error happened creating a new file for ${config.filePath}`;
//     captureMessage(errorMessage);
//     console.log(errorMessage);
//   }
// });
//
// translationsConfig.map((config) => {
//   // copy all english keys
//   const updatedTranslations = {
//     ...sourceTranslations,
//   };
//
//   // insert values from current file or empty value
//   // for (const key in updatedTranslations) {
//   //   if (Object.hasOwnProperty.call(updatedTranslations, key)) {
//   //     updatedTranslations[key] = config.messages[key] || '';
//   //   }
//   // }
//
//   if (config.name !== 'en-US.json') {
//     // clear translations strings for other langauges
//     Object.keys(updatedTranslations).forEach((key) => {
//       updatedTranslations[key] = {
//         ...updatedTranslations[key],
//         message: '',
//       };
//     });
//   }
//
//   fs.writeFile(config.filePath, JSON.stringify(updatedTranslations), (err) => {
//     if (err) throw err;
//     console.log('Translation file updated', config.name);
//   });
// });
