import { put, takeEvery, call } from "redux-saga/effects";
import * as postActions from "../actions/postsActions";
import {
  GET_POSTS_ASYNC,
  GET_POSTS_FAILURE_ASYNC,
  GET_POSTS_SUCCESS_ASYNC,
} from "../reducers/postsReducer";
import API from "../API/fetchApi";

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

function* api() {
  try {
    let data = {};
    let response = {};
    yield put(getPostsSaga());
    // response = yield fetch("https://jsonplaceholder.typicode.com/posts");
    // data = yield response.json();

    data = yield API.get("/");

    yield put(getPostsSuccessSaga(data.data));
  } catch (error) {
    yield put(getPostsFailureSaga());
  }
}

//Saga worker
export function* fetchPostsWorker() {
  yield call(api);
}

export function* fetchPostsWatcher() {
  yield takeEvery(postActions.GET_POSTS, fetchPostsWorker);
}
