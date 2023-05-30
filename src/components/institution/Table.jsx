import { mdiCardAccountDetails, mdiTrashCan } from "@mdi/js"
import { useState } from "react"
import { perPageSize } from "../../config"
import BaseButton from "../BaseButton"
import BaseButtons from "../BaseButtons"

export function Table({ titleList, rowData, rowKey, danger }) {
    const [currentPage, setCurrentPage] = useState(0)
    const clientsPaginated = rowData.slice(perPageSize * currentPage, perPageSize * (currentPage + 1))
    const numPages = Math.ceil(rowData.length / perPageSize)
    const pagesList = []

    const keyList = Object.keys(rowData[0])
    for (let i = 0; i < numPages; i++) {
        pagesList.push(i)
    }

    return <table>
        <thead>
            <tr className='[&>*]:text-right'>
                <th />
                {titleList.filter(title => title != rowKey).map((header, index) => <th key={index}>{header}</th>)}
                <th />
            </tr>
        </thead>
        <tbody>
            {clientsPaginated.map((client) => (
                <tr key={client[rowKey]} className='[&>*]:text-right'>
                    <td className="border-b-0 lg:w-6 before:hidden">
                    </td>
                    {keyList.filter(key => key != rowKey).map((key, index) => <td key={index}>{client[key]}</td>)}
                    <td className="before:hidden lg:w-1 whitespace-nowrap">
                        <BaseButtons type="justify-start lg:justify-between" noWrap>
                            <BaseButton
                                color="danger"
                                icon={mdiTrashCan}
                                onClick={() => { danger(client[rowKey]) }}
                                small
                            />
                        </BaseButtons>

                    </td>
                </tr>
            ))
            }
        </tbody>
    </table>
} 