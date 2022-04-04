const saldoInicial = prompt('Para iniciar, digite qual o seu saldo inicial para comprar ações.');

const comprado = document.getElementById('comprado');
const vendido = document.getElementById('vendido');
const saldo = document.getElementById('saldo');
const tickerAcao = document.getElementById('ticket-acao');
const valorTransacao = document.getElementById('valor');    
const qtdAcoes = document.getElementById('qtd');
const botaoCompra = document.getElementById('btnC');
const botaoVenda = document.getElementById('btnV');
const localordens = document.querySelector('#ordens');
const apagarTxt = document.getElementById('apagar');
const apiUrl = "https://api-cotacao-b3.labdo.it/api/cotacao/cd_acao/";
var resp;

//inicializar saldo
saldo.innerHTML = saldoInicial;
let acumulado = saldoInicial;

//Request para API B3

/*
url = apiUrl.concat(tickerAcao.value);
function InsereAcao(url,tickerAcao.value){
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    let authors = data.results;
    return authors.map(function(author) {
        let li = createNode('li');
        let img = createNode('img');
        let span = createNode('span');
        img.src = author.picture.medium;
        span.innerHTML = `${author.name.first} ${author.name.last}`;
        append(li, img);
        append(li, span);
        append(ul, li);
    })
    })
    .catch(function(error) {
    console.log(error);
    });
}
*/

function InfoAcao(url){
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';

    request.onload = function() {
        if (request.readyState == 4 && (request.status >= 200 && request.status < 400)) {
            // Ok
           resp = request.response;
           //console.log(resp[0]["vl_fechamento"])
           // document.getElementById(tickerAcao).innerText=resp;
        } else {
            // Falhou
        }
    };
    request.onerror = function() {
    // Erro de conexão
        console.log("Erro:"+request);
    };
    request.send();
}

//Botões
botaoCompra.addEventListener("click", function(){  
    //localordens.innerHTML += "<div class='loader'><img width='50px' src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' id='loader'/> </div>"

    InfoAcao(apiUrl+tickerAcao.value+"/1");
    setTimeout(function(){ 
        document.getElementById('loader').style.display='none'; 
        
    },799);

    setTimeout(function(){
        let valXqtd = resp[0]["vl_fechamento"] * qtdAcoes.value;
        if (valXqtd> acumulado || tickerAcao.value == "" || qtdAcoes.value == "" ){
            alert("Impossivel completar a operação, verifique todos os campos novamente, e lembre-se, seu saldo é de R$ " + acumulado);
        } else{
            acumulado -= valXqtd;
            saldo.innerHTML = acumulado;
            comprado.innerHTML = valXqtd;
    
            apagarTxt.innerHTML = "";
            localordens.innerHTML += "<li class='vermelho'>"+ resp[0]["cd_acao"] + "<span>"+ qtdAcoes.value + " und. X R$ " + resp[0]["vl_fechamento"] + "</span><a class='info' target='_blank' href='https://www.moneytimes.com.br/cotacao?tvwidgetsymbol=BMFBOVESPA:"+tickerAcao.value+"'>+ Info</a></li>";  
        }            
    },800); 
});


botaoVenda.addEventListener("click", function(){    
    
    InfoAcao(apiUrl+tickerAcao.value+"/1");
    
    let valXqtd = resp[0]["vl_fechamento"] * qtdAcoes.value;

    if (tickerAcao.value == "" || qtdAcoes.value == "" ){
        alert("Impossivel completar a operação, verifique todos os campos novamente.");
    } else{        
        acumulado += valXqtd;
        saldo.innerHTML = acumulado;
        vendido.innerHTML = valXqtd;

        apagarTxt.innerHTML = "";
        localordens.innerHTML += "<li class='verde'>"+ resp[0]["cd_acao"] + "<span>"+ qtdAcoes.value + " und. X R$ " + resp[0]["vl_fechamento"] + "</span><a class='info' target='_blank' href='https://www.moneytimes.com.br/cotacao?tvwidgetsymbol=BMFBOVESPA:"+tickerAcao.value+"'>+ Info</a></li>";  
}
});    


