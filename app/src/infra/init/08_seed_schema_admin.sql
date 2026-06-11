-- ===== Adiciona campo de administrador na tabela usuarios =====

-- Adiciona coluna is_admin com valor padrão FALSE
ALTER TABLE public.usuarios 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE;

-- Cria índice para consultas rápidas por admin
CREATE INDEX IF NOT EXISTS idx_usuarios_is_admin 
ON public.usuarios (is_admin);