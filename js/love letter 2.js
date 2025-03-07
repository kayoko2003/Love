$(document).ready(function () {
  var $envelope = $("#envelope");
  var $btnOpen = $("#open");

  function openEnvelope() {
    // Thêm class "open" để lật flap
    $envelope.addClass("open").removeClass("close");
    $("#open").fadeOut(2000);
    // Sau 1 giây (đợi animation lật nắp xong), ta cho mờ dần envelope
    setTimeout(function () {
      $(".envlope-wrapper").fadeOut(1000, function () {
        $(".letter-content").fadeIn(1000, function () {
          // Gọi hiệu ứng gõ chữ
          let textElement = document.querySelector(".letter-text");
          let fullText =
            "Xin chào Ngọc Minh, lần này anh Ngọc xuất hiện theo cách khác nè. " +
            "Hì hì, trước tiên anh muốn chúc bé yêu của anh ngày 8/3 thiệc là vui vẻ và hạnh phúc nhé. " +
            "Anh rất vui khi mỗi ngày được thấy em. Chúc bé ngày một xinh đẹp hơn, khỏe mạnh hơn và cố gắng chú ý sức khỏe vô đó." +
            "Bé yêu của anh là giỏi nhất và xinh đẹp nhất trong mắt anh, dù có thế nào đi chăng nữa bé vẫn là em bé của một mình anh thui. " +
            "Dù ngoài kia có như thía nào thì anh luôn đứng về phía bé và bảo vệ bé. Mãi một lòng hướng về em. I love you ❤️";
          typeEffect(textElement, fullText, 50); // Hiệu ứng gõ chữ từng ký tự (50ms mỗi chữ)
        });
      });
    }, 1000);
  }

  // Sự kiện click
  $envelope.click(openEnvelope);
  $btnOpen.click(openEnvelope);

  function typeEffect(element, text, speed) {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else {
        $(".speech-bubble").fadeIn(3000);
        $("#me").fadeIn(3000);
      }
    }
    typing();
  }
});
