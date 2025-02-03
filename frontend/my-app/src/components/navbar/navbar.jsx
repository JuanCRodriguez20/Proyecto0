import React from 'react';
import { Bell, Menu, Search, User } from 'lucide-react';
import './__navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <Menu />
          <span className="navbar__brand-text">TaskManager</span>
        </div>
        
        <div className="navbar__actions">
          <div className="navbar__search">
            <input type="text" placeholder="Buscar tareas..." />
            <Search />
          </div>
          
          <button>
            <Bell />
          </button>
          
          <div className="navbar__actions-profile">
            <img src="/api/placeholder/32/32" alt="Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;