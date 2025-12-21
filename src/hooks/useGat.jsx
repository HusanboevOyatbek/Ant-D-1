import axios from 'axios';
import React, { useEffect, useState } from 'react'

function useGat(url) {
    const [data , setData] = useState([]);
    async function getData(){
        try{
            let res = await axios.get(`https://69149aa43746c71fe048ece9.mockapi.io/${url}`);
            setData(res.data);
        }catch(err){
            console.log(err.response.data);
            
        }
    }

    useEffect(()=>{
        getData()
    } , [])
  return {
    data , getData
  }
}

export default useGat