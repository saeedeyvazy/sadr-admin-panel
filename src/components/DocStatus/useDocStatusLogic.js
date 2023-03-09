import {
	getDocStatusList,
	docStatusList,
	isLoading,
	selectDoc,
} from '../../features/document/document.slice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export function useDocStatusList() {
	const dispatch = useDispatch()
	const theDocStatusList = useSelector(docStatusList)
	const isLoadingDocStatus = useSelector(isLoading)
	console.log(theDocStatusList)
	useEffect(() => {
		dispatch(getDocStatusList())
	}, [])
	return { theDocStatusList, isLoadingDocStatus }
}