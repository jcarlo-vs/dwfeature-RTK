import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullName: '',
  nationalID: '',
  createdAt: '',
}

const customerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    // createCustomer: {
    //   prepare(fullName, nationalID) {
    //     return {
    //       payload: {
    //         fullName,
    //         nationalID,
    //         createdAt: new Date().toISOString(),
    //       },
    //     }
    //   },
    //   reducer(state, action) {
    //     state.fullName = action.payload.fullName
    //     state.nationalID = action.payload.nationalID
    //     state.createdAt = action.payload.createdAt
    //   },
    // },
    createCustomer(state, { payload }) {
      const { fullName, nationalID } = payload
      state.fullName = fullName
      state.nationalID = nationalID
      state.createdAt = new Date().toISOString()
    },
    updateName(state, action) {
      state.fullName = action.payload
    },
  },
  extraReducers: {},
})

console.log(customerSlice)

export default customerSlice.reducer
export const { createCustomer, updateName } = customerSlice.actions

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case 'customer/createCustomer':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       }
//     case 'customer/updateName':
//       return { ...state, fullName: action.payload }

//     default:
//       return state
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: 'customer/createCustomer',
//     payload: { fullName, nationalID, createdAt: crypto.randomUUID() },
//   }
// }
// export function updateName(fullName) {
//   return { type: 'customer/updateName', payload: fullName }
// }
