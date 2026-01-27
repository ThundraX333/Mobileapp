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
                window.alert("Key または Memo が必須です。");
                return;
            } else {
                let w_confirm = window.confirm("LocalStroageに\n「" + key + " " + value + "」を保存(save)しますか？");
                if (w_confirm) {
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
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

        td1.innerHTML = "<input name ='chkbox1' type = 'checkbox'>";
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
            selectCheckBox();
        }, false);
}

function selectCheckBox() {
    let w_sel = "0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("list");
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i].cells[1].firstChild.data;
                w_textMemo = table1.rows[i].cells[2].firstChild.data;
            }
            // document.getElementById("textKey").value = table1.rows[i].cells[1].firstChild.data;
            //document.getElementById("textMemo").value = table1.rows[i].cells[2].firstChild.data;

           // w_sel = "1";
            //return w_sel;
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if (w_sel === "0") {
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
        window.alert("1つ選択(select)してください。");
    }
   return w_sel;
}


function delLocalStorage() {
    const del = document.getElementById("delete");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_sel = selectCheckBox();

            if (w_sel === "1") {
                const key = document.getElementById("textKey");
                const value = document.getElementById("textMemo");
                let w_confirm = window.confirm("LocalStorageに\n「" + key.value + " " + value.value + "」を削除(delete)しますか？");
                if (w_confirm) {
                    localStorage.removeItem(key.value);
                    let w_msg = "LocalStorageから " + key.value + " " + value.value + "を削除 (delete) しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                    viewStorage();
                }
            }
        },
        false
    );
}

function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");


    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = confirm("LocalStorageのデータをすべて削除 (all clear) します。\nよろしいですか？");
            if (w_confirm === true) {
                localStorage.clear();
                let w_msg = "LocalStorageのデータをすべて削除 (all clear) しました。";


                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";

                viewStorage();
            }
        },
        false
    );
}

