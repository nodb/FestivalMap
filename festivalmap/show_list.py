import requests


def show(num):
    API = f'https://www.kopis.or.kr/por/db/pblprfr/selectPblprfrList.json?prfState=^02&tabno=&pageRcdPer=100&pageIndex={num}'
    result = []

    response = requests.get(url=API)
    json = response.json()
    results = json['resultList']

    for i, x in enumerate(results):
        result.append({'name': x["prfNm"],
                       'id': x["mt20Id"],
                       'img': x["poster"],
                       'date_start': x["prfPdFrom"],
                       'date_end': x["prfPdTo"],
                       'genre': x['genreNm'],
                       'area': x['signguNm'],
                       'address': x['adres']})
        
    # title : 행사주제
    # content : 행사내용
    # bg_img : 배경 이미지
    # img_num : 이미지 개수
    # img_JPG : 확장자 JPG인 이미지 번호
    # date : 날짜
    # location : 장소
    # price : 가격
    # partner : 주관사
    # tell : 전화번호
    # insta : 인스타그램 아이디
    # homepage : 홈페이지

    return result
