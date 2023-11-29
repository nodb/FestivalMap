// HTML 엔티티를 해독하는 함수
function decode(encodedString) {
  var textArea = document.createElement("textarea");
  textArea.innerHTML = encodedString;
  return textArea.value;
}

// 요소를 엔티티를 해독하여 다시 설정하는 함수
function decode_set(id) {
  var element = document.getElementById(id);
  element.innerHTML = decode(element.innerHTML);
}

decode_set("time");
decode_set("address");
decode_set("price");
decode_set("content");
decode_set("title");
