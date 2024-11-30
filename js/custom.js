var $ = jQuery.noConflict();

jQuery(document).ready(function () {
    // Show the first tab and hide the rest

    readMoreMobile();
    customTab();
});

function customTab() {

    if ($(".tab_wrapper").length > 0) {

        $(document).find(".tab_wrapper").each(function () {

            let $this = $(this);

            var tabWrapper = $this;
            var tabBtns = tabWrapper.find('.tab-btns');
            var tabContent = tabWrapper.find('.tab-content');
            var tabBtnsWrapper = tabWrapper.find('.tab_btns_col');

            tabBtns.find('li').first().children('a').addClass('active');
            tabContent.hide();
            tabContent.first().show().addClass("active");
            tabBtns.append("<li class='slider'></li>");

            var activeBtn = tabBtns.find('li').find(".active");

            var actWidth = activeBtn.parent("li").width();
            var actHeight = activeBtn.parent("li").height();
            var leftOffset = activeBtn.offset().left - activeBtn.parent().parent().offset().left + activeBtn.parent().parent().scrollLeft();
            var topOffset = activeBtn.offset().top - activeBtn.parent().parent().offset().top + activeBtn.parent().parent().scrollTop();
            activeBtn.parent().parent().animate({ scrollLeft: leftOffset });

            tabBtns.find(".slider").css({ "top": topOffset - 1, "left": leftOffset - 1, "width": actWidth, "height": actHeight + 1 });

            activeBtn.parent().nextAll().each(function () {
                var nextAllTabs = jQuery(this).find('a').attr('href');
                jQuery(nextAllTabs).addClass("next_tabs").removeClass("prev_tabs");
            });

            activeBtn.parent().prevAll().each(function () {
                var prevAllTabs = jQuery(this).find('a').attr('href');
                jQuery(prevAllTabs).addClass("prev_tabs").removeClass("next_tabs");
            });

            tabBtns.find('a').click(function (e) {
                var $this = jQuery(this);
                e.preventDefault();
                tabBtns.find('a').removeClass('active');
                $this.addClass('active');
                tabContent.hide().removeClass("active");
                var activeTab = $this.attr('href');
                jQuery(activeTab).fadeIn('slow').addClass("active");
                var width = $this.parent().width();
                var height = $this.parent().height();
                leftOffset = $this.offset().left - $this.parent().parent().offset().left + $this.parent().parent().scrollLeft();
                topOffset = $this.offset().top - $this.parent().parent().offset().top + $this.parent().parent().scrollTop();
                $this.parent().parent().animate({ scrollLeft: leftOffset });
                tabBtns.find(".slider").css({ "top": + topOffset - 1, "left": + leftOffset - 1, "width": width, "height": height + 1 });
                jQuery(this).parent().nextAll().each(function () {
                    var nextAllTabs = jQuery(this).find('a').attr('href');
                    jQuery(nextAllTabs).addClass("next_tabs").removeClass("prev_tabs");
                });
                jQuery(this).parent().prevAll().each(function () {
                    var prevAllTabs = jQuery(this).find('a').attr('href');
                    jQuery(prevAllTabs).addClass("prev_tabs").removeClass("next_tabs");
                });
                return false;
            });

        })
    }
    //     let $this = $(this);
    //     if ($this.length > 0) {
    //         $this.find('.tab-btns li:first-child a').addClass('active');
    //         $this.find('.tab-content').hide();
    //         $this.find('.tab-content:first').show().addClass("active");
    //         $this.find(".tab-btns").append("<li class='slider'></li>");

    //         var actWidth = $this.children(".tab-btns li").find(".active").parent("li").width();
    //         var actHeight = $this.children(".tab-btns li").find(".active").parent("li").height();
    //         var actPosition = $this.find(".tab-btns li .active").position();
    //         // var actPosition = jQuery(".tab_wrapper .tab-btns li .active").position();

    //         console.log("actPosition", actPosition);

    //         $this.find(".tab-btns .slider").css({ "top": + actPosition.top, "left": + actPosition.left, "width": (actWidth + 1), "height": actHeight });

    //         $this.find('.tab-btns li a.active').parent().nextAll().each(function () {
    //             var nextAllTabs = jQuery(this).find('a').attr('href');
    //             jQuery(nextAllTabs).addClass("next_tabs").removeClass("prev_tabs");
    //         });

    //         $this.find('.tab-btns li a.active').parent().prevAll().each(function () {
    //             var prevAllTabs = jQuery(this).find('a').attr('href');
    //             jQuery(prevAllTabs).addClass("prev_tabs").removeClass("next_tabs");
    //         });

    //         // Click function
    //         $this.find('.tab-btns li a').click(function (e) {

    //             e.preventDefault();
    //             $this.find('.tab-btns li a').removeClass('active');
    //             jQuery(this).addClass('active');
    //             $this.find('.tab-content').hide().removeClass("active");

    //             var activeTab = jQuery(this).attr('href');
    //             jQuery(activeTab).fadeIn('slow').addClass("active");


    //             var position = jQuery(this).parent().position();
    //             var width = jQuery(this).parent().width();
    //             var height = jQuery(this).parent().height();

    //             // var offsetLeft = jQuery(this).offset().left - jQuery(this).parents("ul").offset().left + jQuery(this).parents("ul").scrollLeft(); 
    //             // console.log("offset",offsetLeft);

    //             $this.find(".tab-btns .slider").css({ "top": + position.top, "left": + position.left, "width": (width + 1), "height": height });

    //             jQuery(this).parent().nextAll().each(function () {
    //                 var nextAllTabs = jQuery(this).find('a').attr('href');
    //                 jQuery(nextAllTabs).addClass("next_tabs").removeClass("prev_tabs");
    //             });

    //             jQuery(this).parent().prevAll().each(function () {
    //                 var prevAllTabs = jQuery(this).find('a').attr('href');
    //                 jQuery(prevAllTabs).addClass("prev_tabs").removeClass("next_tabs");
    //             });

    //             return false;
    //         });
    //     }
    // });
}

