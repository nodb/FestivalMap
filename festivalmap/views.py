from django.shortcuts import render, HttpResponse
from festivalmap import festival_list, festival_info, show_list, show_info


def HTMLTemplate(articleTag, id=None):
    return f'''
            <html>
            <body>
                <h1><a href="/">축제</h1>
                    {articleTag}
                <ul>
                    <li>hi</li>
                </ul>
            </body>
            </html>
            '''


def index(request):
    return render(request, 'festivalmap/index.html')


def festival(request):
    article = {}
    for i, x in enumerate(festival_list.festival(0)):
        article[f"list_{i}"] = {"id" : x["id"],
                                "이미지" : x["img"],
                                "이름" : x["name"],
                                "날짜" : x["date_start"]+"~"+x["date_end"],
                                "지역" : x["area"]}
    return render(request, 'festivalmap/list.html', {"article" : article})

def festival_id(request, id):
    article = ''
    x = festival_info.festival(id)
    insta = ''
    if x["insta"]:
        insta = x["insta"]
    homepage = ''
    if x["homepage"]:
        homepage = x["homepage"]
    article = {"이름" : x["name"],
               "주제" : x["title"],
               "내용" : x["content"],
               "배경" : x["img"][0],
               "이미지" : x["img"][1:],
               "이미지3" : x["img"][3:],
               "날짜" : x["date"],
               "주소" : x["address"],
               "가격" : x["price"],
               "주관사" : x["partner"],
               "전화번호" : x["tell"],
               "인스타" : insta,
               "홈페이지" : homepage}
    return render(request, 'festivalmap/detail.html', article)


def show(request):
    article = {}
    for i, x in enumerate(show_list.show(1)):
        article[f"list_{i}"] = {"id" : x["id"],
                                "이미지" : "https://www.kopis.or.kr/" + x["img"],
                                "이름" : x["name"],
                                "날짜" : x["date_start"]+"~"+x["date_end"],
                                "지역" : x["area"],
                                "장르" : x["genre"]}
    return render(request, 'festivalmap/list.html', {"article" : article})


def show_id(request, id):
    article = ''
    x = show_info.show(id)
    img = ''
    for y in x["img"]:
        img += f'<img src="{y}" loading="lazy">'
    homepage = ''
    if x["homepage"]:
        homepage = f'<li>홈페이지 : <a href="{x["homepage"]}">{x["homepage"]}</a></li>'
    article = f'''
                <a href="https://www.kopis.or.kr/por/db/pblprfr/pblprfrView.do?menuId=MNU_00020&mt20Id={id}"></a>
                <li>이름 : {x["name"]}</li>
                <li>이미지 : {img}</li>
                <li>날짜 : {x["date"]}</li>
                <li>장소 : {x["location"]}</li>
                <li>주소 : {x["address"]}</li>
                <li>시간 : {x["time"]}</li>
                <li>가격 : {x["price"]}</li>
                <li>주관사 : {x["partner"]}</li>
                {homepage}
                '''
    return HttpResponse(HTMLTemplate(article))
