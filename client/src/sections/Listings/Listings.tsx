import React from 'react';
import { server } from '../../lib/api/server';
import useQuery from '../../lib/api/useQuery';
import {
    DeleteListingData,
    DeleteListingVariables, ListingsData
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
    const { data, refetch } = useQuery<ListingsData>(LISTINGS);
    const listings = data ? data.listings : null;

    const deleteListing = async (id: string) => {
        await server.fetch<DeleteListingData, DeleteListingVariables>({
            query: DELETE_LISTING,
            variables: {
                id
            }
        });

        refetch();
    };

    const listingsList = listings ?
        listings.map(listing => (
            <li key={ listing.id }>
                { listing.title }
                <button onClick={ () => deleteListing(listing.id) }>Delete</button>
            </li>
        )) : null;

    return (
        <ul>
            { listingsList }
        </ul>
    );
};

export default Listings;