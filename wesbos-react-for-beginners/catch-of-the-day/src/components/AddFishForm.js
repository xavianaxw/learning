import React from "react";

class AddFishForm extends React.Component {
  render() {
    return (
      <form className="fish-edit">
        <input type="text" placeholder="Fish Name" />
        <input type="text" placeholder="Fish Price" />
        <select>
          <option value="Fresh">Fresh</option>
          <option value="Sold Out">Sold Out</option>
        </select>
        <textarea placeholder="Fish Desc" />
        <input type="text" placeholder="Fish Image" />
        <button type="submit">Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
