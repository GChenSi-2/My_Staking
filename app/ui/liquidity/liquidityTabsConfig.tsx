import type { ComponentType } from 'react';
import AddLiquidityPanel from './AddLiquidityPanel';
import RemoveLiquidityPanel from './RemoveLiquidityPanel';
import StakeLiquidityPanel from './StakeLiquidityPanel';
import UnstakeLiquidityPanel from './UnstakeLiquidityPanel';

export const tabValues = ['Add', 'Remove', 'Stake', 'Unstake'] as const;

export type TabValue = (typeof tabValues)[number];

export type TabOption = {
  label: string;
  value: TabValue;
};

export type TabPanelConfig = {
  Panel: ComponentType;
};

export const defaultActiveTab: TabValue = 'Add';

export const tabOptions: TabOption[] = [
  { label: 'Add', value: 'Add' },
  { label: 'Remove', value: 'Remove' },
  { label: 'Stake', value: 'Stake' },
  { label: 'Unstake', value: 'Unstake' },
];

export const panelContent: Record<TabValue, TabPanelConfig> = {
  Add: {
    Panel: AddLiquidityPanel,
  },
  Remove: {
    Panel: RemoveLiquidityPanel,
  },
  Stake: {
    Panel: StakeLiquidityPanel,
  },
  Unstake: {
    Panel: UnstakeLiquidityPanel,
  },
};

export function getActivePanel(activeTab: TabValue) {
  return panelContent[activeTab].Panel;
}

export function isTabValue(value: string): value is TabValue {
  return tabValues.includes(value as TabValue);
}
