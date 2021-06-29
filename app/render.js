import { removeListItems, removeStatisticsList, generateStatisticsListDOM 
} from './helpers.js';
import { addListeners } from './listeners.js';
import { generateNoteItemDOM } from './helpers.js';
import { getArchivedFlag, getCategoriesList } from './store.js';

const renderNoteList = (listData) => {
  const showArchivedFlag = getArchivedFlag();
  removeListItems();
  listData.forEach((listItem) => {
    if (listItem.isArchived === false && showArchivedFlag === false) {
      generateNoteItemDOM(listItem);
      addListeners(listItem);
    } else if (showArchivedFlag === true) {
      generateNoteItemDOM(listItem);
      addListeners(listItem);
    }
    return listItem;
  });
  renderNoteStatistic(listData);
};

const renderNoteStatistic = (listData) => {
  const categoriesList = getCategoriesList();
  removeStatisticsList();
  generateStatisticsListDOM(listData, categoriesList);
};

export default renderNoteList;
