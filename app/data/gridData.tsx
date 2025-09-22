'use client'
import * as React from 'react';
import Chip from '@mui/material/Chip';
import {GridRowsProp, GridColDef} from '@mui/x-data-grid';

function renderStatus(status: 'Active' | 'Renounced') {
  const colors: { [index: string]: 'success' | 'default' } = {
    Active: 'success',
    Renounced: 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}


export const columns: GridColDef[] = [
  {
    field: 'validators',
    headerName: 'VALIDATORS',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'liveApr',
    headerName: 'LIVE APR',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'totalStake',
    headerName: 'TOTAL STAKE',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'uptime',
    headerName: 'UPTIME',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'status',
    headerName: 'STATUS',
    flex: 0.5,
    minWidth: 80,
    renderCell: (params: any) => renderStatus(params.value as any),
  },
    {
    field: 'button',
    headerName: '',
    flex: 0.5,
    minWidth: 80,
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    validators: 'KANSTAR',
    liveApr: '7.5%',
    totalStake: 120000000,
    uptime: 99.9,
    status: 'Active',
    button: 'Stake',
  },

];
