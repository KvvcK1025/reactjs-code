import { colors } from '@material-ui/core';

export const SET_REPORT_DATA = `@CiReport/SET_REPORT_DATA`;
export const SET_CI_INSIGHT_X_API_TOKEN = `@CiReport/SET_CI_INSIGHT_X_API_TOKEN`;
export const SET_CUSTOMER_ID = `@CiReport/SET_CUSTOMER_ID`;
export const SET_USER_ID = `@CiReport/SET_USER_ID`;
export const SET_QUERY_STRING_PARAMS = `@CiReport/SET_QUERY_STRING_PARAMS`;
export const GET_REPORT_API_DATA = `@CiReport/GET_REPORT_API_DATA`;
export const SET_REPORT_API_DATA = `@CiReport/SET_REPORT_API_DATA`;
export const SET_CI_DETAILS_TD = `@CiReport/SET_CI_DETAILS_TD`;
export const SET_CI_DETAILS_CLASSIFICATION_TD = `@CiReport/SET_CI_DETAILS_CLASSIFICATION_TD`;
export const SET_CI_PRIORITY_GD = `@CiReport/SET_CI_PRIORITY_GD`;
export const SET_CI_STATUS_GD = `@CiReport/SET_CI_STATUS_GD`;
export const SET_CI_CATEGORY_GD = `@CiReport/SET_CI_CATEGORY_GD`;
export const SET_CI_SOURCE_GD = `@CiReport/SET_CI_SOURCE_GD`;
export const SET_CI_PRODUCT_GD = `@CiReport/SET_CI_PRODUCT_GD`;
export const SET_CI_TOPIC_GD = `@CiReport/SET_CI_TOPIC_GD`;
export const SET_CI_PRODUCT_BY_PRIORITY_GD = `@CiReport/SET_CI_PRODUCT_BY_PRIORITY_GD`;
export const SET_CI_LOADER = `@CiReport/SET_CI_LOADER`;
export const SET_FILTER_FORM_DATA = `@CiReport/SET_FILTER_FORM_DATA`;
export const SET_CI_DD_DATA = `@CiReport/SET_CI_DD_DATA`;
export const SET_CI_CHART_DATA = `@CiReport/SET_CI_CHART_DATA`;
export const SET_CHART_FILTER_DATA = `@CiReport/SET_CHART_FILTER_DATA`;
export const SET_ENABLE_DT_RESET = `@CiReport/SET_ENABLE_DT_RESET`;
export const SET_SCROLLTO_DT = `@CiReport/SET_SCROLLTO_DT`;
export const SET_SUBHEADER_TEXT = `@CiReport/SET_SUBHEADER_TEXT`;
export const SET_START_DATE = `@CiReport/SET_START_DATE`;
export const SET_END_DATE = `@CiReport/SET_END_DATE`;
export const SET_ORG_DATA_INSIGHTS = `@CiReport/SET_ORG_DATA_INSIGHTS`;
export const SET_PROD_TYPE_INSIGHTS = `@CiReport/SET_PROD_TYPE_INSIGHTS`;
export const SET_THERAPEUTIC_AREA_INSIGHTS = `@CiReport/SET_THERAPEUTIC_AREA_INSIGHTS`;

export const UNDEFINED = 'Undefined';
export const NO_RECORDS = 'No records found for the selected filter!';

export const MenuColors = new Map();
MenuColors.set('SELECTED', colors.indigo[900]);
MenuColors.set('UNSELECTED', colors.grey[600]);

export const ALL = 'All';

export const PieColorConst = new Map();
PieColorConst.set('GREEN', '#66DA26');
PieColorConst.set('BLUE', '#2E93fA');
PieColorConst.set('BLUEGREY', '#546E7A');
PieColorConst.set('ORANGE', '#FF9800');
PieColorConst.set('RED', '#FF9800');
PieColorConst.set('INDIGO', '#3949AB');
PieColorConst.set('PINK', '#D81B60');
PieColorConst.set('LIME', '#CDDC39');
PieColorConst.set('YELLOW', '#FDD835');
PieColorConst.set('TEAL', '#009688');
PieColorConst.set('PURPLE', '#9C27B0');
PieColorConst.set('LIGHTGREY', '#757575');
PieColorConst.set('LIGHTBLUEGREY', '#90A4AE');
PieColorConst.set('LIGHTGREEN', '#81C784');
PieColorConst.set('LIGHTBLUE', '#29B6F6');
PieColorConst.set('BROWN', '#8D6E63');

