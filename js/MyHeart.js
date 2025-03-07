var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;

function init() {
  // create a new stage and point it at our canvas:
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var w = canvas.width;
  var h = canvas.height;

  container = new createjs.Container();
  stage.addChild(container);

  captureContainers = [];
  captureIndex = 0;

  // create a large number of slightly complex vector shapes, and give them random positions and velocities:
  for (var i = 0; i < 100; i++) {
    var heart = new createjs.Shape();
    heart.graphics.beginFill(
      createjs.Graphics.getHSL(
        Math.random() * 30 - 45,
        100,
        50 + Math.random() * 30
      )
    );
    heart.graphics
      .moveTo(0, -12)
      .curveTo(1, -20, 8, -20)
      .curveTo(16, -20, 16, -10)
      .curveTo(16, 0, 0, 12);
    heart.graphics
      .curveTo(-16, 0, -16, -10)
      .curveTo(-16, -20, -8, -20)
      .curveTo(-1, -20, 0, -12);
    heart.y = -100;

    container.addChild(heart);
  }

  // Giả sử bạn đã có biến w, h, stage, và textContainer được tạo sẵn:
  var sentences = [
    "Hai chúng ta đã ở bên nhau được hơn 4 năm rồi",
    "Không biết bé như nào nhưng anh thật sự rất hạnh phúc",
    "Hàng ngày được trò truyện, nhắn tin và ngắm nhìn em",
    "Thật là điều kì diệu với anh",
    "Dạo này anh biết cả hai chúng ta đang có giai đoạn khó khăn",
    "Hai chúng ta người thì lo nghĩ, người thì mệt mỏi vì công việc và cuộc sống",
    "Điều này khiến hai ta dễ cáu gắt với nhau",
    "Đôi lúc chúng ta làm tổn thương nhau",
    "Nhưng mà đấy chỉ là những điều rất là nhỏ nếu ta đặt mình vào nhau",
    "Chỉ cần chúng mình cùng cố gắng là những thứ đó chỉ là con kiến",
    "Xin lỗi em vì có những khoảnh khắc cảm xúc của anh không được tốt",
    "Điều đó dẫn đến những tông giọng hay là giọng điều khiến em khó chịu",
    "Mong em không chấp nhặt những điều đó, anh sẽ cố gắng thay đổi từng ngày",
    "Xin lỗi em vì hiện tại chưa cho em được nhiều thứ em muốn",
    "Anh sẽ đem lại và bù đắp mọi thứ cho em trong tương lai sớm nhất có thể",
    "Cảm ơn em vì đã luôn bên cạnh anh",
    "Cảm ơn vì hai chúng ta đã gặp được nhau",
    "Cảm ơn vì chọn anh và dành tình cảm quý báu của em cho anh",
    "Anh yêu em ❤️",
  ];

  var textContainer = new createjs.Container();
  stage.addChild(textContainer);

  // Hàm hiển thị câu, ẩn câu cũ khi hiển thị câu mới
  function showSentence(index) {
    if (index < sentences.length - 1) {
      // Hiển thị câu bình thường
      if (index > 0) {
        var prevText = textContainer.getChildAt(textContainer.numChildren - 1);
        createjs.Tween.get(prevText)
          .to({ alpha: 0 }, 2000)
          .call(function () {
            textContainer.removeChild(prevText);
            displayNewSentence(index);
          });
      } else {
        displayNewSentence(index);
      }
    } else {
      // Nếu là phần tử cuối cùng, hiển thị ảnh
      showFinalImage();
    }
  }

  function showFinalImage() {
    // Xóa nội dung cũ
    textContainer.removeAllChildren();

    var bitmap = new createjs.Bitmap("../Image/kiss.jpg"); // Đường dẫn đến ảnh của bạn
    bitmap.alpha = 0;

    // Khi ảnh đã load xong, chỉnh lại kích thước cho phù hợp với khung
    bitmap.image.onload = function () {
      var imgWidth = bitmap.image.width;
      var imgHeight = bitmap.image.height;

      var scaleX = 500 / imgWidth;
      var scaleY = 800 / imgHeight;
      var scale = Math.min(scaleX, scaleY); // Đảm bảo ảnh không bị méo

      bitmap.scaleX = scale;
      bitmap.scaleY = scale;

      // Căn giữa ảnh
      bitmap.x = (w - imgWidth * scale) / 2;
      bitmap.y = (h - imgHeight * scale) / 2;

      // Thêm ảnh vào container
      textContainer.addChild(bitmap);

      // Hiệu ứng fade in
      createjs.Tween.get(bitmap).to({ alpha: 1 }, 3000);
    };
  }

  function displayNewSentence(index) {
    var textObj = new createjs.Text(
      sentences[index],
      "bold 36px Arial",
      "#ffffff"
    );

    textObj.shadow = new createjs.Shadow("#000000", 2, 2, 5);
    textObj.alpha = 0;
    textObj.textAlign = "center";
    textObj.x = w / 2;
    textObj.y = h / 2; // Căn giữa theo chiều dọc (có thể điều chỉnh nếu cần)
    textContainer.addChild(textObj);
    // Fade in câu mới trong 500ms
    createjs.Tween.get(textObj)
      .to({ alpha: 1 }, 3000)
      .call(function () {
        // Sau khi hiện xong câu mới, chờ 1 giây rồi hiển thị câu tiếp theo
        setTimeout(function () {
          showSentence(index + 1);
        }, 1500);
      });
  }

  // Bắt đầu hiển thị từ câu đầu tiên:
  showSentence(0);

  for (i = 0; i < 100; i++) {
    var captureContainer = new createjs.Container();
    captureContainer.cache(0, 0, w, h);
    captureContainers.push(captureContainer);
  }

  // start the tick and point it at the window so we can do some work before updating the stage:
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", tick);
}

