/**
 * フェードイン
 * @param {Element} element 適用する要素
 * @param {number} [time=400] 効果時間（ミリ秒で指定）
 * @param {Function} [callback] 完了後のコールバック関数
 * @return {Element} 適用した要素を返す
 */
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

var btn = document.querySelectorAll('.yn-chart a');
if (btn && 0 < btn.length) {
    //console.log(" : ael_yesno_chart : [ load ] " + btn.length );
    // .yn-chart a 全てに設定
    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function(e) {
            // ボタンのaから遡って上のdivを取得
            const foo = e.target.closest('div');
            // div( 問題 )を非表示
            foo.style.display = "none";
            id = e.target.hash; // idの取得
            id = id.slice(1); // #を削る
            //    console.log(" : ael_yesno_chart : [ click ] " + id );
            //  idのセレクタを取得
            var tar = document.getElementById(id);
            //  console.log( tar );
            tar.style.opacity = 0; // 透明化
            tar.style.display = "block"; // 表示する( しないとリンク飛べない )
            ync_fadeIn(tar, 100);
            return false;
        })
    }
}