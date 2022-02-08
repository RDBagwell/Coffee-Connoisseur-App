import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY
});


const getCoffeeShopImageUrls = async ()=>{
    const photos = await unsplashApi.search.getPhotos({
        query: 'coffee shop',
        perPage: 6,
     });

    const unsplashResauls = photos.response.results
    return unsplashResauls.map((result) => {return result.urls['small']})
}

export  const  getCoffeeShops = async (latLaong)=>{
    const query = 'Coffee Shop';
    const coords = latLaong || '40.3832832,-111.8404608';
    const radius = 8047;
    const excludeChains = true;
    const fields = ['fsq_id','name','location','distance'];
    const limit = 6;
    const shopPhotos = await getCoffeeShopImageUrls();

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: process.env.FOUR_SQR_API_KEY
      }
    };
  
    const responce = await fetch(`https://api.foursquare.com/v3/places/search?query=${query}&ll=${coords}&radius=${radius}&exclude_chains=${excludeChains}&fields=${fields.join(',')}&sort=RELEVANCE&limit=${limit}`, options);
    const data = await responce.json();
    return data.results.map((shop, idx)=>{
        return {
            ...shop,
            imageURL: shopPhotos[idx]
        }
    })
}