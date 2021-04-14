// 套票區
const list = document.querySelector(".ticketCard-area");
// 查詢地點
const regionSearch = document.querySelector(".regionSearch");
const searchResultText = document.querySelector("#searchResult-text");
// 套票資訊
const tickedName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
// 推送按鈕
const addTicketBtn = document.querySelector(".addTicket-btn");
// 選取整個 form
const form = document.querySelector(".addTicket-form");

const defaultOption = document.querySelector(".default-selection")

// 把 response 回來的資料整理出來為一個新資料
let newData = [];

// 用 axios 向網址的私服器發送一個 get 請求
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
.then(function(response){
    newData = response.data.data;
    renderData(); // 用寫好的 renderData() 把整理好的資料渲染在網頁上
});

// 渲染畫面的內容
function renderData(location){ // 參數下 location 來去接 regionSearch 切換回傳的值
    let str = "";
    let cacheData;
    cacheData = newData.filter(function(item){
        if (location === item.area){
            return item;
        };
        if (!location) {
            return item;
        };
    });
    cacheData.forEach(function(item){
        str += 
        `<li class="ticketCard">
            <div class="ticketCard-img">
                <a href="#">
                    <img src=${item.imgUrl} alt="">
                </a>
                <div class="ticketCard-region">${item.area}</div>
                <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
                <div>
                    <h3>
                        <a href="#" class="ticketCard-name">${item.name}</a>
                    </h3>
                    <p class="ticketCard-description">
                        ${item.description}
                    </p>
                </div>
                <div class="ticketCard-info">
                    <p class="ticketCard-num">
                        <span><i class="fas fa-exclamation-circle"></i></span>
                        剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                    </p>
                    <p class="ticketCard-price">
                        TWD <span id="ticketCard-price">${item.price}</span>
                    </p>
                </div>
            </div>
        </li>`
        list.innerHTML = str; // 顯示在畫面上
    });
    searchResultText.textContent = `本次共有 ${cacheData.length} 筆搜尋結果`;
};

// 篩選功能
regionSearch.addEventListener("change", function(e){
    renderData(regionSearch.value); // 帶入切換後回傳的值去跑 renderData 這個函式
});

// 新增套票區
addTicketBtn.addEventListener("click", addCard);
function addCard(){
    let obj = {};
    obj.id = Date.now();
    obj.name = tickedName.value;
    obj.imgUrl = ticketImgUrl.value;
    obj.area = ticketRegion.value;
    obj.price = Number(ticketPrice.value);
    obj.group = Number(ticketNum.value);
    obj.rate = Number(ticketRate.value);
    obj.description = ticketDescription.value;
    newData.push(obj);
    renderData();
    alert("新增套票成功");
    form.reset();
    regionSearch.value = "";
};