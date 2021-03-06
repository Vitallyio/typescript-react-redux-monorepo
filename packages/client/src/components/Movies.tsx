import * as React from 'react';

// We assume the server will return directors/movies that obey this shape, but we
// can't really ensure it
interface IDirector {
  readonly id: string;
  readonly createdAt: string;
  name: string;
}

interface IMovie {
  readonly id: string;
  readonly createdAt: string;
  name: string;
  readonly director: IDirector;
}

interface IMoviesProps {}

interface IMoviesState {
  fetching: boolean;
  movies: Array<IMovie>;
}

export default class Movies extends React.Component<IMoviesProps, IMoviesState> {
  public state: IMoviesState = {
    fetching: false,
    movies: []
  }

  public componentDidMount() {
    // Send an API request to fetch movies on mount
    const fetchOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    };

    this.setState({
      fetching: true
    });

    fetch('http://localhost:5000/v1/movies', fetchOptions).then((response: Response) =>
      response.json().then((movies: Array<IMovie>) => {
        if (!response.ok) {
          // TODO: Display error
        }

        this.setState({
          movies,
          fetching: false
        });
      })
    );
  }

  public render() {
    const { fetching, movies } = this.state;

    if (fetching) {
      return <div>Loading...</div>
    };

    return (
      <ul>
        {movies.map(this.renderMovie)}
      </ul>
    );
  }

  private renderMovie = (movie: IMovie) => (
    <li key={movie.id}>
      <strong>{movie.name}</strong> - {movie.director.name}
    </li>
  );
}
