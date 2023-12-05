import styles from "./List.module.css";

function Order({ isFestival }) {
  return (
    <div>
      {isFestival ? (
        <div className={styles.order_box}>
          <button
            className={`${styles.order} ${styles.check}`}
            id={styles.축제일순}
            onclick="order('축제일순')"
          >
            축제일순
          </button>
          │
          <button
            className={styles.order}
            id={styles.인기순}
            onclick="order('인기순')"
          >
            인기순
          </button>
        </div>
      ) : (
        <div>
          <button
            className={`${styles.order} ${styles.check}`}
            id={styles.업데이트순}
            onclick="order('업데이트순')"
          >
            업데이트순
          </button>
          │
          <button
            className={styles.order}
            id={styles.종료임박순}
            onclick="order('종료임박순')"
          >
            최근시작순
          </button>
        </div>
      )}
    </div>
  );
}

export default Order;
