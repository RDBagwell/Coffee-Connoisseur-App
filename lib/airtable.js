const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIR_TABLE_API_KEY}).base(process.env.AIR_TABLE_API_BASE);
const table = base('coffee-stores');
 
function getMinifiedRecord(record){
    return {
        ...record.fields
    }
}

function getMinifiedRecords(records){
    return records.map((record)=>getMinifiedRecord(record));
}


async function findRecordByFilter(id) {

    const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id="${id}"`
    }).firstPage();

    return getMinifiedRecords(findCoffeeStoreRecords);
}

export {
    table,
    getMinifiedRecords,
    findRecordByFilter
}
