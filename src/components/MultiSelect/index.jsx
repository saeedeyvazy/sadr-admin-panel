import React, { useState } from "react"
import Select from "react-select"

export default function MultiSelect({ optionList }) {
    const [selectedOptions, setSelectedOptions] = useState([{}])

    function handleSelect(data) {
        setSelectedOptions(data)
    }
    return (
        <div className="app">
            <div className="dropdown-container">
                <Select
                    options={optionList}
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                />
            </div>
        </div>
    )
}