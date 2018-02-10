import React from "react";
import base from "../base";

import AddFishForm from "./AddFishForm";

class Inventory extends React.Component {
  constructor() {
    super();

    this.renderFishesInInventory = this.renderFishesInInventory.bind(this);
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      uid: null,
      owner: null,
    };
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user });
      }
    })
  }

  handleOnChange(e, fishKey) {
    const updatedFish = {
      ...this.props.fishes[fishKey],
      [e.target.name]: e.target.value,
    };

    this.props.updateFish(fishKey, updatedFish);
  }

  authenticate(provider) {
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {
    if (err) {
      console.log("Authentication failed");
      return;
    }

    // grab store info
    const storeRef = base.database().ref(this.props.storeId);

    // query for store data once
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // if no owner
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid,
        })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid,
      });
    });
  }

  logout() {
    base.unauth();
    this.setState({
      uid: null,
    });
  }

  renderLoginForm() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory!</p>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Facebook</button>
      </nav>
    )
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
    const logout = <button onClick={this.logout}>Logout</button>;

    // if user not logged in
    if (!this.state.uid) {
      return (
        <div>{this.renderLoginForm()}</div>
      )
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry this store does not belong to you.</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
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
  storeId: React.PropTypes.string.isRequired,
}

export default Inventory;
