const collectionApi = require('./api.collection.js');

async function dashboard(days) {
    const topSales = await collectionApi.topSales(undefined, days);

    let cronosTotal = 0;
    let captainsSold = 0;
    let islandsSold = 0;
    let shipsSold = 0;

    if (topSales) {
        topSales.forEach(sale => {
            cronosTotal += Number(sale.price);

            if (collectionApi.CaptainContractAddress() == sale.contractAddress) {
                captainsSold++;
            }
            if (collectionApi.ShipContractAddress() == sale.contractAddress) {
                shipsSold++;
            }
            if (collectionApi.IslandContractAddress() == sale.contractAddress) {
                islandsSold++;
            }
        });
    }

    return {
        tokenPerformance: {
            chainId: 25,
            chainName: 'Cronos',
            coinSymbol: 'CRO',
            performance: cronosTotal
        },
        captainsSold,
        islandsSold,
        shipsSold
    }
}

module.exports = {
    dashboard
};