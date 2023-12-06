import React, { useState } from 'react'
import { AiFillCloseCircle } from "react-icons/ai";
import './FilterSplit.css'

const FilterSplit = ({ NotesList, setisOpenSplit, setCategoryFilter, setSubCategoryFilter }) => {

    const ThisList = NotesList.filter(item => item.isDelete != 1)

    const CategoryList = [...new Set(ThisList.map((item) => ({ Category: item.Category, SubCategory: item.SubCategory })))]
    const OnlyCategoryList = [...new Set(ThisList.map((item) => item.Category))]
    const [ExpandItem, setExpandItem] = useState(null)




    const ClearFilter = () => {
        setSubCategoryFilter(null)
        setCategoryFilter(null)
    }

    const CategoryClick = (catItem) => {

        setCategoryFilter(catItem)
        setSubCategoryFilter(null)
        setExpandItem(catItem)

    }


    const SubCategoryClick = (subcatItem) => {

        setSubCategoryFilter(subcatItem)

    }




    return (



        <div id='split-container'>


            <div id='split'>

                <button id='close-split' onClick={() => setisOpenSplit(false)}>
                    <AiFillCloseCircle />
                </button>


                <div id='option-container'>
                    {OnlyCategoryList.map((item) => (

                        <div key={item} className='big-category-gp'>


                            {/* Category */}
                            <button className='category-options' onClick={() => CategoryClick(item)} >
                                <div className='category-text'>{item}</div>
                            </button>



                            {/* Sub Category */}

                            {ExpandItem == item && [...new Set(CategoryList.filter((subItem) => subItem.Category == item).map((subItem) => subItem.SubCategory))].map((item => (

                                <button key={item} className='sub-category-options' onClick={() => SubCategoryClick(item)}>
                                    <div className='category-text'>{item}</div>
                                </button>

                            )))}

                        </div>
                    ))}
                </div>




                <div id='clear-filter'>
                    <button id='clear-filter-btn' onClick={() => ClearFilter()}>
                        Clear Filter
                    </button>
                </div>




            </div>

        </div >


    )


}

export default FilterSplit