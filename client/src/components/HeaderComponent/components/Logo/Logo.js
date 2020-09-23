import React from 'react';

import logo from '../../../../assets/imgs/rsschool-logo.svg';

export const Logo = () => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <img
        alt="RSSchool"
        src={logo}
        style={{ marginRight: '12px', width: '90px', height: '64px' }}
      />
      X-Check
    </div>
  );
};
