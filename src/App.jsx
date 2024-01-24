import React, { useEffect } from 'react'
import RichTextEditor from "react-rte";
import parse from "html-react-parser";
import { VscChromeClose } from "react-icons/vsc";
import { HiViewList } from "react-icons/hi";
import './App.css'
import FilterSplit from './FilterSplit'
import { useStateContext } from '../src/contexts/ContextProvider'


const App = () => {


    const {
        editorValue,
        NotesList,
        display_NotesList,
        isOpenSplit, setisOpenSplit,
        setCategoryFilter,
        setSubCategoryFilter,
        EditorValueOnchange,
        handleSubmitBtn,
        Modify_item,
        ComfirmBoxAlert,
        ClearInput

    } = useStateContext()





    return (

        <div>

            {isOpenSplit && (<FilterSplit NotesList={NotesList} setisOpenSplit={setisOpenSplit} isOpenSplit={isOpenSplit} setCategoryFilter={setCategoryFilter} setSubCategoryFilter={setSubCategoryFilter} />)}


            <div className="container">


                <button className='open-filter' style={{ opacity: isOpenSplit ? '0%' : '100%' }} onClick={() => setisOpenSplit(true)}>
                    <HiViewList />
                </button>



                {/* Form */}
                <div name='form' className="form">

                    <div id='input-container'>

                        <div className="input-box">
                            <label htmlFor="category">Category:</label>
                            <input id='cat' type="text" />
                        </div>


                        <div className="input-box">
                            <label htmlFor="subcategory">Sub-category:</label>
                            <input id='subcat' type="text" />
                        </div>


                        <div className="input-box">
                            <label htmlFor="title">Title:</label>
                            <input id='title' type="text" />
                        </div>

                    </div>


                    <RichTextEditor id='richtext' value={editorValue} onChange={EditorValueOnchange} />


                    <button className='InputForm_Btn' id='submit' onClick={handleSubmitBtn}>Submit</button>
                    <button className='InputForm_Btn' id='clear' onClick={ClearInput}>Clear</button>

                </div>




                <div className='sticky-notes-container'>

                    {display_NotesList.map((note_item) => (


                        <div key={note_item.ID} id={note_item.ID} className='item-container' onDoubleClick={(e) => { Modify_item(e) }}>


                            <button id={note_item.ID} onClick={(e) => { ComfirmBoxAlert(e) }} className='delete-btn'>
                                <VscChromeClose className='closebtn-img' />
                            </button>


                            <div className="sticky-head">
                                <label className='intro title'>{note_item.Title}</label>

                                <div className='cat-group'>
                                    <label className='intro-cat category'>Category:<span>{note_item.Category}</span></label>
                                    <label className='intro-cat subcategory'>Sub-Category:<span>{note_item.SubCategory}</span></label>
                                </div>
                            </div>


                            <div id="content">
                                {parse(note_item.Content)}
                            </div>






                        </div>
                    ))}
                </div>


            </div>


        </div >
    )
}

export default App