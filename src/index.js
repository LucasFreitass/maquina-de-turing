import parseFile from './parseFile';
import TuringMachine from './TuringMachine';
import translateSipserToInfiniteMachine from './translateSipserToInfiniteMachine';

const app = () => {
  const data = parseFile();
  const sipserTuringMachine = new TuringMachine(data);
  const infiniteTuringMachine = new TuringMachine();

  translateSipserToInfiniteMachine({
    sipserTuringMachine,
    infiniteTuringMachine,
  });

  infiniteTuringMachine.saveToFile('resultado.out');
};

app();
