const inquirer = require('inquirer');
const fs = require('fs');

const AUTHORING_DIR = './authoring';
const OUTPUT_DIR = './output-configs';

const authoringNodes = fs.readdirSync(AUTHORING_DIR);

async function run() {
  const { FOLDER_NAME } = await inquirer.prompt([
    {
      type: 'list',
      name: 'FOLDER_NAME',
      message: 'Choose authoring node:',
      choices: authoringNodes,
    },
  ]);

  const baseConfig = require(`${AUTHORING_DIR}/${FOLDER_NAME}/baseConfig.json`);

  const activationFunction = require(`${AUTHORING_DIR}/${FOLDER_NAME}/activationFunc.js`);
  const filters = require(`${AUTHORING_DIR}/${FOLDER_NAME}/filters.json`);
  const gqlQuery = fs.readFileSync(`${AUTHORING_DIR}/${FOLDER_NAME}/query.gql`);

  const config = {
    ...baseConfig,
    activationFunction: activationFunction.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1],
    gqlQueryString: gqlQuery.toString(),
    filters,
  };

  fs.writeFileSync(
    `${OUTPUT_DIR}/${FOLDER_NAME}-node-config.json`,
    JSON.stringify(config, null, 2)
  );
}

run().catch((err) => console.error(err));
