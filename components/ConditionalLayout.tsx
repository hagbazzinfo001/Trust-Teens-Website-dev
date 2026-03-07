'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ConditionalLayoutProps {
    header: ReactNode;
    footer: ReactNode;
    children: ReactNode;
}

export default function ConditionalLayout({
    header,
    footer,
    children,
}: ConditionalLayoutProps) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            {header}
            <main>{children}</main>
            {footer}
        </>
    );
}
