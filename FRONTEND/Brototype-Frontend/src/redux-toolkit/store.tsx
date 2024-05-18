import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'; // Add this line
import otpReducer from './otpReducer';
import studentReducer from './studentReducer';
import reviewerReducer from './reviewerReducer';
import superleadReducer from './superleadReducer';
import chatOppositPersonDataReducer from './chatOppositPersonDataReducer';
import company from "./companySlice";
import course from "./courseSlice";
import branch from "./branchSlice";
import content from "./contentSlice";
import control from "./controlSlice";
import advisorStudentReducer from './studentSlice'
import advisorReviewerReducer from "./reviewerSlice";
import coordinatorReducer from "./coordinatorSlice";
import enquiryReducer from "./enquirySlice";
import batchSliceReducer from "./batchSlice";
import invigilatorReducer from "./invigilatorSlice";
import advisorReducer from './advisorReducer';
import reviewSlice from './reviewSlice';
import studentSlice from './studentSlice';
import reviewerSlice from './reviewerSlice';
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    otp: otpReducer,
    student: studentReducer,
    reviewer: reviewerReducer,
    superlead: superleadReducer,
    advisor: advisorReducer,
    chat: chatOppositPersonDataReducer,
    companyReducer: company,
    courseReducer: course,
    branchReducer: branch,
    contentReducer: content,
    navigation: control,
    adviosrReviewer:advisorReviewerReducer,
    advisorStudent:advisorStudentReducer,
    coordinator:coordinatorReducer,
    enquiries:enquiryReducer,
    batch:batchSliceReducer,
    invigilator:invigilatorReducer,
    review:reviewSlice,
    students:studentSlice,
    reviewers:reviewerSlice
  })
);
export type RootState = ReturnType<typeof persistedReducer>;
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };