import React from 'react';

class AddPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      isSelected: false,
    };

    this.priceHandler = this.priceHandler.bind(this);
  }

  priceHandler(e) {
    this.setState(
      {
        isSelected: !this.state.isSelected,
        price: e.target.value,
      },
      () => this.onSetPrice()
    );
  }

  onSetPrice() {
    this.props.changeBudget(this.state.price);
  }

  render() {
    return (
      <div className="priceButtons">
        <p className="priceText">
          <label>
            <input
              className="radioButton"
              type="radio"
              name="price"
              value="1"
              onClick={this.priceHandler}
              checked={this.state.isSelected}
            />$
          </label>
          <label>
            <input
              className="radioButton"
              type="radio"
              name="price"
              value="2"
              onClick={this.priceHandler}
              checked={this.state.isSelected}
            />$$
          </label>
          <label>
            <input
              className="radioButton"
              type="radio"
              name="price"
              value="3"
              onClick={this.priceHandler}
              checked={this.state.isSelected}
            />$$$
          </label>
          <label>
            <input
              className="radioButton"
              type="radio"
              name="price"
              value="4"
              onClick={this.priceHandler}
              checked={this.state.isSelected}
            />$$$$
          </label>
        </p>
      </div>
    );
  }
}

export default AddPrice;
