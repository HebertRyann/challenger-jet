import React from 'react';

import '../../../assets/global/plugins/font-awesome/css/font-awesome.min.css';
import '../../../assets/global/plugins/simple-line-icons/simple-line-icons.min.css';
import '../../../assets/global/plugins/bootstrap/css/bootstrap.min.css';
import '../../../assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css';
import '../../../assets/global/css/components.min.css';
import '../../../assets/layouts/layout3/css/layout.min.css';
import '../../../assets/layouts/layout3/css/themes/default.min.css';
import '../../../assets/layouts/layout3/css/custom.min.css';
import '../../../assets/css/global.css';

import Header from '../../../components/Header';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div className="page-container-bg-solid page-header-menu-fixed">
      <div className="page-wrapper">
        <div className="page-wrapper-row">
          <div className="page-wrapper-top">
            <Header />
          </div>
        </div>

        <div className="page-wrapper-row full-height">
          <div className="page-wrapper-middle">
            <div className="page-container">{children}</div>
          </div>
        </div>

        <div className="page-wrapper-row">
          <div className="page-wrapper-bottom">
            <div className="page-footer">
              <div className="container-fluid">
                {' '}
                {new Date().getFullYear()} &copy; Multfluxo
              </div>
            </div>
            <div className="scroll-to-top">
              <i className="icon-arrow-up" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
