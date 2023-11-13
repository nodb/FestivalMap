import requests
import urllib.request
from bs4 import BeautifulSoup
from urllib.error import HTTPError


def show(id):
    URL = f'https://www.kopis.or.kr/por/db/pblprfr/pblprfrView.do?menuId=MNU_00020&mt20Id={id}'

    response = requests.get(url=URL)
    soup = BeautifulSoup(response.text, "lxml")
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

    img = []
    imgs = soup.find("div", "detailArea")
    # img.append(imgs.select("img")[0]['src'])
    # for i in range(int(len(imgs)/2)):
    #     img.append(imgs.select("img")[i]['src'])
    for i, x in enumerate(imgs):
        if x:
            continue
        img.append(imgs.select("img")[i]['src'])

    # img_jpg = []
    # img_JPG = []
    # for i in range(2, 20):
    #     # img 상태코드로 존재여부 확인 및 확장자별 분리
    #     try:
    #         urllib.request.urlopen(
    #             f'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/{id}_{i}.png').status
    #     except HTTPError:
    #         try:
    #             urllib.request.urlopen(
    #                 f'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/{id}_{i}.jpg').status
    #             img_jpg.append(i)
    #         except HTTPError:
    #             try:
    #                 urllib.request.urlopen(
    #                     f'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/{id}_{i}.JPG').status
    #                 img_JPG.append(i)
    #             except HTTPError:
    #                 img_num = i - 1
    #                 break

    # insta = ''
    # homepage = ''

    info_box = soup.find("ul", {"class": "ro_utb"})
    date = info_box('dd')[0].text.strip()
    date = date[:13] + ' ~ ' + date[-13:]
    # location = info_box.find(
    #     "div", {"class": "location"}).next_sibling.next_sibling.text.strip()
    price = info_box('dd')[4].text.strip()
    partner = info_box('dd')[7].text.strip()
    if partner == "해당정보 없음":
        partner = info_box('dd')[8].text.strip()

    # partner = info_box.find(
    #     "div", {"class": "partner"}).next_sibling.next_sibling.text.strip()
    # tell = info_box.find("div", {"class": "tell"}
    #                      ).next_sibling.next_sibling.text.strip()
    # if (info_box.find("div", {"class": "instar"})):
    #     insta = info_box.find(
    #         "div", {"class": "instar"}).next_sibling.next_sibling.text.strip()
    # if (soup.find("a", {"class": "homepage_link_btn"})):
    #     homepage = soup.find("a", {"class": "homepage_link_btn"})['href']

    result = {
        # 'title': title,
        # 'content': content,
        # 'img_num': img_num,
        # 'img_jpg': img_jpg,
        # 'img_JPG': img_JPG,
        # 'date': date,
        # 'location': location,
        # 'price': price,
        # 'partner': partner,
        # 'tell': tell,
        # 'insta': insta,
        # 'homepage': homepage,
    }

    return img


print(show('PF229411'))
