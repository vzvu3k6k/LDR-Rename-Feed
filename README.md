Livedoor Readerでフィードをリネームするユーザースクリプト。

[install](https://github.com/vzvu3k6k/LDR-Rename-Feed/raw/master/ldr_rename_feed.user.js)

  * フィード編集画面ではリネームが反映されない。
  * キャンセルするまでpromptが無限に開き続ける。Firefox + Scriptishで確認。原因不明。
  * フィード登録画面で名前を指定できたほうがよさそう。
  * 読み込み時に`subs.model.list`を全部走査して`localStorage.getItem`を呼びまくるのはよくない。

