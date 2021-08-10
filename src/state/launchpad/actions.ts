import { createAction } from '@reduxjs/toolkit'

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export const selectCurrency = createAction<{ field: Field; currencyId: string }>('launchpad/selectCurrency')
export const switchCurrencies = createAction<void>('launchpad/switchCurrencies')
export const typeInput = createAction<{ field: Field; typedValue: string }>('launchpad/typeInput')
export const replaceLaunchpadState = createAction<{
  field: Field
  typedValue: string
  inputCurrencyId?: string
  outputCurrencyId?: string
  recipient: string | null
}>('launchpad/replaceLaunchpadState')
export const setRecipient = createAction<{ recipient: string | null }>('launchpad/setRecipient')
