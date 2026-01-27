"use strict"

window.addEventListener("DOMContentLoaded",
    function () {
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはlocal Storage機能が実装されていません。");
            return;
        } else {
            viewStorage();
            saveLocalStorage();
            selectTable();
            delLocalStorage();
            allClearLocalStorage();
        }
    }, false
);

function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;


            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html: "Key、Memoはいずれも必須です。" //メッセージ内容をここに設定
                    , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                    , allowOutsideClick: false //枠外クリックは許可しない
                });
                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存（save）しますか？";
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html: w_msg //メッセージ内容をここに設定
                    , type: "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                    , showCancelButton: true // キャンセルボタンの表示
                }).then(function (result) {
                    //確認（かくにん）ダイアログで「OK」を押されたとき、保存（ほぞん）する
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage(); //localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存（ほぞん）しました。";
                        Swal.fire({
                            title: "Memo app" //タイトルをここに設定
                            , html: w_msg //メッセージ内容をここに設定
                            , type: "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                            , allowOutsideClick: false //枠外クリックは許可しない
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );
};


function viewStorage() {
    const list = document.getElementById("list");
    while (list.rows[0]) list.deleteRow(0);
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name ='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });

    $("#table1").trigger("update");
}

function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox("select");
        }, false);
}

function selectCheckBox(mode) {
    // let w_sel = "0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const tbody = document.getElementById("list");
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = tbody.rows[i].cells[1].firstChild.data;
                w_textMemo = tbody.rows[i].cells[2].firstChild.data;


            }
            w_cnt++;
        }
    }

    if (mode === "select") {
        if (w_cnt === 1) {
            document.getElementById("textKey").value = w_textKey;
            document.getElementById("textMemo").value = w_textMemo;
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: "1つ選択(select)してください。" //メッセージ内容をここに設定
                , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , allowOutsideClick: false //枠外クリックは許可しない
            });
        }
    }

    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: "1つ以上選択(select)してください。" //メッセージ内容をここに設定
                , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , allowOutsideClick: false //枠外クリックは許可しない
            });
        }
    }
}





function delLocalStorage() {
    const del = document.getElementById("delete");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const list = document.getElementById("list");
            let w_cnt = 0;
            w_cnt = selectCheckBox("del");

            if (w_cnt >= 1) {
                let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除(delete)しますか?"; //
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html: w_msg //メッセージ内容をここに設定
                    , type: "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                    , showCancelButton: true // キャンセルボタンの表示
                }).then(function (result) {
                    //確認(かくにん)ダイアログで「OK」を押されたとき、削除(さくじょ)する
                    if (result.value) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage(); //localStorageからのデータの取得(しゅとく)とテーブルへ表示(ひょうじ) let w_msg = "LocalStorageから" + w_cnt + "件を削除(delete)しました。";
                        Swal.fire({
                            title: "Memo app" //タイトルをここに設定
                            , html: w_msg //メッセージ内容をここに設定
                            , type: "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                            , allowOutsideClick: false //枠外クリックは許可しない
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );
}

function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");


    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_msg = "LocalStorageのデータをすべて削除(all clear)します。\nよろしいですか?";
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: w_msg //メッセージ内容をここに設定
                , type: "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , showCancelButton: true // キャンセルボタンの表示
            }).then(function (result) {
                if (result.value) {
                    localStorage.clear();
                    viewStorage(); //localStorageからのデータの取得(しゅとく)とテーブルへ表示(ひょうじ) let w_msg = "LocalStorageのデータをすべて削除(all clear)しました。";
                    // window.alert(w_msg);
                    Swal.fire({
                        title: "Memo app" //タイトルをここに設定
                        , html: w_msg //メッセージ内容をここに設定
                        , type: "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                        , allowOutsideClick: false //枠外クリックは許可しない
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        },
        false
    );


}