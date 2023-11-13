import requests


def show():
    API = f'https://www.kopis.or.kr/por/db/pblprfr/selectPblprfrList.json?prfState=^02&tabno=&pageRcdPer=12&pageIndex=1'
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
    '''
    title : 행사주제
    content : 행사내용
    bg_img : 배경 이미지
    img_num : 이미지 개수
    img_JPG : 확장자 JPG인 이미지 번호
    date : 날짜
    location : 장소
    price : 가격
    partner : 주관사
    tell : 전화번호
    insta : 인스타그램 아이디
    homepage : 홈페이지
    '''
    # title = soup.find("div", {"class": "slide_content"}).text
    # title = title[:len(title)-4].strip()
    # content = soup.find("p", {"class": "slide_content"}).text
    # content = content[content.find("]")+1:].strip()

    # info_box = soup.find("div", {"class": "img_info_box"})
    # date = info_box.find("div", {"class": "data"}).next_sibling.next_sibling.text.strip()
    # location = info_box.find("div", {"class": "location"}).next_sibling.next_sibling.text.strip()
    # price = info_box.find("div", {"class": "price"}).next_sibling.next_sibling.text.strip()
    # partner = info_box.find("div", {"class": "partner"}).next_sibling.next_sibling.text.strip()
    # tell = info_box.find("div", {"class": "tell"}).next_sibling.next_sibling.text.strip()
    # if (info_box.find("div", {"class": "instar"})):
    #     insta = info_box.find("div", {"class": "instar"}).next_sibling.next_sibling.text.strip()
    # if (soup.find("a", {"class": "homepage_link_btn"})):
    #     homepage = soup.find("a", {"class": "homepage_link_btn"})['href']

    return result


# print(festival())
