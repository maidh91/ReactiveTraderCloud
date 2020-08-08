import Axios from 'axios';
import _ from 'lodash';
import intl from 'react-intl-universal';

import LocaleOptions from './LocaleOptions';

const loadLocales = ({
  isInit = false, path = '', onSuccess = () => { },
}) => {
  let currentLocale = intl.determineLocale({
    urlLocaleKey: 'lang',
    cookieLocaleKey: 'lang',
    localStorageLocaleKey: 'lang',
  });
  if (
    !_.find(LocaleOptions, {
      value: currentLocale,
    })
  ) {
    currentLocale = 'en-US';
  }

  Axios.get(
    `${window.location.origin}/locales/${path ? `${path}/` : ''}${currentLocale}.json`,
  ).then((res) => {
    const locales = {
      [currentLocale]: res.data,
    };
    if (isInit) {
      intl.init({
        currentLocale,
        locales,
      });
    } else {
      intl.load(locales);
    }
    onSuccess();
  });
};

export default loadLocales;
