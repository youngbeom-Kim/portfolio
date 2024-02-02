$(document).ready(function() {
   fullscreen();
   quickClick();
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

            //퀵버튼 옮기기
            if (page.index() >= 0) page.prev().addClass("on").siblings(".on").removeClass("on");

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

            //퀵버튼 옮기기
            if (page.index() <= $(".navbar_links a").size() - 1) {
                page.next().addClass("on").siblings(".on").removeClass("on");
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

        $("#fullpage").animate({"top" : -pagelength + "px"}, 0);
    });
}

function menuClick() {
    $(".navbar_links a").click(function() {
        var gnbindex = $(this).index() + 1;
        var length = 0;

        for (var i = 1; i < (gnbindex); i++) {
            length += $(".full" + i).height();
        }

        if ($("body").find("#fullpage:animated").length >= 1) return false;

        $(this).addClass("on").siblings("a").removeClass("on");

        $("#fullpage").animate({"top" : -length + "px"}, 800, "swing");
        return false;
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

        $(".quick li").addClass("on").siblings().removeClass("on");

        $("#fullpage").animate({"top" : -length + "px"}, 800, "swing");
        return false;
    });
}