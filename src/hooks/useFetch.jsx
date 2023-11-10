import { useState, useEffect, useCallback } from 'react'
function useFetch() {

const [data,setData] = useState();

const getData = useCallback(async function getData(){
    const url= 'https://654c56b677200d6ba858bec7.mockapi.io/propiedad';
    const response = await fetch(url)
    const data = await response.json();
    setData(data);

},[]);

useEffect(() => {
    getData();
},[getData])


return{data};



}




export default useFetch;









