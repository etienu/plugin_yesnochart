//------------------------------------------------
//引用元
//【診断に使える】YES・NOチャートをWordPressで作る
//https://ponhiro.com/yesno-chart/
//------------------------------------------------
window.onload = function() {
    jQuery('.yn-chart a').click(function() {
        console.log(" : yesno_chart : load");
        jQuery(this).closest('div').css('display', 'none');
        id = jQuery(this).attr('href');
        jQuery(id).fadeIn('fast');
        return false;
    })
};
