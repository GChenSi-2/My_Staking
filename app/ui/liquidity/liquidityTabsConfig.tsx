import type { ComponentType } from 'react';
import AddLiquidityPanel from './AddLiquidityPanel';
import RemoveLiquidityPanel from './RemoveLiquidityPanel';
import StakeLiquidityPanel from './StakeLiquidityPanel';
import UnstakeLiquidityPanel from './UnstakeLiquidityPanel';

export type TabValue = 'Add' | 'Remove' | 'Stake' | 'Unstake';

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
