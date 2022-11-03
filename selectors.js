import { createSelector } from 'reselect';
import { initialState } from './reducer';

const ciReducers = state => state.CIReducer || initialState;

const selectCIReportData = () =>
  createSelector(
    ciReducers,
    dataState => dataState.reportData,
  );

const selectCIInsightXApiToken = () =>
  createSelector(
    ciReducers,
    dataState => dataState.insightXApiToken,
  );

const selectCustomerId = () =>
  createSelector(
    ciReducers,
    dataState => dataState.customerid,
  );

const selectUserId = () =>
  createSelector(
    ciReducers,
    dataState => dataState.userid,
  );

const selectCiDetailsTD = () =>
  createSelector(
    ciReducers,
    dataState => dataState.ciDetailsTD,
  );

const selectCiDetailsClassificationTD = () =>
  createSelector(
    ciReducers,
    dataState => dataState.ciDetailsClassificationTD,
  );

const selectCiPriorityGD = () =>
  createSelector(
    ciReducers,
    dataState => dataState.ciPriorityGD,
  );

const selectCiStatusGD = () =>
  createSelector(
    ciReducers,
    dataState => dataState.ciStatusGD,
  );

const selectCiCategoryGD = () =>
  createSelector(
    ciReducers,
    dataState => dataState.ciCategoryGD,
  );

const selectCiSourceGD = () =>
  createSelector(
    ciReducers,
    dataState => dataState.ciSourceGD,
  );

const selectCiProductByPriorityGD = () =>
  createSelector(
    ciReducers,
    dataState => dataState.ciProductByPriorityGD,
  );

const selectCiLoader = () =>
  createSelector(
    ciReducers,
    dataState => dataState.ciLoader,
  );

const selectedFilterFormData = () =>
  createSelector(
    ciReducers,
    dataState => dataState.filterFormData,
  );

const selectCIImmutableData = () =>
  createSelector(
    ciReducers,
    dataState => dataState.ciDetailsTDImmutableTD,
  );

const selectEnableDTReset = () =>
  createSelector(
    ciReducers,
    dataState => dataState.enableDTReset,
  );

const selectScrollToDT = () =>
  createSelector(
    ciReducers,
    dataState => dataState.scrollToDT,
  );

const selectDTSubheadertext = () =>
  createSelector(
    ciReducers,
    dataState => dataState.tableSubHeader,
  );

const selectStartDate = () =>
  createSelector(
    ciReducers,
    dataState => dataState.startDate,
  );

const selectEndDate = () =>
  createSelector(
    ciReducers,
    dataState => dataState.endDate,
  );

const selectedOrgDataInsights = () =>
  createSelector(
    ciReducers,
    dataState => dataState.orgDataInsights,
  );

const selectedProductTypeInsights = () =>
  createSelector(
    ciReducers,
    dataState => dataState.productTypeInsights,
  );

const selectedTAInsights = () =>
  createSelector(
    ciReducers,
    dataState => dataState.taInsights,
  );

export {
  selectCiLoader,
  selectCIReportData,
  selectCIInsightXApiToken,
  selectCustomerId,
  selectUserId,
  selectCiDetailsTD,
  selectCiDetailsClassificationTD,
  selectCiPriorityGD,
  selectCiStatusGD,
  selectCiCategoryGD,
  selectCiSourceGD,
  selectCiProductByPriorityGD,
  selectedFilterFormData,
  selectCIImmutableData,
  selectEnableDTReset,
  selectScrollToDT,
  selectDTSubheadertext,
  selectStartDate,
  selectEndDate,
  selectedOrgDataInsights,
  selectedProductTypeInsights,
  selectedTAInsights,
};
