import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useRecoil } from 'recoil';
import { account_address, account_balance } from '../store/atom'
import caver from '../libs/caver'
import './mainPage.scss'

const MainPage = () => {
    const Account_Address = useRecoilValue(account_address)
    const Account_Balance = useRecoilValue(account_balance)



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