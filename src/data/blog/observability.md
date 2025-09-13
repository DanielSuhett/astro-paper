---
author: Daniel Suhett
pubDatetime: 2025-09-13
title: Observabilidade em sistemas distribuídos
slug: observabilidade
featured: true
tags:
  - observabilidade
  - devops
  - microservicos
  - logs
description: Meus insights e aprendizados sobre observabilidade em sistemas distribuídos.
---

Observabilidade é um tópico que tem ganho meu coração, é essencial e vejo que poucas pessoas dão a devida importância, hoje eu gostaria de passar por alguns insights que eu aprendi.

Como tudo que pretendo escrever nesse blog, não é uma aula e sim minha interpretação e pensamentos sobre as referências que tive além do meu trabalho no dia a dia, confira os links no final se você quer mergulhar de cabeça nesse conhecimento puramente técnico.

Sobre o significado de observabilidade, para mim, é tudo aquilo que o seu eu do futuro pode se perguntar para responder à uma pergunta, com base em três pilares:
- Logs
- Métricas  
- Traces

## Priorize aquilo que importa

Logs contam história, por que você vai estragar o roteiro com informações que só vão criar ruído e confundir o leitor? Pense muito bem, se todo dia o site tem 20 mil acessos, por que você teria uma linha de log dizendo que o usuário X fez login? Faça o exercício de fazer as seguintes perguntas antes de escrever uma linha de log:

1. Algum dia eu vou me perguntar isso no futuro?
2. Isso é uma métrica que alguma outra ferramenta já cobre (APM, Analytics)?
3. Algum outro log, métrica ou índice já tomou esse cuidado?

Se essas perguntas forem respondidas com um não, escreva esse log com certeza, caso contrário esse log não é necessário, e repare bem que eu não estou dizendo que essa informação não é necessária, para isso temos recursos auxiliares.

## Centralize os logs HTTP

Isso vai depender da implementação, mas uma forma eficiente de agregar, indexar e ler logs de um volume enorme como requests é deixando apenas com que seu api gateway ou load balancer seja responsável pelo log das várias aplicações que você ter no seu ambiente.

Uma das principais razões para isso é que a formatação dos requests http está diretamente relacionada a linguagem ou ao plugin que as apis utilizam, diferentes aplicações podem gerar diferentes logs para o mesmo request, o ganho disso vai além do formato pois com o formato você ganha:

- Capacidade de indexar e deixar consultas mais rápidas
- Capacidade de comunicar de forma universal entre todos os serviços
- Capacidade de fazer sampling com uma query universal
- Capacidade de fazer filtros de segurança para não expor nenhum dado sensível nos seus logs

## Utilize um APM

Por definição um Application Performance Management, não é um conceito e sim um produto, que carrega um ferramental mais que necessário para o controle e otimização da sua plataforma de aplicações, com ele você consegue atingir algo conhecido como "The Four Golden Signals" um conjunto de medidas que nos dão um panorama completo sobre a aplicação.

### Latência
É o tempo que leva para resolver um request, por definição algo simples mas muito importante, seu tempo pode ser verificado como tempo médio da aplicação, ou você geralmente consegue ver o tempo médio por request ou ainda melhor se a ferramenta conseguir providenciar a latência por dependência onde essa dependência pode ser um gateway de pagamentos ou um banco de dados, isso te da um super poder para encontrar gargalos de performance para além do escopo do seu código.

### Tráfego
É o tamanho da demanda sobre uma aplicação ou request, no meu caso como desenvolvedor web vou me permitir definir apenas como o volume de requests http que você recebe, vital para saber quantos requests sua aplicações suporta, se o número de requests subiu ou diminuiu e também realizar comparações semanais, mensais para detectar se aquele número está dentro do esperado.

### Erros
Autoexplicativo nesse caso, se concentra em detectar quanto do tráfego não foi bem sucedido, normalmente medido com http status 5XX.

### Saturação
É a medida que representa o quão perto do limite de seus recursos aquela aplicação está, medida que não pode ser vista por transaction ou segmento, apenas por recorte de tempo afinal indica o todo como cpu, memória e I/O indicador diretamente relacionado a latência e muito útil para troubleshooting de escala vertical ou horizontal das suas aplicações.

Por fim, sobre APM também gostaria de trazer o conceito de tracing distribuído. Na maioria dos casos os agents que você coloca na sua aplicação eles também trazem um recurso especial que se chama identificador de correlação, esse identificador marca cada request em seu sistema, e repassa para o próximo sistema ou driver de banco de dados, sob todo contexto onde suas aplicações tocam elas agora tem um rastro e esse rastro te permite ter uma visão vertical entre todos os sistemas distribuídos, sabendo a latência, as queries, os pontos de falha e etc.

Não subestime esse recurso, ele é vital para gerar conhecimento contínuo em um contexto de microserviços e times que tocam seus produtos de forma independente e isolada.

### Não existe almoço grátis
APMs podem ser muito custosos em relação a consumo de recursos da aplicação, existem diversos benchmarks e análises sobre isso e você precisa saber se esse custo é tolerável no seu contexto. Em geral se você não está trabalhando com aplicações críticas eu diria que é um custo tolerável.

## Cardinalidade e dimensionalidade

Uma outra face da observabilidade que chega rapidamente é o custo, um vilão que assola as contas de cloud ou os discos de quem tenta manter uma estrutura por conta própria. Muito desse custo vem de fatores que muita das vezes desenvolvedores desconhecem no contexto de observabilidade apesar de conhecerem no contexto de banco de dados, a surpresa é que observabilidade utiliza também banco de dados, o log da sua aplicação não é e nem pode ser um arquivo de texto.

