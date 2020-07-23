const i18n = require('i18n');
const path = require('path');

// configuration required for i18n
// eslint-disable-next-line max-len
// path.join() only concatenates the input list with platform specific separator
i18n.configure({
  locales: ['en', 'de'],
  directory: path.join(__dirname, '/../../resources/locales'),
  queryParameter: 'lang',
  defaultLocale: 'en',
  api: {
    '__': 't', // now req.__ becomes req.t
    '__n': 'tn', // and req.__n can be called as req.tn
  },
});


module.exports = i18n;
