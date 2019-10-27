let clicked = false;

function changeButtonPlace(distance) {
    let storeBut = document.getElementsByClassName('storeBut');
    Array.from(storeBut, child => child.style.left = distance);
}

function fillStoreInf(data) {
    let replacedLi = document.getElementsByClassName('replacedLi');
    Array.from(replacedLi, child => child.innerHTML = '');
    data.forEach(function (item, i) {
        replacedLi[i].innerHTML += '<p class="storeName"><span>' + item['Name'] + '</span><span>' + item['FloorArea'] + '</span></p>\n' +
            '                    <p class="storeSize">sq.m</p>\n' +
            '                   <p class="storeAddress">' + item['Address'] + '</p>';
    });
}

function startSearching() {
    let searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('click', function () {
        let reverseIcon = document.getElementById('reverseIcon');
        let searchIcon = document.getElementById('searchIcon');
        reverseIcon.style.display = 'none';
        searchIcon.style.left = '86%';
        changeButtonPlace('30px');
        clicked = true;
    });
}

function cleanInput() {
    let searchInput = document.getElementById('searchInput');
    let crossIcon = document.getElementById('crossIcon');
    crossIcon.addEventListener('click', function () {
        searchInput.value = '';
        searchInput.focus();
        clicked = false;
    });
}

function searchProcess() {
    let searchIcon = document.getElementById('searchIcon');
    let searchInput = document.getElementById('searchInput');
    searchIcon.addEventListener('click', function () {
        let matchElem;
        let searchResult = null;
        let replacedLi = document.getElementsByClassName('replacedLi');
        matchElem = Stores.filter(item => item['Name'].toLowerCase().includes(searchInput.value.toLowerCase()));
        searchResult = matchElem;
        if (searchInput.value === '') {
            fillStoreInf(Stores);
            startSearching = false;
            countStatusArr = [];
            Stores.forEach(function (item, i, Stores) {
                countProductStatus(Stores, i);
            });
            let allStores = document.getElementsByTagName('li');
            Array.from(allStores, function (item, j) {
                if (j < 1) return;
                item.onclick = function () {
                    addDetails(item, Stores, j - 1);
                }
            });
        } else {
            startSearching = true;
            fillStoreInf(searchResult);
            countStatusArr = [];
            searchResult.forEach(function (item, i, searchResult) {
                countProductStatus(searchResult, i);
            });
            Array.from(replacedLi, function (item, j) {
                item.onclick = function () {
                    addDetails(item, searchResult, j);
                }
            });
        }
        Array.from(replacedLi, child => {
            if (child.innerHTML === '') {
                child.style.cssText = 'border-bottom: none; pointer-events:none; cursor:default; background-color:white;';
            } else {
                child.style.cssText = 'border-bottom: solid 2px #c7e2f5; pointer-events:auto; cursor:pointer';
            }
        });
    });
}

function emptyInput() {
    let searchIcon = document.getElementById('searchIcon');
    let crossIcon = document.getElementById('crossIcon');
    let reverseIcon = document.getElementById('reverseIcon');
    let searchInput = document.getElementById('searchInput');

    function showEmptyInput() {
        if (searchInput.value.trim().length === 0) {
            crossIcon.classList.add("trashElem");
            reverseIcon.style.display = 'inline-block';
        } else {
            reverseIcon.style.display = 'none';
            crossIcon.classList.remove("trashElem");
            searchIcon.style.left = '71%';
            changeButtonPlace('0px');
        }
    }

    searchInput.addEventListener('input', showEmptyInput, false);
}

startSearching();
cleanInput();
searchProcess();
emptyInput();