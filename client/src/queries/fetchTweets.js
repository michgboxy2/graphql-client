import gql from 'graphql-tag';


export default gql`
    {
        tweets{
            id
            tweet
            user{
                _id
                firstName
                lastName
            }
        }
    }
`;