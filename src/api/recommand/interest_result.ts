export type UnFulfill = { state: 'unfulfill' }
export type Recommand = { state: 'recommand'; recommend: string[] }
export type OK = { state: 'ok' }

export type InterestResult = UnFulfill | Recommand | OK
