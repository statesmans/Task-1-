/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import renderNoteList from './render.js';
import imagePaths from './constants.js';

const EDIT_NOTE = 'EDIT_NOTE';
const ARCHIVE_NOTE = 'ARCHIVE_NOTE';
const SHOW_ARCHIVE_NOTE = 'SHOW_ARCHIVE_NOTE';
const HIDE_ARCHIVE_NOTE = 'HIDE_ARCHIVE_NOTE';
const UNARCHIVE_NOTE = 'UNARCHIVE_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';
const ADD_NOTE = 'ADD_NOTE';

let store = {
  lastId: 7,
  showArchived: false,
  categoriesList: ['Task', 'Quote', 'Idea', 'Random Thought'],
  listData: [
    {
      id: 3,
      name: 'Shopping list',
      createData: 'April 20, 2021',
      category: 'Task',
      content: 'Tomatoes, Bread',
      schedule: [],
      isArchived: false,
    },
    {
      id: 4,
      name: 'Shopping list',
      createData: 'April 27, 2021',
      category: 'Task',
      content: 'Tomatoes, Bread',
      schedule: [],
      isArchived: false,
    },
    {
      id: 5,
      name: 'The theory of evolution',
      createData: 'May 05, 2021',
      category: 'Random Thought',
      content: 'Tomatoes, Bread',
      schedule: [],
      isArchived: false,
    },
    {
      id: 6,
      name: 'New feature',
      createData: 'May 07, 2021',
      category: 'Idea',
      content: 'Tomatoes, Bread',
      schedule: [],
      isArchived: false,
    },
    {
      id: 7,
      name: 'William Gaddis',
      createData: 'May 15, 2021',
      category: 'Quote',
      content: 'Tomatoes, Bread',
      schedule: [],
      isArchived: false,
    },
    {
      id: 2,
      name: 'Books',
      createData: 'April 20, 2021',
      category: 'Task',
      content: 'Tomatoes, Bread',
      schedule: [],
      isArchived: false,
    },
    {
      id: 1,
      name: 'Training',
      createData: 'April 20, 2021',
      category: 'Task',
      content: 'Tomatoes, Bread',
      schedule: [],
      isArchived: true,
    },
  ]
};

export const editNoteReducer = (action = { type: '' }) => {
  switch (action.type) {
    case ARCHIVE_NOTE: {
      const notesList = store.listData.map((el) => {
        if (el.id === action.noteId) {
          return { ...el, isArchived: true };
        }
        return el;
      });
      store.listData = [...notesList];
      reRenderNotes();
      break;
    }
    case UNARCHIVE_NOTE: {
      const notesList = store.listData.map((el) => {
        if (el.id === action.noteId) {
          return { ...el, isArchived: false };
        }
        return el;
      });
      store.listData = [...notesList];
      reRenderNotes();
      break;
    }
    case SHOW_ARCHIVE_NOTE: {
      store.showArchived = true;
      reRenderNotes();
      break;
    }
    case HIDE_ARCHIVE_NOTE: {
      store.showArchived = false;
      reRenderNotes();
      break;
    }
    case EDIT_NOTE: {
      let inputEditedValue = '';

      const notesList = store.listData.map((el) => {
        if (el.id === action.noteId) {
          if (action.editedField.schedule && el.schedule.length <= 1) {
            inputEditedValue = { schedule: [...el.schedule] };
            inputEditedValue.schedule.push(action.editedField.schedule);
          } else {
            inputEditedValue = action.editedField.schedule;
          }
          return { ...el, ...inputEditedValue };
        }
        return el;
      });

      store.listData = [...notesList];
      reRenderNotes();
      break;
    }
    case DELETE_NOTE: {
      store.listData = store.listData.filter((el) => el.id !== action.noteId);
      reRenderNotes();
      break;
    }
    case ADD_NOTE: {
      store = {
        ...store,
        lastId: store.lastId + 1,
        listData: [...store.listData, action.newNote],
      };
      reRenderNotes();
      break;
    }
    default: {
      reRenderNotes();
    }
  }
};

export const reRenderNotes = () => {
  renderNoteList(store.listData, imagePaths);
};

export const getArchivedFlag = () => store.showArchived;

export const unArchiveNote = (noteId) => {
  editNoteReducer({ type: UNARCHIVE_NOTE, noteId });
};

export const archiveNote = (noteId) => {
  editNoteReducer({ type: ARCHIVE_NOTE, noteId });
};

export const getLastId = () => store.lastId;

export const getCategoriesList = () => store.categoriesList;

export const getInitialValues = () => (store.listData);