import {
    Avatar,
    Box,
    Dialog,
    Grid,
    Typography,
} from '@mui/material';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { SUPPORTED_WALLETS } from '../../connectors';
import usePrevious from '../../hooks/usePrevious';
import React, { useEffect } from 'react';
import { useStore } from '../../store';

export default function WalletModal () {
    const { isOpen, setWalletState } = useStore();
    const { activate, active, connector } = useWeb3React();
    const tryActivation = async (connector) => {
        if (
            connector instanceof WalletConnectConnector &&
            connector.walletConnectProvider?.wc?.uri
        ) {
            connector.walletConnectProvider = undefined;
        }

        connector &&
            activate(connector, undefined, true).catch((error) => {
                if (error instanceof UnsupportedChainIdError) {
                    activate(connector); // a little janky...can't use setError because the connector isn't set
                }
            });
    };
    // close modal when a connection is successful
    const activePrevious = usePrevious(active);
    const connectorPrevious = usePrevious(connector);
    useEffect(() => {
        if (
            isOpen &&
            ((active && !activePrevious) ||
                (connector && connector !== connectorPrevious))
        ) {
            setWalletState(false);
        }
    }, [
        setWalletState,
        active,
        connector,
        isOpen,
        activePrevious,
        connectorPrevious,
    ]);
    return (
        <Dialog fullWidth open={isOpen} onClose={() => setWalletState(false)} >
            <Box >
                <Grid container>
                    {Object.values(SUPPORTED_WALLETS).map((wallet) => {
                        if (wallet.isInstalled()) {

                            return (
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    key={wallet.name}
                                    sx={{ cursor: 'pointer', padding: '10px' }}
                                    onClick={() => tryActivation(wallet.connector)}
                                >
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        padding="20px"
                                    >
                                        <Avatar sx={{ bgcolor: 'transparent' }} sizes="md">
                                            <img
                                                src={'/images/' + wallet.iconName}
                                                alt="walleticon"
                                                width="100%"
                                            />
                                        </Avatar>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            {wallet.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            secondary
                                            sx={{ textAlign: 'center' }}
                                        >
                                            {wallet.description}
                                        </Typography>
                                    </Box>
                                </Grid>
                            );
                        }
                        else return null
                    })}
                </Grid>
            </Box>
        </Dialog>
    );
}
function isWrongChainError (error) {
    return error instanceof UnsupportedChainIdError;
}

export function WalletConnectButton ({ size = 'large' }) {
    const { setWalletState } = useStore();
    const { account, error } = useWeb3React();
    return (
        <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => !account && setWalletState(true)} >
            <Box display='flex' alignItems='center' justifyContent="center" sx={{ position: 'absolute', inset: '0' }}>

                {
                    isWrongChainError(error) ?
                        <Typography fontWeight='900' color="error" variant="h6" sx={{ textTransform: 'uppercase' }}>
                            Wrong Chain
                        </Typography>
                        :
                        <Typography fontWeight='900' color="common.white" variant="h5" sx={{ textTransform: 'uppercase' }}>

                            {
                                account ? 'Connected' : 'Connect'
                            }
                        </Typography>
                }

            </Box>
            <img src="/images/connectWallet.png" style={{ cursor: 'pointer', flexGrow: 0 }} alt="connect wallet" />


        </Box>
    );
}
