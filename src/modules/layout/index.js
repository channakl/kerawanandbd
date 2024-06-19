import { useEffect, useState, useRef } from 'react';
import Sidebar from '@/modules/layout/Sidebar';
import NotificationBar from '@/modules/layout/NotificationBar';
import Loader from '@/modules/layout/Loader';
import Head from 'next/head';
import { mergeClasses } from '@/helpers/className';
import { useFetchingDocs } from '@/hooks/useFetchingDocs';
import { useSession } from 'next-auth/react';
import { KSH_STATUS } from '@/helpers/constants';
import { useAccountContext } from '@/contexts/accountContext';
import Cookies from 'js-cookie';

const Layout = (props) => {
    const { children, title = "Aplikasi Pemetaan Kerawanan DBD", overflow = false } = props;
    const { data: session } = useSession();
    const [fetchKshAccounts, { data: kshAccountsFiltered }] = useFetchingDocs({ lazyFetch: true });
    const { kshStatus, updateKshStatus } = useAccountContext();
 
    useEffect(() => {
        if (session?.user?.email) {
            const kshFetched = Cookies.get('ksh_fetched');
            if (!kshFetched || !kshStatus) {
                fetchKshAccounts({
                    collection: "ksh_accounts",
                    where: [["email", "==", session.user.email]]
                });
            }
        }
    }, [session]);

    useEffect(() => {
        if (kshAccountsFiltered) {
            Cookies.set('ksh_fetched', true, { expires: 1 / 1440 });
            const currentUserEmailFound = kshAccountsFiltered.length > 0;
            if (currentUserEmailFound) {
                const accountStatus = kshAccountsFiltered[0].accepted ? KSH_STATUS.REGISTERED : KSH_STATUS.UNDER_REVIEW;
                updateKshStatus(accountStatus);
            } else {
                updateKshStatus(KSH_STATUS.NOT_REGISTERED);
            }
        }
    }, [kshAccountsFiltered]);
    
    return (
        <div>
            <div className='relative flex w-screen overflow-hidden'>
                <Head>
                    <title>{title}</title>
                    <link rel="icon" href="/favicon.svg" sizes="any" />
                </Head>
                <Sidebar />
                <main className={mergeClasses(
                    'relative w-full h-screen bg-gray-100 p-10',
                    overflow && 'overflow-auto'
                )}>
                    {children}
                    <Loader global />
                </main>
                <NotificationBar />
            </div>
        </div>
    );
}

export default Layout;
