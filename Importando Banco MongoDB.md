<strong><h2>COMO IMPORTAR BANCO MongoDB</h2></strong>
<strong>Através do Studio 3T</strong>
  - Inicie o MongoDB
  - Inicie o Software Studio 3T
  - Conecte o software ao servidor local do MongoDB
  ![](Importar_Banco/Capturar_07.PNG)
  - Na Aba `Database` clique em `Import Colletions`
  ![](Importar_Banco/Capturar_00.PNG)
  - Na janela que abrir, selecione a opção `JSON` e clique `Next`
  ![](Importar_Banco/Capturar_01.PNG)
  - Clique no `+` na parte superior a esquerda
  ![](Importar_Banco/Capturar_02.PNG)
  - Selecione todas os arquivos.json presente na pasta "Banco" presente dentro da pasta do projeto e clique em `Abrir`
  ![](Importar_Banco/Capturar_03.PNG)
  - Agora clique `Next`
  ![](Importar_Banco/Capturar_04.PNG)
  - Veja como irá fica o banco e clique `Next`
  ![](Importar_Banco/Capturar_05.PNG)
  - Agora clique em `Start Import`
  ![](Importar_Banco/Capturar_06.PNG)
  - Disfrute do banco
<Br>

<strong>Através de Linhas de Comandos</strong>
  - Abra seu shell
  - Inicie o MongoDB
  - Execute o seguinte comando no shell para cada uma das colletions e seus respectivos arquivos.json presentes na pasta Banco 
    - `mongoimport -d nome_do_banco -c nome_da_colletion --file caminho/para/o_arquivo/colletion.json`
  - Exemplos:
    - `mongoimport -d odontonetworkapi -c cargos --file C:\Users\IFCE\Documents\OdontoNetwork\Banco\cargos.json`
    - `mongoimport -d odontonetworkapi -c funcionarios --file C:\Users\IFCE\Documents\OdontoNetwork\Banco\funcionarios.json`
    - `mongoimport -d odontonetworkapi -c grupos --file C:\Users\IFCE\Documents\OdontoNetwork\Banco\grupos.json`
