<h1><strong>A baixo estão todas as rotas possiveis:</strong></h1>

  // Rotas de autendicação e cadastro de usuário <br>
  post('http://localhost:3001/api/auth/register'); // registra um novo usuario<br>
  post('http://localhost:3001/api/auth/authenticate'); // autentica o acesso do usuário, Login<br>
  post('http://localhost:3001/api/auth/forgot_password'); // esqueci a senha<br>
  post('http://localhost:3001/api/auth/reset_password'); // reseta a senha<p>
  
  // Rotas de controle de usuarios <br>
  get('http://localhost:3001/api/users'); //lista todos os usurs<br>
  get('http://localhost:3001/api/users/:user_id'); // lista o usuario do id <br>
  put('http://localhost:3001/api/users/:user_id'); // atualiza o usuario do id<br>
  put('http://localhost:3001/api/users'); // atualiza o usuario logado<br>
  delete('http://localhost:3001/api/users/:user_id'); // deleta o usuario, normalmento não utilizado<p>
  
  // Rotas controle de cargos <br>
  post('http://localhost:3001/api/cargos/'); // cria cargo<br>
  get('http://localhost:3001/api/cargos'); // lista cargos<br>
  get('http://localhost:3001/api/cargos/:cargo_id'); // lista cargo do id<br>
  put('http://localhost:3001/api/cargos/:cargo_id'); // atualiza o cardo do id<br>
  delete('http://localhost:3001/api/cargos/:cargo_id'); // deleta cargo<p>
  
  // Rotas contrele de funcionário, usado para a criação de funcionários e seus respectivos usuarios e senha <br>
  post('http://localhost:3001/api/funcionarios/'); // cria funcionário, utilizado pra criar usuario ao mesmo tempo<br>
  get('http://localhost:3001/api/funcionarios'); // lista funcionarios<br>
  get('http://localhost:3001/api/funcionarios/:funcionario_id'); // lista funcionário com id<br>
  get('http://localhost:3001/api/search_funcionarios/:toSearch'); // lista funcionários por clinica, cargo, nome ou email especificado<br>
  put('http://localhost:3001/api/funcionarios/:funcionario_id'); // atualiza funcionario do id<br>
  delete('http://localhost:3001/api/funcionarios/:funcionario_id'); // deleta funcionario, consequentemente usuário<p>
  
  // Rotas de controle de grupos <br>
  post('http://localhost:3001/api/grupos/'); <br>
  get('http://localhost:3001/api/grupos'); <br>
  get('http://localhost:3001/api/grupos/:grupo_id'); <br>
  get('http://localhost:3001/api/search_grupos/:toSearch'); <br>
  put('http://localhost:3001/api/grupos/:grupo_id'); <br>
  delete('http://localhost:3001/api/grupos/:grupo_id'); <p>
  
  // Rotas de controlle de mensagens <br>
  post('http://localhost:3001/api/mensagens'); <br>
  get('http://localhost:3001/api/mensagens'); <br>
  get('http://localhost:3001/api/mensagens/:mensagem_id'); <br>
  get('http://localhost:3001/api/mensagens/recebidas/:user_id'); <br>
  get('http://localhost:3001/api/mensagens/enviadas/:user_id'); <br>
  get('http://localhost:3001/api/mensagens/arquivadas/:user_id'); <br>
  put('http://localhost:3001/api/mensagens/visualizar/:mensagem_id/:user_id'); <br>
  put('http://localhost:3001/api/mensagens/arquivar/:mensagem_id/:user_id'); <br>
  put('http://localhost:3001/api/mensagens/restaurar/:mensagem_id/:user_id'); <br>
  delete('http://localhost:3001/api/mensagens/:mensagem_id'); <p>
  
  // Rotas de controlle de tarefas <br>
  post('http://localhost:3001/api/tarefas'); <br>
  get('http://localhost:3001/api/tarefas'); <br>
  get('http://localhost:3001/api/tarefas/:tarefa_id'); <br>
  put('http://localhost:3001/api/tarefas/:tarefa_id'); <br>
  get('http://localhost:3001/api/tarefas/recebidas/:user_id'); <br>
  get('http://localhost:3001/api/tarefas/enviadas/:user_id'); <br>
  get('http://localhost:3001/api/tarefas/arquivadas/:user_id'); <br>
  put('http://localhost:3001/api/tarefas/visualizar/:tarefa_id/:user_id'); <br>
  put('http://localhost:3001/api/tarefas/arquivar/:tarefa_id/:user_id'); <br>
  put('http://localhost:3001/api/tarefas/restaurar/:tarefa_id/:user_id'); <br>
  put('http://localhost:3001/api/tarefas/apagar/:tarefa_id/:user_id/:local_id'); <br>
  delete('http://localhost:3001/api/tarefas/:tarefa_id'); <p>
  
  // Rotas de controle de treinamentos <br>
  post('http://localhost:3001/api/treinamentos'); <br>
  get('http://localhost:3001/api/treinamentos'); <br>
  get('http://localhost:3001/api/treinamentos/:treinamento_id'); <br>
  put('http://localhost:3001/api/treinamentos/:treinamento_id'); <br>
  put('http://localhost:3001/api/treinamentos/editar/:treinamento_id'); <br>
  put('http://localhost:3001/api/treinamentos/notas/:treinamento_id'); <br>
  get('http://localhost:3001/api/treinamentos/user/:user_id'); <br>
  delete('http://localhost:3001/api/treinamentos/:treinamento_id'); <br>
  
