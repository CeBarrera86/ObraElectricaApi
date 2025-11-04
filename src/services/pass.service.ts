export function codificar(pass: string) {
    var wEsimPar = 1;
    let n = 1;
    let i = pass.length;
    let cPass = "";
    while (i != 0) {
        let sCaracter = pass.charAt(i - 1);
        if (wEsimPar == 1) {
            sCaracter = String.fromCharCode(sCaracter.charCodeAt(0) + n);
            if (sCaracter == String.fromCharCode(39) || sCaracter == '|') {
                sCaracter = String.fromCharCode(sCaracter.charCodeAt(0) + 2);
            }
            wEsimPar = 0;
        } else {
            sCaracter = String.fromCharCode(sCaracter.charCodeAt(0) - n);
            if (sCaracter == String.fromCharCode(39) || sCaracter == '|') {
                sCaracter = String.fromCharCode(sCaracter.charCodeAt(0) + 2);
            }
            wEsimPar = 1;
        }
        cPass = cPass + sCaracter;
        i = i - 1;
        n = n + 1;
    }
    return cPass;
}

export function decodificar(pass: string) {
    let n = pass.length;
    let wEsimPar = n % 2 == 0 ? 1 : 0;
    let i = pass.length;
    let dPass = "";
    while (i != 0) {
        let sCaracter = pass.charAt(i - 1);
        if (wEsimPar) {
            sCaracter = String.fromCharCode(sCaracter.charCodeAt(0) + n);
            if (sCaracter == String.fromCharCode(39) || sCaracter == '|') {
                sCaracter = String.fromCharCode(sCaracter.charCodeAt(0) - n);
            }
            wEsimPar = 0;
        } else {
            sCaracter = String.fromCharCode(sCaracter.charCodeAt(0) - n);
            if (sCaracter == String.fromCharCode(39) || sCaracter == '|') {
                sCaracter = String.fromCharCode(sCaracter.charCodeAt(0) - n);
            }
            wEsimPar = 1;
        }
        dPass = dPass + sCaracter;
        i = i - 1;
        n = n - 1;
    }
    return dPass;
}