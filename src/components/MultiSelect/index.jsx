import React, { useState } from "react"
import Select from "react-select"

export default function MultiSelect({ optionList, signal, name, isMulti }) {
    const [selectedOptions, setSelectedOptions] = useState([{}])

    function handleSelect(data) {
        signal(data)
        setSelectedOptions(data)
    }
    return (
        <div className="relative">
            <div className="max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none h-10 border bg-white dark:bg-slate-800 ">
                <Select
                    name={name}
                    
                    className="w-full h-full [&>div]:border-none [&>div]:z-50"
                    options={optionList}
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    placeholder='هیچکدام'
                    isMulti={isMulti}
                />
            </div>
        </div>
    )
}