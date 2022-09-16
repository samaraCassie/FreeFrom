#include <iostream>
#include <cstdlib>
#include "hash.cpp"
#include "correcaoDeErros.c"

using namespace std;

int main()
{
    char editar;
    int tam_vetor, max, opcao, id;
    float preco;
    string nome;
    bool busca;

    cout << "TABELA HASH\n\n";
    cout << "Insira o tamanho da Hash: ";
    cin >> tam_vetor;
    cout << "\nInsira o numero maximo de elemnetos!\n";
    cin >> max;
    cout << "O fator de carga de elementos eh: " << (float)max / (float)tam_vetor << endl;
    Hash alunoHash(tam_vetor, max);

    do
    {
        cout << "\n[0] Encerrar sessao\n";
        cout << "[1] Cadastrar produto\n";
        cout << "[2] Remover produto\n";
        cout << "[3] Ver lista de cadastros\n";
        cout << "[4] Buscar\n";
        cout << "[5] Editar\n";

        cin >> opcao;

        if (opcao == 1)
        {
            id = rand();
            cout << "Id do produto: " << id;
            cout << "\nNome do produto: ";
            cin >> nome;
            cout << "Preco: ";
            cin >> preco;
            Aluno aluno(id, nome, preco);
            alunoHash.inserir(aluno);
        } else if (opcao == 2)
        {
            cout << "Id do produto: ";
            id=AnaliseDado(id);
            Aluno aluno(id, " ", NULL);
            //cout << "Certeza que deseja remover esse cadastro?"
            alunoHash.remover(aluno);

        }else if (opcao == 3)
        {
            alunoHash.imprimir();

        } else if (opcao == 4)
        {
            cout << "Id do produto: ";
            cin >> id;
            Aluno aluno(id, " ", NULL);
            alunoHash.busca(aluno, busca);
        }else if( opcao == 5)
        {
            cout << "Id do produto a ser editado: ";
            cin >> id;
            Aluno aluno(id, " ", NULL);
        } //else if (opcao)
        //{
            /* code */
        //}
    } while (opcao != 0);
}
