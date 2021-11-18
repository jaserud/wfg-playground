### What is this?

An authoring playground to write and manage the various components of several Workflow Graph Node (WFGN)

### How does it work?

WFGNs are defined in the authoring forlder.

Each WFGN consists of these files:

- activationFunc.js
- baseConfig.json
- filters.json
- query.gql
- schema.avsc

These files comibe create a config json that can be given to a WFGN instance.

### Scripts

`npm ci` => run first to install dependecies

`npm run compile` => Used to select and generate a combined json config ready for a WFGN instance to consume. File are outputted to `./output-configs/*-config.json` where "\*" is the name of the WFGN folder

`npm run printschema` => used to print a avro schema which is ready to post to [Workflow-graph-registry](https://github.com/icgc-argo/workflow-graph-registry) |
