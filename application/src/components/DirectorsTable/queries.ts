import { gql } from "@apollo/client";


export const directorsQuery = gql`
    query directorQuery($name: String){
        directors(name: $name){
            id
            name
            age
            movies{
                id
                name
            }
        }
    }
`;