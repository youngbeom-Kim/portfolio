$(document).ready(function() {
   fullscreen();
   menuClick();
});

function fullscreen() {
    var pageindex = $(".navbar_links a").size();

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