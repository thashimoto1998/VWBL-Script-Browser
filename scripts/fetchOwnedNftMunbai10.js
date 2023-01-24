async function main() {
    const web3 = new Web3(window.ethereum);
    const viewer = new VWBL.VWBLViewer({
        web3,
        vwblNetworkUrl: 'https://dev.vwbl.network',
        dataCollectorAddress: '0x70Fb88205D1163D276458E5D12D1fcC995BcB252'
    });
    const userAddress = (await web3.eth.getAccounts())[0];
    const ownedItems = await viewer.listOwnedNFTMetadata(userAddress);
    const sortedOwnedItems = ownedItems.filter((v) => v).reverse();
    console.log('owned nfts:', sortedOwnedItems);
    for (const v of sortedOwnedItems) {
        var image = document.createElement('img');
        var res = await fetch(v.image);
        console.log('res', res);
        const blob = await res.blob();
        image.src = URL.createObjectURL(blob);
        image.alt = v.name;
      
        const name = document.createTextNode(v.name);
        const br = document.createElement("br");
        const description = document.createTextNode(v.description);
      
        document.getElementById('imageList').appendChild(image);
        document.getElementById('imageList').appendChild(name);
        document.getElementById('imageList').appendChild(br);
        document.getElementById('imageList').appendChild(description);
    };
    console.log('get imageList element',  document.getElementById('imageList').value);
}

main();
