export interface NavbarProps {
  isScrolled: boolean;
  menu: MenuNavbar[];
  isLogged: boolean;
  title?: string;
  logoPath?: string;
}

export interface MenuNavbar {
  label: string;
  path: string;
}
