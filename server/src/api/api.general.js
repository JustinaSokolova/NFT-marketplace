const mongo = require('../model/mongo.js');

async function getProjects() {
    const activeProjects = await mongo.getActiveProjects();
    const result = [];

    for (const p of activeProjects) {
        const project = {
            name: p.name,
            state: p.state,
            active: p.active,
            collections: []
        };

        for (const c of p.collections) {
            const collection = await mongo.getCollectionById(c);
            project.collections.push({
                name: collection.name,
                contractAddress: collection.contractAddress,
                chainId: collection.chainId,
            });
        }

        result.push(project);
    }

    return result;
}

async function feedback(userRequest) {
    await mongo.saveFeedback(userRequest.subject, userRequest.message, userRequest.from);
}

module.exports = {
    getProjects,
    feedback
};