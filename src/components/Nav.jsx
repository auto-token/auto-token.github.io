import React, { useState } from 'react'
import networks from '../constants/network'
import './Nav.scss'
import cx from 'classnames'
import { isNull, isUndefined } from 'lodash'
import ConnectWallet from './connectWallet'

import { useRecoilState } from 'recoil';
import { isModalOpen } from '../store/atom'

const Nav = ({ network }) => {
    const [isOpen, setIsOpen] = useRecoilState(isModalOpen)
    const [isVisible, setIsVisible] = useState(false);



    const onClickButton = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen)
    }


    return (
        <header className="Nav">
            <div className='Nav__inner'>
                <h1 className='Nav__logo'>
                    <a href='/'>
                        <img className="Nav___logo"
                            src="https://cryptologos.cc/logos/klaytn-klay-logo.png?v=014"
                            width={30}
                        />
                    logo
                </a>
                </h1>
                <div className={cx('Nav__network', {
                    'Nav__network--error': isNull(network),
                    'Nav__network--loading': network === 'loading',
                })}>
                    <span>&#9679;</span>
                    {/* {networks[network] === undefined ? <button onClick={onClickButton}>connect</button> : networks[network]} */}
                    <button onClick={onClickButton}>connect</button>
                </div>
            </div>
            <div>
                {/* {isVisible && <BodyBlackoutStyle onSetIsVisible={onSetIsVisible} />} */}
                {isVisible && (
                    <ConnectWallet setIsVisible={setIsVisible} />
                )}
            </div>
        </header>
    )
}

export default Nav