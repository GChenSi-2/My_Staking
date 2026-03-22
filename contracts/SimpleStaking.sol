// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStaking {
    uint256 public constant APY = 1250; // 12.5% represented as basis points (1250/10000)
    uint256 public constant SECONDS_PER_YEAR = 365 * 24 * 60 * 60;

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 rewards;
    }

    mapping(address => Stake) public stakes;
    uint256 public totalStaked;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);

    function stake() external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        
        Stake storage userStake = stakes[msg.sender];
        if (userStake.amount > 0) {
            userStake.rewards += calculateRewards(msg.sender);
        }
        
        userStake.amount += msg.value;
        userStake.startTime = block.timestamp;
        totalStaked += msg.value;
        
        emit Staked(msg.sender, msg.value);
    }

    function unstake(uint256 amount) external {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount >= amount, "Insufficient staked amount");
        
        uint256 rewards = calculateRewards(msg.sender);
        userStake.rewards += rewards;
        userStake.amount -= amount;
        userStake.startTime = block.timestamp;
        totalStaked -= amount;
        
        payable(msg.sender).transfer(amount);
        emit Unstaked(msg.sender, amount);
    }

    function claimRewards() external {
        Stake storage userStake = stakes[msg.sender];
        uint256 rewards = calculateRewards(msg.sender) + userStake.rewards;
        require(rewards > 0, "No rewards available");
        
        userStake.rewards = 0;
        userStake.startTime = block.timestamp;
        
        payable(msg.sender).transfer(rewards);
        emit RewardsClaimed(msg.sender, rewards);
    }

    function calculateRewards(address user) public view returns (uint256) {
        Stake memory userStake = stakes[user];
        if (userStake.amount == 0) return 0;
        
        uint256 stakingDuration = block.timestamp - userStake.startTime;
        uint256 rewards = (userStake.amount * APY * stakingDuration) / (10000 * SECONDS_PER_YEAR);
        return rewards;
    }

    function getStakeInfo(address user) external view returns (uint256 amount, uint256 rewards, uint256 startTime) {
        Stake memory userStake = stakes[user];
        return (userStake.amount, calculateRewards(user) + userStake.rewards, userStake.startTime);
    }
}
