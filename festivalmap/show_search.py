import requests


def show(id):
    API = f'https://www.kopis.or.kr/por/db/pblprfr/selectPblprfrList.json?prfState=^02&tabno=&pageRcdPer=12&pageIndex=1&prfNm={id}'
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

    return result
