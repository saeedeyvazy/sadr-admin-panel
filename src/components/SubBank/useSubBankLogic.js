import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getSubBankList, subbankList, isLoading } from '../../features/subbank/subbank.slice'

export function useSubBankList() {
	const dispatch = useDispatch()
	const theSubBankList = useSelector(subbankList)
	const isLoadingSubBank = useSelector(isLoading)
	useEffect(() => {
		dispatch(getSubBankList())
	}, [])
	return { theSubBankList, isLoadingSubBank }
}