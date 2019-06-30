class ApiCallService {

    private blockboxApiEndpoint: string;

    constructor () {
        this.blockboxApiEndpoint = process.env.REACT_APP_BLOCKBOX_API_ENDPOINT!;
        console.log(process.env)
        if (this.blockboxApiEndpoint === undefined) { throw Error('Missing BLOCKBOX_API_ENDPOINT'); }
    }
    
    public sendRequest = async (requestMethod: string, route: string, queryParams = null, body = null) => {

        if (!requestMethod || !route) return;

        let query = queryParams ? Object.keys(queryParams!)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(queryParams![k]))
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
}
export default new ApiCallService();
