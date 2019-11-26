function getArrObjNameFromId(arr, _id) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element._id == _id) return element.name;
  }
}
export default getArrObjNameFromId;
