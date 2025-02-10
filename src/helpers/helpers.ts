import { EndPointSpecialListsForFilms } from '../types';

export const getWordForToastAboutSpecialFilm = (
  endPointNameList: EndPointSpecialListsForFilms,
) => {
  switch (endPointNameList) {
    case EndPointSpecialListsForFilms.Favorite:
      return 'избранных';

    case EndPointSpecialListsForFilms.WantToWatched:
      return 'желанных';

    case EndPointSpecialListsForFilms.Watched:
      return 'просмотренных';

    default:
      break;
  }
};

export const getWidthScrollPage = () => {
  const div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  
  div.remove();

  return scrollWidth
};

export const getFormatDuration = (duration: number): string => {
  const minutesInHour = 60;
  const hours = Math.floor(duration / minutesInHour);
  const minutes = duration % minutesInHour;

  if (minutes == 0) {
    return `${hours} ч`
  } else if(hours == 0) {
    return `${minutes} мин`
  }

  return `${hours} ч ${minutes} мин`
}