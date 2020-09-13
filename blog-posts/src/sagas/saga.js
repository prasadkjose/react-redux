import { put, takeEvery, call } from "redux-saga/effects";
import * as postActions from "../actions/postsActions";
import {
  GET_POSTS_ASYNC,
  GET_POSTS_FAILURE_ASYNC,
  GET_POSTS_SUCCESS_ASYNC,
} from "../reducers/postsReducer";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getPostsSaga = () => ({
  type: GET_POSTS_ASYNC,
});

export const getPostsSuccessSaga = (posts) => ({
  type: GET_POSTS_SUCCESS_ASYNC,
  payload: posts,
});

export const getPostsFailureSaga = () => ({
  type: GET_POSTS_FAILURE_ASYNC,
});

//Saga worker
export function* fetchPostsWorker() {
  try {
    let data = {};
    let response = {};
    yield put(getPostsSaga());
    response = yield fetch("https://jsonplaceholder.typicode.com/posts");
    data = yield response.json();
    yield put(getPostsSuccessSaga(data));
  } catch (error) {
    yield put(getPostsFailureSaga());
  }
}

export function* fetchPostsWatcher() {
  yield takeEvery(postActions.GET_POSTS, fetchPostsWorker);
}
