---
author: Daniel Suhett
pubDatetime: 2025-10-14T08:00:19-03:00
title: Teoria da Janela Quebrada
slug: broken-windows
featured: true
tags:
  - reflexoes
description: Reflexões sobre postura e comportamento em desenvolvimento de software. Seja diferente.
---

Ao ler o Pragmatic Programmer, me deparei com um recorte interessante, a teoria da janela quebrada.

>"Em cidades do interior, alguns prédios são belos e limpos, enquanto outros são estruturas deterioradas. Por quê? Pesquisadores da área criminal e da decência urbanas descobriram um fascinante mecanismo acionardor, que torna rapidamente um predio limpo e intacto em uma construção quebrada e abandonada: uma janela quebrada."

Isso acontece, ele explica, por conta do sentimento de abandono que aquela única janela gera nas pessoas.

Você ja deve ter ouvido frases como:
>"Está por todo o projeto todo!" 

Ou então,
>"Sempre fizemos isso!" 

São exemplos claros de pessoas que já estão convencidas do abandono através da janela quebrada.

Muita das vezes achamos que por não termos um cargo suficiente, ou pela empresa não ver valor suficiente nós devemos simplesmente não nos importar com nossas janelas, mas isso não é verdade, você deve ser responsável e valorizar sua parte, cultive boas práticas por você mesmo. 
Não me entenda mal, não estou dizendo para começar a brigar com seus pares de trabalho, mas se o problema que você está detectando vale a atenção, não deixe de destacar, de trazer onde aquilo pode prejudicar e oque poderia ser feito diferente.
Já passou pela sua cabeça que as vezes a maneira como está sendo feito foi a única que aquela pessoa aprendeu?

## Esteja ligado no backlog
Seu gerente, quase nunca vai saber quantas janelas quebradas você tem no projeto, nem como isso poderia ser resolvido. Entretanto, muito além de arrumar a janela é saber quando e como notificar algo de incorreto, não leve tudo a ferro e fogo, tente pensar com a cabeça das pessoas que você conversa e como isso pode ser esclarecido.
Se o repositório é privado, comece escrevendo issues no Github, que seja com IA pois o github copilot faz isso muito bem, mas toda vez que você vê algo na sua codebase que pode gerar um bug, uma má compreensão ou algo fora da guideline de código deixe o registro.
Se for um possivel bug em produção, pense sobre quem pode ser afetado e qual pode ser o prejuízo, traduza isso para o negócio e converse com seu gerente, se ele perceber valor no que você trouxe você só tem a ganhar, e se ele não perceber você fez sua parte, você lutou contra o problema.

## Não seja emocionado
Eu entendo que o discurso desse texto é muito perigoso para pessoas com menos experiência e ansiosas, se você acha que se enquadra nisso, tenho um recado. Tenha respeito pelo tempo dos seus companheiros de trabalho, procure validar um problema silenciosamente, caso não consiga responder, peça ajuda para entender, faça as perguntas certas, dizer que "eu acho que tem um bug no envio de email" não vai ajudar ninguém só vai fazer a outra pessoa se preocupar com mil coisas até chegar no ponto que você detectou um "possível" bug. Esse tipo de comportamento é pior do que não fazer nada, pois cada vez que você buscar atenção, evidenciar um problema e esse problema não existir no "mundo real" a confiança das pessoas em você diminui. 

## Seja proativo por você
Sempre melhore os lugares por onde passa, funções, projetos, times... Não se de ao luxo de ser invisível, só mais uma mão de obra, se fosse por esse caminho você poderia ser freelancer ou até mesmo uma IA.
Leve code review a serio, entenda a mudança, verifique se ela segue os padrões do projeto, verifique se o pipeline de CI foi executado com sucesso. 
Todo código que está em review está para entrar no time, se você sabe que isso pode se tornar uma janela quebrada se dedique para mostrar o porque e como isso deveria ser feito da maneira correta. 
Se o código já entrou no time e é uma janela quebrada, muito provavelmente seu processo de code review falhou e você deveria procurar melhores prática, novamente, eu não estou dizendo que você tem que bloquear soluções rápidas e agir contra a sua equipe, mas você precisa dar evidência, e se possível, arrumar uma forma dessa melhoria entrar no backlog.

## Observabilidade não é opcional
Seja dono dos seus logs dos seus dashboards e das suas métricas. Você precisa ter o controle sobre as coisas que você é responsável, as pessoas não precisam usar, você não precisa que façam por você, você precisa estar no controle para saber quando e onde sempre.
Torne sua observação algo vivo, se dedique a aprender a query language da plataforma que você usa, aprenda como diferenciar ruídos de insights, verifique quais logs precisam de uma cardinalidade maior e quais métricas estão em falta, isso precisa fazer parte do seu trabalho e das suas opiniões sobre aquilo que as pessoas perguntam.
Com o tempo, as métricas e coisas que você acompanha se tornarão tendência, e caso você ainda não saiba responder algumas coisas, é um sinal que seu domínio sobre suas ferramentas ainda não está bom o suficiente.