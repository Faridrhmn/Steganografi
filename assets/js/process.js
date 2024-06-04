const alphabet = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const Cregex = /^[a-zA-Z0-9_]*$/;
const regex = /^[a-zA-Z]+$/;
const z1 =/^[0-9]*$/;

// CAESAR ENCYRPT
const encryptCaesar = (plaintext, key) => {
    let ciphertext = "";
    let keyAlpha = key%26;
    let keyNumber = key%10;
    for (let i = 0; i < plaintext.length; i++) {
      const char = plaintext.charAt(i);
      const plainchar = plaintext.charAt(i).toLowerCase();
      if (char== ' '|| !Cregex.test(char) || char == '_') {
        ciphertext += char;
      } else {
        if (char >= '0' && char <= '9'){
          const newChar = number[(number.indexOf(plainchar) + keyNumber) % number.length];
          ciphertext += newChar;
        } else {
          const newChar = alphabet[(alphabet.indexOf(plainchar) + keyAlpha) %alphabet.length];
          if (char==char.toUpperCase()){
            ciphertext += newChar.toUpperCase();
          } else {
              ciphertext += newChar;
          }
        } 
      }
    }
    return ciphertext;
};
// 213432, bebasguahh
// CAESAR DECYRPT
const decryptCaesar = (ciphertext, key) => {
    let plaintext = "";
    let keyAlpha = key%26;
    let keyNumber = key%10;
    for (let i = 0; i < ciphertext.length; i++) {
      const char = ciphertext.charAt(i);
      const chiperchar = ciphertext.charAt(i).toLowerCase();
      if (char== ' '|| !Cregex.test(char) || char == '_') {
        plaintext += char;
      } else {
          if (char >= '0' && char <= '9'){
              const check = (number.indexOf(chiperchar) - keyNumber);
              if (check < 0){
                  let makeFix = number.length + check;
                  const newChar = number[makeFix % number.length];
                  plaintext += newChar;
              } else {
                  const newChar = number[check % number.length]
                  plaintext += newChar;
              }
          }
          else {
              const check = (alphabet.indexOf(chiperchar) - keyAlpha);
              if (check < 0){
                  let makeFix = alphabet.length + check;
                  const newChar = alphabet[makeFix % alphabet.length];
                  if (char==char.toUpperCase()){
                      plaintext += newChar.toUpperCase();
                  } else {
                      plaintext += newChar;
                  }
              } else {
                  const newChar = alphabet[check % alphabet.length]
                  if (char==char.toUpperCase()){
                      plaintext += newChar.toUpperCase();
                  } else {
                      plaintext += newChar;
                  }
              }
          }
      }
    }
    return plaintext;
};


// VIGNERE ENCYRPT
const encryptVigenere = (plaintext, key) => {
    let ciphertext = "";
    let keyIndex = 0;
    for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext.charAt(i);
        if (char== ' ') {
        ciphertext += ' ';
        } 
        else if(!regex.test(char)){
            ciphertext += char;
        }
        else {
            const lowercaseKey = key.charAt(keyIndex % key.length).toLowerCase();
            const newChar = alphabet[(alphabet.indexOf(char.toLowerCase()) + alphabet.indexOf(lowercaseKey)) % alphabet.length];
            if (char === char.toUpperCase()) {
            ciphertext += newChar.toUpperCase();
            } else {
            ciphertext += newChar;
            }
            keyIndex++;
        }   
    }
return ciphertext;
};
  
// VIGNERE DECYRPT
const decryptVigenere = (ciphertext, key) => {
    let plaintext = "";
    let keyIndex = 0;
    for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext.charAt(i);
        if (char === ' ') {
            plaintext += ' ';
        } 
        else if (!regex.test(char)){
            plaintext += char;
        }
        else {
            const lowercaseKey = key.charAt(keyIndex % key.length).toLowerCase();
            const newCharIndex = (alphabet.indexOf(char.toLowerCase()) - alphabet.indexOf(lowercaseKey) + alphabet.length) % alphabet.length;
            const newChar = alphabet[newCharIndex];
            if (char === char.toUpperCase()) {
            plaintext += newChar.toUpperCase();
            } else {
            plaintext += newChar;
            }
            keyIndex++;
        }
    }
    return plaintext;
};


// PROSES REPLACE FILE
function handleFileSelect(evt) {
    var img = document.getElementById("img"),
        cover = document.getElementById("cover");

    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                img.src = e.target.result;
                img.title = escape(theFile.name);
                cover.src = "assets/img/back2.jpeg";
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

function handleFileSelect2(evt) {
    var img = document.getElementById("imgEncyrpt");

    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                img.src = e.target.result;
                img.title = escape(theFile.name);
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

// ENKRIPSI GAMBAR
function encryptImage() {
    var img = document.getElementById("img"),
        cover = document.getElementById("cover"),
        textarea = document.getElementById("text"),
        download = document.getElementById("download");
    if(img && textarea) {
        cover.src = steg.encode(textarea.value, img);
        download.href=cover.src.replace("image/png", "image/octet-stream");
        console.log("succes")
    }
}

// DEKRIPSI GAMBAR
function decryptImage() {
    var img = document.getElementById("img"),
        message = document.getElementById("message"),
        textarea = document.getElementById("text");
    if(img && textarea) {
        message.innerHTML = steg.decode(img);
        textarea.value = message.innerHTML;
    }
}

// ENRKIPSI
document.querySelector("#makeSecret").addEventListener("click", () => {
    const plaintext = document.querySelector("#plaintext").value;
    const keyC = document.querySelector("#keyCaesar").value;
    const keyV = document.querySelector("#keyVignere").value;
    const cipherCaesar = encryptCaesar(plaintext, keyC);
    const cipherVignere = encryptVigenere(cipherCaesar, keyV);

    // BAGIAN STEGANO
    var img = document.querySelector("#img");
    var cover = document.querySelector("#cover");
    var download = document.querySelector("#download");
    if(img && cipherVignere) {
        cover.src = steg.encode(cipherVignere, img);
        download.href=cover.src.replace("image/png", "image/octet-stream");
        console.log("succes");
    }
    console.log(cover.src);
});

// DEKRIPSI SUPER
document.querySelector("#check").addEventListener("click", () => {
    var img = document.getElementById("imgEncyrpt"),
        textarea = document.getElementById("ciphertext");
    if(img) {
        ciphertext.innerHTML = steg.decode(img);
    }
});

document.querySelector("#makeTruth").addEventListener("click", () => {
    const ciphertext = document.querySelector("#ciphertext").value;
    const keyC = document.querySelector("#keyCa").value;
    const keyV = document.querySelector("#keyVe").value;
    const plainVignere = decryptVigenere(ciphertext, keyV)
    const plainCaesar = decryptCaesar(plainVignere, keyC)
    document.querySelector("#resultSecret").innerHTML = plainCaesar;
});

window.onload = function(){
    document.getElementById('fileTruth').addEventListener("change", handleFileSelect, false);
    document.getElementById('fileSecret').addEventListener("change", handleFileSelect2, false);
    document.querySelector("#logo").innerHTML = "Hallo " + localStorage.getItem("passUsername");
};