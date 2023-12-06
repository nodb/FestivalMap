import React, { useState } from "react";
import styles from "./List.module.css";

function Order({ isFestival, onOrderChange }) {
  const [selectedOrder, setSelectedOrder] = useState(isFestival ? "A" : "01");

  const handleOrderClick = (orderType) => {
    setSelectedOrder(orderType);
    onOrderChange(orderType);
  };
  return (
    <div>
      {isFestival ? (
        <div className={styles.order_box}>
          <button
            className={`${styles.order} ${
              selectedOrder === "A" ? styles.check : ""
            }`}
            id={styles.축제일순}
            onClick={() => handleOrderClick("A")}
          >
            축제일순
          </button>
          │
          <button
            className={`${styles.order} ${
              selectedOrder === "B" ? styles.check : ""
            }`}
            id={styles.인기순}
            onClick={() => handleOrderClick("B")}
          >
            인기순
          </button>
        </div>
      ) : (
        <div>
          <button
            className={`${styles.order} ${
              selectedOrder === "01" ? styles.check : ""
            }`}
            id={styles.업데이트순}
            onClick={() => handleOrderClick("01")}
          >
            업데이트순
          </button>
          │
          <button
            className={`${styles.order} ${
              selectedOrder === "02" ? styles.check : ""
            }`}
            id={styles.종료임박순}
            onClick={() => handleOrderClick("02")}
          >
            시작날짜순
          </button>
        </div>
      )}
    </div>
  );
}

export default Order;
