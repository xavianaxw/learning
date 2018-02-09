import React from "react";
import CSSTransitionGroup from "react-addons-css-transition-group";

import { formatPrice } from "../helpers";

class Order extends React.Component {
  constructor() {
    super();

    this.renderFishOrders = this.renderFishOrders.bind(this);
  }

  renderFishOrders(fishKey) {
    const fish = this.props.fishes[fishKey];
    const count = this.props.orders[fishKey];
    const removeButton = (
      <button
        onClick={() => {
          this.props.removeFromOrder(fishKey);
        }}
      >
        &times;
      </button>
    );

    if (fish && fish.status === "available") {
      return (
        <li key={fishKey}>
          <span>
            <CSSTransitionGroup
              component="span"
              className="count"
              transitionName="count"
              transitionEnterTimeout={250}
              transitionLeaveTimeout={250}
            >
              <span key={count}>{count}</span>
            </CSSTransitionGroup>
            lbs {fish.name}
          </span>
          {removeButton}
          <span className="price">{formatPrice(count * fish.price || 0)}</span>
        </li>
      );
    }

    // if not available
    return (
      <li key={fishKey}>
        Sorry, {fish ? fish.name : "fish"} was not found {removeButton}
      </li>
    );
  }

  render() {
    const orderIds = Object.keys(this.props.orders);
    const total = orderIds.reduce((totalCost, currentFishKey) => {
      const fish = this.props.fishes[currentFishKey];
      const count = this.props.orders[currentFishKey];

      if (fish && fish.status === "available") {
        return totalCost + (count * fish.price || 0);
      }
      return totalCost;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderFishOrders)}
          <li className="total">
            <strong>{formatPrice(total)}</strong>
          </li>
        </CSSTransitionGroup>
      </div>
    );
  }
}

Order.propTypes = {
  orders: React.PropTypes.object.isRequired,
  fishes: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired,
}

export default Order;
