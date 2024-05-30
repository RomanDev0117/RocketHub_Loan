/* eslint-disable */
const fs = require('fs');
const path = require('path');

const translationsFilePath =  path.resolve(__dirname, '../src/i18n/messages/translations.json');

const translationsConfig = [
  {
    name: 'en-US.json',
    filePath: path.resolve(__dirname, '../src/i18n/messages/en-US.json'),
    messages: {},
  },
  {
    name: 'fr-FR.json',
    filePath: path.resolve(__dirname, '../src/i18n/messages/fr-FR.json'),
    messages: {},
  },
];

const translations = require(translationsFilePath);

translationsConfig.forEach((config) => {
  try {
    const messages = syncMessages(require(config.filePath));


    const normalizedMessages = normalizeMessages(messages);
    
    fs.writeFile(config.filePath, JSON.stringify(normalizedMessages), (err) => {
      if (err) throw err;
      console.log('Translation file updated', config.name);
    });
  } catch (e) {
    const errorMessage = `Error happened creating a new file for ${config.filePath}`;
    console.log(errorMessage, e);
  }
});


function normalizeMessages(messages) {
  const result = {};
  Object.entries(messages).forEach(function([key, translation]) {
    result[key] = {
      ...translation,
      message: translation.message.replaceAll('\n', '<br></br>')
    }
  })

  return result;
}

function syncMessages(messages) {
  const newMessages = {...translations};

  Object.keys(newMessages).forEach(key => {
    newMessages[key] = messages[key] || newMessages[key]
  }) 

  return newMessages;
}