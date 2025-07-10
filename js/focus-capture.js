var title = document.title;
var current_title = document.title;
var reset_title_timeout;

window.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        // The page is visible, reset the title
        document.title = 'ヾ(≧▽≦*)o 你回來啦！';

        reset_title_timeout = setTimeout(function () {
            document.title = current_title;
        }, 3000);
    } else {
        // The page is hidden, change the title
        document.title = '(╯°□°）╯︵ ┻━┻ 你不看我了嗎？';
        clearTimeout(reset_title_timeout);
    }
});