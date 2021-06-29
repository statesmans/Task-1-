import { getInitialValues } from './store.js';
import { addNewNoteListener, showArchiveListener } from './listeners.js';
import renderNoteList from './render.js';

const noteList = getInitialValues();

renderNoteList(noteList);
addNewNoteListener();
showArchiveListener();
