'use client';
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import classNames from "classnames";
import { BsList } from "react-icons/bs"
import { UserNav } from "./usernav";
import { ThemeSwitcher } from "./theme-switcher";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";
import pocketBaseClient from "@/utils/pocket-base-client";
import {useRouter} from "next/navigation";
import pb from "@/utils/my_pb";

export default function Header() {
    const router = useRouter();
    const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
    const sidebarToggle = () => {
        invokeToggleCollapse();
    }
    const headerStyle = classNames("bg-sidebar fixed w-full  px-4 border-b",
        {
            ["sm:pl-[20rem]"]: !toggleCollapse,
            ["sm:pl-[5.6rem]"]: toggleCollapse,
        });
    const handleLogout = async () => {
        try {
            await pb.logoutUser();
            router.replace('/admin/login');
            console.log(pocketBaseClient.authStore.model)
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };
    return (
        <header className={headerStyle}>
            <div className="h-16 flex items-center justify-between">
                <button onClick={sidebarToggle} className="order-2 sm:order-1 shrink-btn float-right bg-sidebar-muted text-sidebar-muted-foreground hover:bg-foreground hover:text-background ml-3 rounded-md w-[30px] h-[30px] flex items-center justify-center border  transition duration-300 ease-in-out sm:z-[9]">
                    <BsList />
                </button>

                <div className="flex items-center justify-between sm:order-2 order-1">
                    <div className="p-2">
                        <ThemeSwitcher></ThemeSwitcher>
                    </div>
                   
                <Button variant="ghost" className="mx-1" onClick={handleLogout}><LogOut/></Button>
                </div>
            </div>
        </header>
    )
}