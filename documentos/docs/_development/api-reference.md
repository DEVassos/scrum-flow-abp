# 📡 Referência de API

← [Voltar a Desenvolvimento](./)

Documentação de todos os endpoints disponíveis.

---

## 📋 Sumário

- [Autenticação](#autenticação)
- [Usuários](#usuários)
- [Códigos de Status](#códigos-de-status)
- [Tratamento de Erros](#tratamento-de-erros)

---

## 🔐 Autenticação

Todos os endpoints protegidos (🔒) requerem:

```
Authorization: Bearer <seu_token_jwt>
```

Exemplo com curl:
```bash
curl -H "Authorization: Bearer eyJhbGc..." http://localhost:3005/api/usuarios/perfil
```

---

## Endpoints

### Autenticação

#### POST /api/auth/login
Fazer login com CPF e senha.

**Request:**
```json
{
  "cpf": "12345678900",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "cpf": "12345678900",
    "email": "joao@example.com"
  }
}
```

**Erros:**
- `400` - CPF ou senha ausentes
- `401` - Credenciais inválidas
- `500` - Erro interno

---

#### POST /api/auth/register
Criar novo usuário.

**Request:**
```json
{
  "nome": "João Silva",
  "cpf": "12345678900",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response (201):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "cpf": "12345678900",
  "email": "joao@example.com"
}
```

**Erros:**
- `400` - Campos obrigatórios faltando
- `409` - CPF ou email já existe
- `500` - Erro interno

---

### Usuários

#### GET /api/usuarios/perfil 🔒
Obter dados do usuário logado.

**Request:**
```
GET /api/usuarios/perfil
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "cpf": "12345678900",
  "email": "joao@example.com",
  "created_at": "2026-01-15T10:30:00Z"
}
```

**Erros:**
- `401` - Token inválido ou expirado
- `404` - Usuário não encontrado

---

#### PUT /api/usuarios/perfil 🔒
Atualizar dados do usuário logado.

**Request:**
```json
{
  "nome": "João Silva Santos",
  "email": "joao.silva@example.com"
}
```

**Response (200):**
```json
{
  "id": 1,
  "nome": "João Silva Santos",
  "cpf": "12345678900",
  "email": "joao.silva@example.com"
}
```

**Erros:**
- `400` - Dados inválidos
- `401` - Não autenticado
- `409` - Email já existe

---

#### PUT /api/usuarios/senha 🔒
Alterar senha do usuário logado.

**Request:**
```json
{
  "senha_atual": "senha123",
  "senha_nova": "novaSenha456"
}
```

**Response (200):**
```json
{
  "message": "Senha alterada com sucesso"
}
```

**Erros:**
- `400` - Senhas obrigatórias
- `401` - Senha atual incorreta

---

### Módulos

#### GET /api/modulos
Listar todos os módulos.

**Request:**
```
GET /api/modulos
```

**Response (200):**
```json
[
  {
    "id": 1,
    "nome": "Módulo 1 - Fundamentos",
    "descricao": "Conceitos básicos...",
    "ordem": 1
  },
  {
    "id": 2,
    "nome": "Módulo 2 - Intermediário",
    "descricao": "Conceitos avançados...",
    "ordem": 2
  }
]
```

---

#### GET /api/modulos/:id
Obter detalhes de um módulo.

**Request:**
```
GET /api/modulos/1
```

**Response (200):**
```json
{
  "id": 1,
  "nome": "Módulo 1 - Fundamentos",
  "descricao": "Conceitos básicos...",
  "questoes_totais": 30,
  "questoes_selecionadas": 10
}
```

---

### Avaliações

#### GET /api/avaliacoes/progresso 🔒
Obter progresso do usuário nos módulos.

**Request:**
```
GET /api/avaliacoes/progresso
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "usuario_id": 1,
  "modulos": [
    {
      "modulo_id": 1,
      "nome": "Módulo 1",
      "tentativas_realizadas": 1,
      "tentativas_limite": 2,
      "melhor_nota": 8.5,
      "concluido": false
    },
    {
      "modulo_id": 2,
      "nome": "Módulo 2",
      "tentativas_realizadas": 0,
      "tentativas_limite": 2,
      "melhor_nota": null,
      "concluido": false
    }
  ],
  "media_geral": 4.25
}
```

---

#### POST /api/avaliacoes/iniciar/:modulo_id 🔒
Iniciar uma avaliação de um módulo.

**Request:**
```
POST /api/avaliacoes/iniciar/1
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "exame_id": 123,
  "modulo_id": 1,
  "questoes": [
    {
      "id": 45,
      "enunciado": "Qual é a capital do Brasil?",
      "opcoes": [
        "Rio de Janeiro",
        "Brasília",
        "São Paulo",
        "Salvador"
      ],
      "dificuldade": "facil"
    },
    // ... mais 9 questões
  ],
  "tempo_limite": 30  // minutos, se houver
}
```

**Erros:**
- `400` - Módulo não existe
- `403` - Tentativas esgotadas
- `401` - Não autenticado

---

#### POST /api/avaliacoes/:exame_id/responder 🔒
Submeter resposta para uma questão.

**Request:**
```json
{
  "questao_id": 45,
  "resposta": "Brasília"
}
```

**Response (200):**
```json
{
  "exame_id": 123,
  "questao_id": 45,
  "correta": true,
  "resposta_correta": "Brasília"
}
```

---

#### POST /api/avaliacoes/:exame_id/finalizar 🔒
Finalizar a avaliação e gerar resultado.

**Request:**
```
POST /api/avaliacoes/123/finalizar
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "exame_id": 123,
  "modulo_id": 1,
  "nota_final": 8.5,
  "questoes_corretas": 8,
  "questoes_totais": 10,
  "data_conclusao": "2026-01-15T14:30:00Z"
}
```

---

#### GET /api/avaliacoes/historico 🔒
Obter histórico de tentativas do usuário.

**Request:**
```
GET /api/avaliacoes/historico?modulo_id=1&limite=10&pagina=1
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "total": 2,
  "pagina": 1,
  "limite": 10,
  "exames": [
    {
      "id": 123,
      "modulo_id": 1,
      "modulo_nome": "Módulo 1",
      "nota": 8.5,
      "questoes_corretas": 8,
      "questoes_totais": 10,
      "data": "2026-01-15T14:30:00Z"
    },
    {
      "id": 122,
      "modulo_id": 1,
      "modulo_nome": "Módulo 1",
      "nota": 7.0,
      "questoes_corretas": 7,
      "questoes_totais": 10,
      "data": "2026-01-14T10:15:00Z"
    }
  ]
}
```

---

### Certificados

#### GET /api/certificados 🔒
Listar certificados do usuário.

**Request:**
```
GET /api/certificados
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "data_emissao": "2026-01-15T14:30:00Z",
    "media_final": 8.25,
    "arquivo_url": "/certificados/user_1_2026.pdf"
  }
]
```

---

#### GET /api/certificados/:id/download 🔒
Baixar certificado em PDF.

**Request:**
```
GET /api/certificados/1/download
Authorization: Bearer <token>
```

**Response:**
```
Content-Type: application/pdf
[Binary PDF data]
```

---

## 📊 Códigos de Status

| Código | Significado | Quando |
|--------|-------------|--------|
| `200` | OK | Requisição bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `204` | No Content | Sucesso, sem corpo na resposta |
| `400` | Bad Request | Dados inválidos ou faltando |
| `401` | Unauthorized | Token inválido ou expirado |
| `403` | Forbidden | Sem permissão para acessar |
| `404` | Not Found | Recurso não encontrado |
| `409` | Conflict | Conflito (ex: CPF duplicado) |
| `500` | Internal Error | Erro no servidor |

---

## ⚠️ Tratamento de Erros

### Erro Padrão

```json
{
  "error": "Descrição do erro",
  "code": "ERROR_CODE"  // opcional
}
```

### Exemplos

**Campos faltando:**
```json
{
  "error": "CPF e senha são obrigatórios"
}
```

**Credenciais inválidas:**
```json
{
  "error": "CPF ou senha incorretos"
}
```

**Token expirado:**
```json
{
  "error": "Token inválido ou expirado"
}
```

---

## 🔗 Próximos Passos

- [Backend Guide](./backend-guide.md) — como adicionar rotas
- [Arquitetura](./architecture.md) — entender fluxos

---

<div align="center">
  <a href="./">← Voltar a Desenvolvimento</a>
</div>
