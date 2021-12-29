import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

// localstorage save datas
const { persistAtom } = recoilPersist()

export const isModalOpen = atom({
    key: 'isModalOpen',
    default: false
})

export const account_address = atom({
    key: 'account_address',
    default: '',
    effects_UNSTABLE: [persistAtom]
})

export const account_balance = atom({
    key: 'account_balance',
    default: '',
    effects_UNSTABLE: [persistAtom]
})

