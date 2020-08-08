import PropTypes from 'prop-types';
import React, {
  useEffect, useState,
} from 'react';

import loadLocales from './LocaleHelpers';

require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');
require('intl/locale-data/jsonp/fr.js');
require('intl/locale-data/jsonp/ja.js');
require('intl/locale-data/jsonp/vi.js');

const LocaleProvider = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadLocales({
      isInit: true,
      onSuccess: () => setLoading(false),
    });
  }, []);

  return loading ? <div>Loading...</div> : children;
};

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LocaleProvider;
