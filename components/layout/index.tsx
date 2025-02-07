import { Header } from './header';
import { Footer } from './footer';
import React, { ReactNode } from 'react';
import styles from './style.module.css';
import { Modals } from './modals';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
      <Modals />
    </div>
  );
};

export default Layout;
