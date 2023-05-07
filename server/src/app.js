const path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const mongo = require('./model/mongo.js');

const authApi = require('./api/api.auth.js');
const collectionApi = require('./api/api.collection.js');
const generalApi = require('./api/api.general.js');
const dashboardApi = require('./api/api.dashboard.js');
const favouriteApi = require('./api/api.favourite.js');

const app = express();
const router = express.Router();
const port = 3027;

const corsOptions = {
    origin: '*',
    methods: [],
    allowedHeaders: [],
    exposedHeaders: [],
    credentials: true
};

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const baseUrl = '/api/';

// -------------------------------
// Auth middleware
// -------------------------------

const authUrls = [
    '/auth/logout'
];

router.use(async function (req, res, next) {
    let status = 200;
    for (const authUrl of authUrls) {
        if (req.url.includes(authUrl)) {
            status = 401;
            if (req.headers.authorization) {
                const authHeader = req.headers.authorization.split(' ');
                if (authHeader.length == 2 && authHeader[0] == 'Bearer') {
                    const result2 = await authApi.verifyToken(authHeader[1]);
                    if (result2.success) {
                        status = 200;
                    }
                }
            }
        }
    }

    if (status == 200) {
        next();
    } else {
        res.status(401).send('Bad auth');
    }
}, cors(corsOptions));

app.use(baseUrl, router);

// -------------------------------
// Auth api
// -------------------------------

app.post(baseUrl + 'auth/signUp', async (req, res) => {
    const result = await authApi.signInOrUp(false, req.body);
    _wrapResponse(res, result);
});

app.post(baseUrl + 'auth/signIn', async (req, res) => {
    const result = await authApi.signInOrUp(true, req.body);
    _wrapResponse(res, result);
});

app.post(baseUrl + 'auth/attachEmail', async (req, res) => {
    const result = await authApi.attachEmail(true, req.body);
    _wrapResponse(res, result);
});

app.post(baseUrl + 'auth/attachWallet', async (req, res) => {
    const result = await authApi.attachWallet(true, req.body);
    _wrapResponse(res, result);
});

app.post(baseUrl + 'auth/updatePassword', async (req, res) => {
    const result = await authApi.updatePassword(_getBearerTokenFromRequest(req), req.body);
    _wrapResponse(res, result);
});

app.post(baseUrl + 'auth/logout', async (req, res) => {
    const result = await authApi.logout(_getBearerTokenFromRequest(req));
    _wrapResponse(res, result);
});

app.get(baseUrl + 'auth/favourites', async (req, res) => {
    const result = await collectionApi.getFavouriteCollectionItemsByOwner(_getBearerTokenFromRequest(req));
    res.send(result);
});

app.post(baseUrl + 'auth/favourites', async (req, res) => {
    const result = await favouriteApi.favouritesAdd(_getBearerTokenFromRequest(req), req.body);
    _wrapResponse(res, result);
});

app.delete(baseUrl + 'auth/favourites', async (req, res) => {
    const result = await favouriteApi.favouritesRemove(_getBearerTokenFromRequest(req), req.body);
    _wrapResponse(res, result);
});

app.get(baseUrl + 'auth/myNft', async (req, res) => {
    const result = await collectionApi.getCollectionItemsByOwner(_getBearerTokenFromRequest(req));
    res.send(result);
});

// -------------------------------
// General api
// -------------------------------

app.get(baseUrl + 'cronosUsdPrice', function (req, res, next) {
    res.json({ usd: cronosTokenUsdPrice });
});

app.get(baseUrl + 'projects', async function (req, res, next) {
    res.json(await generalApi.getProjects());
});

app.get(baseUrl + 'faq', async function (req, res, next) {
    res.json(await mongo.getFaq());
});

app.post(baseUrl + 'feedback', async function (req, res, next) {
    await generalApi.feedback(req.body);
    res.sendStatus(200)
});

// -------------------------------
// Dashboard api
// -------------------------------

app.get(baseUrl + 'dashboard/:days', async (req, res) => {
    const days = req.params.days;
    const result = await dashboardApi.dashboard(days);
    res.send(result);
});

app.get(baseUrl + 'topSales/:days', async (req, res) => {
    const days = req.params.days;
    const result = await collectionApi.topSales(_getBearerTokenFromRequest(req), days);
    res.send(result);
});

// -------------------------------
// Collection api
// -------------------------------

app.get(baseUrl + 'collection/:contractAddress/all', async (req, res) => {
    const contractAddress = req.params.contractAddress.toLowerCase();
    const page = req.query.page;
    const size = req.query.size;
    const rarity = req.query.rarity;
    const result = await collectionApi.getCollectionItems(_getBearerTokenFromRequest(req), contractAddress, page, size, rarity);
    res.send(result);
});

app.get(baseUrl + 'collection/:contractAddress/item/:tokenId', async (req, res) => {
    const contractAddress = req.params.contractAddress.toLowerCase();
    const tokenId = req.params.tokenId;
    const result = await collectionApi.getCollectionItem(_getBearerTokenFromRequest(req), contractAddress, tokenId);
    res.send(result);
});

app.get(baseUrl + 'mint/:collectionAddress', async (req, res) => {
    const collectionAddress = req.params.collectionAddress.toLowerCase();
    const result = await collectionApi.getMintByCollection(collectionAddress);
    res.send(result);
});

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
    mongo.init();

    await updateCronosTokenUsdPrice()

    setInterval(async () => {
        await updateCronosTokenUsdPrice();
    }, 60 * 1000 * 10);
});

// -------------------------------
// Http utils
// -------------------------------

function _wrapResponse(res, result) {
    if (result.success) {
        res.send(result);
    } else {
        res.status(result.httpErrorCode).send({
            success: false,
            reason: result.reason
        });
    }
}

function _getBearerTokenFromRequest(request) {
    if (request.headers['authorization']) {
        return request.headers['authorization'].split(' ')[1];
    } else {
        return undefined;
    }
}

// -------------------------------
// External crypto API
// -------------------------------

let cronosTokenUsdPrice = 0;

async function updateCronosTokenUsdPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=crypto-com-chain&vs_currencies=usd');
        const body = await response.json();
        cronosTokenUsdPrice = body['crypto-com-chain'].usd;
    } catch (e) {
        console.error(e);
    }
}