# Simulador de uma Máquina de Turing

Trabalho Prático da disciplina Teoria da Computação

O trabalho consistirá na programação de um "tradutor" de modelos de máquina de Turing. A entrada será um arquivo texto com extensão .in com um programa para o simulador online, consistindo em um programa para a máquina de Turing utilizando fita semi-infinita (modelo de Sipser) e podendo fazer uso de movimento estacionário. A saída deve ser um arquivo texto com extensão .out com um programa capaz de ser executado no simulador a partir do modelo de fita duplamente infinita, SEM movimento estacionário e que NÃO escreve o símbolo de branco _ na fita.

# Como executar

## Pré-requisitos: NODEJS e YARN

```bash
# instalação (Ubuntu 20.04.2):
# Executar passo a passo. 

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update

sudo apt install yarn nodejs

```

## Após ser feita toda a instação executar os comandos: 

```bash
# executar os comandos abaixo dentro da pasta do projeto.

yarn install

# executar o projeto:
yarn start <nome_arquivo_entrada>.in

```
## Exemplo de execucão

```bash
yarn start exemplo.in
```

## Resultado

Após a execução do programa, é gerado um arquivo " resultado.out " na pasta aonde está presente o código. 



