class ApiCallService {

    private blockboxApiEndpoint: string;

    constructor () {
        this.blockboxApiEndpoint = process.env.REACT_APP_BLOCKBOX_API_ENDPOINT!;
        if (this.blockboxApiEndpoint === undefined) { throw Error('Missing BLOCKBOX_API_ENDPOINT'); }
    }
    
    private sendRequest = async (requestMethod: string, route: string, queryParams: null|{[x:string]:any} = null, body: null|object = null) => {

        if (!requestMethod || !route) return;

        let query = queryParams ? '?' + Object.keys(queryParams!)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(queryParams[k]))
            .join('&') : '';

        const requestParams: any = {
            headers: {
                "Content-Type": "application/json",
            },
            method: requestMethod,
        };
        if (body) { requestParams.body = JSON.stringify(body); }

        const response = await fetch(`${this.blockboxApiEndpoint}${route}${query}`, requestParams);
        const json = await response.json();

        return json;
    };

    public getMovies = async () => {
        return await this.sendRequest('GET', '/movies/search/')
    }

    public getRecommendations = async (userId: string, ) => {
        const queryparams = {
            count: 50
        }
        return await this.sendRequest('GET', '/users/recommendations/' + userId, queryparams)
    }

    public createUser = async () => {
        return await this.sendRequest('POST', '/users/', null, {name: 'blockbox_user'});
    }

    public getUserById = async (userId: string) => {
        return await this.sendRequest('GET', '/users/' + userId);
    }

    public searchMovies = async (query: string) => {
        return await this.sendRequest('GET', '/movies/search/' + encodeURIComponent(query));
    }

    public updateRatingsForUser = async (body: any) => {
        return await this.sendRequest('PUT', '/users/ratings', null, body);
    }

}
export default new ApiCallService();
