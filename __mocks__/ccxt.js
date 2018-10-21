class kraken  {
    constructor(){

    }
    fetchTicker(){
        return Promise.resolve({"high":134});
    }
    fetchOrderBook(){
        return Promise.resolve({ bids:[ [ 2800, 1.853 ]]});
    }
    
}

module.exports.kraken = kraken;





