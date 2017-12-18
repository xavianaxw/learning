import React from "react";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      orders: {},
    };

    this.addFish = this.addFish.bind(this);
  }

  addFish(fishDetails) {
    const fishes = { ...this.state.fishes };
    const timestamp = Date.now(); // returns milliseconds from 1970 to use as fish id

    fishes[`fish-${timestamp}`] = fishDetails;

    this.setState({
      fishes,
    });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
