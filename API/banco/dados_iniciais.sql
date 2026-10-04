-- ATENÇÃO: produtos e alíquotas abaixo são EXEMPLOS para demonstração.
-- Confirme os valores com um contador antes de usar de verdade.

INSERT OR IGNORE INTO produtos (nome, ncm) VALUES
  ('Soja em grão',     '1201.90.00'),
  ('Milho em grão',    '1005.90.10'),
  ('Café cru em grão', '0901.11.10'),
  ('Boi gordo',        '0102.29.90'),
  ('Leite in natura',  '0401.20.10');

INSERT OR IGNORE INTO regras_tributarias
  (tributo, produto_id, regime, operacao, aliquota, vigente_desde, observacao) VALUES
  ('ICMS',     0, '*',                 '*',     12,   '2024-01-01', 'Alíquota de referência (exemplo)'),
  ('IPI',      0, '*',                 '*',      0,   '2024-01-01', 'Produto in natura costuma ser não tributado'),
  ('PIS',      0, 'Lucro Presumido',   '*',      0.65,'2024-01-01', 'Regime cumulativo'),
  ('COFINS',   0, 'Lucro Presumido',   '*',      3,   '2024-01-01', 'Regime cumulativo'),
  ('PIS',      0, 'Lucro Real',        '*',      1.65,'2024-01-01', 'Regime não cumulativo, sem créditos'),
  ('COFINS',   0, 'Lucro Real',        '*',      7.6, '2024-01-01', 'Regime não cumulativo, sem créditos'),
  ('PIS',      0, 'Simples Nacional',  '*',      0,   '2024-01-01', 'Já incluído no DAS'),
  ('COFINS',   0, 'Simples Nacional',  '*',      0,   '2024-01-01', 'Já incluído no DAS'),
  ('PIS',      0, 'Produtor Rural PF', '*',      0,   '2024-01-01', 'Não se aplica à pessoa física'),
  ('COFINS',   0, 'Produtor Rural PF', '*',      0,   '2024-01-01', 'Não se aplica à pessoa física'),
  ('FUNRURAL', 0, 'Produtor Rural PF', 'Venda',  1.3, '2024-01-01', 'INSS 1,2% + RAT 0,1% sobre a receita bruta'),
  ('SENAR',    0, 'Produtor Rural PF', 'Venda',  0.2, '2024-01-01', 'Contribuição ao SENAR sobre a receita bruta');
