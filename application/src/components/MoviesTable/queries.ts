import { gql } from "@apollo/client";

export const moviesQuery = gql`
    query moviesQuery($name: String){
        movies(name: $name){
            id
            name
            genre
            rate
            watched
            director{
                name
                id
            }
        }
    }
`;