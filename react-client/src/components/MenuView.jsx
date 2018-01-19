import React from 'react';
import IconButton from 'material-ui/IconButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';


const styles = {
  icons: {
    marginRight: 24,
  }
};


const MenuView = () => (
    <Tabs>
      <Tab icon={<FontIcon className="material-icons" style={styles.icons}>home</FontIcon>} />
      <Tab icon={<FontIcon className="material-icons" style={styles.icons}>card_travel</FontIcon>} />
      <Tab icon={<FontIcon className="material-icons" style={styles.icons}>person</FontIcon>} />
    </Tabs>
);

export default MenuView;