var $ = jQuery.noConflict();

jQuery(document).ready(function () {
    // Show the first tab and hide the rest
    // if (jQuery('.tab_wrapper').length > 0) {
    //     jQuery('.tab_wrapper .tab-btns li:first-child a').addClass('active');
    //     jQuery('.tab_wrapper .tab-content').hide();
    //     jQuery('.tab_wrapper .tab-content:first').show().addClass("active");
    //     jQuery(".tab_wrapper .tab-btns").append("<li class='slider'></li>");

    //     var actWidth = jQuery(".tab_wrapper .tab-btns li").find(".active").parent("li").width();
    //     var actHeight = jQuery(".tab_wrapper .tab-btns li").find(".active").parent("li").height();
    //     var actPosition = jQuery(".tab_wrapper .tab-btns li .active").position();
    //     jQuery(".tab_wrapper .tab-btns .slider").css({ "top": + actPosition.top, "left": + actPosition.left, "width": (actWidth + 1), "height": actHeight });

    //     jQuery('.tab_wrapper .tab-btns li a.active').parent().nextAll().each(function () {
    //         var nextAllTabs = jQuery(this).find('a').attr('href');
    //         jQuery(nextAllTabs).addClass("next_tabs").removeClass("prev_tabs");
    //     });

    //     jQuery('.tab_wrapper .tab-btns li a.active').parent().prevAll().each(function () {
    //         var prevAllTabs = jQuery(this).find('a').attr('href');
    //         jQuery(prevAllTabs).addClass("prev_tabs").removeClass("next_tabs");
    //     });

    //     // Click function
    //     jQuery('.tab_wrapper .tab-btns li a').click(function (e) {

    //         e.preventDefault();
    //         jQuery('.tab_wrapper .tab-btns li a').removeClass('active');
    //         jQuery(this).addClass('active');
    //         jQuery('.tab_wrapper .tab-content').hide().removeClass("active");

    //         var activeTab = jQuery(this).attr('href');
    //         jQuery(activeTab).fadeIn('slow').addClass("active");


    //         var position = jQuery(this).parent().position();
    //         var width = jQuery(this).parent().width();
    //         var height = jQuery(this).parent().height();

    //         // var offsetLeft = jQuery(this).offset().left - jQuery(this).parents("ul").offset().left + jQuery(this).parents("ul").scrollLeft(); 
    //         // console.log("offset",offsetLeft);

    //         jQuery(".tab_wrapper .tab-btns .slider").css({ "top": + position.top, "left": + position.left, "width": (width + 1), "height": height });

    //         jQuery(this).parent().nextAll().each(function () {
    //             var nextAllTabs = jQuery(this).find('a').attr('href');
    //             jQuery(nextAllTabs).addClass("next_tabs").removeClass("prev_tabs");
    //         });

    //         jQuery(this).parent().prevAll().each(function () {
    //             var prevAllTabs = jQuery(this).find('a').attr('href');
    //             jQuery(prevAllTabs).addClass("prev_tabs").removeClass("next_tabs");
    //         });

    //         return false;
    //     });
    // }

    readMoreMobile();
});


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