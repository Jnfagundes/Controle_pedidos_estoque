document.getElementById('btnEntrar').addEventListener('click', function() {
    const usuario = document.getElementById('loginUsuario').value;
    const senha = document.getElementById('loginSenha').value;

    // Verifica se os dados estão corretos (simples verificação)
    const usuarioCorreto = "DJRC";
    const senhaCorreta = "@djrc";

    if (usuario === usuarioCorreto && senha === senhaCorreta) {
        // Esconde a seção de login
        document.getElementById('secaoLogin').style.display = 'none';
        
        // Mostra a seção de boas-vindas
        document.getElementById('bemVindoUsuario').textContent = `Bem-vindo, ${usuario}!`;
        document.getElementById('secaoBoasVindas').style.display = 'block';
        document.getElementById('cadastrarProduto').style.display = 'block';
        document.getElementById('btnSolicitacao').style.display = 'block';
    } else {
        alert('Usuário ou senha incorretos.');
    }
});

document.getElementById('mostrarTabela').addEventListener('click' , function(){
    document.getElementById('produtosCadastrados').style.display = 'block';
});

document.getElementById('ocultarTabela').addEventListener('click' , function(){
    document.getElementById('produtosCadastrados').style.display = 'none';
});

document.getElementById('btnSolicitacao').addEventListener('click' , function(){
    document.getElementById('solicitacao').style.display = 'block';
});