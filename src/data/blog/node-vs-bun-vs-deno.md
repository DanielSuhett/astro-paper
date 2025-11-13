---
author: Daniel Suhett
pubDatetime: 2025-11-13
title: Javascript no servidor é complicado
slug: javascript-server-dilema
featured: true
tags:
  - backend
  - javascript
  - node
  - webserver
description: Um olhar honesto sobre Node, Deno e Bun. Por que escolher entre eles não é tão simples quanto parece.
---

O título é polêmico, mas eu juro que isso não é um ataque. Eu trabalho com JavaScript faz algum tempo, desde o tempo em que Node era a única opção conhecida. Mudava o framework, a forma de escrever, mas nunca a runtime. Só que isso não é mais verdade em 2025 especialmente com o surgimento do **Deno** e do **Bun** já tendo amadurecido bastante.

Essa foi a motivação para modernizar o que eu sabia sobre o ecossistema, e hoje eu quero compartilhar tudo que aprendi nessa jornada.
## Saiba diferenciar um projeto de um produto

Pouca gente sabe, mas grande parte do que move o Node.js é trabalho voluntário. O Node é um projeto que nasceu e cresceu com a comunidade, **não tem dono** e **não pode ser controlado por uma pessoa**. Por isso, para se chegar a qualquer conclusão é necessário **consenso**, múltiplos envolvidos e, claro, tempo.

Diferente disso, **Bun** e **Deno** são **empresas**. Seus criadores são CEOs: Jarred Sumner e Ryan Dahl respectivamente. Eles são brilhantes, mas isso não muda alguns **fatos** importantes:

