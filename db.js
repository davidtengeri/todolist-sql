import { SQLite } from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

const init = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `create table if not exists items (
        id integer primary key not null,
        done int,
        title text,
        description text
      );`
    );
  });
}

const loadAllItems = (onReady) => {
  db.transaction((tx) => {
    tx.executeSql(
      'select * from items',
      [],
      (_, { rows: { _array } }) => onReady(_array),
    );
  });
}

const loadActiveItems = (onReady) => {
  db.transaction((tx) => {
    tx.executeSql(
      'select * from items where done = 0',
      [],
      (_, { rows: { _array } }) => onReady(_array),
    );
  });
}

const loadDoneItems = (onReady) => {
  db.transaction((tx) => {
    tx.executeSql(
      'select * from items where done = 1',
      [],
      (_, { rows: { _array } }) => onReady(_array),
    );
  });
}

const updateItemState = (id, done, onReady) => {
  db.transaction((tx) => {
    tx.executeSql(
      `update items set done = ? where id = ?`,
      [done, id],
      (_, { rowsAffected }) => onReady(rowsAffected)
    );
  });
}

const saveItem = ({ title, description }, onReady) => {
  db.transaction((tx) => {
    tx.executeSql(
      `insert into items (
        done,
        title,
        description
      ) values (
        0, ?, ?
      )`,
      [title, description],
      (_, { insertId }) => onReady(insertId)
    );
  });
}

const deleteItem = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      `delete from items where id = ?;`,
      [id]
    );
  })
}

export default {
  init,
  loadAllItems,
  loadActiveItems,
  loadDoneItems,
  saveItem,
  deleteItem,
  updateItemState,
};