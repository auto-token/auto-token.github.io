import React, { useEffect, useState } from 'react';
import './connectWallet.scss'
import caver from '../libs/caver'
import { account_address, account_balance, isModalOpen } from '../store/atom'
import { useRecoilState } from 'recoil'

const ConnectWallet = () => {

    const [state_account_address, setAccount_Address] = useRecoilState(account_address)
    const [state_account_balance, setAccount_Balance] = useRecoilState(account_balance)
    // const [state_account_address, setAccount_Address] = useState('')
    // const [state_account_balance, setAccount_Balance] = useState('')

    const [isOpen, setIsOpen] = useRecoilState(isModalOpen)

    const _connectKaikas = async () => {
        const { klaytn } = window
        if (klaytn) {
            try {
                await klaytn.enable()
                setAccountInfo(klaytn)
                // setNetworkInfo(klaytn)
                klaytn.on('accountsChanged', () => setAccountInfo(klaytn))
            } catch (error) {
                console.log('월렛 엑세스 필요함')
                alert('월렛 엑세스 필요함')
                setIsOpen(!isOpen)
            }
        } else {
            console.log('kaikas 설치 필요함')
            alert('kaikas 설치 필요함')
            setIsOpen(!isOpen)
        }
    }

    const setAccountInfo = async () => {
        const { klaytn } = window
        if (klaytn === undefined) return

        const account = klaytn.selectedAddress
        const balance = await caver.klay.getBalance(account)

        setAccount_Address(account)
        setAccount_Balance(balance)
        setIsOpen(!isOpen)
    }


    return (

        <>
            <button onClick={() => _connectKaikas()}>kaikas</button>
        </>
    )
}

export default ConnectWallet;