'use strict'

const ciphertext = ["68AF0BEF7F39982DA975B5E6D06947E61C22748C94A2155CFCCC464DEAFB6F4844DB2D7312ED192B6B7251580C61D5A296964E824A16648B16B9",
    "70A20FBD7E209324A979BFE2997A46E61B22749692EB1655FA995D46A9FA654F43C93F2114A21E3E227714580A6790B88BD74F9E09107D8B0EAC",
    "6FA20DBA622CDD28EC68F0F0C16D41A7023778C29EB8455EFC894B46EDA96C46459E2D2A1CEF1239707F571604618CEB9DD85E955013628B0DAE",
    "6FA20DBA6220893AA970A4B5CD664CE609286D8799B80010F68A0F56FAE868405BD72A2A51E118386E7214520E6994AC9D964E824A16648B16B9",
    "71A80AAA6227DD20FB68A0E1D6695BA71C3864C285AE1445F09E4A50A9EA6B5B52D82B3F51E3192922645D5100769ABE8B965C89480F6F910BB3",
    "7DA30ABD753A8E63FB70BEF1D66340BC0D24748D99EB065FEC804B03F9FB6F5F52D02A731CE31B24617F5B431C2496AA94DA1D865D17778109B3",
    "75B34EA66369932CFD31A0E7D86D5DAF0F3171C283A44542FC805603FAE6664C5BC77E3C1FA204346F7B51421D6D96EB9DD85E955013628B0DAE",
    "75E71DA771259163E774A6F0CB2E5BA3192378C283A30010EA8D4246A9F96B5A44C9312115A21823227B415A1B6D85A79D965C844A0C638C16B3"];

const category1 = ["0", "1", "2", "3", "8", "9", "A", "B"];
const category2 = ["4", "5", "6", "7", "C", "D", "E", "F"];

const key = [];
const plaintext = [[], [], [], [], [], [], [], []];

function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

function allAreEqual(array) {
    const result = array.every(element => {
        if (element === array[0]) {
            return true;
        }
    });
    return result;
}

for (let i = 0; i < ciphertext[0].length; i += 2) {
    let categorytotal1 = 0;
    let categorytotal2 = 0;
    const categoryElements1 = [];
    const categoryElements2 = [];
    for (let j = 0; j < ciphertext.length; j++) {
        if (category1.includes(ciphertext[j][i])) {
            categorytotal1++;
            categoryElements1.push(ciphertext[j][i] + ciphertext[j][i + 1]);
        }
        else {
            categorytotal2++;
            categoryElements2.push(ciphertext[j][i] + ciphertext[j][i + 1]);
        }
    }
    if (categorytotal1 === 0 || categorytotal2 === 0) {
        key.push('-');
        key.push('-');
    }
    else if (categorytotal1 === categorytotal2) {
        if (allAreEqual(categoryElements1)) {
            const spaceHexa = [...categoryElements1[0]];
            spaceHexa[0] = ("0x" + spaceHexa[0]) * 1;
            spaceHexa[1] = ("0x" + spaceHexa[1]) * 1;
            key.push(spaceHexa[0] ^ 0x2);
            key.push(spaceHexa[1] ^ 0x0);
        }
        else {
            const spaceHexa = [...categoryElements2[0]];
            spaceHexa[0] = ("0x" + spaceHexa[0]) * 1;
            spaceHexa[1] = ("0x" + spaceHexa[1]) * 1;
            key.push(spaceHexa[0] ^ 0x2);
            key.push(spaceHexa[1] ^ 0x0);
        }
    }
    else if (categorytotal1 > categorytotal2) {
        const spaceHexa = [...categoryElements2[0]];
        spaceHexa[0] = ("0x" + spaceHexa[0]) * 1;
        spaceHexa[1] = ("0x" + spaceHexa[1]) * 1;
        key.push(spaceHexa[0] ^ 0x2);
        key.push(spaceHexa[1] ^ 0x0);
    }
    else if (categorytotal2 > categorytotal1) {
        const spaceHexa = [...categoryElements1[0]];
        spaceHexa[0] = ("0x" + spaceHexa[0]) * 1;
        spaceHexa[1] = ("0x" + spaceHexa[1]) * 1;
        key.push(spaceHexa[0] ^ 0x2);
        key.push(spaceHexa[1] ^ 0x0);
    }
}
for (let j = 0; j < ciphertext.length; j++) {
    for (let i = 0; i < key.length; i += 2) {
        if (key[i] !== '-') {
            const hexa = (key[i + 1] ^ (("0x" + ciphertext[j][i + 1]) * 1)).toString();
            let arg2 = ''
            if (hexa === '10') {
                arg2 = 'A'
            }
            else if (hexa === '11') {
                arg2 = 'B'
            }
            else if (hexa === '12') {
                arg2 = 'C'
            }
            else if (hexa === '13') {
                arg2 = 'D'
            }
            else if (hexa === '14') {
                arg2 = 'E'
            }
            else if (hexa === '15') {
                arg2 = 'F'
            }
            else {
                arg2 = hexa;
            }
            plaintext[j].push(hex_to_ascii(((key[i] ^ (("0x" + ciphertext[j][i]) * 1)).toString() + arg2)));
        }
        else {
            plaintext[j].push('-');
        }
    }
}

for (let i = 0; i < plaintext.length; i++) {
    console.log(...plaintext[i])
}
