import { removeListItems, getIconPath, removeStatisticsList, generateStatisticsListDOM } from './helpers.js';
import { addListeners  } from './listeners.js'
import { generateNoteItemDOM } from './helpers.js';
import { getArchivedFlag, getCategoriesList } from './store.js';

export const renderNoteList = (listData, noteIconPath)=>{
    let showArchivedFlag = getArchivedFlag()
    removeListItems()
  
  
    listData.forEach(listItem => {
      if(listItem.isArchived === false && showArchivedFlag === false) {
        generateNoteItemDOM(listItem, noteIconPath)
        addListeners(listItem)      
      } else if(showArchivedFlag === true) {
        generateNoteItemDOM(listItem, noteIconPath)
        addListeners(listItem)
      } else {
        return
      }
    });
  renderNoteStatistic(listData, noteIconPath)
}   




const renderNoteStatistic = (listData, noteIconPath) => {
    let categoriesList = getCategoriesList()
    removeStatisticsList()
    generateStatisticsListDOM(listData, categoriesList, noteIconPath)
}

 

