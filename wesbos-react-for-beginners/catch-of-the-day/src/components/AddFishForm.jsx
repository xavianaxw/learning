import React from "react";

class AddFishForm extends React.Component {
  addFish(e) {
    e.preventDefault();
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value,
    };

    console.log(fish);
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={e => this.addFish(e)}>
        <input
          ref={input => {
            this.name = input;
          }}
          type="text"
          placeholder="Fish Name"
        />
        <input
          ref={input => {
            this.price = input;
          }}
          type="text"
          placeholder="Fish Price"
        />
        <select
          ref={input => {
            this.status = input;
          }}
        >
          <option value="Fresh">Fresh</option>
          <option value="Sold Out">Sold Out</option>
        </select>
        <textarea
          ref={input => {
            this.desc = input;
          }}
          placeholder="Fish Desc"
        />
        <input
          ref={input => {
            this.image = input;
          }}
          type="text"
          placeholder="Fish Image"
        />
        <button type="submit">Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
