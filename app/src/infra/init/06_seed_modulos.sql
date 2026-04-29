INSERT INTO public.modulos (id_modulo, titulo) VALUES
(1, 'Fundamentos das Metodologias Ágeis'),
(2, 'Scrum: Estrutura, Papéis e Artefatos'),
(3, 'Eventos do Scrum e Fluxo de Trabalho'),
(4, 'Práticas Ágeis, Métricas e Qualidade'),
(5, 'Aplicação Prática, Cenários e Análise Crítica')
ON CONFLICT (id_modulo)
DO UPDATE SET titulo = EXCLUDED.titulo;

