import React from 'react';
import { Container, Image, Table } from 'semantic-ui-react';
import ItineraryViewListEntry from './ItineraryViewListEntry.jsx';

class ItineraryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let results = this.props.itineraries.map((item, i) => {
      return (
        <Table.Row key={i}>
          <Table.Cell style={{ textAlign: 'center' }}>{item.name}</Table.Cell>
          <Table.Cell style={{ textAlign: 'center' }}>
            <Image
              src={item.imageUrl.replace('/o.jpg', '/m.jpg')}
              href={item.url}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
    return (
      <Container style={{ marginTop: '5px' }}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ textAlign: 'center' }}>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: 'center' }}>
                Link
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{results}</Table.Body>
        </Table>
      </Container>
    );
  }
}

export default ItineraryView;
