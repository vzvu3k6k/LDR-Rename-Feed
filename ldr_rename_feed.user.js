// ==UserScript==
// @name        LDR Rename Feed
// @description :rename
// @version     1.2
// @namespace   http://www.vzvu3k6k.tk/
// @homepage    https://github.com/vzvu3k6k/LDR-Rename-Feed
// @match       http://reader.livedoor.com/reader/*
// @license     public domain
// ==/UserScript==

// メモ
//   * localStorageに{"rename_<subscribe_id>": <new_name>}という形式で変更ルールを記録する。
//   * タイトルが書き換わるのは左側のフィードリストだけ。編集画面には変更が反映されない。
//
// 以下のコードを参考にしました。
//   Karafuto Blog - livedoor Readerのフィードの名前を変更する User JavaScript
//   http://karafuto50.blog117.fc2.com/?no=130

var main = function(){
    /* 書き換え処理 */
    register_hook('AFTER_SUBS_LOAD', function (){
        var list = subs.model.list;
        for(var i = 0, l = list.length; i < l; i++){
            var newName = localStorage.getItem("rename_" + list[i].subscribe_id);
            if(newName !== null){
                renameFeed(list[i], newName);
            }
        }
        subs.update();
    });

    /* 書き換え設定
       :rename<Enter>で起動 */
    register_command("rename", function(){
        var activeFeed = get_active_feed();
        if(!activeFeed){
            message("フィードを開いた状態で実行してください。");
            return;
        }

        var newName = window.prompt("新しい名前を入力", activeFeed.channel.title);
        if(newName === null) return;
        if(newName !== ""){
            localStorage.setItem("rename_" + activeFeed.subscribe_id, newName);
            renameFeed(activeFeed, newName);
        }else{
            localStorage.removeItem("rename_" + activeFeed.subscribe_id);
            resetFeedName(subs.model.id2subs[activeFeed.id]);
        }

        subs.update();
    });

    var toJSON = JSON.stringify || uneval;
    var renameFeed = function(feed, newName){
        if(feed.original_title === undefined) feed.original_title = feed.title;
        feed.title = newName;
    };
    var resetFeedName = function(feed){
        feed.title = feed.original_title;
        delete feed.original_title;
    };
};

location.href = "javascript:(" + main + ")()";