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

  const schema = fs.readFileSync(`${AUTHORING_DIR}/${FOLDER_NAME}/schema.avsc`).toString();

  console.log(JSON.stringify(JSON.stringify(JSON.parse(schema))));
}

run().catch((err) => console.error(err));
