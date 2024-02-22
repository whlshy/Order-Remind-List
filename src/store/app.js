import { create } from 'zustand'
import log from '../lib/log'

const initialState = {
  isSidebarOpen: true,
  list: []
}

const useAppStore = create(
  log((set, get) => ({
    ...initialState,
    setSidebarOpen: (tf = null) => set(state => ({ isSidebarOpen: tf !== null ? tf : !state.isSidebarOpen })),
    setList: (list = []) => set({list: list})
  }))
)

export default useAppStore