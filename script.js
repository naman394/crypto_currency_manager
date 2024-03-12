const cryptoData = {
    Bitcoin: 10000,
    Ethereum: 3000,
    Ripple: 500,
    Crypto1: 2000,
    CryptoB: 50000,
    Litecoin: 250,
    Cardano: 1500,
    Polkadot: 800,
    Stellar: 300,
    Chainlink: 2200,
    Uniswap: 1000,
    Dogecoin: 0.5,
    Solana: 1300,
    Monero: 400,
    Tezos: 350,
    Cosmos: 900,
    Aave: 500,
    Maker: 2500,
    Compound: 750,
    Yearn: 9000
  };
  let balance = 100000;
  let wishlist = [];
  let holdings = {};
  function navigate(page) {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('wishlistPage').style.display = 'none';
    document.getElementById('holdingsPage').style.display = 'none';
    document.getElementById(`${page}Page`).style.display = 'block';
    if (page === 'home') {
      renderHomePage();
    } else if (page === 'wishlist') {
      renderWishlistPage();
    } else if (page === 'holdings') {
      renderHoldingsPage();
    }
  }
  function renderHomePage() {
    const homePage = document.getElementById('homePage');
    homePage.innerHTML = '';
    Object.keys(cryptoData).forEach(token => {
      const card = document.createElement('div');
      card.classList.add('card');
      const pElement = document.createElement('p');
      const name = document.createElement('span');
      name.textContent = token + ' - ';
      const price = document.createElement('span');
      price.textContent = `$${cryptoData[token]}`;
      const purchaseBtn = document.createElement('button');
      purchaseBtn.textContent = 'Purchase';
      purchaseBtn.addEventListener('click', () => {
        const amount = parseInt(prompt(`How many ${token} tokens do you want to buy?`));
        if (!isNaN(amount) && amount > 0 && balance >= amount * cryptoData[token]) {
          balance -= amount * cryptoData[token];
          if (holdings[token]) {
            holdings[token] += amount;
          } else {
            holdings[token] = amount;
          }
          alert(`You have successfully purchased ${amount} ${token} tokens.`);
          document.getElementById('balance').textContent = `Balance: $${balance}`;
          renderHoldingsPage();
        } else {
          alert('Invalid input or insufficient balance.');
        }
      });
      const wishlistBtn = document.createElement('button');
      wishlistBtn.textContent = 'Add to Wishlist';
      wishlistBtn.addEventListener('click', () => {
        if (!wishlist.includes(token)) {
          wishlist.push(token);
          alert('Successfully added to your wishlist.');
          renderWishlistPage();
        } else {
          alert('This token is already in your wishlist.');
        }
      });
      const profitLoss = document.createElement('p');
      profitLoss.textContent = '';
      pElement.appendChild(name);
      pElement.appendChild(price);
      card.appendChild(pElement);
      card.appendChild(purchaseBtn);
      card.appendChild(wishlistBtn);
      homePage.appendChild(card);
    });
  }
  function renderWishlistPage() {
    const wishlistPage = document.getElementById('wishlistPage');
    wishlistPage.innerHTML = 'Wishlist';
    if (wishlist.length === 0) {
      wishlistPage.textContent = 'Wishlist is empty.';
    } else {
      wishlist.forEach(token => {
        const card = document.createElement('div');
        card.classList.add('card');
        const pElement = document.createElement('p');
        const name = document.createElement('span');
        name.textContent = token;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove from wishlist ';
        removeBtn.addEventListener('click', () => {
          wishlist = wishlist.filter(item => item !== token);
          renderWishlistPage();
        });
        const purchaseBtn = document.createElement('button');
        purchaseBtn.textContent = 'Purchase';
        purchaseBtn.addEventListener('click', () => {
          const amount = parseInt(prompt(`How many ${token} tokens do you want to buy?`));
          if (!isNaN(amount) && amount > 0 && balance >= amount * cryptoData[token]) {
            balance -= amount * cryptoData[token];
            if (holdings[token]) {
              holdings[token] += amount;
            } else {
              holdings[token] = amount;
            }
            alert(`You have successfully purchased ${amount} ${token} tokens.`);
            wishlist = wishlist.filter(item => item !== token);
            document.getElementById('balance').textContent = `Balance: $${balance}`;
            renderHoldingsPage();
            renderWishlistPage();
          } else {
            alert('Invalid input or insufficient balance.');
          }
        });
        const profitLoss = document.createElement('p');
        profitLoss.textContent = '';
        pElement.appendChild(name);
        card.appendChild(pElement)
        card.appendChild(removeBtn);
        card.appendChild(purchaseBtn);
        card.appendChild(profitLoss);
        wishlistPage.appendChild(card);
      });
    }
  }
  function sellCrypto(crypto, quantity, price) {
    // Add logic to simulate selling cryptocurrency
    const sellAmount = parseInt(prompt(`How many ${crypto} tokens do you want to sell?`));
    if (!isNaN(sellAmount) && sellAmount > 0 && quantity >= sellAmount) {
        balance += sellAmount * price;
        holdings[crypto] -= sellAmount;
        alert(`You have successfully sold ${sellAmount} ${crypto} tokens.`);
        document.getElementById('balance').textContent = `Balance: $${balance}`;
        renderHoldingsPage();
    } else {
        alert('Invalid input or insufficient quantity.');
    }
  }
  function renderHoldingsPage() {
    const holdingsPage = document.getElementById('holdingsPage');
    holdingsPage.innerHTML = '';
    const holdingsList = document.createElement('ul'); // Create a new list element
    holdingsList.id = 'holdings-list'; // Set the id of the list
    holdingsPage.appendChild(holdingsList); // Append the list to holdingsPage
    let totalValue = 0;
    for (const [crypto, quantity] of Object.entries(holdings)) {
        const price = cryptoData[crypto];
        const value = price * quantity;
        totalValue += value;
        const li = document.createElement('li');
        li.innerHTML = `<span>${crypto} (${quantity}): $${value.toFixed(2)}</span>`;
        const sellButton = document.createElement('button');
        sellButton.textContent = 'Sell';
        sellButton.addEventListener('click', () => sellCrypto(crypto, quantity, price));
        li.appendChild(sellButton);
        holdingsList.appendChild(li);
    }
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `Balance: $${(balance + totalValue).toFixed(2)}`;
  }
  navigate('home');