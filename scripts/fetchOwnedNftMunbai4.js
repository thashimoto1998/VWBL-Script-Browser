async function main() {
    var web3 = new Web3(window.ethereum);
    var viewer = new VWBL.VWBLViewer({
        web3,
        vwblNetworkUrl: 'https://dev.vwbl.network',
        dataCollectorAddress: '0x70Fb88205D1163D276458E5D12D1fcC995BcB252'
    });
    var userAddress = (await web3.eth.getAccounts())[0];
    var ownedItems = await viewer.listOwnedNFTMetadata(userAddress);
    var sortedOwnedItems = ownedItems.filter((v) => v).reverse();
    console.log('owned nfts:', sortedOwnedItems);
    sortedOwnedItems.forEach(v => {
        var image = document.createElement('img');
        var metadata = await fetch(v.image);
        console.log('metadata', metadata);
        image.src = metadata.data;
        image.alt = v.name;
        document.getElementById('imageList').appendChild(image);
    });
}

main();
