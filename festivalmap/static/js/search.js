function search() {
    // search 클래스를 가진 요소를 선택
    var searchElement = document.querySelector(".search");

    // ID가 festival_search
    if (searchElement.id === "festival_search") {
        window.location.href = '/festival/search/' + searchElement.value;
    }
    // ID가 show_search
    else if (searchElement.id === "show_search") {
        window.location.href = '/show/search/' + searchElement.value;
    }
}