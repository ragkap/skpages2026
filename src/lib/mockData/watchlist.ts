import { WatchlistEntity, StockRow } from '../types';

export const watchlistLists = [
  '0. My Watchlist', '1. Markets', 'ASIC', 'Auto Semis', 'China Edu Shortlist',
  'China PMCs', 'Focus - AUS', 'Focus - HK', 'Focus - Indo', 'Focus - JPN',
  'Focus - JPN SAAS', 'Focus - KRW', 'Focus - MY', 'Focus - Phils',
  'Focus - SG', 'Focus - TW', 'Focus - US Tech', 'Korea Special Sits', 'SE Asia Consume',
];

export const watchlistEntities: WatchlistEntity[] = [
  {
    id: '1', ticker: 'AMZN US', name: 'Amazon', price: '209.53', currency: 'USD',
    change: '▼ 1.47%', direction: 'down', logoColor: '#b84a00', logoInitials: 'AMZ',
    insights: [
      { id: 'i1', type: 'research', date: '13 Mar · 00:16', title: 'Beyond Chips and Capex: Private Credit in the AI Ecosystem - Raghav Vashisht' },
      { id: 'i2', type: 'research', date: '12 Mar · 13:07', title: 'Sharp Surge in Memory Chip Prices: 2 Smallcap Indian Beneficiaries - Sudarshan Bhandari' },
      { id: 'i3', type: 'filing', date: '13 Mar · 04:50', title: '424B5 | Prospectus' },
    ],
  },
  {
    id: '2', ticker: 'RERE US', name: 'ATRenew', price: '5.60', currency: 'USD',
    change: '▲ 0.36%', direction: 'up', logoColor: '#006b5c', logoInitials: 'ATR',
    insights: [
      { id: 'i4', type: 'research', date: '13 Mar · 02:00', title: 'RERE: Continues to execute across the board. Several growth opportunities on the horizon - Zacks Small Cap Research' },
    ],
  },
  {
    id: '3', ticker: 'AVI HK', name: 'AviChina Industry & Technology H', price: '3.91', currency: 'HKD',
    change: '▼ 1.26%', direction: 'down', logoColor: '#003a6b', logoInitials: 'AVI',
    insights: [
      { id: 'i5', type: 'filing', date: '12 Mar · 17:13', title: 'Date Of Board Meeting' },
    ],
  },
  {
    id: '4', ticker: 'CIMC HK', name: 'CIMC Enric Holdings', price: '12.00', currency: 'HKD',
    change: '▲ 1.69%', direction: 'up', logoColor: '#2a2e38', logoInitials: 'CIM',
    insights: [
      { id: 'i6', type: 'filing', date: '12 Mar · 16:34', title: 'Notification Of Board Meeting' },
    ],
  },
  {
    id: '5', ticker: 'GLXY US', name: 'Galaxy Digital Holdings', price: '28.47', currency: 'USD',
    change: '▲ 4.21%', direction: 'up', logoColor: '#3b1a6b', logoInitials: 'GLX',
    insights: [
      { id: 'i7', type: 'research', date: '13 Mar · 08:52', title: 'Galaxy Digital (GLXY US): US Index Inclusion Following Reorganization - Dimitris Ioannidis' },
      { id: 'i8', type: 'research', date: '12 Mar · 11:30', title: 'Galaxy Digital: Post-Redomiciliation Flow Analysis - Brian Freitas' },
    ],
  },
  {
    id: '6', ticker: '005930 KS', name: 'Samsung Electronics', price: '67,400', currency: 'KRW',
    change: '▼ 1.17%', direction: 'down', logoColor: '#0a1628', logoInitials: 'SEC',
    insights: [
      { id: 'i9', type: 'research', date: '13 Mar · 06:45', title: 'HBM3E Qualification Timeline Slips Again — Supply Glut Risk Emerging - Nader Khouri' },
      { id: 'i10', type: 'filing', date: '13 Mar · 09:00', title: 'Disclosure of Large-Scale Holdings' },
    ],
  },
  {
    id: '7', ticker: 'DBS SP', name: 'DBS Group Holdings', price: '41.18', currency: 'SGD',
    change: '▲ 0.93%', direction: 'up', logoColor: '#6b0a0a', logoInitials: 'DBS',
    insights: [
      { id: 'i11', type: 'research', date: '13 Mar · 05:20', title: 'DBS Q4 Beat — NIM Holds Despite Rate Cut Fears - Sunil Prakash' },
    ],
  },
];

export const stockPanelRows: StockRow[] = [
  { id: 's1', ticker: 'DBI AU', name: 'Dalrymple Bay Infrastructure L', price: '4.96', change: '▲ 6.67%', direction: 'up' },
  { id: 's2', ticker: '082920 KS', name: 'Vitzrocell', price: '25,100', change: '▲ 5.46%', direction: 'up' },
  { id: 's3', ticker: '8637 HK', name: 'Metasurface Technologies Holdings', price: '3.21', change: '▲ 5.25%', direction: 'up' },
  { id: 's4', ticker: 'DRO AU', name: 'DroneShield Ltd', price: '4.11', change: '▲ 4.85%', direction: 'up' },
  { id: 's5', ticker: '5243 JP', name: 'Note', price: '2,464', change: '▲ 4.81%', direction: 'up' },
  { id: 's6', ticker: '863 HK', name: 'OSL Group', price: '13.72', change: '▲ 4.81%', direction: 'up' },
  { id: 's7', ticker: '3131 TT', name: 'Grand Plastic Technology', price: '2,030', change: '▲ 4.64%', direction: 'up' },
  { id: 's8', ticker: 'CASS IJ', name: 'Cahaya Aero Services', price: '2,140', change: '▲ 4.39%', direction: 'up' },
  { id: 's9', ticker: 'ATP AU', name: 'Atlas Pearls', price: '0.12', change: '▲ 4.17%', direction: 'up' },
  { id: 's10', ticker: '4441 JP', name: 'Tobila Systems Inc', price: '1,398', change: '▲ 3.86%', direction: 'up' },
  { id: 's11', ticker: 'DFI SP', name: 'DFI Retail Group Holdings', price: '4.67', change: '▲ 3.78%', direction: 'up' },
  { id: 's12', ticker: 'OTEK SP', name: 'Oiltek International Ltd', price: '0.83', change: '▲ 3.75%', direction: 'up' },
  { id: 's13', ticker: 'EVO SS', name: 'Evolution', price: '594.6', change: '▲ 3.62%', direction: 'up' },
];
