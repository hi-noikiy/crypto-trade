var ccxt = require ('ccxt');

async function outputTrade(inputTrade) {

let exchange = new ccxt[inputTrade.exchange] (); //inputTrade.exchange = kraken
let ticker = await exchange.fetchTicker (inputTrade.pair);

// check the highest bid price
if(ticker.high >=inputTrade.price){
    return {};
}else{
    let orderBook = await exchange.fetchOrderBook (inputTrade.pair);
    let outputTradeObj = {};
    let maxBidPrice = null;
    for(let bid of orderBook.bids){
        if(bid[1] >= inputTrade.volume){
            maxBidPrice = bid[0];
            break;
        }
    }
    let rollbackData = {
        pair: inputTrade.pair,
        exchange: inputTrade.exchange,
        volume: inputTrade.volume,
        price: maxBidPrice,
        direction: 'sell',
        loss: (inputTrade.price - maxBidPrice)/inputTrade.price
    };
    outputTradeObj["rollback"] = rollbackData;
    return outputTradeObj;
}

};
module.exports.outputTrade = outputTrade;
