#include<iostream>
using namespace std;

class Aluno
{
    private:
        float preco;
        int id;
        string nome;

    public:
        Aluno();
        Aluno(int i, string n, float p);
        float obterPreco();
        int obterId();
        string obterNome();
};
