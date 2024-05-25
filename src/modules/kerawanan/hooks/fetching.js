import { useState, useEffect } from "react";
import { db } from "@/helpers/firebaseConfig";
import { firestoreErrorHandler } from "@/helpers/firestore";
import { collection, getDocs } from "firebase/firestore";

const RW_COLLECTION_NAME = 'rw';

export const getRwList = () => {
    const [faskesList, setFaskesList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFaskesList = async () => {
        try {
            const faskesCollectionRef = collection(db, RW_COLLECTION_NAME);
            const docsSnap = await getDocs(faskesCollectionRef);
            const faskesList = docsSnap.docs.map((snap) => snap.data());
            return { data: faskesList, error: null} ; 
        } catch (e) {
            firestoreErrorHandler(e);
            return { data: null, error: e };
        }
    } 
  
    useEffect(() => {
      const getFaskesList = async () => {
        const { data, error } = await fetchFaskesList();
        if (data) setFaskesList(data);
        if (error) setError(error);
        setLoading(false);
      };
  
      getFaskesList();
    }, []);
  
    return { data: faskesList, loading, error };
};