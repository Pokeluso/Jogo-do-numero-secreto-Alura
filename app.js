let listadeNumeros = [];
let numeroLimite = 10;
let numeroScreto = gerarNumeroaleatorio();
let tentativas = 1;

function textoNatela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
   
}

function mensagemInicio(){
    textoNatela('h1','Jogo do secret number');
    textoNatela('p', 'escolha um numero de 1 a 10');
}

mensagemInicio();

function verificarChute(){

    let chute = document.querySelector('input').value;
    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemFinal = `Você descobriu em ${tentativas} ${palavraTentativas}!`

    if (chute == numeroScreto){
        textoNatela('h1', 'Numero secreto descoberto!!');
        textoNatela('p', mensagemFinal);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroScreto) {
        textoNatela('p', 'O numero é menor');
    }else {
        textoNatela('p', 'o numero é maior');
        }
        tentativas ++;
        esvaziarCampo();
    }
}

function gerarNumeroaleatorio(){
   let numeroSorteado = parseInt(Math.random() *numeroLimite +1);
   let numDeElementosDaLista = listadeNumeros.length;

   if (numDeElementosDaLista == numeroLimite){
    listadeNumeros = [];
   }

   if (listadeNumeros.includes(numeroSorteado)){
    return gerarNumeroaleatorio();
   } else {
    listadeNumeros.push(numeroSorteado);
    console.log(listadeNumeros);
    return numeroSorteado;
   }
}

function esvaziarCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    esvaziarCampo();
    mensagemInicio();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    
    numeroScreto = gerarNumeroaleatorio();
    console.log(numeroScreto)
    tentativas = 1;
}