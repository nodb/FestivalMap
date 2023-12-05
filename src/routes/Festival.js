import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Search from "../components/Search";
import Order from "../components/Order";
import List from "../components/List";
import styles from "./Festival.module.css";

function Festival({ num }) {
  const [loading, setLoading] = useState(true);
  const [festivals, setFestivals] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [orderValue, setOrderValue] = useState("A");

  const getFestivals = async () => {
    let api = "";
    // /festival/
    if (window.location.pathname === "/FestivalMap/festival/") {
      api = `https://korean.visitkorea.or.kr/kfes/list/selectWntyFstvlList.do?startIdx=${num}&searchDate=${dateValue}&searchArea=${areaValue}&searchType=${orderValue}&searchCate=`;
      setIsSearch(false);
    } else {
      // /festival/search/id
      const id = window.location.pathname.split("search/")[1];
      api = `https://korean.visitkorea.or.kr/kfes/list/selectWntyFstvlList.do?totalSearchText=${id}&searchType=${orderValue}`;
      setIsSearch(true);
    }
    const json = await (await fetch(api)).json();
    setFestivals(json.resultList);
    setLoading(false);
  };
  const handleFilterChange = (selectedDate, selectedArea) => {
    setDateValue(selectedDate);
    setAreaValue(selectedArea);
  };
  const handleOrderChange = (orderType) => {
    setOrderValue(orderType);
  };
  useEffect(() => {
    getFestivals();
  }, [dateValue, areaValue, orderValue]);
  console.log(orderValue);
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
              <ul className={styles.list_box} id={styles.list_box}>
                {festivals.map((festival) => (
                  <li className={styles.list}>
                    <Link to={`/festival/${festival.fstvlCntntsId}`}>
                      <List
                        key={festival.fstvlCntntsId}
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
            )}
          </article>
        </section>
      </div>
    </div>
  );
}
export default Festival;
