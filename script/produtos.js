document.addEventListener('DOMContentLoaded', function () {
    const formProduto = document.getElementById('formProduto');
    const tabelaProdutos = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0];

    // Carrega os produtos salvos do localStorage ao carregar a página
    function carregarProdutos() {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.forEach(produto => adicionarProdutoNaTabela(produto));
    }

    // Adiciona produto na tabela
    function adicionarProdutoNaTabela(produto) {
        const novaLinha = tabelaProdutos.insertRow();
        novaLinha.insertCell(0).textContent = produto.nome;
        novaLinha.insertCell(1).textContent = produto.quantidade;
        novaLinha.insertCell(2).textContent = produto.validade;
        novaLinha.insertCell(3).textContent = produto.data;
    }

    // Salva produto no localStorage
    function salvarProdutoNoLocalStorage(produto) {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    // Manipula o envio do formulário
    formProduto.addEventListener('submit', function (event) {
        event.preventDefault();

        const nomeProduto = document.getElementById('nomeProduto').value;
        const quantidadeProduto = document.getElementById('quantidadeProduto').value;
        const validadeProduto = document.getElementById('validadeProduto').value;
        const entradaData = document.getElementById('entradaData').value;

        const novoProduto = {
            nome: nomeProduto,
            quantidade: quantidadeProduto,
            validade: validadeProduto,
            data: entradaData
        };

        // Adiciona o produto na tabela
        adicionarProdutoNaTabela(novoProduto);

        // Salva no localStorage
        salvarProdutoNoLocalStorage(novoProduto);

        // Limpa o formulário
        formProduto.reset();
    });

    // Função para gerar o arquivo Excel
    function gerarExcel() {
        const tabela = document.getElementById('tabelaProdutos');
        const ws = XLSX.utils.table_to_sheet(tabela);  // Converte a tabela para planilha
        const wb = XLSX.utils.book_new();              // Cria um novo livro
        XLSX.utils.book_append_sheet(wb, ws, 'Produtos');  // Adiciona a planilha ao livro

        // Gera o arquivo Excel e permite o download
        XLSX.writeFile(wb, 'produtos.xlsx');
    }

    // Botão para gerar Excel
    const btnGerarExcel = document.createElement('button');
    btnGerarExcel.textContent = 'Baixar Excel da tabela produtos';
    btnGerarExcel.addEventListener('click', gerarExcel);
    document.body.appendChild(btnGerarExcel);  // Adiciona o botão no fim da página

    // Carrega os produtos salvos ao iniciar a página
    carregarProdutos();
});
