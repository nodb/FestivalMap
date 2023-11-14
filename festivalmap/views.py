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
    article = ''
    for x in festival_list.festival(0):
        article += f'''
                    <li>
                        <a href="{x["id"]}">
                            <img src="{x["img"]}", height=200/>
                            {x["name"]}
                            {x["date_start"]}~{x["date_end"]}
                            {x["area"]}
                        </a>
                    </li>
                    '''
    return HttpResponse(HTMLTemplate(article))


def festival_id(request, id):
    article = ''
    x = festival_info.festival(id)
    img = ''
    for i in range(2, x["img_num"]):
        img += f'<img src="https://cdn.visitkorea.or.kr/kfes/upload/contents/db/{id}_{i}.'
        if i in x["img_jpg"]:
            img += 'jpg'
        elif i in x["img_JPG"]:
            img += 'JPG'
        else:
            img += 'png'
        img += '" loading="lazy">'
    insta = ''
    if x["insta"]:
        insta = f'<li>인스타그램 아이디 : <a href="https://www.instagram.com/{x["insta"]}">{x["insta"]}</li>'
    homepage = ''
    if x["homepage"]:
        homepage = f'<li>홈페이지 : <a href="{x["homepage"]}">{x["homepage"]}</a></li>'
    article = f'''
                <a href="https://korean.visitkorea.or.kr/kfes/detail/fstvlDetail.do?fstvlCntntsId={id}"></a>
                <li>행사주제 : {x["title"]}</li>
                <li>행사내용 : {x["content"]}</li>
                <li>이미지 : {img}</li>
                <li>날짜 : {x["date"]}</li>
                <li>주소 : {x["address"]}</li>
                <li>가격 : {x["price"]}</li>
                <li>주관사 : {x["partner"]}</li>
                <li>전화번호 : {x["tell"]}</li>
                {insta}
                {homepage}
                '''
    return HttpResponse(HTMLTemplate(article))


def show(request):
    article = ''
    for x in show_list.show():
        article += f'''
                    <li>
                        <a href="{x["id"]}">
                            <img src="https://www.kopis.or.kr/{x["img"]}", height=200/>
                            {x["genre"]}
                            {x["name"]}
                            {x["date_start"]}~{x["date_end"]}
                            {x["area"]}
                        </a>
                    </li>
                    '''
    return HttpResponse(HTMLTemplate(article))


def show_id(request, id):
    article = ''
    x = show_info.show(id)
    img = ''
    for y in x["img"]:
        img += f'<img src="{y}" loading="lazy"'
    homepage = ''
    if x["homepage"]:
        homepage = f'<li>홈페이지 : <a href="{x["homepage"]}">{x["homepage"]}</a></li>'
    article = f'''
                <a href="https://www.kopis.or.kr/por/db/pblprfr/pblprfrView.do?menuId=MNU_00020&mt20Id={id}"></a>
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
