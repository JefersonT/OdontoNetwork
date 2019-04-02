<code>
router.post('/auth/register', AuthController.register);
router.post('/auth/authenticate', AuthController.authenticate);
router.post('/auth/forgot_password', AuthController.forgotPassword);
router.post('/auth/reset_password', AuthController.resetPassword);

router.get('/users', UserController.index);
router.get('/users/:user_id', UserController.show);
router.put('/users/:user_id', UserController.update);
router.put('/users', UserController.update);
router.delete('/users/:user_id', UserController.destroy);

router.post('/cargos/', CargoController.create);
router.get('/cargos', CargoController.index);
router.get('/cargos/:cargo_id', CargoController.show);
router.put('/cargos/:cargo_id', CargoController.update);
router.delete('/cargos/:cargo_id', CargoController.destroy);

router.post('/funcionarios/', FuncionarioController.create);
router.get('/funcionarios', FuncionarioController.index);
router.get('/funcionarios/:funcionario_id', FuncionarioController.show);
router.get('/search_funcionarios/:toSearch', FuncionarioController.search);
router.put('/funcionarios/:funcionario_id', FuncionarioController.update);
router.delete('/funcionarios/:funcionario_id', FuncionarioController.destroy);

router.post('/grupos/', GrupoController.create);
router.get('/grupos', GrupoController.index);
router.get('/grupos/:grupo_id', GrupoController.show);
router.get('/search_grupos/:toSearch', GrupoController.search);
router.put('/grupos/:grupo_id', GrupoController.update);
router.delete('/grupos/:grupo_id', GrupoController.destroy);

router.post('/mensagens', MensagemController.create);
router.get('/mensagens', MensagemController.index);
router.get('/mensagens/:mensagem_id', MensagemController.show);
router.get('/mensagens/recebidas/:user_id', MensagemController.showMensagensRecebidas);
router.get('/mensagens/enviadas/:user_id', MensagemController.showMensagensEnviadas);
router.get('/mensagens/arquivadas/:user_id', MensagemController.showMensagensArquivadas);
router.put('/mensagens/visualizar/:mensagem_id/:user_id', MensagemController.visualizarMensagem);
router.put('/mensagens/arquivar/:mensagem_id/:user_id', MensagemController.arquivarMensagem);
router.put('/mensagens/restaurar/:mensagem_id/:user_id', MensagemController.restaurarMensagem);
router.delete('/mensagens/:mensagem_id', MensagemController.destroy);

router.post('/tarefas', TarefaController.create);
router.get('/tarefas', TarefaController.index);
router.get('/tarefas/:tarefa_id', TarefaController.show);
router.put('/tarefas/:tarefa_id', TarefaController.changeStatus);
router.get('/tarefas/recebidas/:user_id', TarefaController.showTasksRecebida);
router.get('/tarefas/enviadas/:user_id', TarefaController.showTasksEnviada);
router.get('/tarefas/arquivadas/:user_id', TarefaController.showTasksArquivada);
router.put('/tarefas/visualizar/:tarefa_id/:user_id', TarefaController.visualizarTask);
router.put('/tarefas/arquivar/:tarefa_id/:user_id', TarefaController.arquivarTask);
router.put('/tarefas/restaurar/:tarefa_id/:user_id', TarefaController.restaurarTask);
router.put('/tarefas/apagar/:tarefa_id/:user_id/:local_id', TarefaController.deletarTask);
router.delete('/tarefas/:tarefa_id', TarefaController.destroy);

router.post('/treinamentos', TreinamentoController.create);
router.get('/treinamentos', TreinamentoController.index);
router.get('/treinamentos/:treinamento_id', TreinamentoController.show);
router.put('/treinamentos/:treinamento_id', TreinamentoController.changeStatus);
router.put('/treinamentos/editar/:treinamento_id', TreinamentoController.update);
router.put('/treinamentos/notas/:treinamento_id', TreinamentoController.setNotas);
router.get('/treinamentos/user/:user_id', TreinamentoController.showTreinamentosUser);
router.delete('/treinamentos/:treinamento_id', TreinamentoController.destroy);
module.exports = router;
</code>
