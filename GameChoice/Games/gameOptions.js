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

function onCheckboxClick(defaultIcon) {
  // Get the checkbox
  var checkBox = document.getElementById("default");
  // Get the output text
  var icon = document.getElementById("icon");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    document.getElementById("icon").src = defaultIcon;
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
function onCustomSoundOptionChange(selectionId, audioPreviewId, audioSourcePreviewId, option1, option2, option3){
  var select = document.getElementById(selectionId);
  var audioPreview = document.getElementById(audioPreviewId);
  var audioSourcePreview = document.getElementById(audioSourcePreviewId);

  if (select.value == 1){
    audioSourcePreview.src = option1;

  }else if(select.value == 2){
    audioSourcePreview.src = option2;
  }else
  {
    audioSourcePreview.src = option3;
  }
  audioPreview.load();

}
function onCustomSoundChange(inputFileId, audioSourcePreviewId, audioPreviewId) {

  const [file] = document.getElementById(inputFileId).files
  var audioPreview = document.getElementById(audioPreviewId);
  if (file) {
    
    document.getElementById(audioSourcePreviewId).src = URL.createObjectURL(file)
  }
  audioPreview.load();
}

function sendEmail() {
  /*$.get(
      "http://10.0.0.114:5000/send",
      {name : "smazat", data : "nic"},
      function(data) {
         alert('page content: ' + data);
      }
  );*/
  
  const images = document.getElementsByName("inputImage");
  const imagesURL = [];

  for (let i = 0; i < images.length; i++) {
    imagesURL[i] = getBase64Image(images[i]);
    $.get(
        "http://10.0.0.114:5000/send",
        {name : images[i].id, data : imagesURL[i]},
        function(data) {
           alert('page content: ' + data);
        }
    );
  }
  console.log(imagesURL);


}
function getInfo(item, index){
  item.id + ":  " + item.value + "<br>";
}

function getBase64Image(img) {
    img.crossOrigin="anonymous"
    // Create an empty canvas element
    var canvas = document.createElement("canvas");    

    var dividerW = img.naturalWidth > 1000 ? 4 : img.naturalWidth < 100 ? 1 : 2;
    var dividerH = img.naturalHeight > 1000 ? 4 : img.naturalHeight < 100 ? 1 : 2;

    canvas.width = img.naturalWidth / dividerW;
    canvas.height = img.naturalHeight / dividerH;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/jpeg");

    return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
}

