const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIR_TABLE_API_KEY}).base(process.env.AIR_TABLE_API_BASE);

const table = base('coffee-stores');