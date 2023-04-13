import {
  DECREASE_AUTHOR,
  DESCRIPTION_CHANGE,
  DURATION_CHANGE,
  INCREASE_AUTHOR,
  NAME_CHANGE,
  TITLE_CHANGE,
} from './actionCreateCourseTypes';

export const nameChangeAction = (payload) => ({
  type: NAME_CHANGE,
  payload,
});

export const increaseAuthorAction = (payload) => ({
  type: INCREASE_AUTHOR,
  payload,
});

export const decreaseAuthorAction = (payload) => ({
  type: DECREASE_AUTHOR,
  payload,
});

export const titleChangeAction = (payload) => ({
  type: TITLE_CHANGE,
  payload,
});

export const descriptionChangeAction = (payload) => ({
  type: DESCRIPTION_CHANGE,
  payload,
});

export const durationChangeAction = (payload) => ({
  type: DURATION_CHANGE,
  payload,
});
