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
  post('http://localhost:3001/api/grupos/'); // criar grupo<br>
  get('http://localhost:3001/api/grupos'); // listar grupos<br>
  get('http://localhost:3001/api/grupos/:grupo_id'); // listar grupo do id<br>
  get('http://localhost:3001/api/search_grupos/:toSearch'); // listar grupo por nome do grupo ou por nome de um membro<br>
  put('http://localhost:3001/api/grupos/:grupo_id'); // atualiza o grupo do id<br>
  delete('http://localhost:3001/api/grupos/:grupo_id'); // deleta grupo do id<p>
  
  // Rotas de controlle de mensagens <br>
  post('http://localhost:3001/api/mensagens'); // criar mensagens<br>
  get('http://localhost:3001/api/mensagens'); // listar todas mensagens<br>
  get('http://localhost:3001/api/mensagens/:mensagem_id'); // listar mensagen do id<br>
  get('http://localhost:3001/api/mensagens/recebidas/:user_id'); // listar mensagens recebidas pelo user_id<br>
  get('http://localhost:3001/api/mensagens/enviadas/:user_id'); // listar mensagens enviadas pelo user_id<br>
  get('http://localhost:3001/api/mensagens/arquivadas/:user_id'); // listar mensagens arquivadas pelo user_id<br>
  put('http://localhost:3001/api/mensagens/visualizar/:mensagem_id/:user_id'); // visualizar mensagem_id pelo user_id<br>
  put('http://localhost:3001/api/mensagens/arquivar/:mensagem_id/:user_id'); // arquivar mensagem_id pelo user_id<br>
  put('http://localhost:3001/api/mensagens/restaurar/:mensagem_id/:user_id'); // restaurar mensagem_id aquivada pelo user_id<br>
  delete('http://localhost:3001/api/mensagens/:mensagem_id'); // deletar mensagem_id<p>
  
  // Rotas de controlle de tarefas <br>
  post('http://localhost:3001/api/tarefas'); // criar tarefa<br>
  get('http://localhost:3001/api/tarefas'); // listar tarefas<br>
  get('http://localhost:3001/api/tarefas/:tarefa_id'); // listar tarefa_id<br>
  put('http://localhost:3001/api/tarefas/:tarefa_id'); // atualizar tarefa_id<br>
  get('http://localhost:3001/api/tarefas/recebidas/:user_id'); // listar tarefas recebidas pelo user_id<br>
  get('http://localhost:3001/api/tarefas/enviadas/:user_id'); // listar tarefas enviadas pelo user_id<br>
  get('http://localhost:3001/api/tarefas/arquivadas/:user_id'); // listar tarefas arquivadas por user_id<br>
  put('http://localhost:3001/api/tarefas/visualizar/:tarefa_id/:user_id'); // user_id visualiza a tarefa_id<br>
  put('http://localhost:3001/api/tarefas/arquivar/:tarefa_id/:user_id'); // user_id arquiva a tarefa_id<br>
  put('http://localhost:3001/api/tarefas/restaurar/:tarefa_id/:user_id'); // restaura tarefa aquivada por user_id<br>
  put('http://localhost:3001/api/tarefas/apagar/:tarefa_id/:user_id/:local_id'); // apaga tarefa para user_id sendo local_id = 1 para apagar das recebidas, 2 apagar das enviada e 3 para apagar das arquivadas<br>
  delete('http://localhost:3001/api/tarefas/:tarefa_id'); // deleta a tarefa completamente do banco<p>
  
  // Rotas de controle de treinamentos <br>
  post('http://localhost:3001/api/treinamentos'); // cria o treinamento<br>
  get('http://localhost:3001/api/treinamentos'); // lista todos os treinamentos<br>
  get('http://localhost:3001/api/treinamentos/:treinamento_id'); // lista treinamento_id<br>
  put('http://localhost:3001/api/treinamentos/:treinamento_id'); // muda status do treinamento_id<br>
  put('http://localhost:3001/api/treinamentos/editar/:treinamento_id'); // editar, atualizar treinamento_id<br>
  put('http://localhost:3001/api/treinamentos/notas/:treinamento_id'); // inserir a nota do usuario no treinamento_id<br>
  get('http://localhost:3001/api/treinamentos/user/:user_id'); // lista treinamento direcionados ao user_id<br>
  delete('http://localhost:3001/api/treinamentos/:treinamento_id'); // deleta o treinamento_id<br>
  
