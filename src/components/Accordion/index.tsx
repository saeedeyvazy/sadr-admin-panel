import React from 'react'
export const Accordion = ({ title, children, id, onClick }) => {
	return (
		<>
			<div className='tab w-full overflow-hidden' onClick={onClick}>
				<input
					className='absolute opacity-0 '
					id={id}
					type='checkbox'
					name='tabs'
				/>
				<label
					className='block p-5 hover:text-black transition duration-300 leading-normal cursor-pointer'
					htmlFor={id}
				>
					{ }
				</label>
				<div className='tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal'>
					{children}
				</div>
			</div>
		</>
	)
}


