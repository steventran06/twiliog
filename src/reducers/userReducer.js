const initState = { phNumber: '+12342342342', code: '12345',email: 'poojas@gmail.com',password: 'password',firstName: 'pooja',lastName: 'srinath'}
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'VERIFY_SUCCESS':
      console.log('Checked verfication code', action.payload);
      return {...state, code : action.payload};
    case 'VERIFY_ERROR':
      console.log('Verify error', action.err);
      return state;
    case 'CHECK_VERIFY':
      console.log('Store user entered info', action.payload);
      return {...state, ...action.payload};
    case 'VERIFY_CODE_SENT_SUCCESS':
      console.log('verify code sent success', action.payload);
      return state;
    case 'VERIFY_CODE_SENT_ERROR':
      console.log('verify code sent error', action.payload);
      return state;
    default:
      return state;
  }
};

export default userReducer;