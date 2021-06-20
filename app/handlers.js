import { editNoteReducer } from './store.js';

export const addHandlers = (listItem) => {
    archiveHandler(listItem)
    editNoteHandler(listItem)
    watchInputChangesHandler(listItem)
    deleteNoteItemHandler(listItem)
}


export const archiveHandler = (listItem)=>{
    const archiveBtn = document.getElementById(`archiveBtn${listItem.id}`)

    archiveBtn.addEventListener("click", () => {
        let action = {
            type: 'ARCHIVE_NOTE',
            noteId: listItem.id
        }
        editNoteReducer(action)
    })
}

export const editNoteHandler = (listItem)=>{
    const editBtn = document.querySelector(`#editBtn${listItem.id}`)

    editBtn.addEventListener('click', (e)=>{
        if(e.target.id == `editBtn${listItem.id}`) {
            let editableListItem = e.target.parentNode.parentNode
            let editableInputs = Array.from(editableListItem.getElementsByClassName('note__text'))

            if(editableInputs[0].disabled) {
                editableInputs.forEach(el => {
                    el.disabled = !true
                });
            } else {
                editableInputs.forEach(el => {
                    
                    el.disabled = true
                });
            }
            
            
        }
        
    })
}

export const watchInputChangesHandler = (listItem) => {
    let inputsList = Array.from(document.getElementById(`editBtn${listItem.id}`)
                                        .parentNode
                                        .parentNode
                                        .getElementsByClassName('note__text')) 
    
    inputsList.forEach(el => {
        el.addEventListener('input', (e) => {

            const action = {
                type: "EDIT_NOTE",
                editedInputName: e.target.classList[1].replace('text__', ''),
                editedInputText: e.target.value,
                noteId: listItem.id
            }

            editNoteReducer(action)
        }) 
    })
}

export const deleteNoteItemHandler = (listItem) => {
    const deleteBtn = document.getElementById(`deleteBtn${listItem.id}`)

    deleteBtn.addEventListener("click", el => {
        console.log('fgf')
        const action = {
            type: 'DELETE_NOTE',
            noteId: listItem.id,
            noteCategory: listItem.category
        }
        editNoteReducer(action)
    })

}