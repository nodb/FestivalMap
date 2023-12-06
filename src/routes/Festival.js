import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Search from "../components/Search";
import Order from "../components/Order";
import List from "../components/List";
import styles from "./Festival.module.css";

function Festival() {
  const [loading, setLoading] = useState(true);
  const [festivals, setFestivals] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [orderValue, setOrderValue] = useState("A");
  const [page, setPage] = useState(0);
  const [reset, setReset] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const getFestivals = async () => {
    let api = "";
    if (window.location.pathname === "/FestivalMap/festival/") {
      api = `https://korean.visitkorea.or.kr/kfes/list/selectWntyFstvlList.do?startIdx=${page}&searchDate=${dateValue}&searchArea=${areaValue}&searchType=${orderValue}&searchCate=`;
      setIsSearch(false);
    } else {
      const id = window.location.pathname.split("search/")[1];
      api = `https://korean.visitkorea.or.kr/kfes/list/selectWntyFstvlList.do?totalSearchText=${id}&startIdx=${page}&searchType=${orderValue}`;
      setIsSearch(true);
    }

    setLoadingMore(true);

    const json = await (await fetch(api)).json();
    if (reset) {
      setFestivals([]);
      setReset(false);
    }

    setFestivals((prevFestivals) => [...prevFestivals, ...json.resultList]);
    setLoading(false);
    setLoadingMore(false);
  };

  const handleFilterChange = (selectedDate, selectedArea) => {
    setDateValue(selectedDate);
    setAreaValue(selectedArea);
    setPage(0);
    setLoading(true);
    setReset(true);
  };

  const handleOrderChange = (orderType) => {
    setOrderValue(orderType);
    setPage(0);
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

    if (scrollTop + clientHeight >= scrollHeight - 10 && !loadingMore) {
      setPage((prevPage) => prevPage + 12);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getFestivals();
  }, [dateValue, areaValue, orderValue, page]);

  return (
    <div>
      <Header />
      <div className={styles.section_outer}>
        <section>
          <article>
            <div className={styles.head_box}>
              <Search
                isSearch={isSearch}
                isFestival={true}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className={styles.order_box}>
              <Order isFestival={true} onOrderChange={handleOrderChange} />
            </div>
            {loading ? (
              <div className={styles.loader}>
                <div>Loading...</div>
              </div>
            ) : (
              <>
                <ul className={styles.list_box} id={styles.list_box}>
                  {festivals.map((festival) => (
                    <li className={styles.list} key={festival.fstvlCntntsId}>
                      <Link to={`/festival/${festival.fstvlCntntsId}`}>
                        <List
                          id={festival.fstvlCntntsId}
                          name={festival.cntntsNm}
                          img={festival.dispFstvlCntntsImgRout}
                          date_start={festival.fstvlBgngDe}
                          date_end={festival.fstvlEndDe}
                          area={festival.areaNm}
                          ing={festival.fstvlIngFlag}
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

export default Festival;
