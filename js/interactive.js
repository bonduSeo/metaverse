// 기초 베이스 객체

let base = {
  //상호작용을 위한 값들과 함수
  hasKeydown: 0,
  interactiveNumber: 0,
  event1: function (e) {
    if (document.activeElement.id) {
      return;
    }
    if (e.code === "Space") {
      document.querySelector(".modalClick").click();
      // 재훈팀
      if (base.interactiveNumber === 11) {
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `<iframe id="inlineFrameExample"
          title="Inline Frame Example"
          width="100%"
          height="100%"
          src="http://13.209.108.252:5001/">
          </iframe>`;
      }
      // 오구 프로젝트
      if (base.interactiveNumber === 12) {
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `<iframe id="inlineFrameExample"
          title="Inline Frame Example"
          width="100%"
          height="100%"
          src="http://3.39.59.227/home.php">
          </iframe>`;
      }
      if (base.interactiveNumber === 13) {
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `<iframe id="inlineFrameExample"
          title="Inline Frame Example"
          width="100%"
          height="100%"
          src="http://192.168.0.63:8080/">
          </iframe>`;
      }
      if (base.interactiveNumber === 14) {
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `<iframe id="inlineFrameExample"
          title="Inline Frame Example"
          width="100%"
          height="100%"
          src="http://192.168.0.63:8080/">
          </iframe>`;
      }
    }
  },
};
