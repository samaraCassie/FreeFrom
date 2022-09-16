#include <iostream>
#include <string>
#include <cstring>
#include "registCadastro.cpp"

using namespace std;

int main()
{
    string nome;
    string senha;
    string email;

    
    cout << "\n\nFazer Cadastro:\n";
    cout << "Crie nome de usuario: ";
    getline(cin, nome);
    cout << "Insira seu e-mail: ";
    getline(cin, email);
    cout << "Crie uma senha: ";
    getline(cin, senha);
    Cadastro Cadastro(nome, email, senha);

    cout << "_________________\n";

    cout << "\n\nFazer login:\n";
    cout << "\nE-mail: ";
    getline(cin, email);
    cout << "Senha: ";
    getline(cin, senha);
    Cadastro.login(email, senha);

    
}