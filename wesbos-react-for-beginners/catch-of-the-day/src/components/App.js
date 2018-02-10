import React from "react";
import base from "../base";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";

import sampleFishes from "../sample-fishes";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      orders: {},
    };

    // bind functions to the component itself
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadFishes = this.loadFishes.bind(this);

    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
  }

  // Event Lifecycles
  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });

    const localStorageRef = localStorage.getItem(
      `order-${this.props.params.storeId}`
    );

    if (localStorageRef) {
      this.setState({
        orders: JSON.parse(
          localStorage.getItem(`order-${this.props.params.storeId}`)
        ),
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(
      `order-${this.props.params.storeId}`,
      JSON.stringify(nextState.orders)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish(fishDetails) {
    const fishes = { ...this.state.fishes };
    const timestamp = Date.now(); // returns milliseconds from 1970 to use as fish id

    fishes[`fish-${timestamp}`] = fishDetails;

    this.setState({
      fishes,
    });
  }

  updateFish(fishKey, updatedFish) {
    const fishes = {
      ...this.state.fishes,
      [fishKey]: updatedFish,
    };

    this.setState({ fishes });
  }

  removeFish(fishKey) {
    const fishes = { ...this.state.fishes };
    fishes[fishKey] = null;

    this.setState({
      fishes,
    });
  }

  loadFishes() {
    this.setState({
      fishes: sampleFishes,
    });
  }

  addToOrder(fishKey) {
    const orders = { ...this.state.orders };
    orders[fishKey] = orders[fishKey] + 1 || 1;

    this.setState({
      orders,
    });
  }

  removeFromOrder(fishKey) {
    const orders = { ...this.state.orders };
    delete orders[fishKey];

    this.setState({
      orders,
    });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(key => {
              return (
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                />
              );
            })}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          orders={this.state.orders}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadFishes={this.loadFishes}
          fishes={this.state.fishes}
          storeId={this.props.params.storeId}
        />
      </div>
    );
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired,
}

export default App;
