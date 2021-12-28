import { atom } from 'recoil';

export const isModalOpen = atom({
    key: 'isModalOpen',
    default: false
})

export const account_address = atom({
    key: 'account_address',
    default: ''
})

export const account_balance = atom({
    key: 'account_balance',
    default: ''
})

export const connect_wallet_modal = atom({
    key: 'connect_wallet_modal',
    default: false
})