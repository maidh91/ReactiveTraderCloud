import React from 'react';
import {
  Dropdown,
} from 'semantic-ui-react';

import LocaleOptions from './LocaleOptions';

const LocaleSelection = () => {
  const getCurrentLocale = () => localStorage.getItem('lang');

  const onSelectLocale = (value) => {
    try {
      localStorage.setItem('lang', value);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dropdown
        placeholder="Select Language"
        search
        selection
        options={LocaleOptions}
        value={getCurrentLocale()}
        onChange={(e, {
          value,
        }) => onSelectLocale(value)}
      />
    </div>
  );
};

export default LocaleSelection;
