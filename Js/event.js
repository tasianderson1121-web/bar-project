const events = [
  {
    title: "Happy Hour",
    desc: "18:00 - 21:00 全品項第二杯半價",
    img: "../../img/event1.png",
    btn: "立即參加"
  },
  {
    title: "新會員優惠",
    desc: "註冊即送 $100 折扣券",
    img: "../../img/event2.png",
    btn: "立即領取"
  },
  {
    title: "調酒組合套餐",
    desc: "任選三款調酒現折 15%",
    img: "../../img/event3.png",
    btn: "查看商品"
  }
];

// 取得容器
const container = document.querySelector(".event-section");

// 渲染卡片
function renderEvents() {
  container.innerHTML = "";

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <img src="${event.img}" alt="${event.title}">
      <div class="event-info">
        <h3>${event.title}</h3>
        <p>${event.desc}</p>
        <button>${event.btn}</button>
      </div>
    `;

    // 按鈕事件（先做基本互動）
    card.querySelector("button").addEventListener("click", () => {
      alert(`已選擇：${event.title}`);
    });

    container.appendChild(card);
  });
}

renderEvents();