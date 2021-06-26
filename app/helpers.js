import { getListLength } from './store.js';

export const getArchiveBtnDOM = (listItem) => {
    if(listItem.isArchived) {
        return document.getElementById(`unArchiveBtn${listItem.id}`)
    } else {
        return document.getElementById(`archiveBtn${listItem.id}`)
    }
};

export const removeListItems = () => {
    let listBlock = document.getElementById('listContentBlock')

    while(listBlock.firstChild) {
        listBlock.removeChild(listBlock.firstChild)
    }
};

export const getIconPath = (iconPaths, searchedIconType = 'Random Thought')=>{
    let iconPathStr = '';

    for(let key in iconPaths) {
        
        // delete spaces in category if exist to regExp work fine
        for(let i = 0; i < searchedIconType.length; i++) {

            if (searchedIconType[i] == ' ') {
                searchedIconType =  searchedIconType.replace(' ', '')
            }
        }
        
        // find coincidence of category and pathName
        let regExp = new RegExp(`${searchedIconType}`,'gi')
        let result = key.match(regExp)
        if(result && result.length !== 0 && result.length !== null) {
            iconPathStr = iconPaths[key]
        }
        
    }
    return iconPathStr
}  

export const setDisabledValue = (bool, inputs) => {
    for(let el of inputs) {
        el.disabled = bool;
    }
}

export const getEditableInputsList = (listId) => {
    const noteItem = document.getElementById(`editBtn${listId}`).closest('.notes__item')
    return Array.from(noteItem.getElementsByClassName('note__text'))
}

export const addNewNote = () => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let listsBlockLength = getListLength()
    let date = new Date()
    let dateStr = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

    let newNote = {
        id: listsBlockLength + 1,
        name: '',
        createData: `${dateStr}`,
        category: 'Random Thought',
        content: '',
        schedule: '',
        isArchived: false
    }

    return newNote
}

export const generateNoteItemDOM = (listItem, noteIconPath) => {
   
    let listBlock = document.getElementById('listContentBlock')
    // Get the right path of icon for this note
    let iconPath = getIconPath(noteIconPath, listItem.category)

    let noteItem = document.createElement('div');

    if(listItem.isArchived) {
        noteItem.classList.add('notes__item', 'archived')
    } else {
        noteItem.classList.add('notes__item')
    }

    noteItem.innerHTML = `<div class="note__name">
                            <img class="note__icon" src="${iconPath ? iconPath : 'images/thought.png'}" alt="${listItem.category ? listItem.category : 'Any'}">
                            <input class="note__text text__name" type="text" value="${listItem.name}">
                                      
                          </div>
                          <input class="note__text text__createdDate" type="text" value="${listItem.createData ? listItem.createData : ''}">
                          <input class="note__text text__category" type="text" value="${listItem.category ? listItem.category : ''}">
                          <input class="note__text text__content" type="text" value="${listItem.content ? listItem.content : ''}">
                          <input class="note__text text__schedule" type="date" value="${listItem.schedule ? listItem.schedule : ''}">
                          <div class="note__controls controls">

                            <div class="controls__item">
                                <svg 
                                    id="editBtn${listItem.id}"version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 383.947 383.947" style="enable-background:new 0 0 383.947 383.947;" xml:space="preserve">
                                    <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893"/>
                                    <path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04
                                            C386.027,77.92,386.027,64.373,377.707,56.053z"/>
                                </svg>
                            </div>
                            <div class="controls__item">
                                ${listItem.isArchived ? `<img id="unArchiveBtn${listItem.id}" src="images/unarchive.png"> `: `<svg class="controls__archiveBtn"
                                                                id="archiveBtn${listItem.id}"xmlns="http://www.w3.org/2000/svg" width="30" height="30" 
                                                                viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/>
                                                                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.81.97H5.44l.8-.97zM5 19V8h14v11H5zm8.45-9h-2.9v3H8l4 4 4-4h-2.55z"/>
                                                            </svg>`
}                           </div>
                            <div class="controls__item"> 
                                <svg 
                                    id="deleteBtn${listItem.id}" height="30" viewBox="-40 0 427 427.00131" width="30" 
                                    xmlns="http://www.w3.org/2000/svg"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
                                    <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
                                </svg>
                            </div>
                          </div>`;
    listBlock.appendChild(noteItem);

    const noteTextAreas = Array.from(document.getElementsByClassName("note__text"))
    noteTextAreas.forEach(el => el.disabled = true)       
}

export const removeStatisticsList = () => {
    let statisticBlock = document.querySelector('#statisticList');
    while(statisticBlock.firstChild) {
        statisticBlock.removeChild(statisticBlock.firstChild)
    }
}

export const generateStatisticsListDOM = (listData, categoriesList, noteIconPath) => {
    let statisticBlock = document.querySelector('#statisticList');
    let statisticIconPath = '';
    let archivedNoteCount = 0;
    let activeNoteCount = 0;
    let currentIterateCategory = '';

    categoriesList.forEach(category => {

        listData.forEach((listEl) => {

            if(listEl.category == category ) {
                currentIterateCategory = listEl.category
                statisticIconPath = getIconPath(noteIconPath, category)

                if(listEl.isArchived == true) {
                    archivedNoteCount = archivedNoteCount + 1
                } else {
                    activeNoteCount = activeNoteCount + 1
                }
            }
        })

        if(archivedNoteCount !== 0 || activeNoteCount !== 0) {
            let categoryStatItem = document.createElement('div')
            categoryStatItem.classList.add('statistics__list--item')
            categoryStatItem.innerHTML = `<div class="statistics__list--name">
                                            <img class="statisticsIcon" src="${statisticIconPath}">
                                            <p>${currentIterateCategory}</p>
                                         </div>
                                         <p>${activeNoteCount}</p>
                                         <p>${archivedNoteCount}</p>`

            statisticBlock.appendChild(categoryStatItem)
        }
        archivedNoteCount = 0;
        activeNoteCount = 0;
    })
}