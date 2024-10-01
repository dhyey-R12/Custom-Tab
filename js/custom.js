jQuery(document).ready(function () {
    // Show the first tab and hide the rest
    if (jQuery('.tab_wrapper').length > 0) {
        jQuery('.tab_wrapper .tab-btns li:first-child a').addClass('active');
        jQuery('.tab_wrapper .tab-content').hide();
        jQuery('.tab_wrapper .tab-content:first').show().addClass("active");
        jQuery(".tab_wrapper .tab-btns").append("<li class='slider'></li>");

        var actWidth = jQuery(".tab_wrapper .tab-btns li").find(".active").parent("li").width();
        var actHeight = jQuery(".tab_wrapper .tab-btns li").find(".active").parent("li").height();
        var actPosition = jQuery(".tab_wrapper .tab-btns li .active").position();
        jQuery(".tab_wrapper .tab-btns .slider").css({ "top": + actPosition.top, "left": + actPosition.left, "width": (actWidth + 1), "height": actHeight });

        jQuery('.tab_wrapper .tab-btns li a.active').parent().nextAll().each(function () {
            var nextAllTabs = jQuery(this).find('a').attr('href');
            jQuery(nextAllTabs).addClass("next_tabs").removeClass("prev_tabs");
        });

        jQuery('.tab_wrapper .tab-btns li a.active').parent().prevAll().each(function () {
            var prevAllTabs = jQuery(this).find('a').attr('href');
            jQuery(prevAllTabs).addClass("prev_tabs").removeClass("next_tabs");
        });

        // Click function
        jQuery('.tab_wrapper .tab-btns li a').click(function (e) {

            e.preventDefault();
            jQuery('.tab_wrapper .tab-btns li a').removeClass('active');
            jQuery(this).addClass('active');
            jQuery('.tab_wrapper .tab-content').hide().removeClass("active");

            var activeTab = jQuery(this).attr('href');
            jQuery(activeTab).fadeIn('slow').addClass("active");


            var position = jQuery(this).parent().position();
            var width = jQuery(this).parent().width();
            var height = jQuery(this).parent().height();

            // var offsetLeft = jQuery(this).offset().left - jQuery(this).parents("ul").offset().left + jQuery(this).parents("ul").scrollLeft(); 
            // console.log("offset",offsetLeft);

            jQuery(".tab_wrapper .tab-btns .slider").css({ "top": + position.top, "left": + position.left, "width": (width + 1), "height": height });

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
    }
});