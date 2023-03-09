import {
	bankList,
	getBankList,
	isLoading
} from '../../features/bank/bank.slice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export function useBankList() {
	const dispatch = useDispatch()
	const theBankList = useSelector(bankList)
	const isLoadingBank = useSelector(isLoading)
	useEffect(() => {
		dispatch(getBankList())
	}, [])
	return { theBankList, isLoadingBank }
}