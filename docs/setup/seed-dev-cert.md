# Atalho de Desenvolvimento: Simular Conclusão de Todos os Módulos

← [Índice da Documentação](../README.md) · [Manual do Usuário](../produto/manual-usuario.md)

Explica como pular diretamente para o estado de certificado disponível sem precisar responder todas as provas manualmente. Útil durante o desenvolvimento para testar a página de certificado e o fluxo do dashboard.

---

## O que o comando faz

1. Apaga as respostas existentes do seu exame na tabela `respostas`
2. Insere um conjunto completo de respostas (cobrindo todos os 5 módulos)
3. Atualiza o seu exame para o módulo 5 (posição final da trilha)

Após rodar, o dashboard vai exibir todos os níveis como **Concluídos** e o botão **Ver Certificado** será liberado.

---

## Como usar

Na pasta `app/`, rode:

```bash
npm run db:dev-cert -- <CPF>
```

O CPF pode ser passado com ou sem formatação:

```bash
# com formatação
npm run db:dev-cert -- 123.456.789-00

# só os dígitos
npm run db:dev-cert -- 12345678900
```

O script localiza automaticamente o `id_exame` do usuário pelo CPF — não é necessário saber o ID manualmente.

---

## Como desfazer

Para resetar o progresso e voltar ao início, rode diretamente no `psql`:

```sql
DELETE FROM respostas WHERE id_exame = <seu_id_exame>;

UPDATE exames SET id_modulo = 1 WHERE id_exame = <seu_id_exame>;
```

Para descobrir seu `id_exame`:

```sql
SELECT e.id_exame
FROM exames e
INNER JOIN usuarios u ON u.id_usuario = e.id_usuario
WHERE u.cpf = '<seu_cpf>';
```

---

## Arquivos envolvidos

| Arquivo | Função |
|---------|--------|
| `app/src/infra/seed-dev-cert.js` | Runner: lê o CPF, busca o `id_exame` e executa o SQL |
| `app/src/infra/seed-dev-cert.sql` | Template SQL com o placeholder `__ID_EXAME__` |
| `app/package.json` | Define o script `db:dev-cert` |

---

> **Atenção:** este comando altera dados reais do banco. Use apenas em ambiente local de desenvolvimento.