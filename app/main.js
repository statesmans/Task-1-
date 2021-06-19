import renderNotesList from './render.js'
import { store } from './store.js'
import { toggleInputDisableHandler } from './handlers.js'
 

renderNotesList(store)
toggleInputDisableHandler()