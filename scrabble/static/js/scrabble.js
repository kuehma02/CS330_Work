function toggleDisabled() {
    isDisabled = document.getElementById("existingletters").disabled;
    if (isDisabled){
        document.getElementById("existingletters").disabled = false;
    } else{
        document.getElementById("existingletters").disabled = true;
    }
}

$(document).ready(function() {
    document.getElementById('existingletters').disabled = true;
});