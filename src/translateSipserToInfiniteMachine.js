const SIMULATE_BLANK_SPACE = '£'
const STATIONARY = '*'
const LEFT_SYMBOL = '¢'

const ALPHABET = ['0','1','x','y', SIMULATE_BLANK_SPACE]

const checkState = (state, step) => {
  if (state === 'halt-accept') return state;
  return (parseInt(state) + step).toString();
};

const checkSymbol = (symbol) => symbol === '_' ? SIMULATE_BLANK_SPACE : symbol

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
      newSymbol: LEFT_SYMBOL,
      direction: 'r',
      newState: '2',
    },
  ];

  const initialStateValue = 2;

  const infiniteMachineState = [...initialState];
  sipserState.forEach(state => {
    const data = {
      ...state,
      currentState: checkState(state.currentState, initialStateValue),
      newState: checkState(state.newState, initialStateValue),
      newSymbol: checkSymbol(state.newSymbol),
    };

    infiniteMachineState.push(data);

    if(state.currentSymbol === '_') {
      infiniteMachineState.push({...data, currentSymbol: SIMULATE_BLANK_SPACE});  
    }
  });  

  [...sipserState].reverse().forEach(state => {
    if (state.direction === 'l' && !state.newState.includes('halt')) {
      const data = {
        currentState: state.newState,
        currentSymbol: LEFT_SYMBOL,
        newSymbol: LEFT_SYMBOL,
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

  let lastStep = infiniteMachineState.reduce(
    (prev, current) => 
    parseInt(prev) > parseInt(current.currentState) 
      ? prev : current.currentState, 0
  )

  infiniteMachineState.forEach(state => {
    if(state.direction === STATIONARY && !state.newState.includes('halt')) {
      const auxState = state.newState

      state.direction = 'r'
      state.newState = ++lastStep

      ALPHABET.forEach(symbol => {
        const data = {
          currentState: lastStep,
          newState: auxState,
          currentSymbol: symbol,
          newSymbol: symbol,
          direction: 'l',
        }
        infiniteMachineState.push(data)
      })
    }
  })

  infiniteTuringMachine.setStates(infiniteMachineState);
};

export default translateSipserToInfiniteMachine;
