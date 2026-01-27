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
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        td1.innerHTML = "<input name ='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class ='trash'>";
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
    del.addEventListener("click", function (e) {
        e.preventDefault();
        const chkbox1 = document.getElementsByName("chkbox1");
        const list = document.getElementById("list");

        let w_cnt = selectCheckBox("del");

        if (w_cnt >= 1) {
            let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除(delete)しますか?";
            Swal.fire({
                title: "Memo app",
                html: w_msg,
                type: "question", // type ကို icon လို့ ပြင်ထားတယ်
                showCancelButton: true
            }).then(function (result) {
                if (result.value) {
                    for (let i = 0; i < chkbox1.length; i++) {
                        if (chkbox1[i].checked) {
                            // rows[i+1] အစား rows[i] ကို ပြင်ထားတယ်
                            localStorage.removeItem(list.rows[i].cells[1].textContent);
                        }
                    }
                    viewStorage();
                    let w_msg_done = "LocalStorageから" + w_cnt + "件を削除しました။";
                    Swal.fire({
                        title: "Memo app",
                        html: w_msg_done,
                        type: "success",
                        allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    }, false);

    // table1 listener ကို del listener ရဲ့ အပြင်ကို ထုတ်လိုက်ပါတယ်
    const table1 = document.getElementById("table1");
    table1.addEventListener("click", (e) => {
        if (e.target.classList.contains("trash") === true) {
            let index = e.target.parentNode.parentNode.rowIndex;
            const key = table1.rows[index].cells[1].textContent;
            const value = table1.rows[index].cells[2].textContent;

            // Single quotes အစား backticks ( ` ) သုံးမှ ${} အလုပ်လုပ်မှာပါ
            let w_delete = `localStorageから\n「${key} ${value}」\nを削除しますか？`;

            Swal.fire({
                title: "Memo app",
                html: w_delete,
                type: "question",
                showCancelButton: true
            }).then(result => {
                if (result.value === true) {
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg_single = `localStorageから${key} ${value}を削除しました!`;
                    Swal.fire({
                        title: "Memo app",
                        html: w_msg_single,
                        type: "success",
                        allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    });
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