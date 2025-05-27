'use client';

import MainLayout from './MainLayout';

interface MainLayoutWrapperProps {
  children: React.ReactNode;
}

const MainLayoutWrapper: React.FC<MainLayoutWrapperProps> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default MainLayoutWrapper;