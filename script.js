const saldoInicial = prompt('Qual o saldo inicial?');

const comprado = document.getElementById('comprado');
const vendido = document.getElementById('vendido');
const saldo = document.getElementById('saldo');
const ticketAcao = document.getElementById('ticket-acao');
const valorTransacao = document.getElementById('valor');    
const qtdAcoes = document.getElementById('qtd');
const botaoCompra = document.getElementById('btnC');
const botaoVenda = document.getElementById('btnV');
const localordens = document.querySelector('#ordens');
const apagarTxt = document.getElementById('apagar');

//inicializar saldo
saldo.innerHTML = saldoInicial;
let acumulado = saldoInicial;


botaoCompra.addEventListener("click", function(){    
    let valXqtd = valorTransacao.value * qtdAcoes.value;

    if (valXqtd> acumulado || valorTransacao.value == "" || ticketAcao.value == "" || qtdAcoes.value == "" ){
        alert("Impossivel completar a operação, verifique todos os campos novamente, e lembre-se, seu saldo é de R$ " + acumulado);
    } else{
        acumulado -= valXqtd;
        saldo.innerHTML = acumulado;
        comprado.innerHTML = valXqtd;

        apagarTxt.innerHTML = "";
        localordens.innerHTML += "<li class='vermelho'>"+ ticketAcao.value.toUpperCase()+ "<span>"+ qtdAcoes.value + " und. X R$ " + valorTransacao.value + "</span><a class='info' target='_blank' href='https://www.moneytimes.com.br/cotacao?tvwidgetsymbol=BMFBOVESPA:"+ticketAcao.value+"'>+ Info</a></li>";  
    }    
});


botaoVenda.addEventListener("click", function(){    
    let valXqtd = valorTransacao.value * qtdAcoes.value;

    if (valorTransacao.value == "" || ticketAcao.value == "" || qtdAcoes.value == "" ){
        alert("Impossivel completar a operação, verifique todos os campos novamente.");
    } else{        
        acumulado += valXqtd;
        saldo.innerHTML = acumulado;
        vendido.innerHTML = valXqtd;

        apagarTxt.innerHTML = "";
        localordens.innerHTML += "<li class='verde'>"+ ticketAcao.value.toUpperCase()+ "<span>"+ qtdAcoes.value + " und. X R$ " + valorTransacao.value + "</span><a class='info' target='_blank' href='https://www.moneytimes.com.br/cotacao?tvwidgetsymbol=BMFBOVESPA:"+ticketAcao.value+"'>+ Info</a></li>";  
}
});    