function tick(event) {
  var w = canvas.width;
  var h = canvas.height;
  var l = container.numChildren;

  captureIndex = (captureIndex + 1) % captureContainers.length;
  stage.removeChildAt(0);
  var captureContainer = captureContainers[captureIndex];
  stage.addChildAt(captureContainer, 0);
  captureContainer.addChild(container);

  // iterate through all the children and move them according to their velocity:
  for (var i = 0; i < l; i++) {
    var heart = container.getChildAt(i);
    if (heart.y < -50) {
      heart._x = Math.random() * w;
      heart.y = h * (1 + Math.random()) + 50;
      heart.perX = (1 + Math.random() * 2) * h;
      heart.offX = Math.random() * h;
      heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
      heart.velY = -Math.random() * 0.1 - 1;
      heart.scale = Math.random() * 2 + 1;
      heart._rotation = Math.random() * 40 - 20;
      heart.alpha = Math.random() * 0.75 + 0.05;
      heart.compositeOperation =
        Math.random() < 0.33 ? "lighter" : "source-over";
    }
    var int = ((heart.offX + heart.y) / heart.perX) * Math.PI * 2;
    heart.y += (heart.velY * heart.scaleX) / 2;
    heart.x = heart._x + Math.cos(int) * heart.ampX;
    heart.rotation = heart._rotation + Math.sin(int) * 30;
  }

  captureContainer.updateCache("source-over");

  // draw the updates to stage:
  stage.update(event);
}

init();

document.getElementById("startBtn").addEventListener("click", function () {
  document.getElementById("startContainer").style.display = "none";

  // Hiện canvas và chạy hiệu ứng
  document.getElementById("canvasContainer").style.display = "block";
  init(); // Chạy hiệu ứng canvas

  // Phát nhạc nền
  let bgMusic = document.getElementById("bgMusic");
  bgMusic.play().catch((error) => console.log("Autoplay bị chặn:", error));
});
