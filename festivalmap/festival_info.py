import requests, urllib.request
from bs4 import BeautifulSoup
from urllib.error import HTTPError

def festival(id):
    URL = f'https://korean.visitkorea.or.kr/kfes/detail/fstvlDetail.do?fstvlCntntsId={id}'

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
    title = soup.find("div", {"class": "slide_content"}).text
    title = title[:len(title)-4].strip()
    content = soup.find("p", {"class": "slide_content"}).text
    content = content[content.find("]")+1:].strip()
    
    img_num = 1
    img_jpg = []
    img_JPG = []
    for i in range(2, 20):
        # img 상태코드로 존재여부 확인 및 확장자별 분리
        try:
            urllib.request.urlopen(f'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/{id}_{i}.png').status
        except HTTPError:
            try:
                urllib.request.urlopen(f'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/{id}_{i}.jpg').status
                img_jpg.append(i)
            except HTTPError:
                try:
                    urllib.request.urlopen(f'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/{id}_{i}.JPG').status
                    img_JPG.append(i)
                except HTTPError:
                    img_num = i - 1
                    break;
    
    insta = ''
    homepage = ''
    
    info_box = soup.find("div", {"class": "img_info_box"})
    date = info_box.find("div", {"class": "data"}).next_sibling.next_sibling.text.strip()
    location = info_box.find("div", {"class": "location"}).next_sibling.next_sibling.text.strip()
    price = info_box.find("div", {"class": "price"}).next_sibling.next_sibling.text.strip()
    partner = info_box.find("div", {"class": "partner"}).next_sibling.next_sibling.text.strip()
    tell = info_box.find("div", {"class": "tell"}).next_sibling.next_sibling.text.strip()
    if (info_box.find("div", {"class": "instar"})):
        insta = info_box.find("div", {"class": "instar"}).next_sibling.next_sibling.text.strip()
    if (soup.find("a", {"class": "homepage_link_btn"})):
        homepage = soup.find("a", {"class": "homepage_link_btn"})['href']
    
    result = {
            'title': title,
            'content': content,
            'img_num': img_num,
            'img_jpg': img_jpg,
            'img_JPG': img_JPG,
            'date': date,
            'location': location,
            'price': price,
            'partner': partner,
            'tell': tell,
            'insta': insta,
            'homepage': homepage,
            }
    
    return result

# print(festival('d5674ec1-2bb9-4c70-b82d-f9bb0566a188'))