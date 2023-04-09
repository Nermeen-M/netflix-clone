export default function itemsReducer(state, action) {
  switch (action.type) {
    case "createItem":
      return onCreateItem(state, action);
    case "deleteItem":
      return onDeleteItem(state, action);
    case "initializeArray":
      return onInitializeArray(action);
    // case "updateArray":
    //   return onUpdateArray(state, action);
    case "updateItem":
      return onUpdateItem(state, action);
    default:
      throw new Error("Unhandled action:" + action.type);
  }
}

function onCreateItem(state, action) {
  const newItem = action.payload;

  return [...state, newItem];
}

function onDeleteItem(state, action) {
  const id = action.payload;
  const clonedItems = [...state];
  const itemIndex = clonedItems.findIndex((item) => item.id === id);

  clonedItems.splice(itemIndex, 1);

  return clonedItems;
}

function onInitializeArray(action) {
  const newItems = action.payload;

  return newItems;
}

// function onUpdateArray(state, action) {
//   console.log("action", action);
//   const newItems = action.payload;
//   const id = action.mediaId;
//   const clonedItems = [...state];

//   // console.log("media id", action.mediaId);
//   const itemIndex = clonedItems.findIndex((item) => item.id === id);
//   clonedItems[itemIndex] = { ...clonedItems[itemIndex], titles: newItems };
//   // console.log(clonedItems[itemIndex]);
//   // console.log("new state", clonedItems);
//   return clonedItems;
// }

function onUpdateItem(state, action) {
  const updatedItem = action.payload;
  const id = updatedItem.id;
  const clonedItems = [...state];
  const itemIndex = clonedItems.findIndex((item) => item.id === id);

  clonedItems[itemIndex] = updatedItem;

  return clonedItems;
}
