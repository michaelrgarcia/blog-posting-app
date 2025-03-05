import { Outlet, Link, useNavigate } from "react-router-dom";

import styles from "./App.module.css";

function App() {
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem("jwt");

    navigate("/login");
  };

  return (
    <>
      <header className={styles.appHeader}>
        <h1>Blogger</h1>
        <div className={styles.navWrapper}>
          <nav className={styles.appNav}>
            <Link to="published">
              <button type="button" className={styles.navBtn}>
                Published
              </button>
            </Link>
            <Link to="unpublished">
              <button type="button" className={styles.navBtn}>
                Unpublished
              </button>
            </Link>
            <Link to="new-post">
              <button type="button" className={styles.navBtn}>
                New Post
              </button>
            </Link>
            <button
              type="button"
              className={styles.navBtn}
              style={{ minWidth: "170px" }}
              onClick={onLogOut}
            >
              Log out
            </button>
          </nav>
        </div>
      </header>
      <main className={styles.appMain}>
        <div className={styles.outletWrapper}>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
