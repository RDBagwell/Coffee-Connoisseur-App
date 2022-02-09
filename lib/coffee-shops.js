import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
});


const getCoffeeShopImageUrls = async (limit)=>{
    const photos = await unsplashApi.search.getPhotos({
        query: 'coffee shop',
        perPage: limit,
     });

    const unsplashResauls = photos.response.results
    return unsplashResauls.map((result) => {return result.urls['small']})
}

export  const  getCoffeeShops = async (latLaong = '40.778348,-111.8951122', limit=6, distance=10)=>{
    const miles = Math.ceil(distance * 1609.344);
    const query = 'Coffee Shop';
    const coords = latLaong;
    const radius = miles;
    const excludeChains = true;
    const fields = ['fsq_id','name','location','distance'];
    const searchLimit = limit;
    const shopPhotos = await getCoffeeShopImageUrls(limit);

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_FOUR_SQR_API_KEY
      }
    };
  
    const responce = await fetch(`https://api.foursquare.com/v3/places/search?query=${query}&ll=${coords}&radius=${radius}&exclude_chains=${excludeChains}&fields=${fields.join(',')}&sort=RELEVANCE&limit=${searchLimit}`, options);
    const data = await responce.json();
    return data.results.map((shop, idx)=>{
        return {
            // ...shop,
            fsq_id: shop.fsq_id,
            name: shop.name,
            address: shop.location.address,
            locality: shop.location.locality,
            imageURL: shopPhotos[idx]
        }
    })
}