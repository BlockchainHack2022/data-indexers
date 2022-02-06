# Moscow blockchain hackathon

## Problem setting

Lightweight blockchain clients, such as mobile wallet apps, 
want fast and granular access to blockchain data.

They can't afford inspection of every chain block and always staying online,
which means that such clients must rely on external `"web 2.0"` indexing services,
which in turn means, that we have a problem of centralization and single point of trust.

This problem probably doesn't have complete and universal solution.

## Submission

This project implements a sketch of a scenario when lightweight client sends multiple
identical requests to hopefully independent data providers, it
than compares responses and selects the one by a simple majority rule.

### Project structure

* [src/indexers.ts](src/indexers.ts) - starts multiple peers which host an indexer service mockup
* [src/client.ts](src/client.ts) - performs a request to indexing services simulating the behaviour of a lightweight client.
* [aqua](aqua) - the aqua code which implements service discovery and request logic.

### Running

```bash
make # compile the code
node lib/indexers.js # start indexers
node lib/client.js # perform client request
```

## Future work

The above scenario is clearly problematic as 
it implies a significant amount of duplicated work. It also implies a higher latency, 
but we think it is not a problem, as applications
can often proceed optimistically given the first received result and notify users later in case of a conflict.

We suggest that in some cases the problem of work duplication can be solved by deferring and batching 
the verification of query results. In this scenario the lightweight client explicitly connects to the 
single chosen data provider and works with it in a completely "web 2.0" manner proceeding 
optimistically after each query. The lightweight client will query a special parachain, to which 
all data providers belong, to verify the results of submitted queries. The hope is that batch processing
of queries could be much more efficient and validators will have easy time verifying results.

The above scenario might also simplify per-request monetization, 
as client could simply lock a certain amount of money in advance and give a data provider NFT, which
authorizes its spending in case data provider's work was proved by parachain.