function readMoreMobile() {
    jQuery('.readmore_mobile + .read_more_btn').hide();

    $('.readmore_mobile').each(function () {
        let $this = $(this);
        let totalCount = 5;
        if ($this.find('.gb-grid-column').length > totalCount && jQuery(window).outerWidth() < 768) {

            let readMoreLessBtn = $this.siblings('.read_more_btn');
            readMoreLessBtn.show();

            let fullHeight = $this[0].scrollHeight + 1
            let defaultHeight = 0;
            let count = 0;
            let heightRequired = 0;
            let gap = $this.find('.gb-grid-wrapper').css("row-gap");
            let gapNumber = gap.match(/\d+/)[0];
            let txt = 'Read More';

            $this.find('.gb-grid-column').each(function () {
                if (count < totalCount) {
                    heightRequired += jQuery(this).outerHeight();
                    count++;
                }
            });

            defaultHeight = heightRequired + gapNumber * (count - 1) + 10;

            $this.css({ "--height": + defaultHeight + "px" });
            readMoreLessBtn.text(txt).attr("data-text", txt);
            $this.removeClass('active');
            readMoreLessBtn.removeClass('active');

            readMoreLessBtn.click(function (e) {
                e.preventDefault();
                let newHeight = 0;
                if ($this.hasClass('active')) {
                    txt = 'Read more';
                    newHeight = defaultHeight;
                    $this.removeClass('active');
                    readMoreLessBtn.removeClass('active');
                } else {
                    txt = 'Read Less';
                    newHeight = fullHeight;
                    $this.addClass('active');
                    readMoreLessBtn.addClass('active');
                }

                readMoreLessBtn.text(txt).attr("data-text", txt);
                $this.css({ "--height": +newHeight + "px" });
            });
        }
    });
}