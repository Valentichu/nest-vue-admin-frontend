export interface AppState {
  navbar: boolean;
  menu: boolean;
  hideMenu: boolean;
  menuCollapse: boolean;
  footer: boolean;
  menuWidth: number;
  tabBar: boolean;
  [key: string]: unknown;
}
