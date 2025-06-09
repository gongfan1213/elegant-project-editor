import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import styles from "@/styles/Header.module.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.spacer} />
        
        <nav className={styles.nav}>
          <Link to="/">
            <Button 
              variant="ghost"
              className={`${styles.navButton} ${
                location.pathname === "/"
                  ? styles.navButtonActive
                  : styles.navButtonInactive
              }`}
            >
              首页
            </Button>
          </Link>
          
          <Link to="/my-projects">
            <Button 
              variant="ghost"
              className={`${styles.navButton} ${
                location.pathname === "/my-projects"
                  ? styles.navButtonActive
                  : styles.navButtonInactive
              }`}
            >
              我的项目
            </Button>
          </Link>
        </nav>

        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <span className={styles.logoText}>N</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
