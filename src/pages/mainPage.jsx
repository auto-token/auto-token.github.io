import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useRecoil } from 'recoil';
import { account_address, account_balance } from '../store/atom'
import caver from '../libs/caver'
import './mainPage.scss'

const MainPage = () => {

    // 쓰기 전용
    const [Account_Address, setAccount_Address] = useRecoilState(account_address)
    const [Account_Balance, setAccount_Balance] = useRecoilState(account_balance)

    // 읽기전용
    // const count_numb = useRecoilValue(count)


    useEffect(() => {
        connectWlallet()
    })

    const connectWlallet = async () => {
        const { klaytn } = window
        if (klaytn) {
            try {
                await klaytn.enable()
                setAccountInfo(klaytn)
                // setNetworkInfo(klaytn)
                klaytn.on('accountsChanged', () => setAccountInfo(klaytn))
            } catch (error) {
                console.log('월렛 엑세스 필요함')
            }
        } else {
            console.log('kaikas 설치 필요함')
        }
    }

    const setAccountInfo = async () => {
        const { klaytn } = window
        if (klaytn === undefined) return

        const account = klaytn.selectedAddress
        const balance = await caver.klay.getBalance(account)

        setAccount_Address(account)
        setAccount_Balance(balance)
    }


    return (
        <div className="main_page">
            <div className='main_page_content'>
                메인페이지
            {Account_Address}
            {Account_Balance}
            </div>

        </div>
    )
}

export default MainPage