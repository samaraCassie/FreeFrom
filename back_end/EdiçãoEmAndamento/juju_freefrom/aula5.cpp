#include <iostream>
#include "aula5.h"

using namespace std;

Aluno::Aluno()
{
    preco = 0;
    id = -1;
    nome = " ";
}
Aluno::Aluno(int i, string n, float p)
{

    id = i;
    nome = n;
     preco = p;
}
int Aluno::obterId()
{
    return id;
}
string Aluno::obterNome()
{
    return nome;
}
float Aluno::obterPreco()
{
    return preco;
}
