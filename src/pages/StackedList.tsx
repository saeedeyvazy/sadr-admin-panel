export function StackedList({ list }) {

    return <div className="mx-auto w-full">
        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-5 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-5">
                <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600"> دانش آموزان شهرستان </p>
                    <label className="text-2xl font-bold  text-gray-600"> {list.shahrestan}</label>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">نفر</span>
                        <span className="text-5xl font-bold tracking-tight text-gray-900">{new Number(list.studentCount).toLocaleString('fa-ir')}</span>
                    </p>
                    <a href="#" className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{new Number(list.nesbat).toLocaleString('fa-ir')}%</a>
                    <p className="mt-6 text-xs leading-5 text-gray-600">از هر صد نفر در این شهرستان </p>
                    <label className="font-bold">{new Number(list.nesbat).toLocaleString('fa-ir')}</label>
                    <p className="mt-1   text-xs leading-5 text-gray-600"> .نفر قرآن آموز هستند</p>
                </div>
            </div>
        </div>
    </div>


}