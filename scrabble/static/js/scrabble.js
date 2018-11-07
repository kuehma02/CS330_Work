function toggleDisabled() {
    isDisabled = document.getElementById("existingletters").disabled;
    if (isDisabled){
        document.getElementById("existingletters").disabled = false;
    } else{
        document.getElementById("existingletters").disabled = true;
    }
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("resultsTable");
    switching = true;
    dir = "asc"; 
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (n==0) {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (dir == "desc") {
                if (n==0){
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                      }
                }
                
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++; 
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function fillIn(){
    if (document.cookie != ""){
        cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            cookie = cookies[i].trim().split("=");
            if (cookie[0] == 'letter1') {
                document.scrabbleForm.letter1.value = cookie[1];
            }
            if (cookie[0] == 'letter2') {
                document.scrabbleForm.letter2.value = cookie[1];
            }
            if (cookie[0] == 'letter3') {
                document.scrabbleForm.letter3.value = cookie[1];
            }
            if (cookie[0] == 'letter4') {
                document.scrabbleForm.letter4.value = cookie[1];
            }
            if (cookie[0] == 'letter5') {
                document.scrabbleForm.letter5.value = cookie[1];
            }
            if (cookie[0] == 'letter6') {
                document.scrabbleForm.letter6.value = cookie[1];
            }
            if (cookie[0] == 'letter7') {
                document.scrabbleForm.letter7.value = cookie[1];
            }
            if (cookie[0] == 'dict'){
                document.scrabbleForm.dict.value = cookie[1];
            }
            if (cookie[0] == 'checked'){
                if (cookie[1] == 'attach')
                    document.scrabbleForm.attachExistingCheck.click()
            }
            if (cookie[0] == 'existing'){
                document.scrabbleForm.existingletters.value = cookie[1];
            }
        }
    }
}

$(document).ready(function() {
    toggleDisabled();
    fillIn();
});