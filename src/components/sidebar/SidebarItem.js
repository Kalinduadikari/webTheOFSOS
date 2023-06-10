import React, { useState } from 'react';
import { MdArrowCircleRight } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ item, isOpen }) => {
  const activelink = ({ isActive }) => (isActive ? 'active' : 'link');
  const activeSublink = ({ isActive }) => (isActive ? 'active' : 'link');
  const [stretchMenu, setStretchMenu] = useState(false);

  if (item.childrens) {
    return (
      <div
        className={
          stretchMenu ? 'sidebar-item s-parent open' : 'sidebar-item s-parent'
        }
      >
        <div className="sidebar-title">
          <span>
            {item.icon && <div className="icon">{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdArrowCircleRight
            size={25}
            className="arrow-icon"
            onClick={() => setStretchMenu(!stretchMenu)}
          />
        </div>

        <div className="sidebar-content">
          {item.childrens.map((child, index) => {
            return (
              <div className="s-child" key={`child-${index}`}>
                <NavLink
                  to={child.path}
                  className={activeSublink}
                >
                  <div className="sidebar-item">
                    <div className="sidebar-title">
                      {child.icon && <div className="icon">{child.icon}</div>}
                      {isOpen && <div>{child.title}</div>}
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activelink}>
        <div className="sidebar-item s-parent">
          <div className="sidebar-title">
            <span>
              {item.icon && <div className="icon">{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};

export default SidebarItem;
