import { useEffect, useState } from "react";
import { fetchUserPlaces } from "../http";

export function useFetch(fetchFn, initalValue) {
	const [isFetching, setIsFetching] = useState();
	const [error, setError] = useState();
	const [fetchedData, setFetchedData] = useState(initalValue);

	useEffect(() => {
		async function fetchData() {
			setIsFetching(true);
			try {
				const data = await fetchFn();
				setFetchedData(data);
			} catch (err) {
				setError({ message: err.message || "Failed to fetch data." });
			}
			setIsFetching(false);
		}

		fetchData();
	}, [fetchFn]);

	return {
		isFetching,
		setFetchedData,
		fetchedData,
		error,
	};
}
