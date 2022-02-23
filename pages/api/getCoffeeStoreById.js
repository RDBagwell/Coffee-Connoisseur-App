import {findRecordByFilter} from '../../lib/airtable';


export default async function getCoffeeStoreById(req, res){

    try {
        const {id} = req.query;
        if(!id){
            res.status(400).json({error: 'Missing ID.'})
        } else {
            const records = await findRecordByFilter(id)
            res.status(200).json(records);

        }
        // const response = await getCoffeeShops(latLong, limit);
    } catch (error) {
        console.error('error', error)
        res.status(500).json({error: error})
    }
}