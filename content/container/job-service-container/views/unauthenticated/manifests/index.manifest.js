'use strict';
const deleteModal = require('../components/deleteModal');
const runModal = require('../components/runModal');
module.exports = periodic => {
  return {
    containers: {
      [`/views/crons/index`]: {
        pageData: {
          title: 'Cron Service',
          navLabel: 'Cron Service',
        },
        layout: {
          component: 'Hero',
          props: {
            size: 'isFullheight',
          },
          children: [
            {
              component: 'HeroBody',
              props: {},
              children: [
                {
                  component: 'Container',
                  props: {
                    style: {
                      paddingTop: '40px'
                    }
                  },
                  children: [
                    {
                      component: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        },
                      },
                      children: [
                        {
                          component: 'Title',
                          children: 'Crons',
                          props: {
                            style: {
                              fontWeight: 'bold',
                            }
                          }
                        },
                        {
                          component: 'ResponsiveButton',
                          props: {
                            onClick: 'func:this.props.createModal',
                            onclickProps: {
                              title: 'Add Cron',
                              pathname: '/views/crons/add',
                            },
                            buttonProps: {
                              size: 'isPrimary',
                            },
                            style: {
                              padding: '0 30px',
                            },
                          },
                          children: 'Add Cron',
                        },
                      ],
                    },
                    {
                      component: 'ResponsiveCard',
                      props: {
                        cardTitle: 'Crons',
                        style: {
                          marginTop: '50px'
                        }
                      },
                      children: [
                        {
                          component: 'ResponsiveTable',
                          props: {
                            flattenRowData: true,
                            simplePagination: true,
                            tableSearch: true,
                            limit: 50,
                            hasPagination: true,
                            calculatePagination: true,
                            baseUrl: `/views/crons/all?format=json`,
                            style: {
                              paddingTop: '50px',
                            },
                            dataMap: [
                              {
                                key: 'rows',
                                value: 'crons',
                              },
                              {
                                key: 'numItems',
                                value: 'cronscount',
                              },
                              {
                                key: 'numPages',
                                value: 'cronpages',
                              },
                            ],
                            headerLinkProps: {
                              style: {
                                textDecoration: 'none',
                                color: '#414141',
                              },
                            },
                            headers: [
                              {
                                label: 'Name',
                                sortid: 'name',
                                sortable: true,
                                link: {
                                  baseUrl: '/views/crons/edit/:id',
                                  params: [
                                    {
                                      key: ':id',
                                      val: '_id',
                                    },
                                  ],
                                },
                                linkProps: {
                                  style: {
                                    textDecoration: 'none',
                                  },
                                },
                              },
                              {
                                label: 'Organization',
                                sortid: 'organization_name',
                                sortable: true,
                              },
                              {
                                label: 'Date',
                                sortid: 'createdat',
                                momentFormat: 'MM/DD/YYYY',
                                sortable: true,
                              },
                              {
                                label: 'Active',
                                sortid: 'active',
                                sortable: false,
                              },
                              {
                                label: 'Interval',
                                sortid: 'interval_description',
                                sortable: false,
                              },
                              {
                                label: ' ',
                                props: {
                                  style: {
                                    textAlign: 'end',
                                  },
                                },
                                buttons: [
                                  {
                                    children: 'Activate',
                                    passProps: {
                                      style: {
                                        marginRight: '10px',
                                        padding: '0px 10px',
                                      },
                                      buttonProps: {
                                        color: 'isInfo',
                                      },
                                      onClick: 'func:this.props.fetchAction',
                                      onclickBaseUrl: '/cron/setactive/:id/:status',
                                      onclickLinkParams: [{ key: ':id', val: '_id', }, { key: ':status', val: 'active', }, ],
                                      fetchProps: {
                                        method: 'POST',
                                      },
                                      successProps: {
                                        success: true,
                                        successCallback: 'func:this.props.refresh',
                                      },
                                    },
                                  },
                                  {
                                    children: 'Run',
                                    passProps: {
                                      style: {
                                        marginRight: '10px',
                                        padding: '0px 10px',
                                      },
                                      buttonProps: {
                                        color: 'isSuccess',
                                      },
                                      onClick: 'func:this.props.fetchAction',
                                      onclickBaseUrl: '/cron/:id/run',
                                      onclickLinkParams: [{ key: ':id', val: '_id', }, ],
                                      fetchProps: {
                                        method: 'POST',
                                      },
                                      successProps: {
                                        success: {
                                          notification: {
                                            text: 'Cron successfully run',
                                            type: 'success',
                                            timeout: 1000,
                                          },
                                        },
                                        successCallback: 'func:this.props.refresh',
                                      },
                                      confirmModal: runModal,
                                    },
                                  },
                                  {
                                    children: 'Delete',
                                    passProps: {
                                      style: {
                                        padding: '0px 10px',
                                      },
                                      buttonProps: {
                                        color: 'isDanger',
                                      },
                                      onClick: 'func:this.props.fetchAction',
                                      onclickBaseUrl: '/cron/:id',
                                      onclickLinkParams: [{ key: ':id', val: '_id', }, ],
                                      fetchProps: {
                                        method: 'DELETE',
                                      },
                                      successProps: {
                                        success: {
                                          notification: {
                                            text: 'Deleted',
                                            type: 'success',
                                            timeout: 1000,
                                          },
                                        },
                                        successCallback: 'func:this.props.refresh',
                                      },
                                      confirmModal: deleteModal,
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                          asyncprops: {
                            rows: ['crondata', 'crons', ],
                            numPages: ['crondata', 'cronpages', ],
                            numItems: ['crondata', 'cronscount', ],
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        resources: {
          crondata: '/cron/indexPage',
        },
        callbacks: [ 'func:window.setHeaders'],
        onFinish: 'render',
      },
    },
  };
};
