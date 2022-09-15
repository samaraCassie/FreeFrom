#include <iostream>
#include <string>
#include <cstring>

using namespace std;

int main()
{
    string senha, confirma_senha, nome, confirma_nome;

    cout << "Crie nome de usuario: ";
    getline(cin, nome);
    cout << "Crie uma senha: ";
    getline(cin, senha);

    cout << "_________________";

    cout << "\n\nFazer login:\n";
    cout << "\nNome de usuario: ";
    getline(cin, confirma_nome);
    cout << "Senha: ";
    getline(cin, confirma_senha);

    if (strcasecmp(nome.c_str(), confirma_nome.c_str()) == 0)
    {
        if (strcasecmp(senha.c_str(), confirma_senha.c_str()) == 0)
        {
            cout << "Acesso liberado";
        }
        else{
        cout << "Senha invalida";
        }
    }
    else{
        cout << "Usuario invalido";
    }
}