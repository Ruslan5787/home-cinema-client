import { FC, Suspense } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 pb-20 font-roboto text-white">
      <Header />
      <div className="container">
        <div className="pt-[120px] w-full">
          <Suspense fallback={<div>loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout;
