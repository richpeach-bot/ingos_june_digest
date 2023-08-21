function commentReady() {
    var COMMENT_NAME = 'Лето на 100%: как провести его идеально ';
    var COMMENT_API = 'https://ingosdigestapi.outofcloud.ru/comment/';
    var commentButton = document.querySelector('.js-comment-button');
    var area = document.querySelector('.js-area');
    var commentThank = document.querySelector('.js-comment-thank');

    function commentXhr(name, comment) {
        var rq = new XMLHttpRequest();
        rq.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    var response = JSON.parse(this.response);
                    if (response.status && response.status === 'Success') {
                        commentThank.classList.add('comment__thank--visible');
                    } else {
                        console.log('ошибка сервера');
                    }
                } else {
                    console.log('ошибка сервера');
                }
            }
        };
        rq.open('POST', COMMENT_API);
        rq.setRequestHeader('Content-Type', 'application/json');
        rq.send(JSON.stringify({
            name: name,
            comment: comment
        }));
    }

    commentButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (area && area.value !== '') {
            commentXhr(COMMENT_NAME, area.value);
        }
    });
}

document.addEventListener('DOMContentLoaded', commentReady);
