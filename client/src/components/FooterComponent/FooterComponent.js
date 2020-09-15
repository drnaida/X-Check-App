import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = props => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      X-Check App ©2020 Created by Team #33 during &#39;Development on React course&#39; by RSSchool
    </Footer>
  );
};

export default FooterComponent;
