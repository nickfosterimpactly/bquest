const axios = require('axios');

module.exports = async (req, res) => {
    const { AIRTABLE_BASE_URL, AIRTABLE_PERSONAL_ACCESS_TOKEN } = process.env;
    const recordId = 'recrvRLz65NlQzRUa'; // Your specific Record ID
    const config = {
        headers: {
            'Authorization': `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const fields = [
            'fldQmkNFcFXEYuYAU', // Field ID for "Size (kW) (Internal)"
            'fldVmbWULtw7wG5oM', // Field ID for "Size (kW) (Total)"
            'fldG4mBQEEcxIfOsC', // Field ID for "Energy Savings for Communities"
            'fldhhWdhTtaQqJwGt'  // Field ID for "Lifetime C02 Saved (Tons)"
        ];
        const url = `${AIRTABLE_BASE_URL}/${recordId}?fields[]=${fields.join('&fields[]=')}`;
        const response = await axios.get(url, config);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching data from Airtable:', error.response || error.message);
        res.status(500).json({ error: error.message || 'Failed to fetch data' });
    }
};
