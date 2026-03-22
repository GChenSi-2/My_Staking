interface Validator {
  id: string;
  name: string;
  address: string;
  apr: number;
  totalStake: string;
  status: 'active' | 'inactive';
}

interface StakeInfo {
  validator: string;
  amount: string;
  rewards: string;
  startTime: Date;
}

class StakingService {
  private mockMode = true;

  async getValidators(): Promise<Validator[]> {
    await this.delay(500);
    return [
      { id: '1', name: 'Validator Alpha', address: '0x1234...5678', apr: 12.5, totalStake: '1,250,000 SOL', status: 'active' },
      { id: '2', name: 'Beta Node', address: '0x2345...6789', apr: 11.8, totalStake: '980,000 SOL', status: 'active' },
      { id: '3', name: 'Gamma Validator', address: '0x3456...7890', apr: 13.2, totalStake: '750,000 SOL', status: 'inactive' },
      { id: '4', name: 'Delta Node', address: '0x4567...8901', apr: 10.9, totalStake: '1,500,000 SOL', status: 'active' },
      { id: '5', name: 'Epsilon Stake', address: '0x5678...9012', apr: 14.1, totalStake: '650,000 SOL', status: 'active' }
    ];
  }

  async stake(validatorId: string, amount: string): Promise<{ success: boolean; txHash: string }> {
    await this.delay(2000);
    if (Math.random() > 0.9) throw new Error('Transaction failed. Please try again.');
    return { success: true, txHash: '0x' + Math.random().toString(36).substr(2, 9) };
  }

  async unstake(validatorId: string, amount: string): Promise<{ success: boolean; txHash: string }> {
    await this.delay(2000);
    if (Math.random() > 0.9) throw new Error('Unstake failed. Please try again.');
    return { success: true, txHash: '0x' + Math.random().toString(36).substr(2, 9) };
  }

  async claimRewards(validatorId: string): Promise<{ success: boolean; txHash: string; amount: string }> {
    await this.delay(2000);
    if (Math.random() > 0.9) throw new Error('Claim failed. Please try again.');
    return { success: true, txHash: '0x' + Math.random().toString(36).substr(2, 9), amount: '0.125' };
  }

  async getStakeInfo(validatorId: string): Promise<StakeInfo | null> {
    await this.delay(300);
    return {
      validator: validatorId,
      amount: '100',
      rewards: '2.5',
      startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const stakingService = new StakingService();
