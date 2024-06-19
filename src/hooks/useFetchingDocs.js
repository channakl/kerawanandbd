import { useState, useEffect, useCallback } from "react";
import { db } from "@root/firebaseConfig";
import { firestoreErrorHandler } from "@/helpers/firestore";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

export const useFetchingDocs = (initialOptions = { lazyFetch: false }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(!initialOptions.lazyFetch);
    const [error, setError] = useState(null);
    const [fetched, setFetched] = useState(false);

    const fetchDocs = useCallback((options = {}) => {
        return new Promise(async (resolve, reject) => {
            setLoading(true);
            try {
                let collectionRef;

                if (options.parentCollection && options.parentDocId && options.subCollection) {
                    // Reference to the subcollection
                    collectionRef = collection(doc(db, options.parentCollection, options.parentDocId), options.subCollection);
                } else if (options.collection) {
                    // Reference to the main collection
                    collectionRef = collection(db, options.collection);
                } else {
                    throw new Error("Collection path is not provided in options.");
                }

                let q = collectionRef;
                if (options.where) {
                    const whereClauses = options.where;
                    whereClauses.forEach(([field, operator, value]) => {
                        q = query(q, where(field, operator, value));
                    });
                }

                const docsSnap = await getDocs(q);
                const docsData = docsSnap.docs.map((snap) => ({ id: snap.id, ...snap.data() }));
                setData(docsData);
                setError(null);
                setFetched(true);
                resolve(docsData);
            } catch (e) {
                firestoreErrorHandler(e);
                setData(null);
                setError(e);
                setFetched(true);
                reject(e);
            } finally {
                setLoading(false);
            }
        });
    }, []);

    useEffect(() => {
        if (!initialOptions.lazyFetch && !fetched) {
            fetchDocs(initialOptions).catch((e) => console.error(e)); // Handle initial fetch errors
        }
    }, [initialOptions, fetched, fetchDocs]);

    if (initialOptions.lazyFetch) {
        return [fetchDocs, { data, loading, error }];
    }

    return { data, loading, error };
};
