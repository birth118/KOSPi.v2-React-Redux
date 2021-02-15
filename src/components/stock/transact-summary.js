import React from 'react'
import { client } from '../../apis';

import { digitConv, Currency } from '../../utils';

export const TransactSummary = ({ stockcode }) => {

  //   React.useEffect(() => {

  //console.log(stockcode);
  const [stock, setStock] = React.useState({})

  React.useEffect(() => {
    client.get(`/api/stockcode/${stockcode}`).then(({ data }) => {
      setStock(data)
      //    console.log(data);
    }).catch((err) => { return null })
    return () => {
      // cleanup
    }
  }, [])



  // return () => {
  //   // cleanup
  // }
  // }, [])

  return (
    <div>

      {!stock ? <h3> Loading...</h3> :


        <table className="ui unstackable table">
          <thead>
            <tr>
              <th>종목명</th><th className="right aligned">{stock.companyName}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>WICS</td><td className="right aligned">{stock.wics}</td></tr>
            <tr><td>보유수</td><td className="right aligned">{stock.holdings}</td></tr>
            <tr><td>평단가</td><td className="right aligned">{stock.currency === Currency.KRW ? digitConv(stock.avgBuyingPrice, 1) : digitConv(stock.avgBuyingPrice, 2)}</td></tr>
            <tr><td style={stock.currentPrice === 0 ? { 'color': 'red' } : null} >현시가</td>

              <td style={stock.currentPrice === 0 ? { 'color': 'red' } : null} className="right aligned">{stock.currency === Currency.KRW ? digitConv(stock.currentPrice, 1) : digitConv(stock.currentPrice, 2)}</td>

            </tr>
            <tr><td>수익률</td><td className="right aligned">{digitConv(stock.currentPrice / stock.avgBuyingPrice, 2)}%</td></tr>
            <tr><td>평균 PER</td><td className="right aligned">{stock.avgPER}</td></tr>
            <tr><td>평균 PBR</td><td className="right aligned">{stock.avgPBR}</td></tr>
            <tr><td>내재가치</td><td className="right aligned">{stock.intrinsic}</td></tr>
            <tr><td>EV/EBITDA</td><td className="right aligned">{stock.evEbitda}</td></tr>
            <tr><td>지난 매매가</td><td className="right aligned">{stock.previousPrice}</td></tr>
            <tr><td>지난 매매일</td><td className="right aligned">{new Date(stock.previousDate).toLocaleDateString('en-US')}</td></tr>

          </tbody>
        </table>}
    </div>
  )
}
