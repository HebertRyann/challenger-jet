import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import logoImg from '../../assets/logo-multfluxo.png';
import AvatarImg from '../../assets/layouts/layout3/img/avatar.png';

interface Menu {
  id: number;
  parent_id?: number;
  method?: string;
  name: string;
  url?: string;
  permission: boolean;
  children?: Menu[];
}

const Header: React.FC = () => {
  const history = useHistory();
  const { signOut, user, menus } = useAuth();
  const { addToast } = useToast();

  const createMenu = (arrayMenus: Menu[], submenu = false) =>
    arrayMenus
      .filter(
        menu =>
          (menu.method === null && menu.children) ||
          (menu.method && menu.permission === true),
      )
      .map(menu => {
        const className = menu.url ? '' : 'dropdown-submenu';
        let showMenu = true;
        if (menu.method === null && menu.children) {
          const subMenus = menu.children.filter(sub => sub.permission === true);
          showMenu = subMenus.length > 0;
        }
        if (showMenu) {
          return (
            <li
              className={
                !submenu ? 'menu-dropdown classic-menu-dropdown' : className
              }
              key={menu.id}
            >
              <a href={menu.url ? menu.url : '#!'}>{menu.name}</a>
              {menu.children && (
                <ul className="dropdown-menu pull-left">
                  {createMenu(menu.children, true)}
                </ul>
              )}
            </li>
          );
        }
        return '';
      });

  const handleLogout = useCallback(() => {
    signOut();
    addToast({
      type: 'info',
      title: 'Logout realizado com sucesso!',
    });
    history.push('/');
  }, [signOut, addToast, history]);

  return (
    <div className="page-header">
      <div className="page-header-top">
        <div className="container-fluid">
          <div className="page-logo">
            <Link to="/dashboard">
              <img
                src={logoImg}
                alt="logo"
                className="logo-default logo-light"
              />
            </Link>
          </div>
          <Link to="#!" className="menu-toggler" />
          <div className="top-menu">
            <ul className="nav navbar-nav pull-right">
              <li className="dropdown dropdown-user dropdown-dark">
                <Link to="/profile" className="dropdown-toggle">
                  <img
                    alt=""
                    className="img-circle"
                    src={user.avatar_url ? user.avatar_url : AvatarImg}
                  />
                  <span className="username username-hide-mobile">
                    {user.name}
                  </span>
                </Link>
              </li>
              <li className="dropdown dropdown-extended">
                <Link to="#!" className="dropdown-toggle" onClick={handleLogout}>
                  <span className="sr-only">Toggle Quick Sidebar</span>
                  <i className="icon-logout" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="page-header-menu">
        <div className="container-fluid">
          <div className="hor-menu">
            <ul className="nav navbar-nav">{createMenu(menus)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
