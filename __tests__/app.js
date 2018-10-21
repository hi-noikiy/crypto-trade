var jest = require('jest-mock');
var mockCcxt = require ('ccxt');
var app = require('../app');
test('no rollback test', () => {
    var inputTrade = {
        pair: 'BTC/EUR',
        exchange: 'kraken',
        volume: 1.0,
        price: -5600,
        direction: 'buy'
      };

    // not working mock implementation
    //fetchTicker.mockImplementationOnce(()=>Promise.resolve({high:1234}));

    app.outputTrade(inputTrade).then(data => {
        expect(data).toEqual({});
    }).catch(err =>{
        console.log("err ",  err);
    });
});
test('Rollback test', () => {
    var inputTrade = {
        pair: 'BTC/EUR',
        exchange: 'kraken',
        volume: 1.0,
        price: 5600,
        direction: 'buy'
      };
    app.outputTrade(inputTrade).then(data => {
        expect(data.rollback.direction).toEqual("sell");
        expect(data.rollback.pair).toEqual(inputTrade.pair);
        expect(data.rollback.loss).toEqual(0.5);
    });
}); 
