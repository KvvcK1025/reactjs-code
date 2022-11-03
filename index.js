import React, { useEffect, useState, memo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as QueryString from 'query-string';
import ScrollToTop from 'react-scroll-up';
import Fab from '@material-ui/core/Fab';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { scroller } from 'react-scroll';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Loader from 'components/Loader';
import Snackbar from 'components/Snackbar';
import {
  selectSnackbarVisiblility,
  selectSnackbarMessage,
} from 'containers/App/rootSelectors';
import Lo from 'lodash';
import {
  selectCiLoader,
  selectCiPriorityGD,
  selectCiStatusGD,
  selectedOrgDataInsights,
  selectScrollToDT,
} from './selectors';
import {
  saveCIInsightXApiToken,
  saveCustomerIdFromQS,
  saveUserIdFromQS,
  saveQueryStringParams,
  getReportDataApi,
  setScrollToDataTable,
} from './actions';
import Filter from './Components/Filter';

import reducer from './reducer';
import saga from './saga';
import { setSnackbarVisibility } from '../App/rootActions';
import Priority from './Components/Charts/Priority';
import InsightsDetails from './Components/InsightsDetails';
import InsightsByCategory from './Components/Charts/InsightsByCategory';
import InsightsBySource from './Components/Charts/InsightsBySource';
import InsightsDataTable from './Components/InsightsDataTable';
import { MapInsightDetailTD } from './mappers';
import TaByPriority from './Components/Charts/TaByPriority';
import ProductTypeByPriority from './Components/Charts/ProductTypeByPriority';
import ProductByPriority from './Components/Charts/ProductByPriority';

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.primary.main,
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    maxHeight: '48px',
  },
  filterColor: {
    color: 'white',
    justifyContent: 'flex-start',
  },
  cardHeader: {
    alignItems: 'right',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  title: {
    color: theme.palette.text.link,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  grid: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    borderRadius: theme.paper.radius,
    whiteSpace: 'nowrap',
  },
  card: {
    maxHeight: '100%',
    width: '100%',
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    borderRadius: theme.paper.radius,
    whiteSpace: 'nowrap',
  },
  avatar: {
    backgroundColor: '#34495E',
  },
  avatar1: {
    backgroundColor: '#E74C3C',
  },
  avatar2: {
    backgroundColor: '#F1C40F',
  },
  avatar3: {
    backgroundColor: '#6734DB',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  header: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
  },
}));

const key = 'CIReducer';

const CInsights = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [open, setOpen] = useState(false);
  const {
    sbMessage,
    isSBVisible,
    hideSnackbar,
    isLoading,
    location,
    setCiInxApiToken,
    setQueryStringParams,
    setCustomerId,
    setUserId,
    priorityChartData,
    fetchApiData,
    shouldScrolltoDT,
    setScrollToDT,
    insightsData,
  } = props;

  const parsed = QueryString.parse(location.search);
  const { inxtoken, customerid, userid } = parsed;

  useEffect(() => {
    setCiInxApiToken(inxtoken);
    setCustomerId(customerid);
    setUserId(userid);
    setQueryStringParams({ userid, customerid });
  }, [
    setQueryStringParams,
    setCiInxApiToken,
    inxtoken,
    setCustomerId,
    customerid,
    setUserId,
    userid,
  ]);

  useEffect(() => {
    setCustomerId(customerid);
    setUserId(userid);
  }, [setCustomerId, customerid, setUserId, userid]);

  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);

  const handleSnackbarClose = () => hideSnackbar(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClick = row => {
    setOpenDialog(true);
    const mapInsightsData = MapInsightDetailTD(insightsData);
    const fData = Lo.filter(mapInsightsData, { InsightId: row.InsightId });
    const type = [];
    Lo.map(fData, f => {
      if (!Lo.isEmpty(fData)) {
        if (type.length > 1) {
          type.push(
            !Lo.isEmpty(f.TypeDescription) ? f.TypeDescription : f.Type,
          );
        } else {
          type.push(
            !Lo.isEmpty(f.TypeDescription) ? f.TypeDescription : f.Type,
          );
        }
      }
    });
    setDialogData({ ...row, Type: type });
  };

  useEffect(() => {
    if (shouldScrolltoDT) {
      scroller.scrollTo('InsightsDataTable', {
        duration: 1000,
        delay: 500,
        smooth: 'easeInOutQuart',
      });
      setScrollToDT(false);
    }
  }, [shouldScrolltoDT, setScrollToDT]);

  return (
    <div className={classes.root}>
      {isLoading ? <Loader /> : null}
      <Snackbar
        visible={isSBVisible}
        message={sbMessage}
        onClose={handleSnackbarClose}
      />
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <div style={{ display: 'flex', marginRight: 20, marginLeft: 20 }}>
          <Typography className={classes.header}>CI Dashboard</Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setOpen(true)}
            className={clsx(open && classes.hide)}
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faFilter} style={{ fontSize: '16px' }} />
          </IconButton>
        </div>
        <div className={classes.grow} />
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={() => setOpen(false)}
      >
        <div className={classes.drawerHeader} style={{ minHeight: '40px' }}>
          <Typography variant="h6" className={classes.filterColor}>
            Filters
          </Typography>
        </div>
        <Divider />
        <Filter handleFilterVisible={setOpen} />
      </Drawer>
      <main className={clsx(classes.content, classes.contentShift)}>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <Priority data={priorityChartData} />
            </Grid>
            <Grid item xs={12} sm={5} md={5} lg={5}>
              <InsightsByCategory />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <InsightsBySource />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ProductTypeByPriority />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ProductByPriority />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TaByPriority />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <InsightsDataTable handleClick={handleClick} />
            </Grid>
          </Grid>
        </div>
        <div id="InsightsDataTable" />
        <ScrollToTop showUnder={160}>
          <Fab color="primary">
            <ArrowDropUpIcon />
          </Fab>
        </ScrollToTop>
        {openDialog && (
          <InsightsDetails
            openDialog={openDialog}
            handleClose={handleClose}
            isLoading={isLoading}
            formData={dialogData}
          />
        )}
      </main>
    </div>
  );
};

CInsights.defaultProps = {
  priorityChartData: [],
};

CInsights.propTypes = {
  isSBVisible: PropTypes.bool.isRequired,
  sbMessage: PropTypes.object,
  hideSnackbar: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  setCiInxApiToken: PropTypes.func.isRequired,
  setQueryStringParams: PropTypes.func.isRequired,
  setCustomerId: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
  priorityChartData: PropTypes.array,
  fetchApiData: PropTypes.func.isRequired,
  shouldScrolltoDT: PropTypes.bool.isRequired,
  setScrollToDT: PropTypes.func.isRequired,
  insightsData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectCiLoader(),
  isSBVisible: selectSnackbarVisiblility(),
  sbMessage: selectSnackbarMessage(),
  priorityChartData: selectCiPriorityGD(),
  insightStatusChartData: selectCiStatusGD(),
  shouldScrolltoDT: selectScrollToDT(),
  insightsData: selectedOrgDataInsights(),
});

const mapDispatchToProps = dispatch => ({
  hideSnackbar: value => dispatch(setSnackbarVisibility(value)),
  setCiInxApiToken: value => dispatch(saveCIInsightXApiToken(value)),
  setCustomerId: value => dispatch(saveCustomerIdFromQS(value)),
  setUserId: value => dispatch(saveUserIdFromQS(value)),
  setQueryStringParams: value => dispatch(saveQueryStringParams(value)),
  fetchApiData: () => dispatch(getReportDataApi()),
  setScrollToDT: value => dispatch(setScrollToDataTable(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(CInsights);
