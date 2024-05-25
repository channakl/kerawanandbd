import { useState, useEffect } from "react";
import { db } from "@/helpers/firebaseConfig";
import { firestoreErrorHandler } from "@/helpers/firestore";
import { collection, getDocs } from "firebase/firestore";

export const useFetchingDocs = (collectionName) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDocs = async () => {
        try {
            const collectionRef = collection(db, collectionName);
            const docsSnap = await getDocs(collectionRef);
            const docsData = docsSnap.docs.map((snap) => snap.data());
            return { data: docsData, error: null} ; 
        } catch (e) {
            firestoreErrorHandler(e);
            return { data: null, error: e };
        }
    } 
  
    useEffect(() => {
      const getDocsData = async () => {
        const { data, error } = await fetchDocs();
        if (data) setData(data);
        if (error) setError(error);
        setLoading(false);
      };
  
      getDocsData();
    }, []);
  
    return { data: data, loading, error };
};