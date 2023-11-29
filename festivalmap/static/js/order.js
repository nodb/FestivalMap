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
    var url =
      "https://korean.visitkorea.or.kr/kfes/list/selectWntyFstvlList.do";
    if (id === "인기순") {
      var typeValue = "B"; // 인기순 : B
      document.getElementById("축제일순").style.color = "black";
      document.getElementById("축제일순").style.fontWeight = "normal";
      document.getElementById(id).style.color = "#f89e86";
      document.getElementById(id).style.fontWeight = "bold";
    } else if (id === "축제일순") {
      var typeValue = "A"; // 축제일순: A
      document.getElementById("인기순").style.color = "black";
      document.getElementById("인기순").style.fontWeight = "normal";
      document.getElementById(id).style.color = "#f89e86";
      document.getElementById(id).style.fontWeight = "bold";
    }
    var searchValue = document.getElementById("searchValue");
    if (searchValue) {
      searchValue = searchValue.innerText.slice(1, -1);
    } else {
      searchValue = "";
    }
    var startIdxValue = 0;

    $.ajax({
      type: "POST",
      url: url,
      data: {
        totalSearchText: searchValue,
        searchDate: dateValue,
        searchArea: areaValue,
        startIdx: startIdxValue,
        searchType: typeValue,
      },
      // 서버에서 받은 데이터를 처리
      success: function (data) {
        removeList();

        for (x of data.resultList) {
          // ul 요소를 찾기
          var listBox = document.getElementById("list_box");

          // li 요소 생성
          var listItem = document.createElement("li");
          listItem.classList.add("list");

          // a 요소 생성
          var link = document.createElement("a");
          link.href = "/festival/" + x.fstvlCntntsId;

          // thumbnail_box 생성
          var thumbnailBox = document.createElement("div");
          thumbnailBox.classList.add("thumbnail_box");

          // 진행여부 생성
          var ing = document.createElement("div");
          ing.classList.add("ing");
          ing.textContent = x.fstvlIngFlag;

          // 이미지 생성
          var thumbnail = document.createElement("img");
          thumbnail.src = x.dispFstvlCntntsImgRout;
          thumbnail.classList.add("thumbnail");

          // content_box 생성
          var contentBox = document.createElement("div");
          contentBox.classList.add("content_box");

          // 축제 이름 생성
          var name = document.createElement("div");
          name.classList.add("list_name");
          name.textContent = x.cntntsNm;

          // 날짜 생성
          var date = document.createElement("div");
          date.classList.add("list_date");
          date.textContent = x.fstvlBgngDe + "~" + x.fstvlEndDe;

          // 지역 생성
          var area = document.createElement("div");
          area.classList.add("list_area");
          area.textContent = x.areaNm;

          // 생성한 요소들을 순서대로 조립
          thumbnailBox.appendChild(ing);
          thumbnailBox.appendChild(thumbnail);

          contentBox.appendChild(name);
          contentBox.appendChild(date);
          contentBox.appendChild(area);

          link.appendChild(thumbnailBox);
          link.appendChild(contentBox);

          listItem.appendChild(link);

          // 완성된 li 요소를 ul에 추가
          listBox.appendChild(listItem);
        }
        progress();
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  } else if (id === "종료임박순" || id === "업데이트순") {
    var url = "https://www.kopis.or.kr/por/db/pblprfr/selectPblprfrList.json";
    if (id === "종료임박순") {
      var orderValue = "02"; // 종료임박순 : 02
      document.getElementById("업데이트순").style.color = "black";
      document.getElementById("업데이트순").style.fontWeight = "normal";
      document.getElementById(id).style.color = "#f89e86";
      document.getElementById(id).style.fontWeight = "bold";
    } else if (id === "업데이트순") {
      var orderValue = "01"; // 업데이트순: 01
      document.getElementById("종료임박순").style.color = "black";
      document.getElementById("종료임박순").style.fontWeight = "normal";
      document.getElementById(id).style.color = "#f89e86";
      document.getElementById(id).style.fontWeight = "bold";
    }
    var searchValue = document.getElementById("searchValue");
    if (searchValue) {
      searchValue = searchValue.innerText.slice(1, -1);
    } else {
      searchValue = "";
    }
    var page = "12";
    var pagenum = "1";

    $.ajax({
      type: "POST",
      url: url,
      data: {
        prfNm: searchValue,
        prfState: dateValue2,
        signguCode: genreValue,
        signguCode: areaValue,
        tabno: "",
        pageRcdPer: page,
        pageIndex: pagenum,
        orderGubun: orderValue,
      },
      // 서버에서 받은 데이터를 처리
      success: function (data) {
        removeList();

        for (x of data.resultList) {
          // ul 요소를 찾기
          var listBox = document.getElementById("list_box");

          // li 요소 생성
          var listItem = document.createElement("li");
          listItem.classList.add("list");

          // a 요소 생성
          var link = document.createElement("a");
          link.href = "/show/" + x.mt20Id;

          // thumbnail_box 생성
          var thumbnailBox = document.createElement("div");
          thumbnailBox.classList.add("thumbnail_box");

          // 진행여부 생성
          var ing = document.createElement("div");
          ing.classList.add("ing");
          ing.textContent = x.prfState;

          // 이미지 생성
          var thumbnail = document.createElement("img");
          thumbnail.src = "https://www.kopis.or.kr/" + x.poster;
          thumbnail.classList.add("thumbnail");

          // content_box 생성
          var contentBox = document.createElement("div");
          contentBox.classList.add("content_box");

          // 축제 이름 생성
          var name = document.createElement("div");
          name.classList.add("list_name");
          name.textContent = x.prfNm;

          // 날짜 생성
          var date = document.createElement("div");
          date.classList.add("list_date");
          date.textContent = x.prfPdFrom + "~" + x.prfPdTo;

          // 지역 생성
          var area = document.createElement("div");
          area.classList.add("list_area");
          area.textContent = x.signguNm;

          // 생성한 요소들을 순서대로 조립
          thumbnailBox.appendChild(ing);
          thumbnailBox.appendChild(thumbnail);

          contentBox.appendChild(name);
          contentBox.appendChild(date);
          contentBox.appendChild(area);

          link.appendChild(thumbnailBox);
          link.appendChild(contentBox);

          listItem.appendChild(link);

          // 완성된 li 요소를 ul에 추가
          listBox.appendChild(listItem);
        }
        progress();
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  }
}
