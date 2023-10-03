
var width = 0;

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
function onCustomOptionChange(inputId, selectionId, iconPreviewId, option1, option2, option3){
  var input = document.getElementById(inputId);
  var select = document.getElementById(selectionId);
  var platformIcon = document.getElementById(iconPreviewId);
  input.value = "";
  if (select.value == 1){
    platformIcon.src = option1;
    platformIcon = URL.createObjectURL(platformIcon);

  }else if(select.value == 2){
    platformIcon.src = option2;
  }else
  {
    platformIcon.src = option3;
  }

}
function onCustomSoundOptionChange(selectionId, audioPreviewId, audioSourcePreviewId, option1, option2, option3, audioInputId){
  var select = document.getElementById(selectionId);
  var audioPreview = document.getElementById(audioPreviewId);
  var audioSourcePreview = document.getElementById(audioSourcePreviewId);
  var audioInput = document.getElementById(audioInputId);


  if (select.value == 1){
    audioSourcePreview.src = option1;

  }else if(select.value == 2){
    audioSourcePreview.src = option2;
  }else
  {
    audioSourcePreview.src = option3;
  }
  audioPreview.load();
  audioInput.value = "";

}
function onCustomSoundChange(inputFileId, audioSourcePreviewId, audioPreviewId) {

  const [file] = document.getElementById(inputFileId).files
  var audioPreview = document.getElementById(audioPreviewId);
  if (file) {
    
    document.getElementById(audioSourcePreviewId).src = URL.createObjectURL(file)
  }
  audioPreview.load();
}
function enableLoading(){
  document.getElementById("loading").style.visibility = "visible";
  document.getElementById("myProgress").style.visibility = "visible";
  setTimeout(sendEmail, 100);
}
function wait(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
function sendEmail() {
  const namespace = document.getElementById("fname").value;
  var url2 = "https://vlastni-hry.cz/GameChoice/Games/paymentDone";

  $.ajax({
    async: false,
    type: "GET",
    url: "https://vlastni-hry.x10.mx/identify.php",
    data: {name : namespace}
  });

  sendImages(namespace);
  sendPlayerOptions(namespace);
}

function stringToFile(string, filename) {
  var blob = new Blob([string], { type: 'text/plain' });
  return new File([blob], filename, {type: "text/plain"});
}

function sendImages(namespace){
  const inpFiles = document.getElementsByClassName("file");

  var endpoint = "";
  const formData = new FormData();
  for(let i = 0; i < inpFiles.length; i++) {
    
    if(inpFiles[i].files[0] == undefined){
      endpoint = "https://vlastni-hry.x10.mx/send.php?name=" + namespace + "/" + inpFiles[i].id + ".file";
      formData.append("inpFile", stringToFile("kunda", "nic"));
    }else{
      endpoint = "https://vlastni-hry.x10.mx/send.php?name=" + namespace + "/" + inpFiles[i].id + ".jpeg";
      formData.append("inpFile", inpFiles[i].files[0]);      
    }

    fetch(endpoint, {
      method: "post",
      body: formData
    }).catch(console.error);
    console.log(inpFiles[i].id);
  }
}
function sendAudio(namespace, audio, input){
  var fileName = namespace + "/" + audio.id + ".mp3";
  if(input.files[0] instanceof Blob) {
    getBase64(input.files[0]).then(output => {
      output = output.replace(/^data:audio\/.*;base64,/, "");
      if(output.length > 19000)
      {
        const splitOutput = output.match(new RegExp('.{1,' + parseInt(20000) + '}', 'g'));
        for(let i2 = 0; i2 < splitOutput.length; i2++) {
            $.ajax({
              async: false,
              type: "GET",
              url: "https://vlastni-hry.x10.mx/send.php",
              data: {content : splitOutput[i2], name: fileName}
            });
        }
        $.ajax({
          async: false,
          type: "GET",
          url: "https://vlastni-hry.x10.mx/finish.php",
          data: {name : fileName}
        });
      } else {
        $.ajax({
          async: false,
          type: "GET",
          url: "https://vlastni-hry.x10.mx/send.php",
          data: {content : output, name: fileName}
        });
        $.ajax({
          async: false,
          type: "GET",
          url: "https://vlastni-hry.x10.mx/finish.php",
          data: {name : fileName}
        });
      }
    });
  }
  else
  {
    fetch(audio.src)
    .then(response => response.blob())
    .then(blob => {
      getBase64(blob).then(output => {
        output = output.replace(/^data:audio\/.*;base64,/, "");
        if(output.length > 19000)
        {
          const splitOutput = output.match(new RegExp('.{1,' + parseInt(20000) + '}', 'g'));
          for(let i2 = 0; i2 < splitOutput.length; i2++)
          {   
            $.ajax({
              async: false,
              type: "GET",
              url: "https://vlastni-hry.x10.mx/send.php",
              data: {content : splitOutput[i2], name: fileName}
            });
          }
          $.ajax({
            async: false,
            type: "GET",
            url: "https://vlastni-hry.x10.mx/finish.php",
            data: {name : fileName}
          });
        }
        else
        {
          $.ajax({
            async: false,
            type: "GET",
            url: "https://vlastni-hry.x10.mx/send.php",
            data: {content : output, name: fileName}
          });
          $.ajax({
            async: false,
            type: "GET",
            url: "https://vlastni-hry.x10.mx/finish.php",
            data: {name : fileName}
          });
        }
      });
    });
  }
}

function sendPlayerOptions(namespace){
  endpoint = "https://vlastni-hry.x10.mx/send.php?name=" + namespace + "/gameOptions.txt";
  const playerOptionsRaw = document.getElementsByName("inputPlayer");
  const playerOptions = [];
  var playerOptionsText = "";

  for(let i = 0; i < playerOptionsRaw.length; i++){
    playerOptions[i] = playerOptionsRaw[i].id + " " + playerOptionsRaw[i].value;
    playerOptionsText += playerOptions[i] + ", ";
  }        
  playerOptionsText += document.getElementById("platform").value + ", ";
  playerOptionsText += localStorage.package + ", ";
  playerOptionsText += document.getElementById("textInputBox").value + ", ";
  playerOptionsText += document.getElementById("textInputBoxWish").value + ", ";
  playerOptionsText += document.getElementById("email").value + ", ";
  const formDataPlayerOptions = new FormData();
  formDataPlayerOptions.append("inpFile", stringToFile(playerOptionsText, "playerOptions.txt"));


  fetch(endpoint, {
    method: "post",
    body: formDataPlayerOptions
  }).catch(console.error);

}
function getInfo(item, index){
  item.id + ":  " + item.value + "<br>";
}
function getBase64(blob) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas"); 

    var dividerW = img.naturalWidth > 500 ? 3 : 1;
    var dividerH = img.naturalHeight > 500 ? 3 : 1;

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

    return dataURL.replace(/^data:image\/.*;base64,/, "");
}
function getPackage(package_){
  localStorage.package = package_;
}
var i = 0;

