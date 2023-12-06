//Load Data from API
export const Get_API = async () => {

    const response = await fetch('http://127.0.0.1:8000/', { method: "GET" })
    const datajson = await response.json()
    const data = datajson['data']



    return data

}


export const Post_API = (NewItem) => {

    fetch('http://127.0.0.1:8000/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(NewItem)
    })


}


export const Put_API = async (NewItem) => {

    await fetch(`http://127.0.0.1:8000/${NewItem.ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(NewItem)
    })
}
