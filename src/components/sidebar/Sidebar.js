import React, { useState } from 'react';
import './Sidebar.scss';
import SidebarItem from './SidebarItem';
import navmenu from '../../data/Sidebar';
import { useNavigate } from 'react-router-dom';
import logoImg from "../../assets/lgo.png";


const Sidebar = ({ children }) => {
      const [isOpen, setIsOpen] = useState(true);

      const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };
      
      const navigate = useNavigate()

      const hme = () => {
        navigate("/")
       }

  return (
    <div className="layout">
      <div className={`sidebar ${isOpen ? 'open' : 'close'}`}>
        <div className="top_section">
          <div className='logo'style={{
            display: isOpen ? 'block' : 'none'
          }}>
            <div
                onClick={hme}
                style={{ display: 'inline-flex', cursor: 'pointer' }}
              >
                 <img alt='sideimage' src={logoImg} style={{width:"150px", height:"45px", marginLeft:"-9px"}}/>
              </div>

          </div>
          <div>
          <button onClick={toggleSidebar} className="sidebar-icon">
          <i className="fas fa-bars"></i>
        </button>
        </div>
        </div>
       {navmenu.map((item, index) => {
              return <SidebarItem key={index} item={item} isOpen={isOpen}/>
       })}
      </div>
      <main style={{
        paddingLeft: isOpen ? "240px" : "123px", transition: "all .5s"
      }}>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
