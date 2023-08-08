export const requestData = (key: string | undefined, model: string, called: string, DocumentNum: number) => {
    return ({
        apiKey: key,
        modelName: model,
        calledMethod: called,
        methodProperties: {
            Documents: [
                {
                    DocumentNumber:DocumentNum,
                }
            ]
        }
    }
    )
}

export const requestCity = (key: string | undefined, model: string, called: string, city: string) => {
    return({
        apiKey: key,
        modelName: model,
        calledMethod: called,
        methodProperties:   {
                                CityName : city,
                            }
    })
}

export const requestRandomCity = (key: string | undefined) => {
    return ({
        apiKey: key,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties:   {
                            "Limit" : "20"
                            }
    })
}