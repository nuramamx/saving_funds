interface SidebarParentMenu {
    location: string;
    name: string;
    children?: SidebarChildMenu[]
}

interface SidebarChildMenu {
    name: string;
    route: string;
}

interface UIAppSidebarProps {
    location: string;
    items: SidebarParentMenu[];
};

export default function UIAppSidebar(props: UIAppSidebarProps) {
    return (
        <aside style={{minHeight: '80vh'}} className="menu box">
            {props.items.filter((x) => x.location === props.location).map((item: SidebarParentMenu) => [
                <p className="menu-label">{item.name}</p>,
                <ul className="menu-list">
                    {item.children?.map((child: SidebarChildMenu) => (
                        <li><a href={child.route}>{child.name}</a></li>
                    ))}
                </ul>
            ])}
        </aside>
    );
}

export type { SidebarParentMenu, SidebarChildMenu };