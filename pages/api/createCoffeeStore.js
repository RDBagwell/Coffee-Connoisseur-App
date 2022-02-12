const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIR_TABLE_API_KEY}).base(process.env.AIR_TABLE_API_BASE);



export default async function createCoffeeStore(req, res){

    const table = base('coffee-stores');

    const { id, name, locality, address, votes, imageURL } = req.body;

    try {
        if (req.method === 'POST') {
            // Find a record
            const findCoffeeStoreRecords = await table.select({
                filterByFormula: `id="${id}"`
            }).firstPage();
    
            if(findCoffeeStoreRecords.length !== 0){
                const records = findCoffeeStoreRecords.map((record)=>{
                    return {
                        ...record.fields
                    }
                })
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
                res.status(200).json({succsse: "Created Record", records: createRecords});
            }
    
            // res.status(200).json(req.body);
        } else {
            res.status(200).json({succsse: "Bad"});
        }
        
    } catch (error) {
        res.status(500).json({error: `Can't find Record... ${error}`})
    }


}