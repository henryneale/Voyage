import React from 'react';

const EatViewListEntry = props => (
  <tr>
    <td><a href={props.item.url}><h3>{props.item.name}</h3></a></td>
    <td><img src={props.item.imageUrl.replace('/o.jpg', '/m.jpg')} alt=""/> </td>
    <td><button onClick={() => console.log('add to my trips')}>Add</button></td>
  </tr>
);

export default EatViewListEntry;

