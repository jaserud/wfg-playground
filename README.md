### What is this?

An authoring playground to write and manage the various components of a Workflow Graph Node (WFGN)

### How does it work?

WFGNs are defined in the authoring forlder.

Each WFGN consists of these files:

- activationFunc.js
- baseConfig.json
- filters.json
- query.gql
- schema.avsc

After all the files are ready use `npm run compile` to select and generate a json config for desired WFGN that combines the files into a config ready for a WFGN instance to consume.
