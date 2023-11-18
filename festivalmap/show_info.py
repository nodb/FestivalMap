import requests
from bs4 import BeautifulSoup
from urllib.error import HTTPError


def show(id):
    URL = f'https://www.kopis.or.kr/por/db/pblprfr/pblprfrView.do?menuId=MNU_00020&mt20Id={id}'

    response = requests.get(url=URL)
    soup = BeautifulSoup(response.text, "lxml")
    
    # name : 이름
    # title : 주제
    # content : 내용
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
    
    name = soup.find("h4", {"class": "tit"}).text
    img = []
    imgs = soup.find("div", "detailArea")
    for i, x in enumerate(imgs):
        try:
            img.append('https://www.kopis.or.kr' +
                       imgs.select("img")[i]['src'])
        except:
            continue

    info_box = soup.find_all("ul", {"class": "ro_utb"})
    date = info_box[0]('dd')[0].text.strip()
    date = date[:13] + ' ~ ' + date[-13:]
    location = info_box[0]('dd')[1].text.strip()
    time = info_box[0]('dd')[2].text.strip()
    price = info_box[0]('dd')[4].text.strip()
    partner = info_box[0]('dd')[7].text.strip()
    if partner == "해당정보 없음":
        partner = info_box[0]('dd')[8].text.strip()

    address = info_box[1]('dd')[2].text.strip()
    homepage = info_box[1]('dd')[3].text.strip()

    result = {
        'name': name,
        'img': img,
        'date': date,
        'location': location,
        'address': address,
        'time': time,
        'price': price,
        'partner': partner,
        'homepage': homepage,
    }

    return result


# print(show('PF229411'))
