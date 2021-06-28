# Funcionalidades
- Adicionar vídeo -- feito
- Remover vídeo -- feito
- Criar playlist -- feito
- Remover playlist
- Associar um vídeo a uma playlist
- Criar pasta
- Remover pasta
- Pegar o tempo da playlist
- Acessar playlist (retornando uma lista com os vídeos)
- Retonar o vídeo do banco pro front-end

----------------------
- Refatorar rotas (add controllers)
- Adicionar tratativa de erros.
- (opcional) Refatorar para o DDD.

Ideia:
Salvar tudo localmente, pra não precisar hospedar um banco de dados com vídeos (pq ocupa muito espaço) e etc.
Guardar os vídeos em uma pasta tmp.

Os vídeos não precisam "saber" em que playlist eles estão. Mas as playlists precisam
saber quais vídeos tem nela.

Portanto, vou criar uma tabela no banco com os vídeos, só que lá só vai ter o id, nome
e a duração do vídeo.

vou usar postgres pra ambos.
