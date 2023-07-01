import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload
      state.isLoading = false
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload
    },
    // requestLoan: {
    //   prepare(amount, purpose) {
    //     return {
    //       payload: { amount, purpose },
    //     }
    //   },

    //   reducer(state, action) {
    //     if (state.loan <= 0) return
    //     state.loan = action.payload.amount
    //     state.loanPurpose = state.payload.loanPurpose
    //     state.balance = state.balance + state.loan
    //   },
    // },

    requestLoan(state, { payload }) {
      const { amount, loanPurpose } = payload
      console.log(amount, loanPurpose)
      if (state.loan > 0) return
      state.loan = amount
      state.loanPurpose = loanPurpose
      state.balance = state.balance + state.loan
    },
    payLoan(state) {
      state.balance -= state.loan
      state.loan = 0
      state.loanPurpose = ''
    },
    convertingCurrency(state) {
      state.isLoading = true
    },
  },
  extraReducers: {},
})

export function deposit(amount, currency) {
  if (currency === 'USD') {
    return { type: 'account/deposit', payload: amount }
  }

  return async function (dispatch, getState) {
    // API CALL
    dispatch({ type: 'account/convertingCurrency' })
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    )
    const data = await response.json()
    const converted = data.rates.USD

    // return action
    dispatch({ type: 'account/deposit', payload: converted })
  }
}

export const { withdraw, requestLoan, payLoan } = accountSlice.actions
export default accountSlice.reducer

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       }

//     case 'account/widthdraw':
//       return { ...state, balance: state.balance - action.payload }

//     case 'account/requestLoan':
//       if (state.loan > 0) return state
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       }

//     case 'account/payLoan':
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: '',
//         balance: state.balance - state.loan,
//       }

//     case 'account/convertingCurrency':
//       return { ...state, isLoading: true }
//     default:
//       return state
//   }
// }

// export function withdraw(amount) {
//   return { type: 'account/widthdraw', payload: amount }
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: 'account/requestLoan',
//     payload: { amount: amount, purpose: purpose },
//   }
// }
// export function payLoan() {
//   return { type: 'account/payLoan' }
// }
