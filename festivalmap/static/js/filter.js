function select() {
  dateValue = document.getElementById("select_date").value;
  dateValue2 = document.getElementById("select_date").value;
  genreValue = document.getElementById("select_genre").value;
  areaValue = document.getElementById("select_area").value;
}

function filter() {
  if (window.location.href.endsWith("/festival/")) {
    if (dateValue !== "" || areaValue !== "") {
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
        // 서버에서 받은 데이터를 처리
        success: function (data) {
          // list 클래스 삭제
          var list = document.getElementsByClassName("list");
          while (list.length > 0) {
            list[0].parentNode.removeChild(list[0]);
          }

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
    }
  } else if (window.location.href.endsWith("/show/")) {
    if (dateValue2 !== "" || genreValue !== "" || areaValue !== "") {
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
        // 서버에서 받은 데이터를 처리
        success: function (data) {
          // list 클래스 삭제
          var list = document.getElementsByClassName("list");
          while (list.length > 0) {
            list[0].parentNode.removeChild(list[0]);
          }

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
}
