import { call, put, takeLatest, select } from 'redux-saga/effects';
import Lo from 'lodash';
import request from 'utils/request';
import { ERROR } from 'utils/constants';

import {
  setSnackbarVisibility,
  setSnackbarMessage,
} from 'containers/App/rootActions';
import moment from 'moment';
import {
  setEnableResetDT,
  saveReportData,
  saveCiDetailsTD,
  saveCiDetailsClassificationTD,
  saveCiPriorityGD,
  saveCiStatusGD,
  saveCiCategoryGD,
  saveCiSourceGD,
  setCiLoader,
  setStartDate,
  setEndDate,
  setSubheaderValue,
  setOrgDataInsights,
  setProductTypeInsights,
  setTAInsights,
  saveCiProductByPriorityGD,
} from 'containers/CInsights/actions';
import { PostReqConfig, CUSTOM } from 'globalconstants';
import { GET_REPORT_API_DATA, CIConfig } from './constants';

import {
  selectCIInsightXApiToken,
  selectCustomerId,
  selectUserId,
  selectedFilterFormData,
} from './selectors';
import {
  ExportStartEndDate,
  MapInsightDetailTD,
  MapPriorityGD,
  MapInsightStatusGD,
  MapInsightCategoryGD,
  MapInsightSourceGD,
  MapInsightProductTopicGD,
} from './mappers';

function* getReportDataAPI() {
  try {
    yield put(setCiLoader(true));
    const url = `api/data/GetQueriesResultsWithParams/`;
    const inxToken = yield select(selectCIInsightXApiToken());
    const customerid = yield select(selectCustomerId());
    const userid = yield select(selectUserId());
    const formData = yield select(selectedFilterFormData());
    const QueryConfig = Lo.clone(CIConfig);
    const { selectedDateFilterType, ciStartDate, ciEndDate } = formData;
    QueryConfig.queryParameters[2].parameterValue = customerid;
    QueryConfig.queryParameters[3].parameterValue = userid;

    if (selectedDateFilterType === CUSTOM) {
      QueryConfig.queryParameters[0].parameterValue = moment(
        ciStartDate,
      ).format('YYYY-MM-DD');
      QueryConfig.queryParameters[1].parameterValue = moment(ciEndDate).format(
        'YYYY-MM-DD',
      );
      yield put(setStartDate(ciStartDate));
      yield put(setEndDate(ciEndDate));
    } else {
      const { startDate, endDate } = ExportStartEndDate(selectedDateFilterType);
      QueryConfig.queryParameters[0].parameterValue = moment(startDate).format(
        'YYYY-MM-DD',
      );
      QueryConfig.queryParameters[1].parameterValue = moment(endDate).format(
        'YYYY-MM-DD',
      );
      yield put(setStartDate(startDate));
      yield put(setEndDate(endDate));
    }

    const options = PostReqConfig(QueryConfig);

    const response = yield call(request, url, options, inxToken);

    if (response.reportName) {
      yield put(saveReportData(response.results));
      const {
        ciDetails,
        ciDetailsClassification,
        ciPriorityCount,
        ciStatusCount,
        ciCategoryCount,
        ciSourceCount,
        ciProductTypeCountByPriority,
        ciDiseaseCountByPriority,
        productByPriority,
      } = response.results;
      const mappedCiDetailsTD = MapInsightDetailTD(
        ciDetails,
        ciDetailsClassification,
      );
      const mappedPriorityGD = MapPriorityGD(ciPriorityCount);
      const mappedStatusGD = MapInsightStatusGD(ciStatusCount);
      const mappedCategoryGD = MapInsightCategoryGD(ciCategoryCount);
      const mappedSourceGD = MapInsightSourceGD(ciSourceCount);
      const mappedProductTypeByPriorityGD = MapInsightProductTopicGD(
        ciProductTypeCountByPriority,
      );
      const mappedTAByPriorityGD = MapInsightProductTopicGD(
        ciDiseaseCountByPriority,
      );
      const mappedProductByPriorityGD = MapInsightProductTopicGD(
        productByPriority,
      );
      yield put(setOrgDataInsights(ciDetails));
      yield put(saveCiDetailsTD(mappedCiDetailsTD));
      yield put(saveCiDetailsClassificationTD(ciDetailsClassification));
      yield put(saveCiPriorityGD(mappedPriorityGD));
      yield put(saveCiStatusGD(mappedStatusGD));
      yield put(saveCiCategoryGD(mappedCategoryGD));
      yield put(saveCiSourceGD(mappedSourceGD));
      yield put(setProductTypeInsights(mappedProductTypeByPriorityGD));
      yield put(saveCiProductByPriorityGD(mappedProductByPriorityGD));

      yield put(setTAInsights(mappedTAByPriorityGD));
      yield put(setEnableResetDT());
      yield put(setSubheaderValue(''));
      yield put(setCiLoader(false));
    } else {
      yield put(
        setSnackbarMessage({
          status: ERROR,
          text: JSON.stringify(response),
        }),
      );
      yield put(setSnackbarVisibility(true));
    }
  } catch (error) {
    yield put(
      setSnackbarMessage({
        status: ERROR,
        text: error.message,
      }),
    );
    yield put(setSnackbarVisibility(true));
    yield put(setCiLoader(false));
  }
}

export default function* expenseSaga() {
  yield takeLatest(GET_REPORT_API_DATA, getReportDataAPI);
}
