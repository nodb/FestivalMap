document.addEventListener('DOMContentLoaded', function () {
  // 클래스명이 "img"인 모든 요소에 대해 클릭 이벤트 리스너를 추가
  var imgElements = document.querySelectorAll('.img');
  imgElements.forEach(function (imgElement) {
      imgElement.addEventListener('click', function () {
          // 클래스명이 "popup"인 요소를 찾아서 스타일을 변경
          var popupElement = document.querySelector('.popup');
          popupElement.style.display = 'flex';
          // 스크롤 비활성화
          document.body.style.overflow = 'hidden';
      });
  });
  // ID가 "close"인 버튼에 대한 클릭 이벤트 리스너를 추가
  var closeButton = document.getElementById('close');
  closeButton.addEventListener('click', function () {
      // 클래스명이 "popup"인 요소를 찾아서 스타일을 변경
      var popupElement = document.querySelector('.popup');
      popupElement.style.display = 'none';
      // 스크롤 활성화
      document.body.style.overflow = 'auto';
  });
});