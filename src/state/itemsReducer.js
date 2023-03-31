export default function itemsReducer(state, action) {
  switch (action.type) {
    case "create":
      return onCreate(state, action);
    case "delete":
      return onDelete(state, action);
    case "initializeArray":
      return onInitializeArray(action);
    case "update":
      return onUpdate(state, action);
    default:
      throw new Error("Unhandled action:" + action.type);
  }
}

function onCreate(state, action) {
  const newItem = action.payload;

  return [...state, newItem];
}

function onDelete(state, action) {
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

function onUpdate(state, action) {
  const updatedItem = action.payload;
  const id = updatedItem.id;
  const clonedItems = [...state];
  const itemIndex = clonedItems.findIndex((item) => item.id === id);

  clonedItems[itemIndex] = updatedItem;

  return clonedItems;
}
