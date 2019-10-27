let countStatusArr = [],
    selectedLi;

function activeStore(clickedLi) {
    if (selectedLi) selectedLi.classList.remove('selectedLi');
    selectedLi = clickedLi;
    selectedLi.classList.add('selectedLi');
}

function makeStoreList(name, area, address) {
    let mainList = document.getElementById('mainList');
    mainList.innerHTML += ' <li class="storeElems replacedLi">\n' +
        '                   <p class="storeName"><span>' + name + '</span><span>' + area + '</span></p>\n' +
        '                    <p class="storeSize">sq.m</p>\n' +
        '                   <p class="storeAddress">' + address + '</p>\n' +
        '               </li>';
}

function countProductStatus(arr, idx) {
    countStatusArr.push({OK: 0, STORAGE: 0, OUT_OF_STOCK: 0});
    arr[idx]['rel_Products'].forEach(function (item, k) {
        if (arr[idx]['rel_Products'][k]['Status'] === 'OK') countStatusArr[idx].OK += 1;
        if (arr[idx]['rel_Products'][k]['Status'] === 'STORAGE') countStatusArr[idx].STORAGE += 1;
        if (arr[idx]['rel_Products'][k]['Status'] === 'OUT_OF_STOCK') countStatusArr[idx].OUT_OF_STOCK += 1;
    });
}

function addDetails(elem, data, index) {
    let storeSelection = document.getElementById('storeSelection'),
        storeWarning = document.getElementById('storeWarning'),
        shopIcon = document.getElementById('shopIcon');
    activeStore(elem);
    shopIcon.style.display = 'none';
    storeWarning.style.display = 'none';
    storeSelection.style.display = 'none';
    prodFooter.classList.remove('hide');
    addProductHead(data, index);
    addColumnNames();
    addExtraProductInf(data, index);
    addFooter();
}

function addProductHead(data, index) {
    let productHeadQuality = document.getElementById('productHead');
    productHeadQuality.innerHTML = '<h1>Store Details</h1>\n' +
        '                <table cellspacing="0" id="storeDetails">\n' +
        '                    <tr>\n' +
        '                        <td class="emailTd"><strong>Email:</strong>' + data[index]['Email'] + '</td>\n' +
        '                        <td id><strong>Established Date:</strong>' + data[index]['Established'] + '</td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td><strong>Phone Number:</strong>' + data[index]['PhoneNumber'] + '</td>\n' +
        '                        <td><strong>Floor Area:</strong>' + data[index]['FloorArea'] + '</td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td><strong>Address:</strong>' + data[index]['Address'] + '</td>\n' +
        '                        <td></td>\n' +
        '                    </tr>\n' +
        '                </table>\n' +
        '                <button class="collapsingButton collapButPlace"><i class="fas fa-angle-up"></i></button>\n' +
        '                <button class="collapsingButton collapButPlace"><i class="fas fa-thumbtack"></i></button>\n' +
        '                <p class="horizon"></p>\n' +
        '                <p class="existVariants productsCount"><strong>' + data[index]['rel_Products'].length + '</strong> All</p>\n' +
        '                <p class="existVariants separation"></p>\n' +
        '                <p class="existVariants"><i class="far fa-check-square"></i><span class="verticalPos">' + countStatusArr[index].OK + '</span><br><span\n' +
        '                        class="variantsDescription">Ok</span></p>\n' +
        '                <p class="existVariants"><i class="fas fa-exclamation-triangle"></i> <span\n' +
        '                        class="verticalPos">' + countStatusArr[index].STORAGE + '</span><br><span\n' +
        '                        class="variantsDescription">Storage</span></p>\n' +
        '                <p class="existVariants"><i class="fas fa-exclamation-circle"></i> <span\n' +
        '                        class="verticalPos">' + countStatusArr[index].OUT_OF_STOCK + '</span><br><span\n' +
        '                        class="variantsDescription">Out of stock</span></p>';
}

function addColumnNames() {
    productsTable.innerHTML = '<caption class="productsTitle productLines">Products</caption>\n' +
        '            <tr class="columnNames">\n' +
        '                <td>Name</td>\n' +
        '                <td>Price</td>\n' +
        '                <td>Specs</td>\n' +
        '                <td>SupplierInfo</td>\n' +
        '                <td>Country of origin</td>\n' +
        '                <td>Prod. company</td>\n' +
        '                <td>Rating</td>\n' +
        '                <td></td>\n' +
        '            </tr>';
}

function addExtraProductInf(data, index) {
    data[index]['rel_Products'].forEach(function (item, k) {
        let emptyStars = 5 - data[index]['rel_Products'][k]['Rating'];
        productsTable.innerHTML += ' <tr>\n' +
            '                    <td><strong>' + data[index]['rel_Products'][k]['Name'] + '</strong><br>' + (k + 1) + '</td>\n' +
            '                    <td><strong>' + data[index]['rel_Products'][k]['Price'] + '</strong> USD</td>\n' +
            '                    <td>' + data[index]['rel_Products'][k]['Specs'].slice(0, 10) + '...</td>\n' +
            '                    <td>' + data[index]['rel_Products'][k]['SupplierInfo'].slice(0, 10) + '...</td>\n' +
            '                    <td>' + data[index]['rel_Products'][k]['MadeIn'] + '</td>\n' +
            '                    <td>' + data[index]['rel_Products'][k]['ProductionCompanyName'] + '</td>\n' +
            '                    <td class="rating"><span class="stars">' + '&#9733;'.repeat(data[index]['rel_Products'][k]['Rating']) + '</span>' +
            '&#9734;'.repeat(emptyStars) + '</td>\n' +
            '                    <td><i class="fas fa-angle-right"></i></td>\n' +
            '                </tr>';
    });
}

function addFooter() {
    let productsColumn = document.getElementById('productsColumn');
    let productsTable = document.getElementById('productsTable');
    prodFooter.innerHTML = '<button class="addElemBut"><i class="fas fa-plus"></i> Create</button>\n' +
        '            <button class="addElemBut withDelete"><i class="fas fa-trash-alt"></i> Delete</button>';
}

Stores.forEach(function (item, i, Stores) {
    let allStores = document.getElementsByTagName('li');
    let prodFooter = document.getElementById('prodFooter');
    makeStoreList(Stores[i]['Name'], Stores[i]['FloorArea'], Stores[i]['Address']);
    countProductStatus(Stores, i);
    Array.from(allStores, function (item, j) {
        if (j < 1) return;
        item.onclick = function () {
            addDetails(item, Stores, j - 1);
        }
    });
});