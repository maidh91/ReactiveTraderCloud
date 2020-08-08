import PropTypes from 'prop-types';
import React, {
  useEffect, useState,
} from 'react';

import loadLocales from './LocaleHelpers';

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
