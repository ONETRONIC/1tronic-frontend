import { createSlice } from '@reduxjs/toolkit'
import launchpadsConfig from 'config/constants/launchpad'
import { fetchUserBalances } from 'state/pools/fetchPoolsUser'
import { LaunchpadsState, Launchpad, AppThunk } from 'state/types'
import { Field, selectCurrency, setRecipient, switchCurrencies, typeInput } from './actions'

const initialState: LaunchpadsState = {
  data: [...launchpadsConfig],
  userDataLoaded: false,
  independentField: Field.INPUT,
  typedValue: '',
  [Field.INPUT]: {
    currencyId: '',
  },
  [Field.OUTPUT]: {
    currencyId: '',
  },
  recipient: null,
}

// Thunks

export const fetchLaunchpadsUserDataAsync =
  (account: string): AppThunk =>
  async (dispatch) => {
    fetchUserBalances(account)
    const userData = launchpadsConfig.map((launchpad) => ({
      projectId: launchpad.projectId,
    }))

    dispatch(setLaunchpadsUserData(userData))
}

export const LaunchpadsSlice = createSlice({
  name: 'Launchpads',
  initialState,
  reducers: {
    setLaunchpadsPublicData: (state, action) => {
      const liveLaunchpadsData: Launchpad[] = action.payload
      state.data = state.data.map((launchpad) => {
        const liveLaunchpadData = liveLaunchpadsData.find((entry) => entry.projectId === launchpad.projectId)
        return { ...launchpad, ...liveLaunchpadData }
      })
    },
    setLaunchpadsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((launchpad) => {
        const userLaunchpadData = userData.find((entry) => entry.projectId === launchpad.projectId)
        return { ...launchpad, userData: userLaunchpadData }
      })
      state.userDataLoaded = true
    },
    updateLaunchpadsUserData: (state, action) => {
      const { projectId } = action.payload
      const index = state.data.findIndex((p) => p.projectId === projectId)

      if (index >= 0) {
        state.data[index] = { ...state.data[index] }
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(selectCurrency, (state, { payload: { currencyId, field } }) => {
      const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT
      if (currencyId === state[otherField].currencyId) {
        // the case where we have to launchpad the order
        return {
          ...state,
          independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
          [field]: { currencyId },
          [otherField]: { currencyId: state[field].currencyId },
        }
      }
      // the normal case
      return {
        ...state,
        [field]: { currencyId },
      }
    })
    .addCase(switchCurrencies, (state) => {
      return {
        ...state,
        independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
        [Field.INPUT]: { currencyId: state[Field.OUTPUT].currencyId },
        [Field.OUTPUT]: { currencyId: state[Field.INPUT].currencyId },
      }
    })
    .addCase(typeInput, (state, { payload: { field, typedValue } }) => {
      return {
        ...state,
        independentField: field,
        typedValue,
      }
    })
    .addCase(setRecipient, (state, { payload: { recipient } }) => {
      state.recipient = recipient
    })
  },
})

// Actions
export const { setLaunchpadsPublicData, setLaunchpadsUserData, updateLaunchpadsUserData } = LaunchpadsSlice.actions

export default LaunchpadsSlice.reducer
