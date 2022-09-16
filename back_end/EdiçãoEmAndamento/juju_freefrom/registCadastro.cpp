#include <iostream>
#include "registCadastro.h"

using namespace std;


Cadastro::Cadastro(string n, string e, string s) {
    this->nome = n;
    this->email = e;
    this->senha = s;
}

Cadastro::~Cadastro()
{
}

bool Cadastro::login(string e, string s){
    this->confirma_email = e;
    this->confirma_senha = s;
    if (strcasecmp(email.c_str(), confirma_email.c_str()) == 0)
    {
        if (strcasecmp(senha.c_str(), confirma_senha.c_str()) == 0)
        {
            cout << "Acesso liberado";
            acesso=true;
            return acesso;
        }
        else{
            cout << "Senha invalida";
            return acesso;
        }
    }
    else{
        cout << "Usuario invalido";
        return acesso;
    }
}