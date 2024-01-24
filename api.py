from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import uvicorn



app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)




with open(r'backend\sourcedata.json','r', encoding='utf-8') as jsonfile:
            
    data = json.load(jsonfile)



def SaveToJson():
    
    with open(r'backend\destination.json','w', encoding='utf-8') as jsonfile:
         
        json.dump(data,jsonfile,indent=4)





@app.get("/", tags=["root"])
async def read_root() -> dict:
        
        return {"data": data}






@app.post("/")
async def add_notes(notes: dict) -> dict:
     
    data.append(notes)
    
    #SaveToJson()

    return {"message": "New Items added !!"}
     




@app.put("/{ID}")
async def update_notes(notes: dict) -> dict:
    
    for i, item in enumerate(data):
         
         if item['ID'] == notes['ID']:

            data[i] = notes   

    SaveToJson()


    return {"message": "Items updated !!"}     







 


# if __name__ == "__main__":
    
#     uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=True)

