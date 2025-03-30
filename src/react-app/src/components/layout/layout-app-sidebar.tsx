import { Link } from "react-router-dom";
import { memo, useState } from "react";
import useLayoutStore from "../../core/stores/layout-store";
import useIsMobile from "../../core/hooks/use-is-mobile";
import { Coins, Community, EmptyPage, PiggyBank, TerminalTag } from "iconoir-react";
import { boolean } from "zod";

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
  type MenuItemState = {
    key: string;
    value: boolean;
    orientation: string;
  };

  type MenuState = {
    Item: MenuItemState[];
  };
  
  const menuList: MenuState = {
    Item: [
      { key: 'associates', value: false, orientation: 'left' },
      { key: 'saving-fund', value: false, orientation: 'left' },
      { key: 'borrowing', value: false, orientation: 'right' },
      { key: 'util', value: false, orientation: 'right' }
    ]
  };
  const { selectedSidebarMenu, setSelectedSidebarMenu } = useLayoutStore();
  const [isActive, setIsActive] = useState<MenuState>(menuList);
  const isMobile = useIsMobile();

  const selectIcon = (name: string) => {
    switch (name) {
      case 'associates':
        return <Community />
      case 'saving-fund':
        return <PiggyBank />
      case 'borrowing':
        return <Coins />
      case 'util':
        return <TerminalTag />
      default:
        return <EmptyPage />
    }
  };

  const toggleMenu = (key: string) => {
    setIsActive((prevState) => ({
      Item: prevState.Item.map((item) => ({
        ...item,
        value: item.key === key, // Set selected key to true, all others false
      })),
    }));
  };

  const resetAll = () => {
    setIsActive((prevState) => ({
      Item: prevState.Item.map((item) => ({ ...item, value: false })),
    }));
  };


  const clickSidebarMenu = (route: string) => {
    resetAll();
    setSelectedSidebarMenu(route);
  }

  return (
    <>
    {!isMobile ? (
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
    ) : (
      <>
      <div className="aside-menu-mobile">
        {props.items.filter((x) => x.location === props.location).map((item: SidebarParentMenu) => [
          <div key={item.key} id={item.key} className={`dropdown is-${isActive.Item.find(x => x.key === item.key)?.orientation} ${isActive.Item.find(x => x.key === item.key)?.value ? 'is-active': ''}`} style={{ paddingLeft: '5px' }}>
            <div className="dropdown-trigger">
              <button className="button" onClick={() => toggleMenu(item.key)} aria-haspopup="true" aria-controls={`dropdown-menu-${item.key}`}>
                {selectIcon(item.key)}
              </button>
              <div className="dropdown-menu" id={`dropdown-menu-${item.key}`} role="menu">
                <div className="dropdown-content">
                  <div className="dropdown-item">
                    <strong>
                      {item.name}
                    </strong>
                  </div>
                  <hr className="dropdown-divider" />
                  {item.children?.map((child: SidebarChildMenu) => (
                    <button className="dropdown-item" key={child.key}>
                      <Link to={child.route}
                        className={`${selectedSidebarMenu.includes(child.route) ? 'is-active' : ''}`}
                        onClick={() => clickSidebarMenu(child.route)}>
                        {child.name}
                      </Link>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ])}
      </div>
      </>
    )}
    </>
  );
});

export default LayoutAppSidebar;
export type { SidebarParentMenu, SidebarChildMenu };