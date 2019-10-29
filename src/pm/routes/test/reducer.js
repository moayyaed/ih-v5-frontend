function reducer(state = 0, action) {
  if (action.type === 'test') {
    return state + 1;
  }
  return state
}

export default reducer;
