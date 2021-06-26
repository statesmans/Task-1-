import { archiveNote, editNoteReducer, getArchivedFlag, reRenderNotes, unArchiveNote } from './store.js';
import { addNewNote, getArchiveBtnDOM, getEditableInputsList, setDisabledValue } from './helpers.js';

export const addListeners = (listItem) => {
    archiveListener(listItem)
    disableInputsListener(listItem)
    watchInputChangesListener(listItem)
    deleteNoteItemListener(listItem)
}


export const archiveListener = (listItem) => {
  const archiveBtn = getArchiveBtnDOM(listItem);

  archiveBtn.addEventListener("click", (e) => {

    if(listItem.isArchived) {
      archiveBtn.closest('.notes__item').classList.remove('archived')
    } else {
      archiveBtn.closest('.notes__item').classList.add('archived')
    }
       
    if(listItem.isArchived) {
        unArchiveNote(listItem.id)
    } else {
        archiveNote(listItem.id)
    }
  })
}




export const disableInputsListener = (listItem) => {
    const editBtn = document.querySelector(`#editBtn${listItem.id}`);
    
    editBtn.addEventListener('click', (e) => {
      let noteInputs = Array.from(e.target.closest('.notes__item').getElementsByClassName('note__text'));
            
      if(noteInputs[0].disabled) {
        setDisabledValue(false, noteInputs)

        window.addEventListener('keydown', (e) => {
          if(e.key == 'Enter') {
            setDisabledValue(true, noteInputs)
          }
        })

      } else {
        setDisabledValue(true, noteInputs)
      }
    })
}

export const watchInputChangesListener = (listItem) => {
    let inputsList = getEditableInputsList(listItem.id);
    
    inputsList.forEach(input => {
      const action = {
        type: "EDIT_NOTE",
        noteId: listItem.id,
        editedValues: []
      }

      input.addEventListener('input', (e) => { 
          let editedInputName = e.target.classList[1].replace('text__', '')
          action.editedValues = {[editedInputName]: e.target.value}
          editNoteReducer(action)
        }) 
    })
}

export const deleteNoteItemListener = (listItem) => {
    const deleteBtn = document.getElementById(`deleteBtn${listItem.id}`)

    deleteBtn.addEventListener("click", () => {
        const action = {
            type: 'DELETE_NOTE',
            noteId: listItem.id
        }
        editNoteReducer(action)
    })
}

export const addNewNoteListener = () => {
    const addNoteBtn = document.getElementById('addNewNoteBtn');
   
    addNoteBtn.addEventListener('click', () => {
        const newNote = addNewNote()
        const action = {type: 'ADD_NOTE', newNote}
        editNoteReducer(action)
    })
}

export const showArchiveListener = () => {
    const showArchiveNotesBtn = document.getElementById('showArchivedNoteBtn')
    
    showArchiveNotesBtn.addEventListener('click', () => {
      let showArchivedFlag = getArchivedFlag();
      let action = {
          type: showArchivedFlag ? 'HIDE_ARCHIVE_NOTE' : 'SHOW_ARCHIVE_NOTE'
      };
      if(!showArchivedFlag) {
          showArchiveNotesBtn.innerText = 'Hide archived notes'; 
      } else {
          showArchiveNotesBtn.innerText = 'Show archived notes';
      }
        
      editNoteReducer(action);
    })
}   
