export interface NavbarProps {
  isScrolled: boolean;
  menu: MenuNavbar[];
  isLogged: boolean;
  logoPath?: string;
}

export interface MenuNavbar {
  label: string;
  path: string;
}
