import {gql} from 'apollo-boost';

export const directorsQuery = gql`
    query directorQuery($name: String){
        directors(name: $name){
            id
            name
        }
    }
`;