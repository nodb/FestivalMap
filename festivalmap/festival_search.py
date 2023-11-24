import requests


def festival(id):
    API = f'https://korean.visitkorea.or.kr/kfes/list/selectWntyFstvlList.do?totalSearchText={id}'
    result = []

    response = requests.get(url=API)
    json = response.json()
    # total = json['totalCnt']
    results = json['resultList']

    for i, x in enumerate(results):
        result.append({'name': x["cntntsNm"],
                       'id': x["fstvlCntntsId"],
                       'img': x["dispFstvlCntntsImgRout"],
                       'date_start': x["fstvlBgngDe"],
                       'date_end': x["fstvlEndDe"],
                       'area': x['areaNm'],
                       'address': x['adres']})

    return result
