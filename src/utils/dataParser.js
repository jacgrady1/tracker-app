import moment from 'moment';

export const parseTxs = function(data) {
  //result is negative sell 
  const txs = data.txs;
  const conversion = data.info.conversion;

  // build a new array 
  var arr = [];
  for(const t of txs) {
    let date = moment.unix(t.time); 
    var obj = {
      id: t.hash,
      time: date.format("Do MMM YYYY, h:mm A"),
      type: t.result > 0 ? 'Buy' : 'Sell',
      address: t.result > 0 ? t.out[0].addr : t.inputs[0].prev_out.addr,
      fee: t.fee,
      result: t.result/conversion,
    }
    arr.push(obj);
  }

  return arr;
};


export default parseTxs;