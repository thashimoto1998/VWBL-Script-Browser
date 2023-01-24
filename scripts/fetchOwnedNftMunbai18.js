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
        const image = document.createElement('img');
        const res = await fetch(v.image);
        console.log('res', res);
        const blob = await res.blob();
        image.src = URL.createObjectURL(blob);
        image.alt = v.name;
        image.className = 'NFTItem';
      
        const name = document.createTextNode(v.name);
        name.className = 'NFTItem';
        const br1 = document.createElement("br");
        br1.className = 'NFTItem';
        const description = document.createTextNode(v.description);
        description.className = 'NFTItem;
        const br2 = document.createElement("br");
        br2.className = 'NFTItem';
        const btn = document.createElement("button");
        btn.innerHTML = "View asset";
        btn.addEventListener("click", function() {
          console.log("url", `https://vwbl-demo-bubble.bubbleapps.io/version-test/assets?debug_mode=true&tokenId=${v.id}&address=${v.address}`);
          location.href = `https://vwbl-demo-bubble.bubbleapps.io/version-test/assets?debug_mode=true&tokenId=${v.id}&address=${v.address}`;
        });
        btn.className = 'NFTItem';
      
        document.getElementById('imageList').appendChild(image);
        document.getElementById('imageList').appendChild(name);
        document.getElementById('imageList').appendChild(br1);
        document.getElementById('imageList').appendChild(description);
        document.getElementById('imageList').appendChild(br2);
        document.getElementById('imageList').appendChild(btn);
    };
    console.log('get imageList element',  document.getElementById('imageList'));
}

main();
