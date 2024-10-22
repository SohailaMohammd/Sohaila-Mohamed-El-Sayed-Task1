
function generateKeyTable(key, kLength, keyArr) {
    let i, j, k;


    let dicty = new Array(26).fill(0);
    for (i = 0; i < kLength; i++) {
        let r = key[i].charCodeAt(0) - 97;
        if (key[i] !== 'j') {
            dicty[r] = 2;
        }
    }

    dicty['j'.charCodeAt(0) - 97] = 1;
    i = 0;
    j = 0;

    for (k = 0; k < ks; k++) {
        let r = key[k].charCodeAt(0) - 97;
        if (dicty[r] === 2) {
            dicty[r] -= 1;
            keyArr[i][j] = key[k];
            j++;
            if (j === 5) {
                i++;
                j = 0;
            }
        }
    }

    for (k = 0; k < 26; k++) {
        if (dicty[k] === 0) {
            keyArr[i][j] = String.fromCharCode(k + 97);
            j++;
            if (j === 5) {
                i++;
                j = 0;
            }
        }
    }
    return keyArr;
}


function search(keyArr, a, b, arr) {
    let i, j;

    if (a === 'j') a = 'i';
    if (b === 'j') b = 'i';

    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            if (keyArr[i][j] === a) {
                arr[0] = i;
                arr[1] = j;
            } else if (keyArr[i][j] === b) {
                arr[2] = i;
                arr[3] = j;
            }
        }
    }
    return arr;
}


function mod5(a) {
    return (a % 5);
}


function prepare(str, strLen) {
    if (strLen % 2 !== 0) {
        str += 'x'; 
    }
    return [str, strLen];
}

// Function for performing the encryption
function encrypt(str, keyArr, ps) {
    let i;
    let a = new Array(4).fill(0);
    let newstr = new Array(ps);

    for (i = 0; i < ps; i += 2) {
        let brr = search(keyArr, str[i], str[i + 1], a);
        let k1 = brr[0];
        let k2 = brr[1];
        let k3 = brr[2];
        let k4 = brr[3];

        if (k1 === k3) {
            newstr[i] = keyArr[k1][(k2 + 1) % 5];
            newstr[i + 1] = keyArr[k1][(k4 + 1) % 5];
        } else if (k2 === k4) {
            newstr[i] = keyArr[(k1 + 1) % 5][k2];
            newstr[i + 1] = keyArr[(k3 + 1) % 5][k2];
        } else {
            newstr[i] = keyArr[k1][k4];
            newstr[i + 1] = keyArr[k3][k2];
        }
    }

    return newstr.join('');
}


function encryptByPlayfairCipher(str, key) {
    let ps, ks;
    let keyT = new Array(5);

    
    for (let i = 0; i < 5; i++) {
        keyT[i] = new Array(5);
    }

    
    str = str.replace(/\s+/g, '').trim().toLowerCase();
    key = key.replace(/\s+/g, '').trim().toLowerCase();

    
    ps = str.length;
    ks = key.length;

    
    [str, ps] = prepare(str, ps);

    
    let kt = generateKeyTable(key, ks, keyT);

   
    return encrypt(str, kt, ps);
}


function performEncryption() {
    let key = document.getElementById('key').value;
    let str = document.getElementById('plainText').value;


    let cipherText = encryptByPlayfairCipher(str, key);

    // Display result
    document.getElementById('result').innerHTML = "Cipher text: " + cipherText;
}

function Cancel() {
    let form = document.getElementById("keyInput");
    let textInput = document.getElementById("textInput");
    let Output = document.getElementById("cipherOutput");

    form.value = '';
    textInput.value = '';
    Output.innerText = '';

}
//////////////////////////////////////////////////////////////////////////////////

function performEncryption() {
    let key = document.getElementById("keyInput").value;
    let plaintext = document.getElementById("textInput").value;

    if (key === "" || plaintext === "") {
        alert("Please enter both key and plain text.");
        return;
    }

    let encryptedText = encryptByPlayfairCipher(plaintext, key);
    document.getElementById("cipherOutput").innerText = encryptedText;
}

function toLowerCase(plain) {
    
    return plain.toLowerCase();
}

function removeSpaces(plain) {
   
    return plain.split(' ').join('');
}

function generateKeyTable(key) {
   
    var keyT = new Array(5).fill(null).map(() => new Array(5).fill(''));
    var dicty = {};
    for (var i = 0; i < 26; i++) {
        dicty[String.fromCharCode(i + 97)] = 0;
    }

    for (var i = 0; i < key.length; i++) {
        if (key[i] != 'j') {
            dicty[key[i]] = 2;
        }
    }
    dicty['j'] = 1;

    var i = 0, j = 0, k = 0;
    while (k < key.length) {
        if (dicty[key[k]] == 2) {
            dicty[key[k]] -= 1;
            keyT[i][j] = key[k];
            j += 1;
            if (j == 5) {
                i += 1;
                j = 0;
            }
        }
        k += 1;
    }

    for (var k in dicty) {
        if (dicty[k] == 0) {
            keyT[i][j] = k;
            j += 1;
            if (j == 5) {
                i += 1;
                j = 0;
            }
        }
    }

    return keyT;
}

function search(keyT, a, b) {
    
    var arr = [0, 0, 0, 0];

    if (a == 'j') {
        a = 'i';
    } else if (b == 'j') {
        b = 'i';
    }

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if (keyT[i][j] == a) {
                arr[0] = i;
                arr[1] = j;
            } else if (keyT[i][j] == b) {
                arr[2] = i;
                arr[3] = j;
            }
        }
    }

    return arr;
}

function mod5(a) {
    
    if (a < 0) {
        a += 5;
    }
    return a % 5;
}

function decrypt(str, keyT) {
   
    var ps = str.length;
    var i = 0;
    while (i < ps) {
        var a = search(keyT, str[i], str[i + 1]);
        if (a[0] == a[2]) {
            str = str.slice(0, i) + keyT[a[0]][mod5(a[1] - 1)] + keyT[a[0]][mod5(a[3] - 1)] + str.slice(i + 2);
        } else if (a[1] == a[3]) {
            str = str.slice(0, i) + keyT[mod5(a[0] - 1)][a[1]] + keyT[mod5(a[2] - 1)][a[1]] + str.slice(i + 2);
        } else {
            str = str.slice(0, i) + keyT[a[0]][a[3]] + keyT[a[2]][a[1]] + str.slice(i + 2);
        }
        i += 2;
    }
    return str;
}

function decryptByPlayfairCipher(str, key) {
    
    var ks = key.length;
    key = removeSpaces(toLowerCase(key));
    str = removeSpaces(toLowerCase(str));
    var keyT = generateKeyTable(key);
    return decrypt(str, keyT);
}
function Delete() {
    let form = document.getElementById("cipherTextInput");
    let Output = document.getElementById("decryptedOutput");

    form.value = '';

    Output.innerText = '';
}

function performDecryption() {
    let key = document.getElementById("keyInput").value;
    let cipherText = document.getElementById("cipherTextInput").value;

    if (key === "" || cipherText === "") {
        alert("Please enter both key and cipher text.");
        return;
    }

    let plainText = decryptByPlayfairCipher(cipherText, key);
    document.getElementById("decryptedOutput").innerText = plainText;
}
