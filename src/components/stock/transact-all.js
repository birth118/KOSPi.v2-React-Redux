import React from 'react'
import { client } from '../../apis'
import { digitConv } from '../../utils'



export const TransactAll = ({ match }) => {


  const [history, setHistorty] = React.useState([])

  React.useEffect(() => {
    const { yymmdd } = match.params

    client.get(`/api/transactAll/${yymmdd}`)
      .then(({ data }) => {

        setHistorty(data)
        console.log(history);
      })
      .catch(({ response }) => { console.log(response); })

    return () => {
      // clean up code
    }
  }, [match.params])

  const renderHistory = () => {
    return history.map((transaction, idx) => {
      return (
        <tr key={idx}>
          <td> {new Date(transaction.createdAt).toLocaleDateString('en-US')}</td>
          <td>{transaction.buyOrSell}</td>
          <td>{transaction.companyName}</td>
          <td>{digitConv(transaction.price, 1)}</td>
          <td>{transaction.amount}</td>
          <td>{digitConv(transaction.price * transaction.amount, 1)}</td>
          <td style={transaction.profitPercent > 0 ? { color: 'red' } : { color: 'blue' }} >{transaction.profitPercent !== 0 && `${digitConv(transaction.profitPercent * 100, 2)}%`}</td>
          <td>{digitConv(transaction.kospi, 2)}</td>
          <td>{transaction.comment.substring(0, 20)}</td>


        </tr >

      )
    })
  }

  return (
    <div>
      {/* TRANSACTION HISTORY */}
      <h3 className="ui dividing header">
        매매 히스토리
      </h3>

      <table className="ui striped  unstackable table">
        <thead>
          <tr>
            <th>Date</th>
            <th>매매</th>
            <th>종목</th>
            <th>단가</th>
            <th>수량</th>
            <th>금액</th>
            <th>Profit %</th>
            <th>KOSPI</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {renderHistory()}

        </tbody>

      </table>
    </div>
  )
}
