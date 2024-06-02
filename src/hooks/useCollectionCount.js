import { useState, useEffect, useCallback } from "react";
import { db } from "@/helpers/firebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";

const useCollectionCount = (initialOptions = {}) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(!initialOptions.lazyFetch);
    const [error, setError] = useState(null);
    const [fetched, setFetched] = useState(false);

    const fetchCount = useCallback(async (options) => {
        setLoading(true);
        try {
            const { collectionName, parentCollection, parentDocId, subCollection } = options || initialOptions;
            let collectionRef;

            if (parentCollection && parentDocId && subCollection) {
                collectionRef = collection(doc(db, parentCollection, parentDocId), subCollection);
            } else if (collectionName) {
                collectionRef = collection(db, collectionName);
            } else {
                throw new Error("Either collectionName or (parentCollection, parentDocId, subCollection) must be provided in options.");
            }

            const docsSnap = await getDocs(collectionRef);
            const docsCount = docsSnap.size;
            setCount(docsCount);
            setError(null);
            setFetched(true);
            return { id: parentDocId, count: docsCount, error: null };  // Include id here
        } catch (e) {
            setError(e);
            setCount(0);
            setFetched(true);
            return { id: parentDocId, count: 0, error: e };  // Include id here
        } finally {
            setLoading(false);
        }
    }, [initialOptions]);

    useEffect(() => {
        if (!initialOptions.lazyFetch && !fetched) {
            fetchCount().catch(e => console.error(e));
        }
    }, [fetchCount, initialOptions.lazyFetch, fetched]);

    if (initialOptions.lazyFetch) {
        return [fetchCount, { count, loading, error }];
    }

    return { count, loading, error };
};

export default useCollectionCount;
