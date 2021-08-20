import { createWriteStream } from 'fs';

class TuringMachine {
  states = [];

  constructor(statesData) {
    statesData?.forEach(state => {
      const [
        currentState,
        currentSymbol,
        newSymbol,
        direction,
        newState,
      ] = state;

      this.states.push({
        currentState,
        currentSymbol,
        newSymbol,
        direction,
        newState,
      });
    });
  }

  getStates() {
    return this.states;
  }

  setStates(states) {
    this.states = states;
  }

  saveToFile(fileName) {
    const writer = createWriteStream(fileName);

    this.states.forEach(
      ({ currentState, currentSymbol, newSymbol, direction, newState }) => {
        const data = `${currentState} ${currentSymbol} ${newSymbol} ${direction} ${newState}\n`;
        writer.write(data);
      },
    );

    writer.end();
  }
}

export default TuringMachine;
