#include<iostream>
using namespace std;

class Cadastro
{
private:
    string nome;
    string email;
    string senha;
    string confirma_nome;
    string confirma_email;
    string confirma_senha;
    bool acesso=false;
public:
    Cadastro(string n, string e, string s);  
    ~Cadastro();
    bool login(string e, string s);
};