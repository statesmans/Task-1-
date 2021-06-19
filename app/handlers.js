import { editNoteReducer } from './store.js';

export const toggleInputDisableHandler = () => {
    let noteTextAreas = Array.from(document.getElementsByClassName("note__text"))
    noteTextAreas.forEach(el => {
        el.addEventListener('click', () => {
            if(el.disabled) {
                el.removeAttribute('disabled')
            } else {
                el.disabled = true
            }
        })
    })
}

export const archiveHandler = (listItem) => {
    const archiveBtn = document.getElementById(`archiveBtn${listItem.id}`)

    archiveBtn.addEventListener("click", () => {
        let action = {
            type: 'ARCHIVE_NOTE',
            noteId: listItem.id
        }
        editNoteReducer(action)
    })
}