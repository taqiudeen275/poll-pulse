'use client'
import { SIDENAV_ITEMS } from '@/app/menu_constants';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useSideBarToggle } from '@/hooks/use-sidebar-toggle';
import SideBarMenuGroup from './sidebar-menu-group';
import { SideBarLogo } from './sidebar-logo';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';


export const SideBar = () => {
    const [mounted, setMounted] = useState(false);
    const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();

    const asideStyle = classNames("sidebar overflow-y-auto overflow-x-auto fixed bg-sidebar h-full shadow-sm shadow-slate-500/40 transition duration-300 ease-in-out z-[2] bg-background",
        {
            ["w-[20rem]"]: !toggleCollapse,
            ["sm:w-[5.4rem] sm:left-0 left-[-100%]"]: toggleCollapse,
        });

    useEffect(() => setMounted(true), []);

    return (
        <aside className={asideStyle}>
            <div className="sidebar-top relative flex items-center px-3.5 py-5">
                {mounted && <SideBarLogo />}
                <h3 className={classNames("pl-2 font-bold text-2xl min-w-max text-sidebar-foreground",
                    { hidden: toggleCollapse })}>
                    UDS MSA <span className="text-blue-600">  Election</span></h3>
                    <Button onClick={invokeToggleCollapse} variant='link' className='float-right sm:hidden ml-auto'><Menu/></Button>
            </div>
            <nav className="flex flex-col gap-2 transition duration-300 ease-in-out">
                <div className="flex flex-col gap-2 px-4">
                    {SIDENAV_ITEMS.map((item, idx) => {
                        return <SideBarMenuGroup key={idx} menuGroup={item} />;
                    })}
                </div>
            </nav>
        </aside>
    )
}
