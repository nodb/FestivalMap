import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Search from "../components/Search";
import Order from "../components/Order";
import List from "../components/List";
import styles from "./Festival.module.css";

function Show() {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [dateValue, setDateValue] = useState("^02");
  const [areaValue, setAreaValue] = useState("");
  const [genreValue, setGenreValue] = useState("");
  const [orderValue, setOrderValue] = useState("01");
  const [page, setPage] = useState(1);
  const [reset, setReset] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const getShows = async () => {
    let api = "";
    if (window.location.pathname === "/FestivalMap/show/") {
      api = `https://www.kopis.or.kr/por/db/pblprfr/selectPblprfrList.json?tabno=&pageRcdPer=12&pageIndex=${page}&prfState=${dateValue}&mt2zGenreCode=${genreValue}&signguCode=${areaValue}&orderGubun=${orderValue}`;
      setIsSearch(false);
    } else {
      const id = window.location.pathname.split("search/")[1];
      api = `https://www.kopis.or.kr/por/db/pblprfr/selectPblprfrList.json?tabno=&pageRcdPer=12&pageIndex=1&prfNm=${id}&orderGubun=${orderValue}`;
      setIsSearch(true);
    }

    setLoadingMore(true);

    const json = await (await fetch(api)).json();
    if (reset) {
      setShows([]);
      setReset(false);
    }

    setShows((prevFestivals) => [...prevFestivals, ...json.resultList]);
    setLoading(false);
    setLoadingMore(false);
  };

  const handleFilterChange = (selectedDate, selectedArea, selectedGenre) => {
    setDateValue(selectedDate);
    setAreaValue(selectedArea);
    setGenreValue(selectedGenre);
    setPage(1);
    setLoading(true);
    setReset(true);
  };
  const handleOrderChange = (orderType) => {
    setOrderValue(orderType);
    setPage(1);
    setLoading(true);
    setReset(true);
  };

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getShows();
  }, [dateValue, areaValue, genreValue, orderValue, page]);
  return (
    <div>
      <Header />
      <div className={styles.section_outer}>
        <section>
          <article>
            <div class={styles.head_box}>
              <Search
                isSearch={isSearch}
                isFestival={false}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className={styles.order_box}>
              <Order isFestival={false} onOrderChange={handleOrderChange} />
            </div>
            {loading ? (
              <div className={styles.loader}>
                <div>Loading...</div>
              </div>
            ) : (
              <>
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
                {loadingMore && (
                  <div className={styles.loader}>
                    <div>Loading...</div>
                  </div>
                )}
              </>
            )}
          </article>
        </section>
      </div>
    </div>
  );
}
export default Show;
