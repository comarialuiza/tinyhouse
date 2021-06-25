import { useMutation, useQuery, gql } from '@apollo/client';
import React from 'react';
import { Listings as ListingsData } from './__generated__/Listings'; 
import { DeleteListing as DeleteListingData, DeleteListingVariables } from './__generated__/DeleteListing'; 

const LISTINGS = gql`
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

const DELETE_LISTING = gql`
    mutation DeleteListing($id: ID!) {
        deleteListing(id: $id) {
            id
        }
    }
`;

const Listings = () => {
    const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
    const listings = data ? data.listings : null;

    const [deleteListing] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

    const handleDeleteListing = async (id: string) => {
        await deleteListing({
            variables: { id }
        });
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