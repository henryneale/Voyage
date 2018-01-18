import React from 'react';
import IconButton from 'material-ui/IconButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
// import {red500, yellow500, blue500} from 'material-ui/styles/colors';



const styles = {
  icons: {
    marginRight: 24,
  }
};

/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
 * through the `onClick` property, and a [FlatButton](/#/components/flat-button) on the right.
 */
const MenuView = () => (
    <Tabs>
      <Tab icon={<FontIcon className="material-icons" style={styles.icons}>home</FontIcon>} />
      <Tab icon={<FontIcon className="material-icons" style={styles.icons}>card_travel</FontIcon>} />
      <Tab icon={<FontIcon className="material-icons" style={styles.icons}>person</FontIcon>} />
    </Tabs>
);

export default MenuView;