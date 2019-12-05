import i18n from 'i18n-js';
import en from './en.json';
import es from './es.json';
//import * as RNLocalize from "react-native-localize";

//const { languageTag } = RNLocalize.findBestAvailableLanguage(Object.keys({ en, es }),) || { languageTag: 'en' };
//console.log(languageTag);

i18n.defaultLocale = 'es';
i18n.locale = 'es';
//i18n.locale = languageTag;
i18n.fallbacks = true;
i18n.translations = { en, es };

export default i18n;