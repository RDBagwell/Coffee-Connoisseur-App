import {table, getMinifiedRecords, findRecordByFilter} from '../../lib/airtable';

export default async function createCoffeeStore(req, res){

    const { id, name, locality, address, votes, imageURL } = req.body;

    try {

        if(!name || !id || !address){
            res.status(400).json({error: 'Missing data.'})
        } else {

            if (req.method === 'POST') {
                const findCoffeeStoreRecords = await findRecordByFilter(id);
    
                if(findCoffeeStoreRecords.length !== 0){
                    const records = findCoffeeStoreRecords;
                    res.status(200).json(records);
                } else {
                    const createRecords = await table.create([
                        {
                            "fields": {
                                id,
                                name,
                                locality,
                                address,
                                votes,
                                imageURL
                            }
                        }
                    ]);
                    res.status(200).json({succsse: "Created Record", records: getMinifiedRecords(findCoffeeStoreRecords)});
                }
                
            } else {
                res.status(200).json({succsse: "Bad"});
            }
            
        }
        
    } catch (error) {
        res.status(500).json({error: `Can't find Record... ${error}`})
    }


}