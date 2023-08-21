function deleteItemById(itemList, itemId) {
  itemList.forEach((item) => {
    if (item["id"] == itemId) {
      let index = itemList.indexOf(item);
      itemList.splice(index, 1);
    }
  });
}

function findItemById(itemList, itemId) {
  const selectedItem = itemList.find((item) => item["id"] == itemId);
  return selectedItem;
}

export { deleteItemById, findItemById };
