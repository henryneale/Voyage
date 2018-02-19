import React from 'react';
import SleepViewListEntry from './SleepViewListEntry.jsx';

let SleepView = (props) => {
  return (
    <div className="viewTable">
      <table>
        <thead>
          <tr>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {props.sleep.map((item) => (
            <SleepViewListEntry
              newTrip={props.newTrip}
              key={props.sleep.indexOf(item)}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SleepView;
