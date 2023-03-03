import {
	organList,
	getOrganList,
	isLoading,
} from '../../features/organ/organ.slice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export function useOrganList() {
	const dispatch = useDispatch()
	const theOrganList = useSelector(organList)
	const isLoadingOrgan = useSelector(isLoading)
	useEffect(() => {
		dispatch(getOrganList())
	}, [])
	return { theOrganList, isLoadingOrgan }
}
// export function useClientLogic() {
// 	const dispatch = useDispatch()
// 	const [attachmentList, setAttachmentList] = useState([])
// 	const saveClientLoading = useSelector(isLoading)
// 	const [formData, setFormData] = useState({
// 		clientName: '',
// 		companyName: '',
// 		emailAddress: '',
// 		clientAddress: '',
// 		comment: '',
// 		phoneNumber: '',
// 	})
// 	function handleChange({ target: { name, value } }) {
// 		setFormData({ ...formData, [name]: value })
// 	}
// 	useEffect(() => {
// 		// setFormData({ ...formData, clientAttachments: attachmentList })
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [attachmentList])

// 	function save() {
// 		dispatch(createClient(formData))
// 		setFormData({
// 			clientName: '',
// 			companyName: '',
// 			emailAddress: '',
// 			clientAddress: '',
// 			comment: '',
// 			phoneNumber: '',
// 		})
// 	}
// 	function deleteSelectedClient(id) {
// 		dispatch(deleteClient(id))
// 	}
// 	return [
// 		handleChange,
// 		setAttachmentList,
// 		save,
// 		deleteSelectedClient,
// 		saveClientLoading,
// 		formData,
// 	]
// }
