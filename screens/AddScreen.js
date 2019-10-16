import React from 'react';
import { connect } from "react-redux";
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { actions } from './todoSlice';
import db from '../db';

class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add new item',
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
    }
  }

  render() {
    const { saveItem, navigation } = this.props;

    return (
      <Container>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input onChangeText={(value) => this.setState({ title: value })} />
            </Item>
          </Form>
          <Button
            style={{ marginTop: 10, justifyContent: 'center' }}
            onPress={() => {
              const { title } = this.state;
              if (title !== '') {
                db.saveItem(title, () => {
                  navigation.goBack();
                });
              }
            }}
          >
            <Text>Add</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  saveItem: actions.saveItem,
};

export default AddScreen;
