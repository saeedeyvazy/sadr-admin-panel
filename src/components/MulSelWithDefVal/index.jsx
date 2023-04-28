import React, { useEffect, useState } from "react"
import Select from "react-select"

export default function MulSelWithDefVal({ optionList, signal, name, defaultValue }) {
    const [selectedOptions, setSelectedOptions] = useState([{}])

    function handleSelect(data) {
        signal(data)
        setSelectedOptions(data)
    }
    useEffect(() => { setSelectedOptions(defaultValue) }, [defaultValue])
    return (
        <div className="relative">
            <div className="max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none h-10 border bg-white dark:bg-slate-800 ">
                <Select
                    name={name}
                    value={selectedOptions}
                    className="w-full h-full [&>div]:border-none [&>div]:z-50"
                    options={optionList}
                    onChange={handleSelect}
                    isSearchable={false}
                    placeholder='هیچکدام'
                    isMulti
                />
            </div>
        </div>
    )
}