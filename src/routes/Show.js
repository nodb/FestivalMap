import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Search from "../components/Search";
import Order from "../components/Order";
import List from "../components/List";
import styles from "./Festival.module.css";

function Show({ num, type }) {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [dateValue, setDateValue] = useState("^02");
  const [areaValue, setAreaValue] = useState("");
  const [genreValue, setGenreValue] = useState("");
  const getShows = async () => {
    setLoading(true);
    let api = "";
    // /show/
    if (window.location.pathname === "/FestivalMap/show/") {
      api = `https://www.kopis.or.kr/por/db/pblprfr/selectPblprfrList.json?tabno=&pageRcdPer=12&pageIndex=${num}&orderGubun=${type}&prfState=${dateValue}&mt2zGenreCode=${genreValue}&signguCode=${areaValue}`;
    } else {
      // /show/search/id
      const id = window.location.pathname.split("search/")[1];
      api = `https://www.kopis.or.kr/por/db/pblprfr/selectPblprfrList.json?tabno=&pageRcdPer=12&pageIndex=1&prfNm=${id}`;
    }
    const json = await (await fetch(api)).json();
    setShows(json.resultList);
    setLoading(false);
  };
  const handleFilterChange = (selectedDate, selectedArea, selectedGenre) => {
    setDateValue(selectedDate);
    setAreaValue(selectedArea);
    setGenreValue(selectedGenre);
  };
  useEffect(() => {
    getShows();
  }, [dateValue, areaValue, genreValue]);
  console.log(shows);
  return (
    <div>
      <Header />
      <div className={styles.section_outer}>
        <section>
          <article>
            <div class={styles.head_box}>
              <Search isFestival={false} onFilterChange={handleFilterChange} />
            </div>
            <div className={styles.order_box}>
              <Order isFestival={false} />
            </div>
            {loading ? (
              <div className={styles.loader}>
                <div>Loading...</div>
              </div>
            ) : (
              <ul className={styles.list_box} id={styles.list_box}>
                {shows.map((show) => (
                  <li className={styles.list}>
                    <Link to={`/show/${show.mt20Id}`}>
                      <List
                        key={show.mt20Id}
                        id={show.mt20Id}
                        name={show.prfNm}
                        img={"https://www.kopis.or.kr" + show.poster}
                        date_start={show.prfPdFrom}
                        date_end={show.prfPdTo}
                        area={show.signguNm}
                        ing={show.prfState}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </section>
      </div>
    </div>
  );
}
export default Show;
