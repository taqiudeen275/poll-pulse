import { SideNavItemGroup } from "@/types/type";
import {
    BsBroadcast,
    BsEnvelope,
    BsGear,
    BsHouseDoor,
    BsPerson,
    BsQuestionCircle,
    BsSquare
} from "react-icons/bs";



export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    {
        title: "Dashboards",
        menuList: [{
            title: 'Dashboard',
            path: '/admin/dashboard',
            icon: <BsHouseDoor size={20} />,
        }]
    },
    {
        title: "Manage",
        menuList: [
            {
                title: 'Candidates',
                path: '/admin/dashboard/candidates',
                icon: <BsPerson size={20} />,
            },
            {
                title: 'Voters',
                path: '/admin/dashboard/voters',
                icon: <BsPerson size={20} />,
            },
            {
                title: 'Positions',
                path: '/admin/dashboard/positions',
                icon: <BsSquare size={20} />,
            },
            {
                title: 'Elections',
                path: '/admin/dashboard/elections',
                icon: <BsEnvelope size={20} />,
            }
        ]
    },
    {
        title: "Others",
        menuList: [
            {
                title: 'Live Election',
                path: '/admin/dashboard/live-election',
                icon: <BsBroadcast size={20} />,
            },
            {
                title: 'Account',
                path: '/admin/dashboard/account',
                icon: <BsGear size={20} />,
            },
            {
                title: 'Help',
                path: '/admin/dashboard/help',
                icon: <BsQuestionCircle size={20} />,
            }
        ]
    }

];