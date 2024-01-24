
const API_URL = import.meta.env.VITE_API_URL


//Load Data from API
export const Get_API = async () => {

    const response = await fetch(API_URL, { method: "GET" })
    const datajson = await response.json()
    const data = datajson['data']



    return data

}


export const Post_API = (NewItem) => {

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(NewItem)
    })


}


export const Put_API = async (NewItem) => {

    await fetch(`${API_URL}${NewItem.ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(NewItem)
    })
}
