import produce from 'immer';
import { CUQA, customEndDate, customStartDate } from 'globalconstants';
import {
  SET_REPORT_DATA,
  SET_CI_INSIGHT_X_API_TOKEN,
  SET_CUSTOMER_ID,
  SET_USER_ID,
  SET_QUERY_STRING_PARAMS,
  SET_CI_DETAILS_TD,
  SET_CI_DETAILS_CLASSIFICATION_TD,
  SET_CI_PRIORITY_GD,
  SET_CI_STATUS_GD,
  SET_CI_CATEGORY_GD,
  SET_CI_SOURCE_GD,
  SET_CI_PRODUCT_BY_PRIORITY_GD,
  SET_CI_LOADER,
  SET_CHART_FILTER_DATA,
  SET_FILTER_FORM_DATA,
  SET_ENABLE_DT_RESET,
  SET_SCROLLTO_DT,
  SET_SUBHEADER_TEXT,
  SET_START_DATE,
  SET_END_DATE,
  SET_ORG_DATA_INSIGHTS,
  SET_THERAPEUTIC_AREA_INSIGHTS,
  SET_PROD_TYPE_INSIGHTS,
} from './constants';

export const initialState = {
  reportData: [],
  insightXApiToken: '',
  customerid: '',
  userid: '',
  ciQueryStringParams: {},
  data: [],
  ciDetailsTD: [],
  ciDetailsTDImmutableTD: [],
  ciDetailsClassificationTD: [],
  ciPriorityGD: [],
  ciStatusGD: [],
  ciCategoryGD: [],
  ciSourceGD: [],
  ciProductByPriorityGD: {},
  ciLoader: false,
  filterFormData: {
    selectedDateFilterType: CUQA,
    ciStartDate: customStartDate,
    ciEndDate: customEndDate,
  },
  enableDTReset: false,
  scrollToDT: false,
  tableSubHeader: '',
  startDate: customStartDate,
  endDate: customEndDate,
  orgDataInsights: [],
  productTypeInsights: {},
  taInsights: {},
};

const ciReducer = (state = initialState, action) =>
  produce(state, draft => {
    const draftState = draft;
    switch (action.type) {
      case SET_CI_INSIGHT_X_API_TOKEN: {
        draftState.insightXApiToken = '';
        draftState.insightXApiToken = action.insightXApiToken;
        break;
      }
      case SET_CUSTOMER_ID: {
        draftState.customerid = '';
        draftState.customerid = action.customerid;
        break;
      }
      case SET_USER_ID: {
        draftState.userid = '';
        draftState.userid = action.userid;
        break;
      }
      case SET_QUERY_STRING_PARAMS: {
        draftState.ciQueryStringParams = {};
        draftState.ciQueryStringParams = action.ciQueryStringParams;
        break;
      }
      case SET_REPORT_DATA: {
        draftState.reportData = action.data;
        break;
      }
      case SET_CI_DETAILS_TD: {
        draftState.ciDetailsTD = action.ciDetailsTD;
        draftState.ciDetailsTDImmutableTD = action.ciDetailsTD;
        break;
      }
      case SET_CI_DETAILS_CLASSIFICATION_TD: {
        draftState.ciDetailsClassificationTD = [];
        draftState.ciDetailsClassificationTD = action.ciDetailsClassificationTD;
        break;
      }
      case SET_CI_PRIORITY_GD: {
        draftState.ciPriorityGD = [];
        draftState.ciPriorityGD = action.ciPriorityGD;
        break;
      }
      case SET_CI_STATUS_GD: {
        draftState.ciStatusGD = [];
        draftState.ciStatusGD = action.ciStatusGD;
        break;
      }
      case SET_CI_CATEGORY_GD: {
        draftState.ciCategoryGD = [];
        draftState.ciCategoryGD = action.ciCategoryGD;
        break;
      }
      case SET_CI_SOURCE_GD: {
        draftState.ciSourceGD = [];
        draftState.ciSourceGD = action.ciSourceGD;
        break;
      }
      case SET_CI_PRODUCT_BY_PRIORITY_GD: {
        draftState.ciProductByPriorityGD = {};
        draftState.ciProductByPriorityGD = action.ciProductByPriorityGD;
        break;
      }
      case SET_CI_LOADER: {
        draftState.ciLoader = action.data;
        break;
      }
      case SET_CHART_FILTER_DATA: {
        draftState.ciDetailsTD = action.data;
        draftState.enableDTReset = true;
        break;
      }
      case SET_FILTER_FORM_DATA: {
        draftState.filterFormData = action.data;
        break;
      }
      case SET_ENABLE_DT_RESET: {
        draftState.enableDTReset = false;
        draftState.ciDetailsTD = draftState.ciDetailsTDImmutableTD;
        break;
      }
      case SET_SCROLLTO_DT: {
        draftState.scrollToDT = action.data;
        break;
      }
      case SET_SUBHEADER_TEXT: {
        draftState.tableSubHeader = action.data;
        break;
      }
      case SET_START_DATE: {
        draftState.startDate = action.startDate;
        break;
      }
      case SET_END_DATE: {
        draftState.endDate = action.endDate;
        break;
      }
      case SET_ORG_DATA_INSIGHTS: {
        draftState.orgDataInsights = action.orgDataInsights;
        break;
      }
      case SET_PROD_TYPE_INSIGHTS: {
        draftState.productTypeInsights = action.productTypeInsights;
        break;
      }
      case SET_THERAPEUTIC_AREA_INSIGHTS: {
        draftState.taInsights = action.taInsights;
        break;
      }
      default: {
        // do nothing{ donutData, barData }
      }
    }
  });

export default ciReducer;
