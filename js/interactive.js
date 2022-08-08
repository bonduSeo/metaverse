// 기초 베이스 객체

let base = {
  //상호작용을 위한 값들과 함수
  hasKeydown: 0,
  interactiveNumber: 0,
  check: document.activeElement,
  event1: function (e) {
    if (e.code === "Space") {
      document.querySelector(".modalClick").click();
      if (base.interactiveNumber === 11) {
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `<iframe id="inlineFrameExample"
          title="Inline Frame Example"
          width="100%"
          height="100%"
          src="http://192.168.0.39:8080/">
          </iframe>`;
      }
    }
  },
};
