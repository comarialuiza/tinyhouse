import React from 'react';
import { server } from '../../lib/api/server';
import {
    ListingsData,
    DeleteListingData,
    DeleteListingVariables
} from './types';

const LISTINGS = `
    query Listings {
        listings {
            id
            title
            image
            address
            price
            numOfGuests
            numOfBeds
            rating
        }
    }
`;

const DELETE_LISTING = `
    mutation DeleteListing($id: ID!) {
        deleteListing(id: $id) {
            id
        }
    }
`;

const Listings = () => {
    const fetchListings = async () => {
        const { data } = await server.fetch<ListingsData>({ query: LISTINGS });

        console.log(data);
    }

    const deleteListings = async () => {
        const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>({
            query: DELETE_LISTING,
            variables: {
                id: "60c5663ce625170dbcc65e4d"
            }
        });

        console.log(data);
    }

    return (
        <>
            <button onClick={ fetchListings }>Fetch listings</button>
            <button onClick={ deleteListings }>Delete listings</button>
        </>
    );
};

export default Listings;