export default {
  covert (item) {
    return {
      text: item.name,
      ...item
    }
  }
}
