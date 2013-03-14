// ==UserScript==
// @name        LDR Rename Feed
// @description :rename
// @namespace   http://www.vzvu3k6k.tk/
// @version     1.1
// @match       http://reader.livedoor.com/reader/*
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
                list[i].original_title = list[i].title;
                list[i].title = newName;
            }
        }
        /* 左のフィードのリストを更新 */
        subs.update();
    });

    /* 書き換え設定
       :rename<Enter>で起動 */
    register_command("rename", function(){
        var activeFeed = get_active_feed();
        var newName = window.prompt("新しい名前を入力", activeFeed.title);
        console.log(newName);
        if(newName === null) return;
        if(newName !== ""){
            localStorage.setItem("rename_" + activeFeed.subscribe_id, newName);
        }else{
            localStorage.removeItem("rename_" + activeFeed.subscribe_id);

            /* タイトルを戻す */
            var list = subs.model.list;
            for(var i = 0, l = list.length; i < l; i++){
                if(list[i].subscribe_id == activeFeed.subscribe_id){
                    list[i].title = list[i].original_title;
                    delete list[i].original_title;
                    break;
                }
            }
        }
        subs.update();
    });

    var toJSON = JSON.stringify || uneval;
};

location.href = "javascript:(" + main + ")()";