// Função para buscar CEP usando a API ViaCEP
function buscarCEP(cep) {
    // Remove qualquer formatação do CEP (apenas números)
    const cepFormatado = cep.replace(/\D/g, '');
    
    // Verifica se o CEP tem 8 dígitos
    if (cepFormatado.length !== 8) {
        return;
    }
    
    // Seleciona os campos do formulário
    const endereco = document.getElementById('endereco');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');
    const uf = document.querySelector('select[name="UF"]');
    
    // Adiciona feedback de carregamento
    endereco.value = 'Buscando...';
    bairro.value = 'Buscando...';
    cidade.value = 'Buscando...';
    
    // Faz a requisição para a API ViaCEP
    fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`)
        .then(response => response.json())
        .then(data => {
            // Verifica se o CEP foi encontrado
            if (data.erro) {
                // CEP não encontrado
                endereco.value = '';
                bairro.value = '';
                cidade.value = '';
                alert('CEP não encontrado. Verifique o CEP digitado.');
                return;
            }
            
            // Preenche os campos com os dados retornados
            endereco.value = data.logradouro || '';
            bairro.value = data.bairro || '';
            cidade.value = data.localidade || '';
            
            // Seleciona o estado correto no select
            if (data.uf) {
                const opcaoUF = uf.querySelector(`option[value=" ${data.uf} "]`);
                if (opcaoUF) {
                    opcaoUF.selected = true;
                }
            }
            
            // Foca no campo número após o preenchimento
            const numeroField = document.getElementById('numero');
            if (numeroField) {
                numeroField.focus();
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            endereco.value = '';
            bairro.value = '';
            cidade.value = '';
            alert('Erro ao buscar CEP. Verifique sua conexão com a internet.');
        });
}

// Função para formatar o CEP durante a digitação
function formatarCEP(cep) {
    // Remove qualquer caractere que não seja número
    const apenasNumeros = cep.replace(/\D/g, '');
    
    // Adiciona a formatação de CEP (XXXXX-XXX)
    if (apenasNumeros.length <= 5) {
        return apenasNumeros;
    } else {
        return apenasNumeros.slice(0, 5) + '-' + apenasNumeros.slice(5, 8);
    }
}

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep');
    
    if (cepInput) {
        // Evento para formatar o CEP enquanto o usuário digita
        cepInput.addEventListener('input', function(e) {
            e.target.value = formatarCEP(e.target.value);
        });
        
        // Evento para buscar o endereço quando o CEP for completo
        cepInput.addEventListener('blur', function(e) {
            const cep = e.target.value.replace(/\D/g, '');
            if (cep.length === 8) {
                buscarCEP(cep);
            }
        });
        
        // Evento alternativo para buscar quando pressionar Enter
        cepInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const cep = e.target.value.replace(/\D/g, '');
                if (cep.length === 8) {
                    buscarCEP(cep);
                }
            }
        });
    }
});
