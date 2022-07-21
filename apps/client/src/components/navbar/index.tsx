import React, { useState } from 'react';
import { ReactComponent as ArrowDropDown } from '../../assets/arrowdown.svg';
import { ReactComponent as Notification } from '../../assets/notification.svg';
import { ReactComponent as Search } from '../../assets/search.svg';
import './navbar.scss';
// interface NavbarProps {}

const Navbar = () => {
  const [isScrolled, setisScrolled] = useState(false);
  window.onscroll = () => {
    if (window.scrollY > 0) {
      setisScrolled(true);
    } else {
      setisScrolled(false);
    }
  };
  return (
    <div className={`navbar ${isScrolled ? `scrolled` : ''} `}>
      <div className="container">
        <div className="left">
          <img src="assets/Netflix_2015_logo.svg.png" alt="" />
          <span>Homepage</span>
          <span>Series</span>
          <span>Movies</span>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notification className="icon" />
          <img src="assets/avatar.webp" alt="" />

          {/* profile */}
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
