import requests
import urllib.request
from bs4 import BeautifulSoup
from urllib.error import HTTPError


def festival(id):
    URL = f'https://korean.visitkorea.or.kr/kfes/detail/fstvlDetail.do?fstvlCntntsId={id}'

    response = requests.get(url=URL)
    soup = BeautifulSoup(response.text, "lxml")
    
    # ing : 진행여부
    # name : 이름
    # title : 주제
    # content : 내용
    # img : 이미지
    # date : 날짜
    # location : 장소
    # price : 가격
    # partner : 주관사
    # tell : 전화번호
    # insta : 인스타그램 아이디
    # homepage : 홈페이지
    
    ing = soup.find("p", {"class": "time_num"}).text
    name = soup.find("h2", {"id": "festival_head"}).text
    title = soup.find("div", {"class": "slide_content"}).decode_contents(formatter="html")
    title = title.split("<button")[0]
    # title = soup.find("div", {"class": "slide_content"}).text
    # title = title[:len(title)-4].strip()
    content = soup.find("p", {"class": "slide_content"}).decode_contents(formatter="html")
    # content = soup.find("p", {"class": "slide_content"}).text
    # content = content[content.find("]")+1:].strip()

    img = []
    img.append(soup.find("meta", {"property": "og:image"})["content"])
    bg = soup.find("div", {"class": "visula_bg"})["style"]
    img.append(bg[bg.find("https"):bg.find(")")])
    for i in soup.find_all("img", {"onerror": "this.src='/kfes/resources/img/default_detail_02.png';"}):
        img.append(i["src"])

    insta = ''
    homepage = ''

    info_box = soup.find("div", {"class": "img_info_box"})
    date = info_box.find("div", {"class": "data"}
                         ).next_sibling.next_sibling.text.strip()
    address = info_box.find(
        "div", {"class": "location"}).next_sibling.next_sibling.text.strip()
    price = info_box.find("div", {"class": "price"}
                          ).next_sibling.next_sibling.decode_contents(formatter="html")
    # price = info_box.find("div", {"class": "price"}
    #                       ).next_sibling.next_sibling.text.strip()
    partner = info_box.find(
        "div", {"class": "partner"}).next_sibling.next_sibling.text.strip()
    tell = info_box.find("div", {"class": "tell"}
                         ).next_sibling.next_sibling.text.strip()
    if (info_box.find("div", {"class": "instar"})):
        insta = info_box.find(
            "div", {"class": "instar"}).next_sibling.next_sibling.text.strip()
    if (soup.find("a", {"class": "homepage_link_btn"})):
        homepage = soup.find("a", {"class": "homepage_link_btn"})['href']

    result = {
        'ing': ing,
        'name': name,
        'title': title,
        'content': content,
        'img': img,
        'date': date,
        'address': address,
        'price': price,
        'partner': partner,
        'tell': tell,
        'insta': insta,
        'homepage': homepage,
    }

    return result

# print(festival('d5674ec1-2bb9-4c70-b82d-f9bb0566a188'))
