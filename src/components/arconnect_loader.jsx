import React, { useEffect, useState } from 'react'
// import UploadShow from './upload_show.jsx'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

const requiredPermissions = ['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES', 'SIGNATURE', 'SIGN_TRANSACTION', 'ACCESS_PUBLIC_KEY']

export default function useConenctor() {

      const [walletConnected, setWalletConnected] = React.useState(false)
    const [address, setAddress] = React.useState(undefined)
    const [ansData, setANSData] = React.useState(undefined)
    const { t } = useTranslation()
  
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
        title: t("connector.swal.title"),
        text: t("connector.swal.text"),
        footer: `<a href="https://arconnect.io" rel="noopener noreferrer" target="_blank">${t("connector.swal.footer")}</a>`,
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
  
    // const getANSLabel = async (addr) => {
  
    //   return ans?.currentLabel
    // }
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://ans-testnet.herokuapp.com/profile/${address}`)
          const ans = await response.json()
          const {address_color, currentLabel, avatar = ""} = ans;
          console.log({address_color, currentLabel, avatar})
          setANSData({address_color, currentLabel, avatar})
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


  const base = React.useMemo(() => {
    return { walletConnected, address, ansData, shortenAddress, arconnectConnect, arconnectDisconnect }
  }, [walletConnected, address, ansData, shortenAddress, arconnectConnect, arconnectDisconnect])  

  return base
}
