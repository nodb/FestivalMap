import React, { useState } from "react";
import styles from "./List.module.css";

function Search({ isFestival, onFilterChange }) {
  const [search, setSearch] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const [selectArea, setSelectArea] = useState("");
  const [selectGenre, setSelectGenre] = useState("");

  const handleSearch = () => {
    if (search.trim() !== "") {
      const path = isFestival
        ? `/FestivalMap/festival_search/${search}`
        : `/FestivalMap/show_search/${search}`;
      window.location.href = path;
    }
  };
  const handleFilterChange = () => {
    if (isFestival) {
      if (selectDate || selectArea) {
        onFilterChange(selectDate, selectArea, selectGenre);
      }
    } else {
      if (selectDate || selectArea || selectGenre) {
        if (!selectDate) {
          setSelectDate("^02");
        }
        onFilterChange(selectDate, selectArea, selectGenre);
      }
    }
  };

  return (
    <div>
      <div className={styles.search_text}>
        {isFestival ? "축제 " : "공연 "}검색
      </div>
      <div className={styles.search_box}>
        <input
          type="text"
          id={isFestival ? "festival_search" : "show_search"}
          className={styles.search}
          placeholder="검색어를 입력해주세요."
          maxlength="40"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.search_icon} onClick={handleSearch}>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
          </svg>
        </button>
      </div>
      <div className={styles.filter_box}>
        {isFestival ? (
          <div className={styles.select_box}>
            <div className={styles.select_box_fetival}>
              <label htmlFor="select_date"></label>
              <select
                name="select_date"
                id={styles.select_date}
                onChange={(e) => setSelectDate(e.target.value)}
              >
                <option value="">시기</option>
                <option value="A">진행중</option>
                <option value="B">진행예정</option>
                <option value="01">01월</option>
                <option value="02">02월</option>
                <option value="03">03월</option>
                <option value="04">04월</option>
                <option value="05">05월</option>
                <option value="06">06월</option>
                <option value="07">07월</option>
                <option value="08">08월</option>
                <option value="09">09월</option>
                <option value="10">10월</option>
                <option value="11">11월</option>
                <option value="12">12월</option>
              </select>
            </div>
            <div className={styles.select_box_fetival}>
              <label htmlFor="select_area"></label>
              <select
                name="select_area"
                id={styles.select_area}
                onChange={(e) => setSelectArea(e.target.value)}
              >
                <option value="">지역</option>
                <option value="1">서울</option>
                <option value="2">인천</option>
                <option value="3">대전</option>
                <option value="4">대구</option>
                <option value="5">광주</option>
                <option value="6">부산</option>
                <option value="7">울산</option>
                <option value="8">세종시</option>
                <option value="31">경기도</option>
                <option value="32">강원도</option>
                <option value="33">충청북도</option>
                <option value="34">충청남도</option>
                <option value="35">경상북도</option>
                <option value="36">경상남도</option>
                <option value="37">전라북도</option>
                <option value="38">전라남도</option>
                <option value="39">제주도</option>
              </select>
            </div>
          </div>
        ) : (
          <div className={styles.select_box}>
            <div className={styles.select_box_show}>
              <label htmlFor="select_date"></label>
              <select
                name="select_date"
                id={styles.select_date}
                onChange={(e) => setSelectDate(e.target.value)}
              >
                <option value="">시기</option>
                <option value="^02">진행중</option>
                <option value="^01">진행예정</option>
                <option value="^03">진행완료</option>
                <option value="^04">오픈런</option>
                <option value="^05">리미티드런</option>
                <option value="^06">마감임박</option>
              </select>
            </div>
            <div className={styles.select_box_show}>
              <label htmlFor="select_genre"></label>
              <select
                name="select_genre"
                id={styles.select_genre}
                onChange={(e) => setSelectGenre(e.target.value)}
              >
                <option value="">장르</option>
                <option value="^AAAA">연극</option>
                <option value="^GGGA">뮤지컬</option>
                <option value="^CCCA">서양음악(클래식)</option>
                <option value="^CCCC">한국음악(국악)</option>
                <option value="^CCCD">대중음악</option>
                <option value="^BBBC">무용(서양/한국무용)</option>
                <option value="^BBBE">대중무용</option>
                <option value="^EEEB">서커스/마술</option>
                <option value="^EEEA">복합</option>
              </select>
            </div>
            <div className={styles.select_box_show}>
              <label htmlFor="select_area"></label>
              <select
                name="select_area"
                id={styles.select_area}
                onChange={(e) => setSelectArea(e.target.value)}
              >
                <option value="">지역</option>
                <option value="^11">서울</option>
                <option value="^28">인천</option>
                <option value="^30">대전</option>
                <option value="^27">대구</option>
                <option value="^29">광주</option>
                <option value="^26">부산</option>
                <option value="^31">울산</option>
                <option value="^36">세종시</option>
                <option value="^41">경기도</option>
                <option value="^51|^42">강원도</option>
                <option value="^43">충청북도</option>
                <option value="^44">충청남도</option>
                <option value="^47">경상북도</option>
                <option value="^48">경상남도</option>
                <option value="^45">전라북도</option>
                <option value="^46">전라남도</option>
                <option value="^50">제주도</option>
              </select>
            </div>
          </div>
        )}
        <button
          className={styles.reset}
          onClick={() => window.location.reload()}
        >
          <svg
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z"
              fill-rule="nonzero"
            />
          </svg>
        </button>
        <button className={styles.filter_search} onClick={handleFilterChange}>
          필터 검색
        </button>
      </div>
    </div>
  );
}

export default Search;
