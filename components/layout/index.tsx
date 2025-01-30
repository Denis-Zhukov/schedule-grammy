import { Header } from './header';
import { Main } from './main';
import { Footer } from './footer';
import { ReactNode } from 'react';
import styles from './style.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default Layout;
