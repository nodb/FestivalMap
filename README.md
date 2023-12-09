# 페스티벌 맵 | Festival Map🎆
<img alt = "페스티벌맵로고" src="https://github.com/nodb/FestivalMap/blob/main/public/logo512.png" width="200">

## ✍ Project Introduction
**"페스티벌 맵"** 은 **Javascript**와 **React**를 이용한 국내 축제와 공연에 대한 정보를 가져오는 웹 사이트로 축제와 공연에 대한 개최 여부, 필터 및 검색 기능과 길 찾기 기능 등 다양한 편리한 기능을 제공합니다.

## 🗂️ Project Structure
프로젝트 Festival Map의 'main' branch 디렉토리 구조입니다.

**📁 /public**
```
📄 index.html
Festival Map 메인 index 파일

📄 404.html
github의 SPA(Single Page Application) 에러 해결 파일
```
**📁 /src**
```
📄 App.js
컴포넌트를 정의하는 js 파일

📄 index.js
HTML 템플릿 및 JavaScript의 컴포넌트를 조합하는 메인 js 파일

📄 firebase.js
유저 DB js 파일
```
**📁 /src/components**
```
📄 Access.js
로그인 여부 확인 js 파일

📄 Detail.js
상세 페이지 js 파일
FestivalDetail.js과 ShowDetail.js로부터 받은 인수를 적용
이미지 슬라이더와 이미지 팝업이 구현

📄 Header.js
헤더 네비게이션바 js 파일
모든 페이지에 적용

📄 List.js
리스트 페이지 js 파일
Festival.js과 Show.js로부터 받은 인수를 적용
각 리스트 요소를 리턴

📄 Logout.js
로그아웃 기능 js 파일

📄 Map.js
카카오맵 js 파일
주소 마커 표시, 길찾기 기능

📄 Order.js
정렬 js 파일
정렬 : 리스트 페이지에 선택된 정렬 기준을 리턴

📄 Search.js
검색/필터 js 파일
검색 : 리스트 페이지에 입력된 검색어를 리턴
필터 : 리스트 페이지에 선택된 필터 기준을 리턴

```
**📁 /src/routes**
```
📄 Festival.js
축제 리스트 페이지 js 파일
헤더, 검색/필터, 정렬, 리스트 컴포넌트를 조합하는 리스트 페이지
축제 API를 통해 파싱한 정보(key, id, name, img, date, area, ing)를 map으로 각 요소를 List.js에 전달하여 리턴받아 화면에 출력

📄 FestivalDetail.js
축제 상세 페이지 js 파일
헤더, 디테일 컴포넌트를 조합하는 상세 페이지
축제 API를 통해 파싱한 정보(id, name, title, content, img, address, price, partner, tell, insta, homepage, ing)를 Detail.js에 전달하여 리턴받아 화면에 출력

📄 Home.js
메인 index 페이지 js 파일

📄 Login.js
로그인 기능 js 파일
email, password 통한 로그인

📄 Show.js
공연 리스트 페이지 js 파일
헤더, 검색/필터, 정렬, 리스트 컴포넌트를 조합하는 리스트 페이지
공연 API를 통해 파싱한 정보(key, id, name, img, date, area, ing)를 map으로 각 요소를 List.js에 전달하여 리턴받아 화면에 출력

📄 ShowDetail.js
공연 상세 페이지 js 파일
헤더, 디테일 컴포넌트를 조합하는 상세 페이지
공연 API를 통해 파싱한 정보(id, name, title, content, img, address, price, partner, tell, insta, homepage, ing)를 Detail.js에 전달하여 리턴받아 화면에 출력

📄 create-account.js
회원가입 기능 js 파일
name, email, password 통한 회원가입
```

## 🔗 Reference
- [velog.io | node.js](https://velog.io/@choi46910/node.js-API-%EC%84%9C%EB%B2%84-%EA%B5%AC%EC%B6%95-%EA%B8%B0%EC%B4%88) - 서버 구축 참고
- [legacy.reactjs.org | AJAX and APIs](https://legacy.reactjs.org/docs/faq-ajax.html) - API fetch 참고
- [velog.io | Router 이론](https://velog.io/@lllen/react-router) - Router 방식 참고
- [create-react-app | CRA Deployment](https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing) - GitHub Pages 호스팅 참고
- [iamsjy17.github.io | 깃허브 페이지 배포](https://iamsjy17.github.io/react/2018/11/04/githubpage-SPA.html) - GitHub Pages 호스팅 참고
- [Stack Overflow | 404 error](https://stackoverflow.com/questions/46056414/getting-404-for-links-with-create-react-app-deployed-to-github-pages) - GitHub Pages 호스팅 오류 참고

## ‍💻 Developer

| 학과         | 학번     | 이름   |
| ------------ | -------- | ------ |
| 컴퓨터공학과 | 19101216 | 노다빈 |

## 💳 License

이 프로젝트는 MIT 라이선스로 배포됩니다.  
상세한 라이선스 정보는 [LICENSE](https://github.com/nodb/FestivalMap/blob/main/LICENSE.txt) 파일에서 확인할 수 있습니다.
