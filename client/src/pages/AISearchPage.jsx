import React from "react";
import AISearchBar from "../components/compo/AISearchBar";
import styles from "./AISearchPage.module.css";

const AISearchPage = () => {
  return (
    <>
      <div className={styles.aiSearchPage}>
        <h1 className={styles.title}>AI Search</h1>
        <div className={styles.searchBarContainer}>
          <AISearchBar />
        </div>
      </div>
    </>
  );
};

export default AISearchPage;
