import React from 'react';

class EatViewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  onClick(e) {
    console.log(this.props.item);
    this.props.newTrip(this.props.item);
  }

  render() {
    return (
      <tr>
        <td>
          <a href={this.props.item.url}>
            <h3>{this.props.item.name}</h3>
          </a>
        </td>
        <td>
          <img
            src={this.props.item.imageUrl.replace('/o.jpg', '/m.jpg')}
            alt=""
          />{' '}
        </td>
        <td>
          <button onClick={this.onClick.bind(this)}>Add</button>
        </td>
      </tr>
    );
  }
}

export default EatViewListEntry;
