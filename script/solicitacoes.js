document.addEventListener('DOMContentLoaded', function() {
    const formSolicitacao = document.getElementById('solcitacaoProduto');
    const tabelaSolicitacao = document.getElementById('tabelaSolicitacoes').getElementsByTagName('tbody')[0];

    // Carrega os produtos salvos do localStorage ao carregar a página
    function carregarSolicitacoes() {
        const solicitacao = JSON.parse(localStorage.getItem('produtos')) || [];
        solicitacao.forEach(solicitacao => adicionarProdutoNaTabela(produto));
    }

    // Adiciona solicitações na tabela
    function adicionarSolcitacaoNaTabela(solicitacao) {
        const novaLinha = tabelaSolicitacao.insertRow();
        novaLinha.insertCell(0).textContent = solicitacao.nome;
        novaLinha.insertCell(1).textContent = solicitacao.produto;
        novaLinha.insertCell(2).textContent = solicitacao.quantidade;
        novaLinha.insertCell(3).textContent = solicitacao.data;
        novaLinha.insertCell(3).textContent = solicitacao.status;
    }

    // Salva solicitações no localStorage
    function salvarSolicitacaoNoLocalStorage(produto) {
        const produtos = JSON.parse(localStorage.getItem('solicitacao')) || [];
        produtos.push(solicitacao);
        localStorage.setItem('solicitacao', JSON.stringify(solicitacao));
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
            nome: nomeSolicitante,
            produto:produtoSolicitado,
            quantidade: quantidadeSolicitada,
            data: dataSolicitacao,
            status: statusSolicitacao
        };

        // Adiciona o produto na tabela
        adicionarProdutoNaTabela(novaSolicitacao);

        // Salva no localStorage
        salvarProdutoNoLocalStorage(novaSolicitacao);

        // Limpa o formulário
        formProduto.reset();
    });

    // Chama a função para carregar os produtos salvos ao iniciar a página
    carregarProdutos();
});