1. Não existe consenso, tudo é decidido de forma arbitrária e baseado naquilo que eles acreditam ser o certo.
2. Ambos precisam gerar lucro, porque receberam aportes de Venture Capital: 
	1. [Deno closed a $21 million Series A round led by Sequoia that brings its total raised to $26 million.](https://techcrunch.com/2022/06/21/deno-raises-21m-to-launch-a-fully-managed-runtime-service)
	2. [Bun is built by a startup called Oven, which has raised more than $7M in funding.](https://blog.pragmaticengineer.com/bun-lessons-from-disrupting)
3. Bus factor, esse eu vi no video do [Theo](https://youtu.be/1xoy8Q5o8ws?si=leeQRG-JHgPlgO3l) e achei muito interessante, se olharmos para o [número de contribuições do projeto Bun](https://github.com/oven-sh/bun/graphs/contributors), por exemplo, conseguimos concluir imediatamente que sem seu criador o projeto não teria continuidade, ou pelo menos, não representaria a mesma coisa.


Depois de ler isso você deve pensar que eu odeio esses projetos, mas isso não é verdade. Eu só estou aqui te mostrando que decidir entre eles caso você precise manter um projeto com reputação e de longo prazo, não é tão simples quanto parece, a natureza do que está sendo proposto a você é diferente.

## Você usa o Node tão moderno quanto o Bun?

Quando comecei minha jornada de modernização, eu pensei:
> Cara, eu quero uma coisa nova, com menos dependências, mais velocidade, menos configurações.

Automaticamente eu lembrei do Deno e do Bun, por conta do marketing deles, os benchmarks que enchem os olhos, o Node? Não *"o node é ultrapassado"*.

Mas aí encontrei  a realidade que o [Matteo Colina](https://adventures.nodeland.dev/archive/you-are-not-updating-nodejs/) apontou: 
>Half of our downloads are for unmaintained versions of Node.js with known security vulnerabilities.

A maior parte dos projetos em Node parou em 2015. As pessoas não tentam atualizar ou entender como o projeto evoluiu, muitas vezes porque elas estão presas a libs que não migram. E obviamente, quando você começa um projeto no Bun, você não usa as mesmas dependências antigas do seu projeto original. Você usa coisas novas, modernas, cool.

Ou seja: o Node sofre de um problema que **não é culpa dele**.

Alguns recursos que você provavelmente não sabe que já existem no Node moderno:

*  Fetch nativo `fetch` substituindo a necessidade do `node-fetch` ou `axios`.
* Testes nativos com `node:test` para substituir o `Jest`
* Variaveis de ambiente nativo para substituir o `dotenv` 
	* `node --env-file=.env app.mjs` 
* Controle de acesso em runtime assim como o Deno
	* `node --permission --allow-fs-read=./data --allow-net=api.example.com app.mjs`
* Suporte a typescript nativo via type-stripping, tchau ts-node!  

## O que o Node ainda não faz e provavelmente nunca fará

A primeira coisa que me ganhou no **Deno** foi a simplicidade para configurar um projeto com absolutamente tudo que eu preciso. Por exemplo, o Deno embarca alternativas para Eslint e Prettier, áreas que normalmente exigem uma bagunça de arquivos de configuração.

No **Bun**, a velocidade do programa e dos testes me deixou impressionado. E o número de features embarcadas é um boost de produtividade imenso. A CLI é mais amigável, o stack trace é mais claro (não sei explicar, mas realmente senti isso).

Esses projetos trazem muita **opinião**, e isso só é possível porque existe uma pessoa dando a palavra final. Em um projeto que depende de consenso, isso é quase impossível.

Exemplos disso:
- TypeScript em primeiro lugar.
- ESM sem dor de cabeça.
- Pacotes altamente acoplados, como `s3` do Bun.
- Abandono de compatibilidade antiga.
- E muito mais…

Eu pessoalmente adoro essa parte, pois eu realmente acredito que a liberdade total e irrestrita causa angústia, leva cada um a fazer do seu jeito e o resultado é pouco produtivo. 

## O ganho de performance é um tradeoff

Eu trouxe aqui que muitos projetos de Node estão presos em versões muito antigas, correto? E também trouxe que o Bun é muito mais rápido que o Node, correto? E onde está a pegadinha? A resposta é simples, `npm registry` o maior acerto do Node é o maior terror do Bun.

Enquanto o Node anda com passos lentos e compatíveis, o Bun **tocou o foda-se**. Abandonou o V8, reescreveu tudo em Zig (uma linguagem que nem versão 1.0 tem) porque o Jarred é obcecado por performance. Isso não é uma crítica mas é uma opinião minha:  
**Não tem como tudo do ecossistema npm funcionar perfeitamente em uma plataforma que prioriza performance acima de compatibilidade.**

E é por isso que:
1. O Deno voltou atrás ao não dar suporte aos pacotes npm.
2. O Bun tem como premissa (e marketing) fazer tudo do Node funcionar em algum momento.

Além disso, o efeito dono continua real aqui, a maior chance da sua compatibilidade ser corrigida é caso o Jarred se importe com o seu contexto, lembrando, o Bun é um produto e tem dono.

Se você acha que o problema de compatibilidade é besteira, teste o suficiente com o ferramental que você usa no seu trabalho, sem hello-worlds, eu mesmo achei alguns problemas já documentados, e um deles tive que abrir por conta própria essa issue: [No inbound transactions captured by elastic-apm-node when using Bun.serve]( https://github.com/oven-sh/bun/issues/23537).

Ao final, ainda tem a grande questão, essa performance existe pra você? Você já mediu quanto desse ganho é **real** no **seu contexto**? Lembre-se que benchmarks são feitos para gerar marketing para o produto deles. 

## Qual projeto eu gostei mais ao usar?

No **meu contexto**, todos foram rápidos. Nenhum foi um gargalo real.  
E se um dia eu realmente precisar de performance ou economia de recursos, eu vou escrever em Go.

Mas aqui vai um resumo das minhas experiências recentes:
## Deno + Hono
- Minimalismo e servidor compatível com web standards.
- Deno brilhou com o arquivo de config.
- Adorei o JSR apesar de pouco útil.
- Sistema de permissões é chato, eu não quero e eu sou obrigado a usar.
- Hono é exatamente o que se propõe a ser, simples e não opinativo, me deixando interagir muito mais com outras coisas do que o framework em si, totalmente oposto do Nest e Elysia.
## [Bun + Elysia + Biome](https://github.com/DanielSuhett/typesafe-api-boilerplate)
- Para projetos pessoais, **eu escolheria Elysia 100% das vezes**.
- Difícil de descer no começo, parece estranho e pouco pragmático.
- Precisei configurar linter e formatter, o que me incomodou.
- Documentação excelente.
- OpenAPI resolvido de forma brilhante.
- OpenTelemetry muito suave.
## NestJS + Node + Eslint + Prettier
- É a minha stack do trabalho.
- Feio, porém estável.
- Verboso, porém compreensível.
- Me irrita o quanto ele é sensível ao ferramental, impede testar recursos modernos.
- Eu continuaria escolhendo o Nest para o trabalho, **mas** existe um flerte honesto com o Elysia.
## Go
- Não é typescript ok, mas me escute por favor kkk
- Não tem nenhum desses problemas que eu trouxe
- É muito familiar para escrever Go quando se escreve servidores typescript.
- Previsível e opinativo.

## Conclusão

Não pense que tudo que faz a mesma coisa tem o mesmo propósito.  
Atualize seus projetos e suas dependências.  
E use menos dependências  porque isso, na minha opinião, é a chave para sistemas robustos e escaláveis.

Bun acerta demais em marketing e performance.  
Deno, na minha opinião, acerta em muita coisa **hoje**, apesar dos erros antigos e do timing perdido.  
Node continua sendo uma opção sólida se você não estiver procurando aventuras.

E se um dia você cansar, como eu às vezes canso, experimente Go.



