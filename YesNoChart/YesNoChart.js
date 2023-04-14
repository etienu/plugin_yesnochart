//------------------------------------------------
// 引用元
// ｢脱jQuery｣ 生JSで.fadeIn()のように要素をフェードインで表示する
// https://spyweb.media/2018/01/12/jquery-fadein-pure-javascript/
//------------------------------------------------
var ync_fadeIn = function(node, duration) {
    // display: noneでないときは何もしない
    //if (getComputedStyle(node).display !== 'none') return;

    // style属性にdisplay: noneが設定されていたとき
    if (node.style.display === 'none') {
        node.style.display = '';
    } else {
        node.style.display = 'block';
    }
    node.style.opacity = 0;

    var start = performance.now();

    requestAnimationFrame(function tick(timestamp) {
        // イージング計算式（linear）
        var easing = (timestamp - start) / duration;

        // opacityが1を超えないように
        node.style.display = "block";
        node.style.opacity = Math.min(easing, 1);

        // opacityが1より小さいとき
        if (easing < 1) {
            requestAnimationFrame(tick);
        } else {
            node.style.opacity = '';
        }
    });
};

//------------------------------------------------
var btn = document.querySelectorAll('.yn-chart a');
if (btn && 0 < btn.length) {
    // .yn-chart a 全てに設定
    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function(e) {
            // ボタンのaから遡って上のdivを取得
            const foo = e.target.closest('div');
            // div( 問題 )を非表示
            foo.style.display = "none";
            id = e.target.hash; // idの取得
            id = id.slice(1); // #を削る
            //  idのセレクタを取得
            var tar = document.getElementById(id);
            tar.style.opacity = 0; // 透明化
            tar.style.display = "block"; // 表示する( しないとリンク飛べない )
            ync_fadeIn(tar, 100);
            return false;
        })
    }
}
