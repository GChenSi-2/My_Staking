'use client';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ConnectWallet from '@/app/wagmi/components/ConnectWallet';
export default function MyStaking() {
  return (
    <Box sx={{ width: '100%', px: 0, py: 0 }}>
      <Box
        sx={theme => {
          return {
            mb: 3,
            width: '100%',
            pt: '1rem',
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
          };
        }}
      >
        <Box sx={{ flexGrow: '3' }}>
          {/* 占 3/5 宽度的内容 */}
          {/* <div className="relative mx-auto flex w-full flex-col rounded-[16px] p-4 md:p-6 h-[208px] md:h-[266px]">
            我占三份
          </div> */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              '& .MuiCard-root': { ml: 0, mr: 'auto' },
            }}
          >
            <ConnectWallet />
          </Box>
        </Box>
        <Box sx={{ flexGrow: '2' }}>
          {/* 占 2/5 宽度的内容 */}
          我占二份
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, mb: 2 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>My Validators</Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <span> Sort by</span>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select defaultValue="highest" variant="outlined">
              <MenuItem value="highest">Highest to lowest</MenuItem>
              <MenuItem value="lowest">Lowest to highest</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select defaultValue="live-apr" variant="outlined">
              <MenuItem value="live-apr">Live APR</MenuItem>
              <MenuItem value="total-stake">Total Stake</MenuItem>
              <MenuItem value="uptime">Uptime</MenuItem>
            </Select>
          </FormControl>
          <Box>不知道啥</Box>
        </Box>
      </Box>

      {/* Validator Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="validator table">
          <TableHead>
            <TableRow>
              <TableCell>Validator</TableCell>
              <TableCell align="right">Live APR</TableCell>
              <TableCell align="right">Total Stake</TableCell>
              <TableCell align="right">My Stake</TableCell>
              <TableCell align="right">Rewards</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Validator 1 */}
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    V1
                  </Box>
                  Validator Alpha
                </Box>
              </TableCell>
              <TableCell align="right">12.5%</TableCell>
              <TableCell align="right">1,250,000 SOL</TableCell>
              <TableCell align="right">500 SOL</TableCell>
              <TableCell align="right">2.15 SOL</TableCell>
              <TableCell align="center">
                <Chip label="Active" color="success" size="small" />
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                  Stake
                </Button>
                <Button variant="text" size="small">
                  Unstake
                </Button>
              </TableCell>
            </TableRow>

            {/* Validator 2 */}
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    V2
                  </Box>
                  StakePool Beta
                </Box>
              </TableCell>
              <TableCell align="right">11.8%</TableCell>
              <TableCell align="right">980,000 SOL</TableCell>
              <TableCell align="right">250 SOL</TableCell>
              <TableCell align="right">1.05 SOL</TableCell>
              <TableCell align="center">
                <Chip label="Active" color="success" size="small" />
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                  Stake
                </Button>
                <Button variant="text" size="small">
                  Unstake
                </Button>
              </TableCell>
            </TableRow>

            {/* Validator 3 */}
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'warning.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    V3
                  </Box>
                  Gamma Validator
                </Box>
              </TableCell>
              <TableCell align="right">13.2%</TableCell>
              <TableCell align="right">750,000 SOL</TableCell>
              <TableCell align="right">100 SOL</TableCell>
              <TableCell align="right">0.48 SOL</TableCell>
              <TableCell align="center">
                <Chip label="Inactive" color="error" size="small" />
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                  Stake
                </Button>
                <Button variant="text" size="small">
                  Unstake
                </Button>
              </TableCell>
            </TableRow>

            {/* Validator 4 */}
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'info.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    V4
                  </Box>
                  Delta Node
                </Box>
              </TableCell>
              <TableCell align="right">10.9%</TableCell>
              <TableCell align="right">1,500,000 SOL</TableCell>
              <TableCell align="right">750 SOL</TableCell>
              <TableCell align="right">3.22 SOL</TableCell>
              <TableCell align="center">
                <Chip label="Active" color="success" size="small" />
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                  Stake
                </Button>
                <Button variant="text" size="small">
                  Unstake
                </Button>
              </TableCell>
            </TableRow>

            {/* Validator 5 */}
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'error.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    V5
                  </Box>
                  Epsilon Stake
                </Box>
              </TableCell>
              <TableCell align="right">14.1%</TableCell>
              <TableCell align="right">650,000 SOL</TableCell>
              <TableCell align="right">300 SOL</TableCell>
              <TableCell align="right">1.78 SOL</TableCell>
              <TableCell align="center">
                <Chip label="Active" color="success" size="small" />
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                  Stake
                </Button>
                <Button variant="text" size="small">
                  Unstake
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
