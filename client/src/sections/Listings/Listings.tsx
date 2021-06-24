import React from 'react';
import useMutation from '../../lib/api/useMutation';
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
    const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
    const listings = data ? data.listings : null;

    const [deleteListing,
        {
            loading: deleteListingLoading,
            error: deleteListingError
        }
    ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

    const handleDeleteListing = async (id: string) => {
        await deleteListing({ id });
        refetch();
    };

    const listingsList = listings ?
        listings.map(listing => (
            <li key={ listing.id }>
                { listing.title }
                <button onClick={ () => handleDeleteListing(listing.id) }>Delete</button>
            </li>
        )) : null;

    if (loading) {
        return <h2>Loading...</h2>
    };

    if (error) {
        return <h2>Something went wrong - please try again later!</h2>
    }

    return (
        <ul>
            { listingsList }
        </ul>
    );
};

export default Listings;