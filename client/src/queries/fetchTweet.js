import gql from 'graphql-tag';


export default gql`
    query tweet($id: ID){
        id
        tweet
        user{
            _id
            firstName
            lastName
        }
    }
`;