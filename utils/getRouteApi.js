import axios from "axios";


const BASE_URL = `https://api.mapbox.com/directions/v5/mapbox/driving`;

export const getRouteLocation = async (coordinatA, coordinatB, pk) => {
    const url = `${BASE_URL}/${coordinatA[0]}%2C${coordinatA[1]}%3B${coordinatB[0]}%2C${coordinatB[1]}?alternatives=false&geometries=geojson&language=en&overview=full&steps=true&access_token=${pk}`
    try {
        const result = await axios.get(url)
        if (result.data.code === 'Ok') {
            return result.data.routes[0].geometry.coordinates
        }

    } catch (error) {
        console.log("Terjadi error saat memanggil api route ke mapbox", error.message)
    }
}

