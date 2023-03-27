import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import searchReducer from '../features/home/reducer'
import { nasaApi } from '../features/api/nasaService'

const rootReducer = combineReducers({
  search: searchReducer,
  [nasaApi.reducerPath]: nasaApi.reducer,
})

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [nasaApi.reducerPath]: nasaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(nasaApi.middleware),
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(nasaApi.middleware),
    preloadedState
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof setupStore>
