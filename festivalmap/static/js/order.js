// 진행여부 창
function progress() {
  var ing = document.querySelectorAll(".ing");
  ing.forEach(function (div) {
    // 현재 값 가져오기
    var value = div.innerHTML;

    if (value === "0" || value == "공연중") {
      div.innerHTML = "진행중";
    } else if (value === "1" || value == "공연예정") {
      div.innerHTML = "진행예정";
    } else {
      div.style.display = "none";
    }
  });
}

progress();

function order(id) {
  if (id === "인기순" || id === "축제일순") {
    isFestival = true;
    var url =
      "https://korean.visitkorea.or.kr/kfes/list/selectWntyFstvlList.do";
    if (id === "인기순") {
      var typeValue = "B"; // 인기순 : B
      document.getElementById(id).classList.add("check");
      document.getElementById("축제일순").classList.remove("check");
    } else if (id === "축제일순") {
      var typeValue = "A"; // 축제일순: A
      document.getElementById(id).classList.add("check");
      document.getElementById("인기순").classList.remove("check");
    }
    var searchValue = document.getElementById("searchValue");
    if (searchValue) {
      searchValue = searchValue.innerText.slice(1, -1);
    } else {
      searchValue = "";
    }
    var startIdxValue = 0;
    var requestData = {
      totalSearchText: searchValue,
      searchDate: dateValue,
      searchArea: areaValue,
      startIdx: startIdxValue,
      searchType: typeValue,
    };
    fetchData(url, requestData, function (data) {
      removeList();
      createList(data, isFestival);
      progress();
    });
  } else if (id === "종료임박순" || id === "업데이트순") {
    isFestival = false;
    var url = "https://www.kopis.or.kr/por/db/pblprfr/selectPblprfrList.json";
    if (id === "종료임박순") {
      var orderValue = "02"; // 종료임박순 : 02
      document.getElementById(id).classList.add("check");
      document.getElementById("업데이트순").classList.remove("check");
    } else if (id === "업데이트순") {
      var orderValue = "01"; // 업데이트순: 01
      document.getElementById(id).classList.add("check");
      document.getElementById("종료임박순").classList.remove("check");
    }
    var searchValue = document.getElementById("searchValue");
    if (searchValue) {
      searchValue = searchValue.innerText.slice(1, -1);
    } else {
      searchValue = "";
    }
    var page = "12";
    var pagenum = "1";
    var requestData = {
      prfNm: searchValue,
      prfState: dateValue2,
      signguCode: genreValue,
      signguCode: areaValue,
      tabno: "",
      pageRcdPer: page,
      pageIndex: pagenum,
      orderGubun: orderValue,
    };
    fetchData(url, requestData, function (data) {
      removeList();
      createList(data, isFestival);
      progress();
    });
  }
}
