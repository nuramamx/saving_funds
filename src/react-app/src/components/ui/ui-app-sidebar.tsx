type SidebarMenu = {
    location: string | undefined;
    name: string;
    route: string | undefined;
    children?: SidebarMenu[]
}

interface UIAppSidebarProps {
    location: string;
    items: SidebarMenu[];
};

export default function UIAppSidebar(props: UIAppSidebarProps) {
    return (
        <>
        <aside style={{minHeight: '100vh'}} className="menu box">
            {props.items.filter((x) => x.location === props.location).map((item: SidebarMenu) => [
                <p className="menu-label">{item.name}</p>,
                <ul className="menu-list">
                    {item.children?.map((child: SidebarMenu) => (
                        <li><a href={child.route}>{child.name}</a></li>
                    ))}
                </ul>
            ])}
        </aside>
        </>
    );
}

export type { SidebarMenu };