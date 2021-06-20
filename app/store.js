import { renderNoteList } from "./render.js";

const EDIT_NOTE = 'EDIT_NOTE'
const ARCHIVE_NOTE = 'ARCHIVE_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'


export let store = {
    categoriesList: ['Task', 'Quote', 'Idea', 'Random Thought'],
    listData:  [
        {
            id: 3,
            name: 'Shopping list',
            createData: 'April 20, 2021',
            category: 'Task',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 4,
            name: 'Shopping list',
            createData: 'April 27, 2021',
            category: 'Task',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 5,
            name: 'The theory of evolution',
            createData: 'May 05, 2021',
            category: 'Random Thought',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 6,
            name: 'New feature',
            createData: 'May 07, 2021',
            category: 'Idea',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 7,
            name: 'William Gaddis',
            createData: 'May 15, 2021',
            category: 'Quote',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 2,
            name: 'Books',
            createData: 'April 20, 2021',
            category: 'Task',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 1,
            name: 'Training',
            createData: 'April 20, 2021',
            category: 'Task',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        }
    ],

    noteIconPath: {
        task: 'images/task.png',
        randomThought: 'images/thought.png',
        idea: 'images/idea.png',
        quote: 'images/quote.png',
        archiveBtn: 'images/archiveBtn.svg',
        editBtn: 'images/edit.svg',
        deleteBtn: 'images/delete.svg'

    }
};

export const editNoteReducer = (action) => {
    
    switch (action.type) {
        case ARCHIVE_NOTE: {
            const notesList = store.listData.map(el => {

                if(el.id == action.noteId) {
                    return {...el, isArchived: !el.isArchived}
                } else {
                    return el
                }
            })
                store.listData = [...notesList, store.noteIconPath]
                renderNoteList(store)
            break;
        }   
        case EDIT_NOTE: {
            const notesList = store.listData.map(el => {
                
                if(el.id == action.noteId) {
                    let inputObjectKey = action.editedInputName
                    let inputEditedValue = {[inputObjectKey]: action.editedInputText}
                    return {...el, ...inputEditedValue}
                } else {
                    return el
                }  
            })
            store.listData = [...notesList]
            renderNoteList(store)
            break;
        }
        case DELETE_NOTE: {
            store.listData = store.listData.filter(el => el.id !== action.noteId)
            

            renderNoteList(store)
        }
    } 
}




