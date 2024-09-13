document.addEventListener('DOMContentLoaded', function () {
    const formSolicitacao = document.getElementById('formSolicitacao');
    const tabelaSolicitacoes = document.getElementById('tabelaSolicitacoes').getElementsByTagName('tbody')[0];

    // Função para carregar as solicitações do localStorage
    function carregarSolicitacoes() {
        const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];
        solicitacoes.forEach(solicitacao => adicionarSolicitacaoNaTabela(solicitacao));
    }

    // Função para adicionar uma solicitação na tabela
    function adicionarSolicitacaoNaTabela(solicitacao) {
        const novaLinha = tabelaSolicitacoes.insertRow();
        novaLinha.insertCell(0).textContent = solicitacao.solicitante;
        novaLinha.insertCell(1).textContent = solicitacao.produtoSolicitado;
        novaLinha.insertCell(2).textContent = solicitacao.quantidadeSolicitada;
        novaLinha.insertCell(3).textContent = solicitacao.dataSolicitacao;
        novaLinha.insertCell(4).textContent = solicitacao.statusSolicitacao;
    }

    // Função para salvar a solicitação no localStorage
    function salvarSolicitacaoNoLocalStorage(solicitacao) {
        const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];
        solicitacoes.push(solicitacao);
        localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
    }

    // Manipula o envio do formulário
    formSolicitacao.addEventListener('submit', function (event) {
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

        // Limpa os campos do formulário
        formSolicitacao.reset();
    });

    // Carrega as solicitações salvas ao iniciar a página
    carregarSolicitacoes();

    // Função para gerar o arquivo Excel
    function gerarExcel() {
        const tabela = document.getElementById('tabelaSolicitacoes');
        const ws = XLSX.utils.table_to_sheet(tabela);  // Converte a tabela para planilha
        const wb = XLSX.utils.book_new();              // Cria um novo livro
        XLSX.utils.book_append_sheet(wb, ws, 'Solicitações');  // Adiciona a planilha ao livro

        // Gera o arquivo Excel e permite o download
        XLSX.writeFile(wb, 'solicitacoes.xlsx');
    }

    // Botão para gerar Excel
    const btnGerarExcel = document.createElement('button');
    btnGerarExcel.textContent = 'Baixar Excel da tabela de socitações';
    btnGerarExcel.addEventListener('click', gerarExcel);
    document.body.appendChild(btnGerarExcel);  // Adiciona o botão no fim da página
});
