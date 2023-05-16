import axiosClient from "./axiosClient"

export const searchAPI = {
    search : ({keyword,isExplicit,amount}) =>  {
        const url = `search?term=${keyword}&media=music&limit=${amount}${!isExplicit ? '&explicit=no' : ''}`
        return axiosClient.get(url)
    }
}