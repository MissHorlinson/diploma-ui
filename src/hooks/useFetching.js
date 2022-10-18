import { useState } from "react";

export const useFetching = (callback) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = () => {
        try {
            setIsLoading(true);
            callback();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error]
}