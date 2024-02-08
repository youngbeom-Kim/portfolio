$(document).ready(function() {
   fullscreen();
   menuClick();
   moveButton();
   slideContainer();
});

function fullscreen() {
    //페이지 로드 시 on Class 생성 및 첫번째 페이지 체크 생성
    $(".navbar_links a:first-child").addClass("on");

    //마우스 휠 이벤트
    $(window).bind("mousewheel", function(event) {
        var page = $(".navbar_links a.on");

        if ($("body").find("#fullpage:animated").length >= 1) return false;

        //마우스 휠 위로
        if (event.originalEvent.wheelDelta >= 0) {
            var beforePage = page.index();

            //메뉴 밑줄 옮기기
            if (page.index() >= 0) page.prev().addClass("on").siblings(".on").removeClass("on");

            if (beforePage !== 2) {
                $(".navbar_links a").animate({"color": "#FFF"}, 1250, "swing");
                $(".navbar_logo").animate({"color": "#FFF"}, 1250, "swing");
            } else {
                $(".navbar_links a").animate({"color": "#323232"}, 1250, "swing");
                $(".navbar_logo").animate({"color": "#323232"}, 1250, "swing");
            }

            var pagelength = 0;
            for (var i = 1; i < (beforePage); i++) {
                pagelength += $(".full" + i).height();
            }

            if (page.index() > 0) {
                page = page.index() - 1;
                $("#fullpage").animate({"top" : -pagelength + "px"}, 1250, "swing");
            }
        } else { //마우스 휠 아래로
            var nextPage = page.index() + 1;

            var lastPageNum = $(".navbar_links a").size();

            //메뉴 밑줄 옮기기
            if (page.index() <= $(".navbar_links a").size() - 1) {
                page.next().addClass("on").siblings(".on").removeClass("on");
            }

            if (nextPage !== 1) {
                $(".navbar_links a").animate({"color": "#FFF"}, 1250, "swing");
                $(".navbar_logo").animate({"color": "#FFF"}, 1250, "swing");
            } else {
                $(".navbar_links a").animate({"color": "#323232"}, 1250, "swing");
                $(".navbar_logo").animate({"color": "#323232"}, 1250, "swing");
            }

            //마지막 페이지가 아닐 경우에만
            if (nextPage < lastPageNum) {
                var pagelength = 0;
                for(var i = 1; i < (nextPage + 1); i++) {
                    pagelength += $(".full" + i).height();
                }
                $("#fullpage").animate({"top" : -pagelength + "px"}, 1250, "swing");
            }
        }
    });

    $(window).resize(function () {
        var resizeindex = $(".navbar_links a .on").index() + 1;

        var pagelength = 0;

        for (var i = 1; i < resizeindex; i++) {
            pagelength += $(".full" + i).height();
        }

        $(".navbar_links a:first-child").addClass("on").siblings(".on").removeClass("on");

        $(".navbar_links a").animate({"color": "#FFF"}, 800, "swing");
        $(".navbar_logo").animate({"color": "#FFF"}, 800, "swing");

        $("#fullpage").animate({"top" : -pagelength + "px"}, 800);
    });
}

function moveButton() {
    $(".btn-info").click(function() {
        $(".navbar_links a.on").next().addClass("on").siblings(".on").removeClass("on");

        $(".navbar_links a").animate({"color": "#323232"}, 1250, "swing");
        $(".navbar_logo").animate({"color": "#323232"}, 1250, "swing");

        var pagelength=0;

        pagelength += $(".full1").height();

        $("#fullpage").animate({"top": -pagelength + "px"}, 1250, "swing");
    })
}

function menuClick() {
    $(".navbar_links a").click(function (){
        var gnbindex = $(this).index() + 1;
        var length = 0;

        for (var i = 1; i < (gnbindex); i++) {
            length += $(".full" + i).height();
        }

        if ($("body").find("#fullpage:animated").length >= 1) return false;

        $(this).addClass("on").siblings("a").removeClass("on");

        //2번째 페이지 로고 메뉴 색상 변경
        if (gnbindex !== 2) {
            $(".navbar_links a").animate({"color": "#FFF"}, 800, "swing");
            $(".navbar_logo").animate({"color": "#FFF"}, 800, "swing");
        } else {
            $(".navbar_links a").animate({"color": "#323232"}, 800, "swing");
            $(".navbar_logo").animate({"color": "#323232"}, 800, "swing");
        }

        $(this).addClass("on").siblings().removeClass("on");

        $("#fullpage").animate({"top" : -length + "px"}, 800, "swing");
        return false;
    });
}

function slideContainer() {
    const sliderContainer = document.querySelector(".slider-container");
    const slideRight = document.querySelector(".right-slide");
    const slideLeft = document.querySelector(".left-slide");
    const upButton = document.querySelector(".up-button");
    const downButton = document.querySelector(".down-button");

    //오른쪽 슬라이드 개수
    const slidesLength = slideRight.querySelectorAll("div").length;

    let activeSlideIndex = 0;

    // 왼쪽 슬라이드 top 속성 초기 위치
    slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

    //슬라이드 방향에 따른 변화 처리 함수
    const changeSlide = (direction) => {
        const sliderHeight = sliderContainer.clientHeight;

        // 'up' 버튼
        if (direction === "up") {
            activeSlideIndex++;
            if (activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
        // 'down' 버튼
        } else if (direction === "down") {
            activeSlideIndex--;
            if (activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
        }

        // 오른쪽 왼쪽 슬라이드 위치 조정
        slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
        slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
    };

    //각 버튼에 클릭 이벤트 시 changeSlide 함수 실행
    upButton.addEventListener("click", () => changeSlide("up"));
    downButton.addEventListener("click", () => changeSlide("down"));
}

function emailSend(){
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var content = document.getElementById('content').value;

    var messageBody = "Email " + email +
        "<br/> Subject " + subject +
        "<br/> Content " + content;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "abcd450196@gmail.com",
        Password : "C265D146DE12452858478ACDED98E671E7D4",
        To : 'abcd4501@naver.com',
        From : "abcd450196@gmail.com",
        Subject : "궁금한거 여쭤봅니다.",
        Body : messageBody
    }).then(
        message => {
            if(message=='OK'){
                swal("Secussful", "You clicked the button!", "success");
            } else {
                swal("Error", "You clicked the button!", "error");
            }
        });
}
