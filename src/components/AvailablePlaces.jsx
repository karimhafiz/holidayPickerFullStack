import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

async function fetchSortedPlace() {
	const places = await fetchAvailablePlaces();

	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition((position) => {
			const sortedPlaces = sortPlacesByDistance(
				places,
				position.coords.latitude,
				position.coords.longitude
			);

			resolve(sortedPlaces);
		});
	});
}

// 	setAvailablePlace(sortedPlaces);
// 	setIsFetching(false);
// });
export default function AvailablePlaces({ onSelectPlace }) {
	const {
		isFetching,
		error,
		fetchedData: availabePlace,
		// setFetchedData: setAvailablePlace,
	} = useFetch(fetchSortedPlace, []);

	if (error) {
		return <Error title="An Error Occured!" message={error.message} />;
	}
	return (
		<Places
			title="Available Places"
			places={availabePlace}
			isloading={isFetching}
			loadingText={"Fetching Places Data..."}
			fallbackText="No places available."
			onSelectPlace={onSelectPlace}
		/>
	);
}
