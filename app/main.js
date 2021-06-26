import { reRenderNotes } from './store.js'
import { addNewNoteListener, showArchiveListener } from './listeners.js'




reRenderNotes()
addNewNoteListener()
showArchiveListener()