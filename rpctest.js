const ElectrumCli = require('electrum-client')
const main = async () => {
    // const ecl = new ElectrumCli(995, 'btc.smsys.me', 'tls') // tcp or tls
    // const ecl = new ElectrumCli(50001, 'electrum.coinucopia.io', 'tcp') // tcp or tls
    const ecl = new ElectrumCli(55001, 'localhost', 'tcp') // tcp or tls
    await ecl.connect(); // connect(promise)
    ecl.subscribe.on('blockchain.headers.subscribe', (v) => console.log(v)) // subscribe message(EventEmitter)
    try{
        const ver = await ecl.server_version("electrum-client", "1.2") // json-rpc(promise)
        console.log(ver)
        const response = await ecl.blockchainBlock_getHeader('570144');
        console.log(response);
        }catch(e){
        console.log(e)
    }
    await ecl.close() // disconnect(promise)
}
main()
