# Funcionalidades
- Adicionar vídeo -- feito
- Remover vídeo -- feito
- Criar playlist -- feito
- Remover playlist -- feito
- Associar um vídeo a uma playlist -- feito
- Desassociar um vídeo de uma playlist -- feito
- Fazer o upload dos vídeos -- feito
- Tirar vídeo da pasta
- Pegar o tempo da playlist -- feito
- Acessar playlist (retornando uma lista com os vídeos) -- feito
- Retonar o vídeo do banco pro front-end -- feito (/files/nome-do-arquivo)
- Criar pasta -- feito
- Remover pasta -- feito
- Colocar vídeo na pasta -- feito
- Colocar pasta dentro de outra pasta -- feito
- Tirar um vídeo de dentro de uma pasta -- feito
- Tirar pasta de dentro de outra pasta -- feito

----------------------
- Refatorar rotas (add controllers)
- Adicionar tratativa de erros.
- (opcional) Refatorar para o DDD.
- (opcional) Usar o multer de uma forma que não seja um middleware, pois
assim a gente vai consegui verificar o nome antes de salvar, e não precisará
salvar o nome com o hash antes, mas os nomes serão exclusivos.

Ideia:
Salvar tudo localmente, pra não precisar hospedar um banco de dados com vídeos (pq ocupa muito espaço) e etc.
Guardar os vídeos em uma pasta tmp.

Os vídeos não precisam "saber" em que playlist eles estão. Mas as playlists precisam
saber quais vídeos tem nela.

Portanto, vou criar uma tabela no banco com os vídeos, só que lá só vai ter o id, nome
e a duração do vídeo.

vou usar postgres pra ambos.
