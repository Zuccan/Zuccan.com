import React from 'react';
import { NavLink } from 'react-router-dom';
import { PORTALS } from '../../../utils/constants';
import './PortalSwitcher.css';

export const PortalSwitcher = () => {
  return (
    <div className="portal-switcher-pill">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `portal-tab ${isActive ? 'portal-tab-active parent-active' : ''}`
        }
      >
        <span className="portal-dot parent-dot" />
        Group
      </NavLink>

      <NavLink
        to="/customers"
        className={({ isActive }) =>
          `portal-tab ${isActive ? 'portal-tab-active customer-active' : ''}`
        }
      >
        <span className="portal-dot customer-dot" />
        For Customers
      </NavLink>

      <NavLink
        to="/business"
        className={({ isActive }) =>
          `portal-tab ${isActive ? 'portal-tab-active business-active' : ''}`
        }
      >
        <span className="portal-dot business-dot" />
        For Business
      </NavLink>
    </div>
  );
};

export default PortalSwitcher;
