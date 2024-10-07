import { Link } from "react-router-dom";
import { memo } from "react";
import useLayoutStore from "../../core/stores/layout-store";

interface SidebarParentMenu {
  key: string;
  location: string;
  name: string;
  children?: SidebarChildMenu[]
}

interface SidebarChildMenu {
  key: string;
  name: string;
  route: string;
}

interface LayoutAppSidebarProps {
  location: string;
  items: SidebarParentMenu[];
};

const LayoutAppSidebar = memo((props: LayoutAppSidebarProps) => {
  const { selectedSidebarMenu, setSelectedSidebarMenu } = useLayoutStore();

  return (
    <aside style={{minHeight: '80vh'}} className="menu aside-menu">
      {props.items.filter((x) => x.location === props.location).map((item: SidebarParentMenu) => [
        <span key={item.key}>
          <p className="menu-label">{item.name}</p>
          <ul className="menu-list">
            {item.children?.map((child: SidebarChildMenu) => (
              <li key={child.key}>
                <Link to={child.route}
                  className={`${selectedSidebarMenu.includes(child.route) ? 'is-active' : ''}`}
                  onClick={() => setSelectedSidebarMenu(child.route)}>
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
          <br />
          </span>
      ])}
    </aside>
  );
});

export default LayoutAppSidebar;
export type { SidebarParentMenu, SidebarChildMenu };