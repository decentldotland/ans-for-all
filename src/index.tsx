// @flow 
import * as React from 'react';
import { Default_Badge } from './components/badge';
// import useConenctor from './components/arconnect_loader'
import './index.css';
import Swal from 'sweetalert2'
// import { useTranslation } from 'react-i18next'
import { PermissionType } from 'arconnect';

import * as lang from './en.json';

const requiredPermissions: PermissionType[] = ['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES', 'SIGNATURE', 'SIGN_TRANSACTION', 'ACCESS_PUBLIC_KEY']

type Props = {
    children: any;
};

interface IANSContext {
    walletConnected: boolean;
    address: string;
    ansData: {
        address_color: string;
        currentLabel: string;
        avatar: string;
    };
    shortenAddress: (addr: any) => any;
    arconnectConnect: () => Promise<void>;
    arconnectDisconnect: () => Promise<void>;
}

export const ANSContext = React.createContext<Partial<IANSContext>>({} as IANSContext);


export function useAns(): Partial<IANSContext> {
    const UseANSContext: Partial<IANSContext> = React.useContext(ANSContext);

    if (UseANSContext === null) {
        throw new Error(
            'useAns() can only be used inside of <AnsProvider />, ' +
            'please declare it at a higher level.'
        )
    }

    return UseANSContext;
}

export const Badge = Default_Badge;

//will replace later
const connector = lang.connector;

export const AnsProvider = (props: Props) => {

    const [walletConnected, setWalletConnected] = React.useState(false)
    const [address, setAddress] = React.useState(undefined)
    const [ansData, setANSData] = React.useState(undefined)
    // const { t } = useTranslation()

    React.useEffect(() => {
        // add ArConnect event listeners
        window.addEventListener('arweaveWalletLoaded', walletLoadedEvent)
        window.addEventListener('walletSwitch', walletSwitchEvent)
        return () => {
            // remove ArConnect event listeners
            window.removeEventListener('arweaveWalletLoaded', walletLoadedEvent)
            window.removeEventListener('walletSwitch', walletSwitchEvent)
        }
    })

    // wallet address change event
    // when the user switches wallets
    const walletSwitchEvent = async (e) => {
        setAddress(e.detail.address)
        // setAddress("ljvCPN31XCLPkBo9FUeB7vAK0VC6-eY52-CS-6Iho8U")
        // setANSData(await getANSLabel(e.detail.address))
    }

    // ArConnect script injected event
    const walletLoadedEvent = async () => {
        try {
            // connected, set address
            // (the user can still be connected, but
            // for this actions the "ACCESS_ADDRESS"
            // permission is required. if the user doesn't
            // have that, we still need to ask them to connect)
            const addr = await getAddr()
            setAddress(addr)
            // setAddress("ljvCPN31XCLPkBo9FUeB7vAK0VC6-eY52-CS-6Iho8U")
            // setANSData(await getANSLabel(addr))
            setWalletConnected(true)
        } catch {
            // not connected
            setAddress(undefined)
            setWalletConnected(false)
        }
    }

    const installArConnectAlert = () => {
        Swal.fire({
            icon: "warning",
            title: connector.swal.title,
            text: connector.swal.text,
            footer: `<a href="https://arconnect.io" rel="noopener noreferrer" target="_blank">${connector.swal.footer}</a>`,
            customClass: "font-mono",
        })
    }

    const getAddr = () => window.arweaveWallet.getActiveAddress()

    const shortenAddress = (addr) => {
        if (addr) {
            return addr.substring(0, 4) + '...' + addr.substring(addr.length - 4)
        }
        return addr
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://ans-testnet.herokuapp.com/profile/${address}`)
                const ans = await response.json()
                const { address_color, currentLabel, avatar = "" } = ans;
                console.log({ address_color, currentLabel, avatar })
                setANSData({ address_color, currentLabel, avatar })
            } catch (error) {
                console.error(error)
            }
        };

        fetchData();
    }, [address]);

    const arconnectConnect = async () => {
        if (window.arweaveWallet) {
            try {
                await window.arweaveWallet.connect(requiredPermissions)
                setAddress(await getAddr())
                setWalletConnected(true)

            } catch { }
        } else {
            installArConnectAlert()
        }
    }

    const arconnectDisconnect = async () => {
        await window.arweaveWallet.disconnect()
        setWalletConnected(false)
        setAddress(undefined)
    }


    return (
        <ANSContext.Provider value={{ walletConnected, address, ansData, shortenAddress, arconnectConnect, arconnectDisconnect }}>
            {props.children}
        </ANSContext.Provider>
    );
};