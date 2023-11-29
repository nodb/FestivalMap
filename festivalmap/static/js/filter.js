function select() {
  dateValue = document.getElementById("select_date").value;
  dateValue2 = document.getElementById("select_date").value;
  if (document.getElementById("select_genre"))
    genreValue = document.getElementById("select_genre").value;
  areaValue = document.getElementById("select_area").value;
}

// list 클래스 삭제
function removeList() {
  var list = document.getElementsByClassName("list");
  while (list.length > 0) {
    list[0].parentNode.removeChild(list[0]);
  }
}

// list 클래스 생성
function createList(data, isFestival) {
  for (x of data.resultList) {
    // ul 요소를 찾기
    var listBox = document.getElementById("list_box");

    // li 요소 생성
    var listItem = document.createElement("li");
    listItem.classList.add("list");

    // a 요소 생성
    var link = document.createElement("a");
    link.href = isFestival
      ? "/festival/" + x.fstvlCntntsId
      : "/show/" + x.mt20Id;

    // thumbnail_box 생성
    var thumbnailBox = document.createElement("div");
    thumbnailBox.classList.add("thumbnail_box");

    // 진행여부 생성
    var ing = document.createElement("div");
    ing.classList.add("ing");
    ing.textContent = isFestival ? x.fstvlIngFlag : x.prfState;

    // 이미지 생성
    var thumbnail = document.createElement("img");
    thumbnail.src = isFestival
      ? x.dispFstvlCntntsImgRout
      : "https://www.kopis.or.kr/" + x.poster;
    thumbnail.classList.add("thumbnail");

    // content_box 생성
    var contentBox = document.createElement("div");
    contentBox.classList.add("content_box");

    // 축제 이름 생성
    var name = document.createElement("div");
    name.classList.add("list_name");
    name.textContent = isFestival ? x.cntntsNm : x.prfNm;

    // 날짜 생성
    var date = document.createElement("div");
    date.classList.add("list_date");
    date.textContent = isFestival
      ? x.fstvlBgngDe + "~" + x.fstvlEndDe
      : x.prfPdFrom + "~" + x.prfPdTo;

    // 지역 생성
    var area = document.createElement("div");
    area.classList.add("list_area");
    area.textContent = isFestival ? x.areaNm : x.signguNm;

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
}

// list 클래스 생성
function ajax(url, data) {
  $.ajax({
    type: "POST",
    url: url,
    data: {
      param,
    },
    success: function (data) {
      removeList();
      createList(data, isFestival);
      progress();
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

function filter() {
  if (window.location.href.endsWith("/festival/")) {
    if (dateValue !== "" || areaValue !== "") {
      isFestival = true;
      var url =
        "https://korean.visitkorea.or.kr/kfes/list/selectWntyFstvlList.do";
      var typeValue = "A";
      var startIdxValue = 0;
      $.ajax({
        type: "POST",
        url: url,
        data: {
          searchDate: dateValue,
          searchArea: areaValue,
          startIdx: startIdxValue,
          searchType: typeValue,
        },
        success: function (data) {
          removeList();
          createList(data, isFestival);
          progress();
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
        },
      });
    }
  } else if (window.location.href.endsWith("/show/")) {
    if (dateValue2 !== "" || genreValue !== "" || areaValue !== "") {
      isFestival = false;
      var url = "https://www.kopis.or.kr/por/db/pblprfr/selectPblprfrList.json";
      var orderValue = "01";
      var page = "12";
      var pagenum = "1";
      if (dateValue2 == "") {
        dateValue2 = "^02";
      }
      $.ajax({
        type: "POST",
        url: url,
        data: {
          prfState: dateValue2,
          signguCode: genreValue,
          signguCode: areaValue,
          tabno: "",
          pageRcdPer: page,
          pageIndex: pagenum,
          orderGubun: orderValue,
        },
        success: function (data) {
          removeList();
          createList(isFestival);
          progress();
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
        },
      });
    }
  }
}
