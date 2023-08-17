function onCustomIconChange(inputFileId, iconPreviewId) {
  const [file] = document.getElementById(inputFileId).files
  if (file) {
    document.getElementById(iconPreviewId).src = URL.createObjectURL(file)
    var checkBox = document.getElementById("default");
    checkBox.checked = false;
  }
}
function onCustomTextureChange(inputFileId, iconPreviewId) {
  const [file] = document.getElementById(inputFileId).files
  if (file) {
    document.getElementById(iconPreviewId).src = URL.createObjectURL(file)
  }
}
function onCheckboxClick() {
  // Get the checkbox
  var checkBox = document.getElementById("default");
  // Get the output text
  var icon = document.getElementById("icon");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    document.getElementById("icon").src = "FlappyBird/FlappyBirdIcon.png";
  }
}
function onPlatformSelected() {
  // Get the checkbox
  var select = document.getElementById("platform");
  // Get the output text
  var platformIcon = document.getElementById("platformIcon");

  // If the checkbox is checked, display the output text
  if (select.value == "windows"){
    platformIcon.src = "windows.png";

  }else{
    platformIcon.src = "android.png";
  }
}
function onCustomOptionChange(selectionId, iconPreviewId, option1, option2, option3){
  var select = document.getElementById(selectionId);
  var platformIcon = document.getElementById(iconPreviewId);

  if (select.value == 1){
    platformIcon.src = option1;

  }else if(select.value == 2){
    platformIcon.src = option2;
  }else
  {
    platformIcon.src = option3;
  }
}

function sendEmail() {
  // TODO: Send email ._.
}
