import {
  SET_CI_INSIGHT_X_API_TOKEN,
  SET_CUSTOMER_ID,
  SET_USER_ID,
  SET_QUERY_STRING_PARAMS,
  SET_FILTER_FORM_DATA,
  GET_REPORT_API_DATA,
  SET_REPORT_DATA,
  SET_CI_DETAILS_TD,
  SET_CI_DETAILS_CLASSIFICATION_TD,
  SET_CI_PRIORITY_GD,
  SET_CI_STATUS_GD,
  SET_CI_SOURCE_GD,
  SET_CI_CATEGORY_GD,
  SET_CI_PRODUCT_BY_PRIORITY_GD,
  SET_CI_LOADER,
  SET_CHART_FILTER_DATA,
  SET_ENABLE_DT_RESET,
  SET_SCROLLTO_DT,
  SET_SUBHEADER_TEXT,
  SET_START_DATE,
  SET_END_DATE,
  SET_ORG_DATA_INSIGHTS,
  SET_THERAPEUTIC_AREA_INSIGHTS,
  SET_PROD_TYPE_INSIGHTS,
} from './constants';

export const saveCIInsightXApiToken = insightXApiToken => ({
  type: SET_CI_INSIGHT_X_API_TOKEN,
  insightXApiToken,
});

export const saveCustomerIdFromQS = customerid => ({
  type: SET_CUSTOMER_ID,
  customerid,
});

export const saveUserIdFromQS = userid => ({
  type: SET_USER_ID,
  userid,
});

export const saveQueryStringParams = ciQueryStringParams => ({
  type: SET_QUERY_STRING_PARAMS,
  ciQueryStringParams,
});

export const getReportDataApi = () => ({
  type: GET_REPORT_API_DATA,
});

export const saveReportData = reportData => ({
  type: SET_REPORT_DATA,
  reportData,
});

export const setFilterFormData = data => ({
  type: SET_FILTER_FORM_DATA,
  data,
});

export const saveCiDetailsTD = ciDetailsTD => ({
  type: SET_CI_DETAILS_TD,
  ciDetailsTD,
});

export const saveCiDetailsClassificationTD = ciDetailsClassification => ({
  type: SET_CI_DETAILS_CLASSIFICATION_TD,
  ciDetailsClassification,
});

export const saveCiPriorityGD = ciPriorityGD => ({
  type: SET_CI_PRIORITY_GD,
  ciPriorityGD,
});

export const saveCiStatusGD = ciStatusGD => ({
  type: SET_CI_STATUS_GD,
  ciStatusGD,
});

export const saveCiCategoryGD = ciCategoryGD => ({
  type: SET_CI_CATEGORY_GD,
  ciCategoryGD,
});

export const saveCiSourceGD = ciSourceGD => ({
  type: SET_CI_SOURCE_GD,
  ciSourceGD,
});

export const saveCiProductByPriorityGD = ciProductByPriorityGD => ({
  type: SET_CI_PRODUCT_BY_PRIORITY_GD,
  ciProductByPriorityGD,
});

export const setCiLoader = data => ({
  type: SET_CI_LOADER,
  data,
});

export const setChartFilteredData = data => ({
  type: SET_CHART_FILTER_DATA,
  data,
});

export const setEnableResetDT = () => ({
  type: SET_ENABLE_DT_RESET,
});

export const setScrollToDataTable = data => ({
  type: SET_SCROLLTO_DT,
  data,
});

export const setSubheaderValue = data => ({
  type: SET_SUBHEADER_TEXT,
  data,
});

export const setStartDate = startDate => ({
  type: SET_START_DATE,
  startDate,
});

export const setEndDate = startDate => ({
  type: SET_END_DATE,
  startDate,
});

export const setOrgDataInsights = orgDataInsights => ({
  type: SET_ORG_DATA_INSIGHTS,
  orgDataInsights,
});

export const setProductTypeInsights = productTypeInsights => ({
  type: SET_PROD_TYPE_INSIGHTS,
  productTypeInsights,
});

export const setTAInsights = taInsights => ({
  type: SET_THERAPEUTIC_AREA_INSIGHTS,
  taInsights,
});
