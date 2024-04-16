/* eslint-disable react/no-children-prop */
import { SideBar } from '@/components/sidebar';
import Header from '@/components/header';
import PageWrapper from '@/components/pagewrapper';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardLayout({children,}: {
    children: React.ReactNode
}) {
    return(
        <>
            <SideBar />
            <div className="flex flex-col h-full w-full">
                <Header />
                <PageWrapper children={children} />
            </div>
            <Toaster />
        </>
    )
}