**Cardinalidade** é o grau de unicidade de um campo, quanto maior a cardinalidade maior vai ser a variação de resultados para aquele campo, como por exemplo o número de CPF.

**Dimensionalidade** é o número de atributos que um documento ou uma tabela tem, quanto mais campos você passar em um log, como por exemplo o body de um request http POST maior será a dimensionalidade desse documento.

### Por que isso importa?

Para construir sistemas eficientes você precisa entender que geralmente você quer logs com alta cardinalidade, afinal você não tem nenhuma ação a tomar com "30 pessoas não estão conseguindo realizar uma compra" essa informação é muito mais apropriada se você souber algum agrupador comum ou quem são as pessoas em si. A alta dimensionalidade nos permite analisar problemas e contextos sobre diversas tendências, versões de aplicação, região geográfica, user-agent e muito mais.

Não é todo momento que cabe alta cardinalidade, por exemplo, em métricas você quer ter respostas efetivas para um determinado intervalo de tempo, quinta feira de 16h às 17h eu tive dois usuários com erro na rota X. Repare como nesse contexto eu não preciso ter todas as informações, ter todas as informações só deixaria essa consulta e monitoramento mais caro e mais lento.

### Ferramentas
Diferentes ferramentas sofrem impactos diferentes em relação a cardinalidade ou dimensionalidade, você pode ter ferramentas com bancos de dados colunares ou bancos de dados de séries temporais (timeseries) e cada um deles vai ter comportamento completamente diferente em custo e em velocidade para atender as queries, cabe a você analisar e medir qual é mais eficiente em seu contexto.

## Métricas e Monitorias

Utilizando os princípios que comentamos acima, construa métricas relevantes, de baixa cardinalidade e monitore insights não sejam ruídos, criar um dashboard cheio de informação é muito fácil, difícil mesmo é criar uma cultura onde as pessoas vão conseguir interpretar sem falso positivo aqueles dashboards, mantenha sua observabilidade sobre os sistemas de forma viva, sistemas mudam, métricas que são importantes em um período podem não ser em outros, foque em detecção daquilo que você quer saber na hora do aperto. Taxa de erro, número de compras, comparações temporais, qualquer coisa que seja subjetiva, "legal de saber" remova, deixe que a curiosidade das pessoas levem até aquela métrica, isso transforma pessoas que são crentes em algo estático em analistas.

## Sampling

Sampling é cortar fora uma taxa de alguma métrica muito recorrente, se for algo necessário como o autologging de http que sua app recebe, por uma questão de incerteza você quer manter para saber se está tudo bem ali, você pode fazer sampling removendo 50% dos requests que entram por exemplo, muito útil para cortar custos e não ter uma sobrecarga nas queries.

## Recomendações pessoais de padrão de logs

- Utilize JSON estruturados
- Utilize log assíncrono
- Prefira sempre lookups ao invés de dados concretos
- Tenha abstrações que façam um controle do que vai pro log e tenha tratamento de segurança para dados sensíveis
- Não faça do seu severity INFO um DEBUG

## Como emitir logs de forma performática com NodeJS

Log é a unidade mais básica de observação de um sistema, logs contam história mas também podem ser um inimigo silencioso.

Antes de tudo precisamos falar sobre o `console.info` no NodeJS, você pode pensar que isso é uma forma de usar logs correta mas não é, o Node como sabemos executa uma runtime baseada em uma única thread, onde o event loop distribui tarefas e executa nosso código, acontece que quando rodamos 1 milhão de `console.info` seu event loop vai ficar paralisado enquanto esses 1 milhão de logs não rodarem. Mas você deve pensar, é esse o custo de trabalhar com uma linguagem single thread, normal, certo? ERRADO, apesar da runtime do Node ser single thread você consegue criar forks ("cópias") da sua runtime e ter processos paralelos, não é que seja multi thread, é que você está rodando outro sistema em paralelo, e por que saber disso importa? Porque é isso que libs como Winston, Pino e entre outras fazem, elas criam forks que processam de forma concorrente.

Aqui está um pseudo código de como isso funciona:

```javascript
// Logging Assíncrono com Buffer
class AsyncLogger {
    constructor() {
        this.buffer = [];
        this.processing = false;
    }
    
    log(message, data) {
        // Adiciona ao buffer (operação rápida)
        this.buffer.push({ message, data, time: Date.now() });
        
        // Processa de forma assíncrona
        if (!this.processing) {
            this.processing = true;
            setTimeout(() => this.flush(), 0);
        }
    }
    
    flush() {
        const logs = [...this.buffer];
        this.buffer = [];
        this.processing = false;
        
        // Processa os logs fora do loop principal
        logs.forEach(log => 
            console.log(`[${log.time}] ${log.message}`, log.data)
        );
    }
}

// Comparação de Performance
console.time('sync-logging');
for (let i = 0; i < 10000; i++) {
    console.log('Sync log', { iteration: i });
}
console.timeEnd('sync-logging'); // ~250ms

const asyncLogger = new AsyncLogger();
console.time('async-logging');
for (let i = 0; i < 10000; i++) {
    asyncLogger.log('Async log', { iteration: i });
}
console.timeEnd('async-logging'); // ~5ms

// Os logs aparecem depois, mas o loop termina muito mais rápido!
```

## Referências

- [Understanding High Cardinality and Its Role in Observability](https://www.datadoghq.com/blog/high-cardinality-data-observability/)
- [Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)
- [console.log is slow](https://github.com/pinojs/pino/blob/master/docs/benchmarks.md)
- [OpenTelemetry-native application performance monitoring](https://opentelemetry.io/docs/concepts/observability-primer/)
- [In-depth analysis of the APMs performance cost in Node.js](https://blog.sqreen.com/nodejs-application-monitoring-performance-impact/)