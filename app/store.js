import { renderNotesList } from "./render.js";

let EDIT_NOTE = 'EDIT_NOTE'
let ARCHIVE_NOTE = 'ARCHIVE_NOTE'

export let store = {
    listData:  [
        {
            id: 3,
            name: 'Shopping list',
            createData: 'April 20, 2021',
            category: 'Task',
            type: 'task',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 4,
            name: 'Shopping list',
            createData: 'April 27, 2021',
            category: 'Task',
            type: 'task',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 5,
            name: 'The theory of evolution',
            createData: 'May 05, 2021',
            category: 'Random Thought',
            type: 'randomThought',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 6,
            name: 'New feature',
            createData: 'May 07, 2021',
            category: 'Idea',
            type: 'idea',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 7,
            name: 'William Gaddis',
            createData: 'May 15, 2021',
            category: 'Quote',
            type: 'quote',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 2,
            name: 'Books',
            createData: 'April 20, 2021',
            category: 'Task',
            type: 'task',
            content: 'Tomatoes, Bread',
            schedule: '',
            isArchived: false
        },
        {
            id: 1,
            name: 'Training',
            createData: 'April 20, 2021',
            category: 'Task',
            type: 'task',
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
        
        case ARCHIVE_NOTE: 
        let a = store.listData.map(el => {
            if(el.id == action.noteId) {
                console.log('ff')
                return ({...el,
                        isArchived: !el.isArchived})
            } else {
                return el
            }
        })
            store.listData = [...a, store.noteIconPath]
            console.log(store)
            renderNotesList(store)
        break
        
    }
}




