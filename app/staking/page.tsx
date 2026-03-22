'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';
import ValidatorList from '../ui/components/staking/ValidatorList';
import StakingModal from '../ui/components/common/StakingModal';
import StakingForm from '../ui/components/staking/StakingForm';
import UnstakingForm from '../ui/components/staking/UnstakingForm';
import RewardClaim from '../ui/components/staking/RewardClaim';
import StakingHistory from '../ui/components/staking/StakingHistory';
import { ToastProvider, useToast } from '../ui/components/feedback/ToastProvider';
import { stakingService } from '../services/stakingService';

interface Validator {
  id: string;
  name: string;
  address: string;
  apr: number;
  totalStake: string;
  status: 'active' | 'inactive';
}

function StakingPageContent() {
  const [tab, setTab] = useState(0);
  const [validators, setValidators] = useState<Validator[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(null);
  const [modalType, setModalType] = useState<'stake' | 'unstake' | 'claim' | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    loadValidators();
  }, []);

  const loadValidators = async () => {
    try {
      setLoading(true);
      const data = await stakingService.getValidators();
      setValidators(data);
    } catch (error) {
      showToast('Failed to load validators', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectValidator = (validator: Validator) => {
    setSelectedValidator(validator);
    setModalType('stake');
  };

  const handleStake = async (amount: string) => {
    if (!selectedValidator) return;
    try {
      const result = await stakingService.stake(selectedValidator.id, amount);
      showToast('Successfully staked ' + amount + ' SOL', 'success');
      setModalType(null);
    } catch (error: any) {
      throw error;
    }
  };

  const handleUnstake = async (amount: string) => {
    if (!selectedValidator) return;
    try {
      const result = await stakingService.unstake(selectedValidator.id, amount);
      showToast('Successfully unstaked ' + amount + ' SOL', 'success');
      setModalType(null);
    } catch (error: any) {
      throw error;
    }
  };

  const handleClaim = async () => {
    if (!selectedValidator) return;
    try {
      const result = await stakingService.claimRewards(selectedValidator.id);
      showToast('Successfully claimed ' + result.amount + ' SOL', 'success');
      setModalType(null);
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/dashboard" underline="hover">← Back to Dashboard</Link>
        <Typography variant="h4" fontWeight="bold">Staking Portal</Typography>
        <Box />
      </Box>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Validators" />
        <Tab label="My Stakes" />
        <Tab label="History" />
      </Tabs>

      {tab === 0 && <ValidatorList validators={validators} loading={loading} onSelectValidator={handleSelectValidator} />}
      {tab === 1 && <Typography>Coming soon: View your active stakes</Typography>}
      {tab === 2 && <StakingHistory transactions={[]} />}

      {selectedValidator && (
        <>
          <StakingModal open={modalType === 'stake'} onClose={() => setModalType(null)} title={'Stake to ' + selectedValidator.name}>
            <StakingForm validatorName={selectedValidator.name} balance="1000" minStake="0.1" onStake={handleStake} />
          </StakingModal>

          <StakingModal open={modalType === 'unstake'} onClose={() => setModalType(null)} title={'Unstake from ' + selectedValidator.name}>
            <UnstakingForm validatorName={selectedValidator.name} stakedAmount="100" pendingRewards="2.5" onUnstake={handleUnstake} />
          </StakingModal>

          <StakingModal open={modalType === 'claim'} onClose={() => setModalType(null)} title="Claim Rewards">
            <RewardClaim validatorName={selectedValidator.name} pendingRewards="2.5" onClaim={handleClaim} />
          </StakingModal>
        </>
      )}
    </Container>
  );
}

export default function StakingPage() {
  return (
    <ToastProvider>
      <StakingPageContent />
    </ToastProvider>
  );
}
