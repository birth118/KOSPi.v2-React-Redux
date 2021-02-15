import React from 'react'
import { connect } from 'react-redux'
import { Link, } from 'react-router-dom'


import { client } from '../../apis';
import { Currency, digitConv } from '../../utils'



const Holdings = ({ currencyTable }) => {
  const [holdings, setHoldings] = React.useState([])

  let totalHoldings = 0
  let totalBuying = 0
  let totalValue = 0

  React.useEffect(() => {
    client.get('/api/stockcode').then(({ data }) => {
      //  console.log(data);
      setHoldings(data)
    }).catch((err) => {
      console.log(err.response);

    }
    )

  }, [])


  const renderedHoldings = holdings.map((stock, idx) => {

    const profit = (stock.item.currentPrice - stock.item.avgBuyingPrice) / stock.item.avgBuyingPrice * 100

    if (stock.item.holdings !== 0) {
      totalHoldings += 1
      totalBuying += stock.itemValue
      totalValue += stock.item.currentPrice * stock.item.holdings * currencyTable[stock.item.currency]
    }
    // (async (log) => console.log(log))(await krx.getStock(stock.item.companyCode));
    // (async () => console.log(await krx.getStock(stock.item.companyCode)))();



    return (
      <tr key={idx}>
        <td className="d-none d-xl-table-cell" style={stock.item.currency !== Currency.KRW ? { color: 'purple' } : null} >{stock.item.companyCode}</td>
        <td style={stock.item.currency !== Currency.KRW ? { color: 'purple' } : null} >{stock.item.companyName}</td>
        <td>{stock.item.holdings}</td>
        <td>{stock.item.currency === Currency.KRW ? digitConv(stock.item.avgBuyingPrice, 1) : digitConv(stock.item.avgBuyingPrice, 2)}</td>
        <td>{stock.item.currency === Currency.KRW ? digitConv(stock.item.holdings * stock.item.avgBuyingPrice, 1) : digitConv(stock.item.holdings * stock.item.avgBuyingPrice, 2)}</td>
        <td>{stock.item.currency === Currency.KRW ? digitConv(stock.item.currentPrice, 1) : digitConv(stock.item.currentPrice, 3)}</td>
        <td style={profit < 0 ? { color: 'blue' } : { color: 'red' }} >{digitConv(profit, 2)}%</td>
        <td>{digitConv(stock.itemPortion * 100, 2)}</td>

        <td className="d-none d-xl-table-cell">{stock.item.avgPER}</td>

        <td className="d-none d-xl-table-cell">{stock.item.avgPBR}</td>
        <td className="d-none d-xl-table-cell">{stock.item.evEbitda}</td>
        <td className="d-none d-xl-table-cell">{stock.item.market}</td>
        <td className="d-none d-xl-table-cell">{stock.item.wics}</td>


        <td>
          <div className="mini ui  button "><Link
            to={`/transact/${stock.item.companyCode}`}
          >T</Link>
          </div>
        </td>
        <td>
          <div className="mini ui basic button"><Link
            to={`/update/${stock.item.companyCode}`}
          >✒</Link>
          </div>
        </td>

      </tr>
    )
  })

  return (
    <div>
      <div >

        {/* 보유 합계 */}
        <h3 >
          보유 합계
        </h3>
        <div className="table-responsive-md">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>종목수</th>
                <th>총매입</th>
                <th>현가치</th>
                <th>수익(손실)액</th>
                <th>포트수익률</th>
                <th>USD</th>
                <th>CNY</th>

              </tr>
            </thead>
            <tbody>
              <tr>

                <td>{totalHoldings}</td>
                <td>{digitConv(totalBuying, 1)}</td>
                <td>{digitConv(totalValue, 1)}</td>
                <td style={totalValue - totalBuying < 0 ? { color: 'blue' } : null}>{digitConv(totalValue - totalBuying, 1)}</td>
                <td style={totalValue - totalBuying < 0 ? { color: 'blue' } : null}>{digitConv((totalValue - totalBuying) / totalBuying * 100, 2)}%</td>
                <td>{digitConv(currencyTable.USD, 2)}</td>
                <td>{digitConv(currencyTable.CNY, 2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>



      <h3 >
        {new Date().toLocaleDateString('en-US')} 종목 LIST
        </h3>

      <div className="table-responsive-md">
        <table className="table table-striped table-sm">
          <thead>
            <tr>

              <th className="d-none d-xl-table-cell">코드</th>

              <th>종목</th>
              <th>보유수</th>
              <th>평단</th>

              <th>매입액</th>

              <th>현재가</th>
              <th>수익률</th>
              <th>Alloc.</th>
              <th className="d-none d-xl-table-cell">PER</th>
              <th className="d-none d-xl-table-cell">PBR</th>
              <th className="d-none d-xl-table-cell">EV</th>
              <th className="d-none d-xl-table-cell">피/닥</th>
              <th className="d-none d-xl-table-cell">WICS</th>
              <th>Trans</th>
              <th>Upd/Hist</th>
            </tr>
          </thead>


          <tbody>
            {renderedHoldings}


          </tbody>
        </table>
      </div>



    </div>


  )
}


const mapStateToProps = (state) => {
  return { currencyTable: state.currency }
}
export default connect(mapStateToProps, {})(Holdings)

/*

item:
    avgBuyingPrice: 0
    avgPBR: 0
    avgPER: 0
    companyCode: "123456"
    companyName: "SK Inno"
    createdAt: "2021-02-09T21:55:43.740Z"
    currency: "KRW"
    currentPrice: 0
    evEbitda: 0
    holdings: 0
    intrinsic: 0
    market: "KOSPI"
    previousDate: "2021-02-09T21:47:06.065Z"
    previousPrice: 0
    updatedAt: "2021-02-09T21:55:43.740Z"
    userId: "6017559653a7672a98162a5f"
    wics: "에너지"
    __v: 0
    _id: "602304dfbc9e816558838fb9"
    __proto__: Object
itemPortion: null
itemValue: 0
 */

