import React, { Component } from 'react';
import './Footer.scss';
import Moment from 'moment';

class Footer extends Component {
  render() {
    return (
        <div className="footer">Copyright &copy; Ilkotech LTD {Moment().format('Y')}</div>
    );
  }
}

export default Footer;
