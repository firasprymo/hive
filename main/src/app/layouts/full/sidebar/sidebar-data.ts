import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'Chat',
    iconName: 'mail',
    route: '/chat',
  },
  {
    displayName: 'Ajouter question',
    iconName: 'plus',
    route: '/add-question',
  }
];
