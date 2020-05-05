Weathertoirriga v 1.0 

Para fazer tudo funcionar corretamente, primeiro baixe o node.js (https://nodejs.org/en/)
após instalar, através do cmd vá até a baixa do projeto no seu computador e execute os seguintes comandos:

1)npm init 
	Esse comando irá iniciar a configuraçao de uma servidor local, nao é necessário inserir informações, visto que será identificado o arquivo .json já presente na pasta.
	

2)Agora vamos instalar nossas dependências, para isso vamos instalar o axios e o express, então ainda no CMD digite:
	npm i axios express

3)Agora um último detalhe, no CMD digite:
	npm i dotenv nodemon 
	
	dotenv irá carregar o arquivo .env com a key da API darksky e o nodemon será responsavel por ficar atualizando os servidor automaticamente caso ocorra uma alteraçao nos arquivos, como por exemplo a inserção da chave ou outros fatores.    				


5) Agora dentro o arquivo .env insira a chave da API darksy na váriavel já presente. 
6) volte para o cmd e execute o servidor com o script:
	npm run runserver
7)Espere o server inicializar e então abra o navegador no endereço local e porta 8080
	127.0.0.1:8080 ou localhost:8080
	