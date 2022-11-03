import moment from 'moment';
import Lo from 'lodash';
import { colors } from '@material-ui/core';
import { GetCurrentQuarter, GetPreviousQuarter, GetYearToDate } from 'helper';
import { YTD, RO3M, CUQA, PRQA, RO12M } from 'globalconstants';
import parse from 'html-react-parser';
import { CIPriorityColorCode, CIStatusColorCode, UNDEFINED } from './constants';

export const ExportStartEndDate = filterType => {
  const { cqStartDate, cqEndDate } = GetCurrentQuarter();
  const { pqStartDate, pqEndDate } = GetPreviousQuarter();
  const { ytdStartDate, ytdEndDate } = GetYearToDate();
  switch (filterType) {
    case YTD:
      return {
        startDate: ytdStartDate,
        endDate: ytdEndDate,
      };
    case RO3M:
      return {
        startDate: new Date(moment().subtract(90, 'days')),
        endDate: new Date(moment()),
      };
    case CUQA:
      return {
        startDate: cqStartDate,
        endDate: cqEndDate,
      };
    case PRQA:
      return {
        startDate: pqStartDate,
        endDate: pqEndDate,
      };
    case RO12M:
      return {
        startDate: new Date(moment().subtract(365, 'days')),
        endDate: new Date(moment()),
      };
    default:
      return {
        startDate: new Date(moment().subtract(90, 'days')),
        endDate: new Date(moment()),
      };
  }
};

export const MapPriorityGD = priorityData => {
  const mappedPriorityGD = Lo.map(priorityData, p => ({
    color: CIPriorityColorCode[p.Priority] || colors.grey[500],
    label: p.PriorityDescription || UNDEFINED,
    value: p.PriorityCount,
  }));
  return mappedPriorityGD;
};

export const MapInsightStatusGD = statusData => {
  const mappedStatusGD = Lo.map(statusData, s => ({
    color: CIStatusColorCode[s.Status] || colors.grey[500],
    label: s.StatusDescription || UNDEFINED,
    value: s.StatusCount,
  }));
  return mappedStatusGD;
};

export const MapInsightCategoryGD = categoryData => {
  const mappedCategoryGD = Lo.map(categoryData, c => ({
    color: colors.cyan[500],
    label: c.CategoryDescription || UNDEFINED,
    value: c.CategoryCount,
  }));
  return mappedCategoryGD;
};

export const MapInsightSourceGD = sourceData => {
  const mappedSourceGD = Lo.map(sourceData, s => ({
    label: s.SourceDescription || UNDEFINED,
    value: s.SourceCount,
  }));
  return mappedSourceGD;
};

export const MapInsightProductTopicGD = productTopicData => {
  if (!Lo.isEmpty(productTopicData)) {
    const mappedProductTopicData = {};
    let mappedData = Lo.map(productTopicData, d => ({
      Type: d.Type || UNDEFINED,
      ProductCount: d.ProductCount,
      TypeDescription: d.TypeDescription || UNDEFINED,
      Priority: d.Priority || UNDEFINED,
      PriorityDescription: d.PriorityDescription || UNDEFINED,
    }));
    mappedData = mappedData.sort(
      (a, b) =>
        (b.TypeDescription !== UNDEFINED) -
        (a.TypeDescription !== UNDEFINED ||
          a.TypeDescription - b.TypeDescription),
    );

    const products = mappedData
      .map(item => item.TypeDescription)
      .filter((item, index, array) => array.indexOf(item) === index);

    const productTotals = mappedData.reduce((obj, curr) => {
      if (!obj[curr.PriorityDescription]) {
        const object = obj;
        object[curr.PriorityDescription] = [];
      }
      const object = obj;
      object[curr.PriorityDescription][
        products.indexOf(curr.TypeDescription)
        // eslint-disable-next-line radix
      ] = parseInt(curr.ProductCount);
      return obj;
    }, {});

    const series = Object.entries(productTotals).map(([name, prodArr]) => ({
      name,
      data: products.map((product, productIndex) => {
        if (!prodArr[productIndex]) {
          return 0;
        }
        return prodArr[productIndex];
      }),
    }));

    mappedProductTopicData.products = products;
    mappedProductTopicData.labels = products;
    mappedProductTopicData.series = series;

    return mappedProductTopicData;
  }
  return {};
};

export const MapInsightDetailTD = (detailsData, detailsClassification) => {
  if (!Lo.isEmpty(detailsData)) {
    const InsightDetailsDataTable = Lo.map(detailsData, d => ({
      ExternalId: d.ExternalId1 || '-',
      CreatedByName: d.CreatedByName || '-',
      CreatedDate: !Lo.isEmpty(d.CreatedDate)
        ? moment(d.CreatedDate).format('L')
        : "'",
      Source: d.SourceDescription || '-',
      Product: d.ProductDescription || '-',
      Topic: d.TopicDescription || '-',
      SubTopic: d.SubTopicDescription || '-',
      Status: d.StatusDescription,
      StatusColor: d.StatusDescription,
      StatusCode: d.Status,
      Title: d.Title,
      Category: d.CategoryDescription || '-',
      Priority: d.PriorityDescription || '-',
      PriorityCode: d.Priority,
      Tags: detailsClassification || ['test', 'data'],
      Description: !Lo.isEmpty(d.Description) ? parse(d.Description) : '',
      Relevance: d.RelevanceDescription || '-',
      ProductType: d.ProductTypeDescription || '-',
      KeyTakeaway: !Lo.isEmpty(d.KeyTakeaway) ? parse(d.KeyTakeaway) : '',
      Implications: !Lo.isEmpty(d.Implications) ? parse(d.Implications) : '',
      RecommendedAction: !Lo.isEmpty(d.RecommendedAction)
        ? parse(d.RecommendedAction)
        : '',
      Conexion: d.Name || '-',
      Quality: d.QualityDescription || '-',
      Disease: d.DiseaseDescripition || '-',
      Type: !Lo.isEmpty(d.TypeDescription) ? d.TypeDescription : d.Type,
      InsightId: d.InsightId,
    }));

    return InsightDetailsDataTable;
  }
  return [];
};

export const setStackedGraphHeight = data => {
  let chartHeight = 300;
  let modalChartHeight = 500;

  if (data && data.length > 0 && data.length > 10) {
    chartHeight = data.length * 35;
    modalChartHeight = data.length * 95;
  } else if (data && data.length > 0 && data.length === 1) {
    chartHeight = data.length * 120;
    modalChartHeight = data.length * 120;
  } else if (data && data.length > 1 && data.length < 5) {
    chartHeight = data.length * 60;
    modalChartHeight = data.length * 70;
  } else if (data && data.length > 5 && data.length < 10) {
    chartHeight = data.length * 30;
    modalChartHeight = data.length * 30;
  }
  return { chartHeight, modalChartHeight };
};
