import {getCoffeeShops} from '../../lib/coffee-shops';

export default async function getCoffeeStoreByLocation(req, res){

    try {
        const {latLong, limit} = req.query;
        const response = await getCoffeeShops(latLong, limit);
        res.status(200).json(response)
    } catch (error) {
        console.error('error', error)
        res.status(500).json({error: error})
    }
}