# Staking Portal Components

## Overview

This directory contains all reusable components for the Staking Portal application.

## Component Structure

### Common Components

1. **TransactionButton** - Button with loading states for blockchain transactions
2. **LoadingState** - Loading indicator with customizable message
3. **ErrorMessage** - Error display with retry functionality
4. **ValidatorCard** - Card component for displaying validator information
5. **StakingModal** - Modal wrapper for staking operations

### Staking Components

1. **StakingForm** - Form for staking tokens
2. **UnstakingForm** - Form for unstaking tokens
3. **RewardClaim** - Component for claiming rewards
4. **ValidatorList** - Grid display of available validators
5. **StakingHistory** - Table showing transaction history

### Feedback Components

1. **ToastProvider** - Toast notification provider and hook

## Usage

```tsx
import { TransactionButton, ValidatorCard, useToast } from '@/app/ui/components';

function MyComponent() {
  const { showToast } = useToast();
  
  const handleAction = async () => {
    try {
      // Do something
      showToast('Success!', 'success');
    } catch (error) {
      showToast('Error occurred', 'error');
    }
  };
  
  return <TransactionButton onClick={handleAction}>Click Me</TransactionButton>;
}
```

## Design Principles

- All components follow Material-UI design system
- Consistent with existing dashboard UI style
- TypeScript for type safety
- Responsive design
- Accessibility considered

## Testing

Components can be tested with Playwright. See `/tests` directory for examples.
