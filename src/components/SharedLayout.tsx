import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const SharedLayout: React.FC = () => {
    return (
        <>
            <header>Header</header>
            <main className="fillHeight">
                <Suspense fallback={"Loading..."}>
                    <Outlet />
                </Suspense>
            </main>
            <footer>Footer</footer>
        </>
    );
};

export default SharedLayout;