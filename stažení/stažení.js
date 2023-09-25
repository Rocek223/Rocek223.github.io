document.getElementsByClassName("loader")[0].style.display = "none";
document.getElementsByClassName("loadText")[0].style.display = "none";

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function fadeOutLoadText() {
	var fadeTarget = document.getElementsByClassName("loadText")[0];
	fadeTarget.style.opacity = 1;
  var fadeEffect = setInterval(function () {
      if (fadeTarget.style.opacity > 0) {
          fadeTarget.style.opacity -= 0.1;
      } else {
          clearInterval(fadeEffect);
      }
  }, 200);
}

function showDownloadStatus(status, color) {
	document.getElementsByClassName("loadText")[0].innerHTML = status;
	document.getElementsByClassName("loadText")[0].style.color = color;
	document.getElementsByClassName("loadText")[0].style.display = "block";
	fadeOutLoadText();
}

var next = 1;

function srand(seed) {next = seed;}

function rand() {
    next = next + 1
    return (next ** 2) % 1024 * 23781 % 2013;
}

var downloadBlob, downloadURL;

downloadBlob = function(data, fileName, mimeType) {
  var blob, url;
  blob = new Blob([data], {
    type: mimeType
  });
  url = window.URL.createObjectURL(blob);
  downloadURL(url, fileName);
  setTimeout(function() {
    return window.URL.revokeObjectURL(url);
  }, 1000);
};

downloadURL = function(data, fileName) {
  var a;
  a = document.createElement('a');
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.style = 'display: none';
  a.click();
  a.remove();
};

function penkHash(string, length) {
	var seed = 1;
	for (let i = 0; i < string.length; i++) {
	  seed += string.charAt(i).charCodeAt(0);
	}

	srand(seed);

	var output = "";
	for(let i = 0; i < length; i++) {
		output += String.fromCharCode(48 + (rand() % 10));
	}

	return output;
}

function download(name, code, silent) {
	return new Promise(function(resolve, reject) {
		const request = new XMLHttpRequest();
		request.open("GET", "https://zahon7.github.io/files/" + name + ".apk", true);
		request.responseType = "arraybuffer";

		request.onload = (event) => {
		  const arrayBuffer = request.response;
		  if (arrayBuffer) {
		    var byteArray = new Uint8Array(arrayBuffer);

		    var xorKey = penkHash(code, 100000);

		    var xorIndex = 0;
		    for(let index = 99; index < byteArray.length; index++) {
		      byteArray[index] = byteArray[index] ^ xorKey[xorIndex % xorKey.length].charCodeAt(0);
		      if(index >= byteArray.length - 2) {
		      	if(byteArray[index] != 0) {
		      		if(!silent) {
		      			document.getElementsByClassName("loader")[0].style.display = "none";
		      			showDownloadStatus("Chyba: špatný kód zásilky", "red");
		      		}
		      		reject();
		      		return;
		      	}
		      }
		      xorIndex++;
		    }

		    downloadBlob(byteArray, "Vlastní hra.apk", "application/octet-stream");

		    if(!silent) {
		    	document.getElementsByClassName("loader")[0].style.display = "none";
		    	showDownloadStatus("Hra byla úspěšně stažená", "green");
		    }
		   	resolve();
		  }
		};

		request.send(null);
	});
}

async function downloadNameCode(nameCode, silent) {
	if(!silent)
		document.getElementsByClassName("loader")[0].style.display = "block";
	await download(nameCode.substr(0, 3), nameCode.substr(3, 6), silent);
}

async function start() {
	var params = getQueryParams(document.location.search);
	if(params.code != undefined) {
		document.documentElement.innerHTML = "";

		await downloadNameCode(params.code, true).then(
		  function(value) { window.location = "výsledek.html?result=0"; },
		  function(error) { window.location = "výsledek.html?result=-1"; }
		);
	}
}

start();
