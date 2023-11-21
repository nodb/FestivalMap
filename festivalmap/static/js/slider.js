// 이전버튼 누르기
document.getElementById("prev").addEventListener("click", function () {
  updateTransform("prev");
});
// 다음버튼 누르기
document.getElementById("next").addEventListener("click", function () {
  updateTransform("next");
});
function updateTransform(id) {
  var slider = document.querySelector(".slider");
  var currentTransform = slider.style.transform;

  // 현재 x축 값 가져오기
  var currentXValue = parseInt(
    currentTransform.match(/(-?\d+)rem, 0px, 0px/)[1]
  );

  // class가 "img"인 요소를 모두 가져오기
  var img = document.getElementsByClassName("img");

  // 최소값과 최대값 설정
  var minValue = 0;
  var maxValue = img.length;

  // 최소값보다 작거나 최대값보다 크면 함수 종료
  if (id == "prev") {
    if (currentXValue == minValue) {
      document.getElementById("prev").disabled;
      return;
    }
    radio = currentXValue / -21;
    document.getElementById(radio + 1).textContent = "⚪";
    document.getElementById(radio + 1).style.fontSize = "1rem";
    change = 21;
  } else if (id == "next") {
    if (currentXValue == -21 * (maxValue - 3)) {
      document.getElementById("next").disabled;
      return;
    }
    radio = currentXValue / -21 + 2;
    document.getElementById(radio - 1).textContent = "⚪";
    document.getElementById(radio - 1).style.fontSize = "1rem";
    change = -21;
  }

  // 새로운 x축 값 계산 및 설정
  var newXValue = currentXValue + change;
  slider.style.transform = "translate3d(" + newXValue + "rem, 0px, 0px)";
  document.getElementById(radio).textContent = "🟣";
  document.getElementById(radio).style.fontSize = "1.5rem";
}
window.onload = function () {
  document.getElementById(1).textContent = "🟣";
  document.getElementById(1).style.fontSize = "1.5rem";
};
