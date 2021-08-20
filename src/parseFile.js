import { readFileSync } from 'fs';

const parseFile = () => {
  const file = process.argv[2];
  const [fileName, fileExtension] = file.split('.');
  if (fileExtension !== 'in') {
    throw new Error(`Extensão do arquivo ${fileExtension} não é suportado`);
  }

  try {
    const data = readFileSync(file, 'utf8');
    const stringTokensData = data.split('\n');
    const tokensData = stringTokensData
      .map(line => line.split(' '))
      .filter(line => line.length === 5);

    return tokensData;
  } catch (e) {
    throw new Error(`Não foi possível abrir o arquivo ${file}`);
  }
};

export default parseFile;
