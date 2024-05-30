#!/bin/bash
set -e

npx formatjs extract 'src/**/*.{js,ts,tsx,jsx}' --ignore 'src/**/*.d.ts' --id-interpolation-pattern '[sha512:contenthash:base64:6]' --format ./scripts/formatter.js --out-file src/i18n/messages/translations.json --additional-function-names=t --additional-component-names=T

node scripts/syncTranslationsFiles.js

echo 'done'