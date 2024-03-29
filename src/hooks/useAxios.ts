import { useEffect, useState } from 'react'
import { iaxios } from '../config'

const useAxios = ({ url, method, body = null, headers = null }) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')
    const [loading, setloading] = useState(true)

    const fetchData = () => {
        iaxios[method](url, JSON.parse(headers), JSON.parse(body))
            .then((res) => {
                if (res.data.data.content)
                    setResponse(res.data.data.content)
                else
                    setResponse(res.data.data)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setloading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [method, url, body, headers])

    return { response, error, loading }
}

export default useAxios