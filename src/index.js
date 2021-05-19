const  express  = require('express');
const  cors = require('cors');
const Request = require('request');

const app = express();
app.use(cors());

const url =  'https://api.novadax.com/v1/common/symbols';
const urlDetail = 'https://api.novadax.com/v1/market/ticker?symbol='
const repositories = []
const repositorieDetail = []

Request.get(url, {json: true }, ( error, response, body ) => {	
	if(error){
		return console.log(error);
	}		
 	body.data.map(
		 exchange => {	
			repositories.push({
				amountPrecision: exchange.amountPrecision,
				baseCurrency: exchange.baseCurrency,
				minOrderAmount: exchange.minOrderAmount,
				minOrderValue: exchange.minOrderValue,
				pricePrecision: exchange.pricePrecision,
				quoteCurrency: exchange.quoteCurrency,
				status: exchange.status,
				symbol: exchange.symbol,
				valuePrecision: exchange.valuePrecision,
				Ticker: [],
			});						
			
			Request.get(`${urlDetail}${exchange.symbol}`, {json: true}, (error, response, body) =>{
				if(error){
					return console.log(error)					
				}							

				repositorieDetail.push(body.data);
				
			});
		})
});

app.get('/exchange', (request, response) =>{ 
	
	repositories.map( repMap => {
		repositorieDetail.map( repoDetail =>{
			const repoIndex = repositories.findIndex( (repo) => repo.symbol === repoDetail.symbol)
			const repoDetailIndex = repositorieDetail.findIndex( (repoDetail) => repoDetail.symbol === repMap.symbol)

			if(repoIndex  < 0 && repoDetailIndex < 0 ){
				return response.status(400).json({ error: 'Reposiory detail not fond...'})
			}
			repositories[repoIndex].Ticker = {
				ask: repoDetail.ask,
				baseVolume24h: repoDetail.baseVolume24h,
				bid: repoDetail.bid,
				high24h: repoDetail.high24h,
				lastPrice: repoDetail.lastPrice,
				low24h: repoDetail.low24h,
				open24h: repoDetail.open24h,
				quoteVolume24h: repoDetail.quoteVolume24h,
				symbol: repoDetail.symbol,
				timestamp: repoDetail.timestamp
			};
		})				
	})	
	return response.json(repositories) 
	//	return response.json(repositories) 
});

app.listen(3333, () =>{
	console.log('My back end')
})

