import {gql} from 'apollo-boost';


export const addMovieMutation = gql`
    mutation addMovie($name: String, $genre: String, $directorId: ID, $rate: Int, $watched: Boolean){
        addMovie(name: $name, genre: $genre, directorId: $directorId, rate: $rate, watched: $watched){
            name
            genre
            directorId
            rate
            watched
        }
    }
`;