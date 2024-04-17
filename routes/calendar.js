export default async function calendar(app, options) {
    const events = app.mongo.db.collection('eventos');
    const data = app.mongo.db.collection('datas')

    app.get('/calendar', 
        {
            config: {
                logMe: true,
                requireAuthentication: true
            }
        }, 
        async (request, reply) => {
            return await events.find().toArray();
        }
    );

    app.post('/calendar', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    eventName: { type: 'string' },
                    data: { type: 'string' },
                    time: { type: 'string' },
                    description: { type: 'string' } 
                },
                required: ['_id', 'eventName', 'data', 'time']
            }
        },
        config: {
            requireAuthentication: true,
            checkAdmin: true
        }
    }, async (request, reply) => {
        let thisEvent = request.body;
        let dataData = {
            "_id": thisEvent._id,
            "data": thisEvent.data,
            "time": thisEvent.time
        }
        await events.insertOne(thisEvent);
        await data.insertOne(dataData)
        return reply.code(201).send();
    });
}