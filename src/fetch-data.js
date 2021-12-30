import {useEffect, useState} from "react";

const useFetchData = (fetchUrl) => {
    const [data, setData] = new useState(null);
    const [isLoading, setIsLoading] = new useState(true);
    const [error, setError] = new useState(null);

    useEffect(() => {
        const abort = new AbortController();

        fetch(fetchUrl, { signal: abort.signal })
            .then(res => {
                if(!res.ok){
                    throw Error('Could not fetch the data. Check an endpoint.')
                }
                return res.json()
            })
            .then((data) => {
                setData(data);
                setIsLoading(false)
            })
            .catch(err => {
                if (err.name === 'AbortError') console.log('fetch aborted');
                else {setError(err.message);
                setIsLoading(false)}
            })
            return () => abort.abort();
    }, [fetchUrl])

    return { data, isLoading, error }
}

export default useFetchData;