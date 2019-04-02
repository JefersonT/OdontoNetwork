A baixo estão as rotas,  
<code>
post('/auth/register');
post('/auth/authenticate');
post('/auth/forgot_password');
post('/auth/reset_password');

get('/users');
get('/users/:user_id');
put('/users/:user_id');
put('/users');
delete('/users/:user_id');

post('/cargos/');
get('/cargos');
get('/cargos/:cargo_id');
put('/cargos/:cargo_id');
delete('/cargos/:cargo_id');

post('/funcionarios/');
get('/funcionarios');
get('/funcionarios/:funcionario_id');
get('/search_funcionarios/:toSearch');
put('/funcionarios/:funcionario_id');
delete('/funcionarios/:funcionario_id');

post('/grupos/');
get('/grupos');
get('/grupos/:grupo_id');
get('/search_grupos/:toSearch');
put('/grupos/:grupo_id');
delete('/grupos/:grupo_id');

post('/mensagens');
get('/mensagens');
get('/mensagens/:mensagem_id');
get('/mensagens/recebidas/:user_id');
get('/mensagens/enviadas/:user_id');
get('/mensagens/arquivadas/:user_id');
put('/mensagens/visualizar/:mensagem_id/:user_id');
put('/mensagens/arquivar/:mensagem_id/:user_id');
put('/mensagens/restaurar/:mensagem_id/:user_id');
delete('/mensagens/:mensagem_id');

post('/tarefas');
get('/tarefas');
get('/tarefas/:tarefa_id');
put('/tarefas/:tarefa_id');
get('/tarefas/recebidas/:user_id');
get('/tarefas/enviadas/:user_id');
get('/tarefas/arquivadas/:user_id');
put('/tarefas/visualizar/:tarefa_id/:user_id');
put('/tarefas/arquivar/:tarefa_id/:user_id');
put('/tarefas/restaurar/:tarefa_id/:user_id');
put('/tarefas/apagar/:tarefa_id/:user_id/:local_id');
delete('/tarefas/:tarefa_id');

post('/treinamentos');
get('/treinamentos');
get('/treinamentos/:treinamento_id');
put('/treinamentos/:treinamento_id');
put('/treinamentos/editar/:treinamento_id');
put('/treinamentos/notas/:treinamento_id');
get('/treinamentos/user/:user_id');
delete('/treinamentos/:treinamento_id');

</code>
