import { useState, useCallback } from "react";
import { db } from "@root/firebaseConfig";
import { collection, doc, addDoc } from "firebase/firestore";

const useAddDoc = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addDocument = useCallback(async (options) => {
        setLoading(true);
        try {
            const { collection: collectionName, parentCollection, parentDocId, subCollection, docData } = options;
            let collectionRef;

            if (parentCollection && parentDocId && subCollection) {
                // Reference to the subcollection
                const parentDocRef = doc(db, parentCollection, parentDocId);
                collectionRef = collection(parentDocRef, subCollection);
            } else if (collectionName) {
                // Reference to the main collection
                collectionRef = collection(db, collectionName);
            } else {
                throw new Error("Collection path is not provided in options.");
            }

            const docRef = await addDoc(collectionRef, docData);
            setLoading(false);
            setError(null);
            return { id: docRef.id, ...docData };
        } catch (e) {
            setLoading(false);
            setError(e);
            throw e;
        }
    }, []);

    return { addDocument, loading, error };
};

export default useAddDoc;
