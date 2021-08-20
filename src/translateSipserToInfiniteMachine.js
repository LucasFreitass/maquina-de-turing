const checkState = (state, step) => {
  if (state === 'halt-accept') return state;
  return (parseInt(state) + step).toString();
};

const translateSipserToInfiniteMachine = ({
  sipserTuringMachine,
  infiniteTuringMachine,
}) => {
  const sipserState = sipserTuringMachine.getStates();

  const initialState = [
    {
      currentState: '0',
      currentSymbol: '1',
      newSymbol: '1',
      direction: 'l',
      newState: '1',
    },
    {
      currentState: '0',
      currentSymbol: '0',
      newSymbol: '0',
      direction: 'l',
      newState: '1',
    },
    {
      currentState: '1',
      currentSymbol: '_',
      newSymbol: '¢',
      direction: 'r',
      newState: '2',
    },
  ];

  const initialStateValue = 2;

  const infiniteMachineState = [...initialState];
  sipserState.map(state => {
    const data = {
      ...state,
      currentState: checkState(state.currentState, initialStateValue),
      newState: checkState(state.newState, initialStateValue),
    };

    infiniteMachineState.push(data);
  });

  [...sipserState].reverse().forEach(state => {
    if (state.direction === 'l') {
      const data = {
        currentState: state.newState,
        currentSymbol: '¢',
        newSymbol: '¢',
        direction: 'r',
        newState: state.newState,
      };

      const exists = infiniteMachineState.some(
        item => JSON.stringify(item) === JSON.stringify(data),
      );

      if (!exists) {
        infiniteMachineState.push(data);
      }
    }
  });

  infiniteTuringMachine.setStates(infiniteMachineState);
};

export default translateSipserToInfiniteMachine;
