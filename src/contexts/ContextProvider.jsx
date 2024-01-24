import React, { createContext, useContext, useEffect, useState } from "react"
import RichTextEditor from "react-rte";
import { Get_API, Post_API, Put_API } from './API'

const StateContext = createContext()


export const ContextProvider = ({ children }) => {


    // ==============================================================================================================================================================
    // Define Variable
    // ==============================================================================================================================================================


    const [editorValue, seteditorValue] = useState(RichTextEditor.createValueFromString("", "html")) // Content inside the richEditor
    const [NotesList, setNotesList] = useState([])                                                   //Array of current Sticky Notes Data
    const [display_NotesList, setdisplay_NotesList] = useState([])                                   // Array of current Sticky Notes Data After filtering
    const [CurrentItemID, setCurrentItemID] = useState(0)                                            // ID of current editing Item, if =0 then new Item
    const [isOpenSplit, setisOpenSplit] = useState(false)                                            // is left-hand-side filter window opened
    const [CategoryFilter, setCategoryFilter] = useState(null)                                       // Selected Filter for Category
    const [SubCategoryFilter, setSubCategoryFilter] = useState(null)                                 // Selected Filter for Sub-Category




    // ==============================================================================================================================================================
    // Use Effect
    // ==============================================================================================================================================================


    // Get Data
    useEffect(() => {

        load_data()

    }, []);



    // Sorting and Update display table every NotesList or Filter change
    useEffect(() => {

        Sorting_func()
        Update_DisplayTable()

    }, [CategoryFilter, SubCategoryFilter, NotesList])



    // ==============================================================================================================================================================
    // Function
    // ==============================================================================================================================================================

    // 1. Load Data from API
    const load_data = async () => {

        const data = await Get_API()

        setNotesList(data)
        setdisplay_NotesList(data.filter(item => item.isDelete != 1))

    }



    // -------------------------------------------------------------------------------------------------------------------------------------------------------------



    // Rich Text Area Value
    const EditorValueOnchange = (value) => {
        seteditorValue(value)
    };



    // -------------------------------------------------------------------------------------------------------------------------------------------------------------

    //  Clear All input box
    const ClearInput = () => {

        setCurrentItemID(0)

        seteditorValue(RichTextEditor.createValueFromString("", "html"))
        document.getElementById('cat').value = ''
        document.getElementById('subcat').value = ''
        document.getElementById('title').value = ''

    }



    // -------------------------------------------------------------------------------------------------------------------------------------------------------------


    // Add New Record
    const AppendNewItem = (NewCategory, NewSubCategory, NewTitle, NewContent) => {

        const NewID = NotesList.reduce((a, b) => a.ID > b.ID ? a : b).ID + 1
        const NewItem = { ID: NewID, Category: NewCategory, SubCategory: NewSubCategory, Title: NewTitle, Content: NewContent }

        setNotesList([...NotesList, NewItem])
        Post_API(NewItem)

    }


    // Update existing Note
    const UpdateItem = (NewCategory, NewSubCategory, NewTitle, NewContent) => {

        const NewItem = { ID: CurrentItemID, Category: NewCategory, SubCategory: NewSubCategory, Title: NewTitle, Content: NewContent }
        const Copy_List = NotesList.map((item) => {

            if (item.ID == CurrentItemID) {

                return { ...item, Category: NewCategory, SubCategory: NewSubCategory, Title: NewTitle, Content: NewContent }
            }

            return item
        })


        setNotesList(Copy_List)
        Put_API(NewItem)

    }



    // Press Submit Button
    const handleSubmitBtn = () => {

        const NewCategory = document.getElementById('cat').value
        const NewSubCategory = document.getElementById('subcat').value
        const NewTitle = document.getElementById('title').value
        const NewContent = editorValue.toString('html')


        if (CurrentItemID == 0) {

            AppendNewItem(NewCategory, NewSubCategory, NewTitle, NewContent)


        } else {

            UpdateItem(NewCategory, NewSubCategory, NewTitle, NewContent)
        }


        // Clear All input box
        ClearInput()
    }




    // -------------------------------------------------------------------------------------------------------------------------------------------------------------



    // Double Click Sticky Notes and Edit it
    const Modify_item = (e) => {

        const formElement = document.getElementsByClassName("form")

        if (formElement) {
            formElement[0].scrollIntoView({ behavior: 'smooth' });
        }


        if (CurrentItemID == 0 || CurrentItemID != e.currentTarget.id) {

            setCurrentItemID(parseInt(e.currentTarget.id))
            const current_Item = NotesList.filter((item) => item.ID == e.currentTarget.id)[0]


            document.getElementById('cat').value = current_Item.Category
            document.getElementById('subcat').value = current_Item.SubCategory
            document.getElementById('title').value = current_Item.Title
            seteditorValue(RichTextEditor.createValueFromString(current_Item.Content, "html"))


        } else {

            // Leave Edit Mode if double click again
            ClearInput()

        }

    }



    // -------------------------------------------------------------------------------------------------------------------------------------------------------------



    // Confirm box when click delete, if click yes then delete those 
    const ComfirmBoxAlert = (e) => {

        let DeleteID = parseInt(e.currentTarget.id)




        if (confirm('Confirm to Delete this Sticky Note?')) {

            const Update_isDelete_List = NotesList.map((item) => {

                if (item.ID == DeleteID) {

                    Put_API({ ...item, isDelete: 1 })
                    return { ...item, isDelete: 1 }
                }

                return item

            })



            setNotesList(Update_isDelete_List)

        }


    }



    // -------------------------------------------------------------------------------------------------------------------------------------------------------------


    // Sorting by ID
    const Sorting_func = () => {

        NotesList.sort((a, b) => {
            if (a.ID < b.ID) {
                return -1
            } else {
                return 1
            }
        })

    }



    // -------------------------------------------------------------------------------------------------------------------------------------------------------------


    // Update display table
    const Update_DisplayTable = () => {

        let display

        if (CategoryFilter != null & SubCategoryFilter != null) {

            display = NotesList.filter((item) => item.Category == CategoryFilter & item.SubCategory == SubCategoryFilter)

        } else if (CategoryFilter != null & SubCategoryFilter == null) {

            display = NotesList.filter((item) => item.Category == CategoryFilter)

        } else if (CategoryFilter == null & SubCategoryFilter != null) {

            display = NotesList.filter((item) => item.SubCategory == SubCategoryFilter)

        } else {

            display = NotesList

        }

        setdisplay_NotesList(display.filter(item => item.isDelete != 1))



    }




    // ==============================================================================================================================================================
    // Return
    // ==============================================================================================================================================================



    return (

        <StateContext.Provider value=
            {{
                editorValue, seteditorValue,
                NotesList, setNotesList,
                display_NotesList, setdisplay_NotesList,
                CurrentItemID, setCurrentItemID,
                isOpenSplit, setisOpenSplit,
                CategoryFilter, setCategoryFilter,
                SubCategoryFilter, setSubCategoryFilter,
                load_data,
                EditorValueOnchange,
                handleSubmitBtn,
                Modify_item,
                ComfirmBoxAlert,
                Sorting_func,
                Update_DisplayTable,
                ClearInput

            }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext)










