import { configureStore } from '@reduxjs/toolkit'
import Checkinglogin from './features/Checkinglogin.js'

export default configureStore({
  reducer: {
    checks: Checkinglogin,
  },
})