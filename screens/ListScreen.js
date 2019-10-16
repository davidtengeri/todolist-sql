import React from 'react';
import { Container, Content, Text, Segment, Button, Fab, View, Icon, ListItem, CheckBox, Body } from 'native-base';
import { actions } from './todoSlice';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import db from '../db';
import { TouchableOpacity } from 'react-native';

class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'All items',
  }

  static defaultProps = {
    items: [],
  }

  toggleItem = (id, value) => {
    db.updateItemState(id, value, this.loadItems);
  }

  loadItems = () => {
    const { itemsLoaded, currentFilter } = this.props;
    if (currentFilter === 'ALL') {
      db.loadAllItems(itemsLoaded);
    }
    if (currentFilter === 'ACTIVE') {
      db.loadActiveItems(itemsLoaded);
    }
    if (currentFilter === 'DONE') {
      db.loadDoneItems(itemsLoaded);
    }
  }

  renderItems = () => {
    const { items, navigation } = this.props;
    return items.map((item) => (
      <ListItem key={item.id}>
        <CheckBox
          onPress={() => {
            this.toggleItem(item.id, item.done === 1 ? 0 : 1);
          }}
          checked={item.done === 1}
        />
        <Body>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Edit', { item })
            }}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>

        </Body>
      </ListItem>
    ))
  }

  componentDidUpdate(prevProps) {
    const { currentFilter } = this.props;

    if (prevProps.currentFilter !== currentFilter) {
      this.loadItems();
    }
  }

  render() {
    const { navigation, filterChanged, currentFilter } = this.props;
    return (
      <Container>
        <Content padder>
          <Segment>
            <Button
              first
              active={currentFilter === 'ALL'}
              onPress={() => filterChanged('ALL')}
            ><Text>All</Text></Button>
            <Button
              active={currentFilter === 'ACTIVE'}
              onPress={() => filterChanged('ACTIVE')}
            ><Text>Active</Text></Button>
            <Button last
              active={currentFilter === 'DONE'}
              onPress={() => filterChanged('DONE')}
            ><Text>Done</Text></Button>
          </Segment>
          {this.renderItems()}
        </Content>
        <View>
          <Fab position="bottomRight"
            onPress={() => navigation.navigate('Add')}
          >
            <Icon name="add" />
          </Fab>
        </View>
        <NavigationEvents
          onWillFocus={() => {
            this.loadItems();
          }}
        />
      </Container >
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.todos,
  currentFilter: state.filter,
});

const mapDispatchToProps = {
  itemsLoaded: actions.itemsLoaded,
  filterChanged: actions.filterChanged,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListScreen);
