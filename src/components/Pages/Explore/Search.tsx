import React from 'react'

const Search = () => {
    return (
        <>

            <form className=" flex md:flex-row gap-3 m-10">
                <div className="flex ">
                    <input type="text" placeholder="Search for projects"
                        className="  w-[60vw] px-3 h-10 rounded-l border-2 border-black focus:outline-none focus:border-black"
                    />
                    <button type="submit" className="bg-black text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
                </div>
                <select id="pricingType" name="pricingType"
                    className=" h-10 border-2 border-black focus:outline-none focus:border-black text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                    <option value="All" selected="">All</option>
                    <option value="Openscience">Open Science Projects</option>
                    <option value="Opensource">Open Source Projects</option>
                </select>
                <select id="pricingType" name="pricingType"
                    className=" h-10 border-2 border-black focus:outline-none focus:border-black text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                    <option value="All" selected="">All</option>
                    <option value="beginner">Beginner</option>
                    <option value="Medium">Medium</option>
                    <option value="Expert">Expert</option>
                </select>
            </form>
        </>
    )
}
export default Search