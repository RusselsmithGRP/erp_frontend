"use strict";

class StateLoader {
  loadState() {
    try {
      let serializedState = localStorage.getItem("http://localhost:8081:state");
      if (serializedState === null) {
        return this.initializeState();
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem("http://localhost:8081:state", serializedState);
    } catch (err) {
      throw new Error(err);
    }
  }

  unsetState() {
    localStorage.removeItem("http://localhost:8081:state");
  }

  initializeState() {
    return {
      //state object
    };
  }
}

export default StateLoader;
