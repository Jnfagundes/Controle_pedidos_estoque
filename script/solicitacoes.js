
document.addEventListener('DOMContentLoaded', function(){
    const formSolicitacao = document.getElementById('formSolicitacao');
    const tabelaSolicitacoes = document.getElementById('tabelaSolicitacoes').getElementsByTagName('tbody')[0];

    // Guardar as solicitações no localStorage
    function carregarSolicitacao() {
        const solicitacoes = JSON.parse(localStorage.getItem('solicitacao')) || [];
        solicitacoes.forEach(solicitacao => adicionarSolicitacaoNaTabela(solicitacao));
    }

    // Adiciona solicitações na tabela
    function adicionarSolicitacaoNaTabela(solicitacao) {
        const novaLinha = tabelaSolicitacoes.insertRow();
        novaLinha.insertCell(0).textContent = solicitacao.solicitante;
        novaLinha.insertCell(1).textContent = solicitacao.produtoSolicitado;
        novaLinha.insertCell(2).textContent = solicitacao.quantidadeSolicitada;
        novaLinha.insertCell(3).textContent = solicitacao.dataSolicitacao;
        novaLinha.insertCell(4).textContent = solicitacao.statusSolicitacao;
    }

    // Salva solicitações no localStorage
    function salvarSolicitacaoNoLocalStorage(solicitacao) {
        const solicitacoes = JSON.parse(localStorage.getItem('solicitacao')) || [];
        solicitacoes.push(solicitacao);
        localStorage.setItem('solicitacao', JSON.stringify(solicitacoes));
    }

    // Manipula o envio do formulário
    formSolicitacao.addEventListener('submit', function(event) {
        event.preventDefault();

        const nomeSolicitante = document.getElementById('solicitante').value;
        const produtoSolicitado = document.getElementById('produtoSolicitado').value;
        const quantidadeSolicitada = document.getElementById('quantidadeSolicitada').value;
        const dataSolicitacao = document.getElementById('dataSolicitacao').value;
        const statusSolicitacao = document.getElementById('statusSolicitacao').value;

        const novaSolicitacao = {
            solicitante: nomeSolicitante,
            produtoSolicitado: produtoSolicitado,
            quantidadeSolicitada: quantidadeSolicitada,
            dataSolicitacao: dataSolicitacao,
            statusSolicitacao: statusSolicitacao
        };

        // Adiciona a solicitação na tabela
        adicionarSolicitacaoNaTabela(novaSolicitacao);

        // Salva no localStorage
        salvarSolicitacaoNoLocalStorage(novaSolicitacao);

        // Carrega as solicitações salvas ao iniciar a página
        carregarSolicitacao();
    });

    // Chama a função para carregar as solicitações salvas ao iniciar a página
    carregarSolicitacao();
});
