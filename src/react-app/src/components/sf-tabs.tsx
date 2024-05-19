import React from "react";
import { ReactNode, useState } from "react";

interface SFTabsOptions {
    id: string
    name: string
    active?: boolean
}

interface SFTabsProps {
    options: SFTabsOptions[],
    children: ReactNode
}

export function SFTabs({ options, children }: SFTabsProps) {
    const [selectedTab, setSelectedTab] = useState<string>(options[0].id);

    return (
        <>
        <div className="tabs is-centered">
            <ul>
                {options.map((item: SFTabsOptions) => [
                    <li key={item.id} className={selectedTab === item.id ? 'is-active' : ''}>
                        <a onClick={() => setSelectedTab(item.id)}>{item.name}</a>
                    </li>
                ])}
            </ul>
        </div>
        <div className="content">
        {React.Children.map(children, (child) => 
            React.isValidElement(child) && child.props.id === selectedTab ? child : null
        )}
        </div>
        </>
    );
}

export type { SFTabsProps, SFTabsOptions }