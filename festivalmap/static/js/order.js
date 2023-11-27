function order(id) {
    var url = "https://korean.visitkorea.or.kr/kfes/list/selectWntyFstvlList.do";
    if (id === '인기순') {
        var typeValue = 'B';  // 인기순 : B
        document.getElementById("축제일순").style.color = "black";
        document.getElementById("축제일순").style.fontWeight = "normal";
        document.getElementById(id).style.color = '#f89e86';
        document.getElementById(id).style.fontWeight = "bold";
    } else {
        var typeValue = 'A';  // 축제일순: A
        document.getElementById("인기순").style.color = "black";
        document.getElementById("인기순").style.fontWeight = "normal";
        document.getElementById(id).style.color = '#f89e86';
        document.getElementById(id).style.fontWeight = "bold";
    }
    var startIdxValue = 0;

    $.ajax({
        type: "POST",
        url: url,
        data: {
            startIdx: startIdxValue,
            searchType: typeValue,
            searchDate: '',
            searchArea: '',
            searchCate: ''
        },
        // 서버에서 받은 데이터를 처리
        success: function(data) {
            // list 클래스 삭제
            var list = document.getElementsByClassName('list');
            while (list.length > 0) {
                list[0].parentNode.removeChild(list[0]);
            }

            // console.log(data.resultList)
            for(x of data.resultList) {
                console.log(x)
                // ul 요소를 찾습니다.
                var listBox = document.getElementById('list_box');

                // li 요소 생성
                var listItem = document.createElement('li');
                listItem.classList.add('list');

                // a 요소 생성
                var link = document.createElement('a');
                link.href = "/festival/" + x.fstvlCntntsId;

                // thumbnail_box 생성
                var thumbnailBox = document.createElement('div');
                thumbnailBox.classList.add('thumbnail_box');

                // 이미지 생성
                var thumbnail = document.createElement('img');
                thumbnail.src = x.dispFstvlCntntsImgRout;
                thumbnail.classList.add('thumbnail');

                // content_box 생성
                var contentBox = document.createElement('div');
                contentBox.classList.add('content_box');

                // 축제 이름 생성
                var name = document.createElement('div');
                name.classList.add('list_name');
                name.textContent = x.cntntsNm;

                // 날짜 생성
                var date = document.createElement('div');
                date.classList.add('list_date');
                date.textContent = x.fstvlBgngDe + "~" + x.fstvlEndDe;

                // 지역 생성
                var area = document.createElement('div');
                area.classList.add('list_area');
                area.textContent = x.areaNm;

                // 생성한 요소들을 순서대로 조립
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
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}