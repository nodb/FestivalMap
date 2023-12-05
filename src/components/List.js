import styles from "./List.module.css";

function List({ id, name, img, date_start, date_end, area, ing }) {
  function getStatus(startDate, endDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (today >= start && today <= end) {
      return 0;
    } else if (today < start) {
      return 1;
    } else {
      return 2;
    }
  }
  let status = 2;
  if (ing >= 0 && ing <= 2) {
    status = ing;
  } else {
    status = getStatus(date_start, date_end);
  }
  return (
    <div>
      <div className={styles.thumbnail_box}>
        {status === 0 || status === 1 ? (
          <div className={styles.ing}>
            {status === 0 ? "진행중" : status === 1 ? "진행예정" : null}
          </div>
        ) : null}
        <img src={img} className={styles.thumbnail} />
      </div>
      <div>
        <div className={styles.content_box}>
          <div className={styles.list_name}>{name}</div>
          <div className={styles.list_date}>
            {date_start}~{date_end}
          </div>
          <div className={styles.list_area}>{area}</div>
        </div>
      </div>
    </div>
  );
}

export default List;
