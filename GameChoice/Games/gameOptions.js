
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
function onCustomOptionChange(selectionId, iconPreviewId, option1, option2, option3){
  var select = document.getElementById(selectionId);
  var platformIcon = document.getElementById(iconPreviewId);

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
  setTimeout(sendEmail, 100)
}
function wait(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
function sendEmail() {
 // console.log(document.getElementById("textInputBoxWish").value);
  const namespace = document.getElementById("fname").value;

  console.log(localStorage.package);
  $.ajax({
    async: false,
    type: "GET",
    url: "https://wsrv00.run-eu-central1.goorm.site/identify",
    data: {name : namespace}
  });
  sendImages(namespace);
  sendPlayerOptions(namespace);
  const sources = document.getElementsByName("sourceAudio");
  const inputs = document.getElementsByName("inputAudio");
  for(let i = 0; i < sources.length; i++) {
    sendAudio(namespace, sources[i], inputs[i]);
  }
 
  window.open("https://buy.stripe.com/9AQ5oi1lm7Ma4SY4gh?locale=cs" , "_self");
}

function sendImages(namespace){

  const images = document.getElementsByName("inputImage");
  const imagesURL = [];
  for (let i = 0; i < images.length; i++) {
    imagesURL[i] = getBase64Image(images[i]);
    var fileName = namespace + "/" + images[i].id + ".jpeg";
    const splitOutput = imagesURL[i].match(new RegExp('.{1,' + parseInt(30000) + '}', 'g'));
    for(let i2 = 0; i2 < splitOutput.length; i2++)
    {
      $.ajax({
          async: false,
          type: "GET",
          url: "https://wsrv00.run-eu-central1.goorm.site/send",
          data: {name : fileName, data : splitOutput[i2]}
      });
    }
    $.ajax({
      async: false,
      type: "GET",
      url: "https://wsrv00.run-eu-central1.goorm.site/finish",
      data: {name : fileName}
    });
  }

}
function sendAudio(namespace, audio, input){
  var fileName = namespace + "/" + audio.id + ".mp3";
  if(input.files[0] instanceof Blob) {
    getBase64(input.files[0]).then(output => {
      output = output.replace(/^data:audio\/.*;base64,/, "");
      if(output.length > 50000)
      {
        const splitOutput = output.match(new RegExp('.{1,' + parseInt(30000) + '}', 'g'));
        for(let i2 = 0; i2 < splitOutput.length; i2++)
        {
            $.ajax({
                async: false,
                type: "GET",
                url: "https://wsrv00.run-eu-central1.goorm.site/send",
                data: {name : fileName, data : splitOutput[i2]}
            });
        }
        $.ajax({
          async: false,
          type: "GET",
          url: "https://wsrv00.run-eu-central1.goorm.site/finish",
          data: {name : fileName}
        });
      } else {
        $.ajax({
          async: false,
          type: "GET",
          url: "https://wsrv00.run-eu-central1.goorm.site/send",
          data: {name : fileName, data : output}
        });
        $.ajax({
          async: false,
          type: "GET",
          url: "https://wsrv00.run-eu-central1.goorm.site/finish",
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
        if(output.length > 50000)
        {
          const splitOutput = output.match(new RegExp('.{1,' + parseInt((output.length) / 5) + '}', 'g'));
          for(let i2 = 0; i2 < splitOutput.length; i2++)
          {
              $.ajax({
                async: false,
                type: "GET",
                url: "https://wsrv00.run-eu-central1.goorm.site/send",
                data: {name : fileName, data : splitOutput[i2]}
              });
          }
          $.ajax({
            async: false,
            type: "GET",
            url: "https://wsrv00.run-eu-central1.goorm.site/finish",
            data: {name : fileName}
          }); 
        }
        else
        {
          $.ajax({
            async: false,
            type: "GET",
            url: "https://wsrv00.run-eu-central1.goorm.site/send",
            data: {name : fileName, data : output}
          });
          $.ajax({
            async: false,
            type: "GET",
            url: "https://wsrv00.run-eu-central1.goorm.site/finish",
            data: {name : fileName}
          });
        }
      });
    });
  }
}

function sendPlayerOptions(namespace){
  const playerOptionsRaw = document.getElementsByName("inputPlayer");
  const playerOptions = [];
  var playerOptionsFile = "";

  for(let i = 0; i < playerOptionsRaw.length; i++){
    playerOptions[i] = playerOptionsRaw[i].id + " " + playerOptionsRaw[i].value;
    playerOptionsFile += playerOptions[i] + ", ";
  }        
  playerOptionsFile += document.getElementById("platform").value + ", ";
  playerOptionsFile += localStorage.package + ", ";
  playerOptionsFile += document.getElementById("textInputBox").value + ", ";
  playerOptionsFile += document.getElementById("textInputBoxWish").value + ", ";
  $.ajax({
    async: false,
    type: "GET",
    url: "https://wsrv00.run-eu-central1.goorm.site/send",
    data: {name : namespace + "/" + "playerOptions.txt", data : playerOptionsFile}
  });
  $.ajax({
    async: false,
    type: "GET",
    url: "https://wsrv00.run-eu-central1.goorm.site/finish",
    data: {name : namespace + "/" + "playerOptions.txt"}
  });
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

