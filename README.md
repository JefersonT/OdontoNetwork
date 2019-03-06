# OdontoNetwork
<p>
Api em NodeJS desenvolvida como Back-End para o sistema de comunicação de uma rede de clinicas odontológicas OdontoNetwork, no qual foi desenvolvido na disciplina de Laboratório de Desenvolvimento de Software do curso de Ciência da Computação da Universidade Estadual Vale do Acaraú da cidade de Sobral - Ceará - Brasil.</p>

A api foi configurada para rodar em http://localhost:3001.

## Passo-a-passo para executar e testar o projeto.

### Pre-requisitos:
 - Instalar um IDE, de preferencia <i>MS Visual Code</i>;
 - Instalar <i>'MongoDB'</i>;
 - Instalar <i>'Insomnia'</i> para testar as rotas;
 - Instalar <i>'Robo 3T'</i> para visualizar a estrutura do banco no MongoDB;
 - Instalar <i>'npm'</i>;
 - Baixar e extrair o projeto OdontoNetwork;

### Para executar o projeto:
 - Iniciar o mongoDB¹;
 - Abrir o projeto no IDE;
 - Verificar se todas as dependencias estão instaladas:
   - No <i>MS Visual Code</i> basta abrir o terminal, através do atalho <strong>Control+'</strong>, e execute o código <strong>'npm install'</strong>;
   - Em outro IDE que não possua terminal basta abrir a pasta do projeto por Pronpt/Terminal e executar o código <strong>'npm install'</strong>;
 - Para executar o projeto basta executar o código <strong>'npm run dev'</strong> no terminal, seja no Visual Code ou no Pronpt;

### Para testar o projeto no Insomnia
 - Primeiramente configurar o Insomina:
   - Ao abrir o Insominia;
   - Na barra de menu, ir em <i>"Application> Preferences> Data> Import Data> From File"</i>;
   - Em seguida selecionar um dos .har ou .json presente na pasta raiz do projeto que foi baixado;
 - Em seguida basta testar cada funcionalidade, começando do mais básico ao mais avançado;
 
 ¹Para configurar o MongoDB Ler o Arquivo <strong>'NodeJS - MongoDB.txt'</strong>
