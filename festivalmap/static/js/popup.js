document.addEventListener("DOMContentLoaded", function () {
  // 클래스명이 "img"인 모든 요소에 대해 클릭 이벤트 리스너를 추가
  var imgElements = document.querySelectorAll(".img");
  imgElements.forEach(function (imgElement) {
    imgElement.addEventListener("click", function () {
      // 클래스명이 "popup"인 요소를 찾아서 스타일을 변경
      var popupElement = document.querySelector(".popup");
      popupElement.style.display = "flex";
      // 스크롤 비활성화
      document.body.style.overflow = "hidden";
      // 클릭된 이미지의 id 가져오기
      var clickedImageId = event.target.id;
      document.querySelector(".large_slider").style.transform =
        "translate3d(" + (clickedImageId - 1) * -100 + "vw, 0px, 0px)";
      // 클릭된 이미지 체크
      document.getElementById("large_imgchk_" + clickedImageId).textContent =
        "🟣";
      document.getElementById("large_imgchk_" + clickedImageId).style.fontSize =
        "1.5rem";
    });
  });
  // ID가 "close"인 버튼에 대한 클릭 이벤트 리스너를 추가
  var closeButton = document.getElementById("close");
  closeButton.addEventListener("click", function () {
    // 클래스명이 "popup"인 요소를 찾아서 스타일을 변경
    var popupElement = document.querySelector(".popup");
    popupElement.style.display = "none";
    // 스크롤 활성화
    document.body.style.overflow = "auto";
    // 클릭된 이미지 체크 삭제
    var large_imgchks = document.querySelectorAll(".large_imgchk_button");
    large_imgchks.forEach(function (large_imgchk) {
      large_imgchk.textContent = "⚪";
      large_imgchk.style.fontSize = "1rem";
    });
  });
});

// 이전버튼 누르기
document.getElementById("large_prev").addEventListener("click", function () {
  large_updateTransform("large_prev");
});
// 다음버튼 누르기
document.getElementById("large_next").addEventListener("click", function () {
  large_updateTransform("large_next");
});
function large_updateTransform(id) {
  var large_slider = document.querySelector(".large_slider");
  var currentTransform = large_slider.style.transform;

  // 현재 x축 값 가져오기
  var currentXValue = parseInt(
    currentTransform.match(/(-?\d+)vw, 0px, 0px/)[1]
  );

  // class가 "img"인 요소를 모두 가져오기
  var large_img = document.getElementsByClassName("large_img");

  // 최소값과 최대값 설정
  var minValue = 0;
  var maxValue = large_img.length;

  // 최소값보다 작거나 최대값보다 크면 함수 종료
  if (id == "large_prev") {
    if (currentXValue == minValue) {
      document.getElementById("large_prev").disabled;
      return;
    }
    radio = currentXValue / -100;
    document.getElementById("large_imgchk_" + (radio + 1)).textContent = "⚪";
    document.getElementById("large_imgchk_" + (radio + 1)).style.fontSize =
      "1rem";
    change = 100;
  } else if (id == "large_next") {
    if (currentXValue == -100 * (maxValue - 1)) {
      document.getElementById("large_next").disabled;
      return;
    }
    radio = currentXValue / -100 + 2;
    document.getElementById("large_imgchk_" + (radio - 1)).textContent = "⚪";
    document.getElementById("large_imgchk_" + (radio - 1)).style.fontSize =
      "1rem";
    change = -100;
  }

  // 새로운 x축 값 계산 및 설정
  var newXValue = currentXValue + change;
  large_slider.style.transform = "translate3d(" + newXValue + "vw, 0px, 0px)";
  document.getElementById("large_imgchk_" + radio).textContent = "🟣";
  document.getElementById("large_imgchk_" + radio).style.fontSize = "1.5rem";
}

// 순서 버튼 누르기
var buttons = document.querySelectorAll(".large_imgchk_button");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    var clickedButtonId = event.target.id;
    var buttonId = this.id.split("_")[2];
    document.querySelector(".large_slider").style.transform =
      "translate3d(" + (buttonId - 1) * -100 + "vw, 0px, 0px)";
    // 클릭된 이외 이미지 체크 삭제
    var large_imgchks = document.querySelectorAll(".large_imgchk_button");
    large_imgchks.forEach(function (large_imgchk) {
      large_imgchk.textContent = "⚪";
      large_imgchk.style.fontSize = "1rem";
    });
    // 클릭된 이미지 체크
    document.getElementById(clickedButtonId).textContent = "🟣";
    document.getElementById(clickedButtonId).style.fontSize = "1.5rem";
  });
});
