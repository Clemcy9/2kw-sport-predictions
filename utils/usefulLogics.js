function oddsFilter(
  odds,
  start_percent = 65,
  stop_percent = 85,
  required_market = null
) {
  // allway makesure the required market is an array
  let marketList = null;
  if (required_market) {
    marketList = Array.isArray(required_market)
      ? required_market
      : [required_market];
  }

  const filteredOdds = odds
    .map((odd) => {
      // filtering bets -1st loop
      const filteredBets = odd.bets
        .map((bet) => {
          // filtering vaules -2nd loop
          const filteredValues = bet.values.filter((v) => {
            console.log("v is:", v);
            const p = parseFloat(v.percentage);
            // return required_market
            //   ? p >= start_percent &&
            //       p <= stop_percent &&
            //       v.value.toLowerCase() === required_market.toLowerCase()
            //   : p >= start_percent && p <= stop_percent;
            return required_market
              ? p >= start_percent &&
                  p <= stop_percent &&
                  marketList.includes(v.value.toLowerCase())
              : p >= start_percent && p <= stop_percent;
          });
          console.log("filteredvalues:", filteredValues);
          return filteredValues.length > 0
            ? { ...bet, values: filteredValues }
            : null;
        })
        .filter((b) => b !== null);
      if (filteredBets.length === 0) return null;
      console.log("oddfilter, filteredBets:", filteredBets);
      // return the odd with cleaned bets
      return { ...odd, bets: filteredBets };
    })
    .filter((odd) => odd !== null);
  return filteredOdds;
}
