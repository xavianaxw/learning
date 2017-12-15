import React from "react";

import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  gotoStore(e) {
    e.preventDefault();

    const storeId = this.storeInput.value;
    console.log(`You changed the URL ${storeId}`);

    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={e => this.gotoStore(e)}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={input => {
            this.storeInput = input;
          }}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object,
};

export default StorePicker;
