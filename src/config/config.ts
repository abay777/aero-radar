export const settings = {
  AirplaneListUrl: String(process.env.NEXT_PUBLIC_API_AIRPLANELIST_URL),
  AirportListUrl: String(process.env.NEXT_PUBLIC_API_AIRPORTLISTS_URL),
  ApiKey: String(process.env.NEXT_PUBLIC_API_KEY),
  ApiHost: String(process.env.NEXT_PUBLIC_API_HOST),
};

// export const options = {
//         method: 'GET',
//         url: String( 'https://flight-radar1.p.rapidapi.com/airlines/get-logos'),
//         // params: {
//         // bl_lat: '6.0',
//         // bl_lng: '68.0',
//         // tr_lat: '36.0',
//         // tr_lng: '97.0',
//         // limit: '300'  // Adjust the limit as needed
//         // },
//         headers: {
//         'x-rapidapi-key':settings.ApiKey ,
//         'x-rapidapi-host': settings.ApiHost
//         }
//     };

export const options = {
  method: "GET",
  url: "https://flight-radar1.p.rapidapi.com/flights/list-in-boundary",
  params: {
    bl_lat: "6.0",
    bl_lng: "68.0",
    tr_lat: "36.0",
    tr_lng: "97.0",
    limit: "100",
  },
  headers: {
    "X-RapidAPI-Key": "9e957b7ddfmshfff975666d142bbp19d1bbjsnc39dbac049c8",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};

export const headers = {
  "X-RapidAPI-Key": "9e957b7ddfmshfff975666d142bbp19d1bbjsnc39dbac049c8",
  "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
};
