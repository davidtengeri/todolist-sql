import React from 'react';
import { connect } from "react-redux";
import { Container, Content, Text, Textarea, Form, Item, Label, Input, Button } from 'native-base';
import { actions } from './todoSlice';
import db from '../db';

class EditScreen extends React.Component {
  static navigationOptions = {
    title: 'Item details',
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    const item = navigation.getParam('item', null);

    if (item === null) {
      navigation.navigate('List');
      return;
    }

    return (
      <Container>
        <Content padder>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
        </Content>
      </Container>
    );
  }
}

export default EditScreen;