export const PieChartColorArray1 = [
  PieColorConst.get('GREEN'),
  PieColorConst.get('BLUE'),
  PieColorConst.get('INDIGO'),
  PieColorConst.get('PINK'),
  PieColorConst.get('ORANGE'),
  PieColorConst.get('BLUEGREY'),
  PieColorConst.get('LIME'),
  PieColorConst.get('YELLOW'),
  PieColorConst.get('TEAL'),
  PieColorConst.get('PURPLE'),
  PieColorConst.get('LIGHTGREY'),
  PieColorConst.get('LIGHTBLUEGREY'),
  PieColorConst.get('LIGHTGREEN'),
  PieColorConst.get('LIGHTBLUE'),
  PieColorConst.get('BROWN'),
];

export const chartTitles = {
  priority: 'Priority',
  insightsStatus: 'Insights Status',
  insightsByCategory: 'Insights by Category',
  insightsBySource: 'Insights by Source',
  insightsByProduct: 'Insights by Product',
  productTypeByPriority: 'Product Type by Priority',
  productByPriority: 'MT Therapies by Priority',
  taByPriority: 'Therapeutic Area by Priority',
};

export const customChartTitles = {
  priority: 'Priority',
  insightsStatus: 'Sentiment',
  insightsByCategory: 'Insights by Scientific Imperative',
  insightsBySource: 'Insights by Source',
  insightsByProduct: 'Insights by Listening Priority',
  productTypeByPriority: 'Product Type by Priority',
  productByPriority: 'MT Therapies by Priority',
  taByPriority: 'Therapeutic Area by Priority',
};

export const CIPriorityColorCode = {
  CRIT: colors.red[500],
  HIGH: colors.red[300],
  MEDM: colors.amber[300],
  LOW: colors.green[300],
  MODE: colors.blue[300],
};

export const CIStatusColorCode = {
  INPR: colors.lightBlue[300],
  SBMT: colors.green[300],
};

const reportName = 'BoastCIDashboard';

export const CIConfig = {
  reportName,
  queries: [
    'allUsers',
    'data',
    'ciDetails',
    'ciDetailsClassification',
    'ciPriorityCount',
    'ciStatusCount',
    'ciCategoryCount',
    'ciSourceCount',
    'ciProductCount',
    'ciTopicCount',
    'ciProductTypeCountByPriority',
    'ciDiseaseCountByPriority',
    'productByPriority',
  ],
  queryParameters: [
    {
      parameterName: '@date1',
      parameterValue: '',
      parameterValues: null,
      type: 3,
    },
    {
      parameterName: '@date2',
      parameterValue: '',
      parameterValues: null,
      type: 3,
    },
    {
      parameterName: '@customerId',
      parameterValue: '',
      type: 1,
    },
    {
      parameterName: '@userId',
      parameterValue: '',
      type: 1,
    },
  ],
};
export const BarChartColors = [
  '#F76BAF',
  '#FF947B',
  '#5580DF',
  colors.yellow[500],
  '#BA68C8',
  '#00F4F3',
  '#C1FCF4',
  '#64A878',
  colors.teal.A400,
  // '#8F7298',
  '#BA7B99',
  colors.yellow[500],
  '#BA68C8',
  '#00B48A',
  '#00F4F3',
  '#64A878',
  '#FF9A89',
];

export const StackedChartColorArray = [
  '#FF738F',
  '#0099C9',
  '#9EE786',
  '#178879',
  colors.orange[300],
  '#e48daa',
];

export const ColorArray = [
  '#FF8BA5',
  '#29b6f6',
  '#00E0DA',
  '#AAF78B',
  '#F9F871',
  '#D17EAD',
  '#00CDF3',
  '#4FEEB4',
];
