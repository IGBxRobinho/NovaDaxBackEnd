
export type  IExchange={
	amountPrecision: number,
	baseCurrency: string,
	minOrderAmount: string,
	minOrderValue: string,
	pricePrecision: number,
	quoteCurrency: string,
	status: string,
	symbol: string,
	valuePrecision: number
	Ticker:[{
		ask: string,
	    baseVolume24h: string,
	    bid: string,
	    high24h: string,
	    lastPrice: string,
	    low24h: string,
	    open24h: string,
	    quoteVolume24h: string,
	    symbol: string,
	    timestamp: Date
	}]
}