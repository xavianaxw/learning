import React from "react";

import AddFishForm from "./AddFishForm";

class Inventory extends React.Component {
  constructor() {
    super();

    this.renderFishesInInventory = this.renderFishesInInventory.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e, fishKey) {
    const updatedFish = {
      ...this.props.fishes[fishKey],
      [e.target.name]: e.target.value,
    };

    this.props.updateFish(fishKey, updatedFish);
  }

  renderFishesInInventory(fishKey) {
    return (
      <form className="fish-edit" key={fishKey}>
        <input
          type="text"
          name="name"
          placeholder="Fish Name"
          value={this.props.fishes[fishKey].name}
          onChange={e => this.handleOnChange(e, fishKey)}
        />
        <input
          type="text"
          name="price"
          placeholder="Fish Price"
          value={this.props.fishes[fishKey].price}
          onChange={e => this.handleOnChange(e, fishKey)}
        />
        <select
          name="status"
          value={this.props.fishes[fishKey].status}
          onChange={e => this.handleOnChange(e, fishKey)}
        >
          <option value="Fresh">Fresh</option>
          <option value="Sold Out">Sold Out</option>
        </select>
        <textarea
          name="desc"
          placeholder="Fish Desc"
          value={this.props.fishes[fishKey].desc}
          onChange={e => this.handleOnChange(e, fishKey)}
        />
        <input
          type="text"
          name="image"
          placeholder="Fish Image"
          value={this.props.fishes[fishKey].image}
          onChange={e => this.handleOnChange(e, fishKey)}
        />
        <button
          onClick={() => {
            this.props.removeFish(fishKey);
          }}
        >
          Remove Fish
        </button>
      </form>
    );
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderFishesInInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  loadFishes: React.PropTypes.func.isRequired,
}

export default Inventory;
