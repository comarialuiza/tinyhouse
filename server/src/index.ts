require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';
import { connectDatabase } from './database';

const port = process.env.PORT;

const mount = async (app: Application) => {
    const db = await connectDatabase();
    const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db }) });
    server.applyMiddleware({ app, path: '/api' });
    
    app.listen(port);

    const listings = await db.listings.find({}).toArray();
    console.log(listings);
}

mount(express());