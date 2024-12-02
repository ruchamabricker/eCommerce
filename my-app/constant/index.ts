export const tickersFutures = [
    { symbol: "ES=F", shortName: "S&P 500 Futures" },
    { symbol: "NQ=F", shortName: "NASDAQ Futures" },
    { symbol: "YM=F", shortName: "Dow Jones Futures" },
    { symbol: "RTY=F", shortName: "Russell 2000 Futures" },
    { symbol: "CL=F", shortName: "Crude Oil" },
    { symbol: "GC=F", shortName: "Gold" },
    { symbol: "SI=F", shortName: "Silver" },
    { symbol: "EURUSD=X", shortName: "EUR/USD" },
    { symbol: "^TNX", shortName: "10 Year Bond" },
    { symbol: "BTC-USD", shortName: "Bitcoin" },
  ];
  
  export const tickerAfterOpen = [
    { symbol: "^GSPC", shortName: "S&P 500" },
    { symbol: "^IXIC", shortName: "NASDAQ" },
    { symbol: "^DJI", shortName: "Dow Jones" },
    { symbol: "^RUT", shortName: "Russell 2000" },
    { symbol: "CL=F", shortName: "Crude Oil" },
    { symbol: "GC=F", shortName: "Gold" },
    { symbol: "SI=F", shortName: "Silver" },
    { symbol: "EURUSD=X", shortName: "EUR/USD" },
    { symbol: "^TNX", shortName: "10 Year Bond" },
    { symbol: "BTC-USD", shortName: "Bitcoin" },
  ];


  export function getMarketSentiment(changePercentage: number | undefined){
    if(!changePercentage) return "neutral"
    if(changePercentage > 0.1) return "bullish";
    else if(changePercentage < -0.1) return "bearish";
    else return "neutral"
  }

 export const SUGGESTIONS = [
    { ticker: "TSLA", title: "Tesla Inc." },
    { ticker: "NVDA", title: "NVIDIA Corporation" },
    { ticker: "AAPL", title: "Apple Inc." },
    { ticker: "MSFT", title: "Microsoft Corporation" },
    { ticker: "GOOGL", title: "Alphabet Inc." },
    { ticker: "AMZN", title: "Amazon.com Inc." },
  ];